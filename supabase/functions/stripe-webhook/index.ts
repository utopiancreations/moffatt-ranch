// supabase/functions/stripe-webhook/index.ts
import { serve } from 'https://deno.land/std@0.170.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.0';

// Initialize Supabase client with modified env var names
const supabaseUrl = Deno.env.get('PROJECT_URL') || '';
const supabaseServiceKey = Deno.env.get('SERVICE_ROLE_KEY') || '';
const supabase = createClient(supabaseUrl, supabaseServiceKey);

// Stripe webhook secret for signature verification
const stripeWebhookSecret = Deno.env.get('STRIPE_WEBHOOK_SECRET') || '';

// The rest of the function remains unchanged...

// Helper to verify Stripe signature
async function verifyStripeSignature(request: Request): Promise<any> {
  const body = await request.text();
  const signature = request.headers.get('stripe-signature');

  if (!signature || !stripeWebhookSecret) {
    throw new Error('Stripe signature or webhook secret missing');
  }

  // Import crypto modules for signature verification
  const encoder = new TextEncoder();
  const payload = encoder.encode(body);
  const secret = encoder.encode(stripeWebhookSecret);

  // Split the signature from Stripe
  const pairs = signature.split(',');
  const timestampValue = pairs.find(pair => pair.startsWith('t='))?.split('=')[1];
  const signatureValue = pairs.find(pair => pair.startsWith('v1='))?.split('=')[1];

  if (!timestampValue || !signatureValue) {
    throw new Error('Invalid Stripe signature format');
  }

  // Create the expected signature
  const message = `${timestampValue}.${body}`;
  const messageUint8 = encoder.encode(message);
  const key = await crypto.subtle.importKey(
    'raw', secret, { name: 'HMAC', hash: 'SHA-256' }, false, ['verify']
  );

  // Verify the signature
  const signatureBytes = hexToUint8Array(signatureValue);
  const isValid = await crypto.subtle.verify('HMAC', key, signatureBytes, messageUint8);

  if (!isValid) {
    throw new Error('Stripe signature verification failed');
  }

  return JSON.parse(body);
}

// Helper to convert hex string to Uint8Array
function hexToUint8Array(hexString: string) {
  const pairs = hexString.match(/[\dA-F]{2}/gi) || [];
  const binary = new Uint8Array(pairs.length);
  
  for (let i = 0; i < pairs.length; i++) {
    binary[i] = parseInt(pairs[i], 16);
  }
  
  return binary;
}

// Main function to handle webhook requests
serve(async (req) => {
  try {
    // Only allow POST requests for webhooks
    if (req.method !== 'POST') {
      return new Response('Method not allowed', { status: 405 });
    }

    // Verify the Stripe signature and parse payload
    let event;
    try {
      event = await verifyStripeSignature(req);
    } catch (error) {
      console.error('Webhook signature verification failed:', error);
      return new Response(`Webhook signature verification failed: ${error.message}`, { status: 400 });
    }

    console.log(`Processing Stripe event: ${event.id}, type: ${event.type}`);

    // Handle the event based on its type
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object;
        
        // Extract order ID from metadata
        const orderId = session.metadata?.order_id;
        if (!orderId) {
          console.error('No order ID found in session metadata');
          return new Response('No order ID found in session metadata', { status: 400 });
        }

        console.log(`Payment successful for order: ${orderId}`);

        // Update order status to paid
        const { error } = await supabase
          .from('orders')
          .update({ 
            status: 'paid',
            payment_status: 'paid',
            stripe_payment_id: session.payment_intent,
            payment_method: session.payment_method_types?.[0] || 'card',
            updated_at: new Date().toISOString()
          })
          .eq('id', orderId);

        if (error) {
          console.error('Error updating order status:', error);
          return new Response(`Error updating order: ${error.message}`, { status: 500 });
        }

        return new Response(JSON.stringify({ received: true, orderId }));
      }

      case 'payment_intent.payment_failed': {
        const paymentIntent = event.data.object;
        
        // Try to find the order using the payment intent ID
        const { data: orders, error } = await supabase
          .from('orders')
          .select('id')
          .eq('stripe_payment_id', paymentIntent.id)
          .single();

        if (error || !orders) {
          console.error('Could not find order for failed payment:', paymentIntent.id);
          return new Response('Order not found for failed payment', { status: 200 });
        }

        // Update order status to failed
        await supabase
          .from('orders')
          .update({ 
            status: 'payment_failed',
            payment_status: 'failed',
            updated_at: new Date().toISOString()
          })
          .eq('id', orders.id);

        return new Response(JSON.stringify({ received: true }));
      }

      // Add handling for more events as needed
      default:
        console.log(`Unhandled event type: ${event.type}`);
        return new Response(`Received unhandled event: ${event.type}`, { status: 200 });
    }
  } catch (error) {
    console.error('Error processing webhook:', error);
    return new Response(`Webhook error: ${error.message}`, { status: 500 });
  }
});