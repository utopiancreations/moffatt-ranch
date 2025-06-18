// supabase/functions/stripe-tracking/index.ts
// No changes needed here since this function only uses STRIPE_SECRET_KEY
// which is an allowed environment variable name

import { serve } from 'https://deno.land/std@0.170.0/http/server.ts';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

serve(async (req) => {
  // Handle CORS preflight request
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  // Get the Stripe secret key from environment variable
  const stripeSecretKey = Deno.env.get('STRIPE_SECRET_KEY');

  // Check if we have a Stripe secret key
  if (!stripeSecretKey) {
    console.error('STRIPE_SECRET_KEY is missing in environment variables');
    return new Response(
      JSON.stringify({ error: 'Payment system configuration error. Please contact support.' }),
      {
        status: 500,
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json',
        },
      }
    );
  }

  try {
    // Parse request body
    let reqBody;
    try {
      reqBody = await req.json();
    } catch (parseError) {
      console.error('Error parsing request body:', parseError);
      return new Response(
        JSON.stringify({ error: 'Invalid request format' }),
        {
          status: 400,
          headers: {
            ...corsHeaders,
            'Content-Type': 'application/json',
          },
        }
      );
    }

    // Validate required fields
    const { order_id, payment_intent_id, tracking_number, carrier } = reqBody;

    if (!order_id || !payment_intent_id || !tracking_number || !carrier) {
      console.error('Missing required fields:', { 
        hasOrderId: !!order_id, 
        hasPaymentIntentId: !!payment_intent_id, 
        hasTrackingNumber: !!tracking_number,
        hasCarrier: !!carrier
      });
      return new Response(
        JSON.stringify({ error: 'Missing required information' }),
        {
          status: 400,
          headers: {
            ...corsHeaders,
            'Content-Type': 'application/json',
          },
        }
      );
    }

    console.log('Updating shipping info for order:', order_id);
    
    // Make direct request to Stripe API to update metadata
    try {
      console.log('Sending request to Stripe API');
      
      // First, we need to retrieve the PaymentIntent to get its shipping information
      const retrieveResponse = await fetch(`https://api.stripe.com/v1/payment_intents/${payment_intent_id}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${stripeSecretKey}`,
          'Content-Type': 'application/x-www-form-urlencoded',
          'Stripe-Version': '2020-08-27',
        }
      });
      
      if (!retrieveResponse.ok) {
        const errorData = await retrieveResponse.json();
        console.error('Stripe API error retrieving payment intent:', errorData);
        return new Response(
          JSON.stringify({ 
            error: 'Failed to retrieve payment information', 
            details: errorData.error || 'Unknown error' 
          }),
          {
            status: 400,
            headers: {
              ...corsHeaders,
              'Content-Type': 'application/json',
            },
          }
        );
      }
      
      const paymentIntent = await retrieveResponse.json();
      
      // Now update the PaymentIntent with tracking information
      const params = new URLSearchParams();
      
      // Add tracking information to metadata
      params.append('metadata[order_id]', order_id);
      params.append('metadata[tracking_number]', tracking_number);
      params.append('metadata[carrier]', carrier);
      params.append('metadata[tracking_url]', getTrackingUrl(carrier, tracking_number));
      params.append('metadata[shipped_at]', new Date().toISOString());
      
      // Add shipping status
      params.append('shipping[tracking_number]', tracking_number);
      params.append('shipping[carrier]', carrier);
      
      if (paymentIntent.shipping && paymentIntent.shipping.address) {
        // Keep the existing shipping address information
        const address = paymentIntent.shipping.address;
        if (address.line1) params.append('shipping[address][line1]', address.line1);
        if (address.line2) params.append('shipping[address][line2]', address.line2);
        if (address.city) params.append('shipping[address][city]', address.city);
        if (address.state) params.append('shipping[address][state]', address.state);
        if (address.postal_code) params.append('shipping[address][postal_code]', address.postal_code);
        if (address.country) params.append('shipping[address][country]', address.country);
      }
      
      // Update PaymentIntent
      const updateResponse = await fetch(`https://api.stripe.com/v1/payment_intents/${payment_intent_id}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${stripeSecretKey}`,
          'Content-Type': 'application/x-www-form-urlencoded',
          'Stripe-Version': '2020-08-27',
        },
        body: params.toString(),
      });
      
      const updateData = await updateResponse.json();
      
      if (!updateResponse.ok) {
        console.error('Stripe API error updating tracking:', updateData);
        return new Response(
          JSON.stringify({ 
            error: 'Failed to update tracking information', 
            details: updateData.error || 'Unknown error' 
          }),
          {
            status: 400,
            headers: {
              ...corsHeaders,
              'Content-Type': 'application/json',
            },
          }
        );
      }
      
      console.log('Stripe tracking information updated for order:', order_id);
      
      // Return success response
      return new Response(
        JSON.stringify({ 
          success: true,
          message: 'Tracking information updated successfully',
          payment_intent: payment_intent_id,
          tracking: {
            number: tracking_number,
            carrier: carrier,
            url: getTrackingUrl(carrier, tracking_number)
          }
        }),
        {
          headers: {
            ...corsHeaders,
            'Content-Type': 'application/json',
          },
        }
      );
    } catch (stripeError) {
      console.error('Error calling Stripe API:', stripeError);
      
      return new Response(
        JSON.stringify({ 
          error: 'Failed to connect to Stripe API',
          message: stripeError.message,
          stack: stripeError.stack
        }),
        {
          status: 500,
          headers: {
            ...corsHeaders,
            'Content-Type': 'application/json',
          },
        }
      );
    }
  } catch (error) {
    // Handle general errors
    console.error('General error in function:', error);
    
    return new Response(
      JSON.stringify({ 
        error: 'An unexpected error occurred',
        message: error instanceof Error ? error.message : String(error),
        stack: error instanceof Error ? error.stack : null
      }),
      {
        status: 500,
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json',
        },
      }
    );
  }
});

// Helper function to generate tracking URLs based on carrier
function getTrackingUrl(carrier: string, trackingNumber: string): string {
  carrier = carrier.toLowerCase();
  
  switch (carrier) {
    case 'usps':
      return `https://tools.usps.com/go/TrackConfirmAction?tLabels=${trackingNumber}`;
    case 'ups':
      return `https://www.ups.com/track?tracknum=${trackingNumber}`;
    case 'fedex':
      return `https://www.fedex.com/fedextrack/?trknbr=${trackingNumber}`;
    case 'dhl':
      return `https://www.dhl.com/en/express/tracking.html?AWB=${trackingNumber}`;
    default:
      // Generic tracking URL or the carrier's homepage
      return `https://www.google.com/search?q=${carrier}+tracking+${trackingNumber}`;
  }
}