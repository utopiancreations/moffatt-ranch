import { serve } from 'https://deno.land/std@0.170.0/http/server.ts';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
};

serve(async (req) => {
  // Handle CORS preflight request
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    // Get the Stripe secret key from environment variable
    const stripeSecretKey = Deno.env.get('STRIPE_SECRET_KEY');
    
    if (!stripeSecretKey) {
      return new Response(
        JSON.stringify({ error: 'STRIPE_SECRET_KEY is missing' }),
        {
          status: 500,
          headers: {
            ...corsHeaders,
            'Content-Type': 'application/json',
          },
        }
      );
    }
    
    // Create a basic request to the Stripe API
    const results = {
      stripeKeyPrefix: stripeSecretKey.substring(0, 7),
      connectivity: {
        dnsLookup: null,
        apiConnectivity: null,
        apiResponse: null
      }
    };
    
    // Test DNS resolution
    try {
      const dnsCheck = await fetch('https://api.stripe.com/');
      results.connectivity.dnsLookup = 'success';
    } catch (err) {
      results.connectivity.dnsLookup = `failed: ${err.message}`;
    }
    
    // Test API connectivity with authentication
    try {
      const response = await fetch('https://api.stripe.com/v1/customers', {
        headers: {
          'Authorization': `Bearer ${stripeSecretKey}`,
          'Content-Type': 'application/x-www-form-urlencoded',
          'Stripe-Version': '2020-08-27'
        }
      });
      
      const data = await response.json();
      
      results.connectivity.apiConnectivity = response.ok ? 'success' : `failed: ${response.status}`;
      results.connectivity.apiResponse = {
        statusCode: response.status,
        hasData: !!data,
        isArray: data && Array.isArray(data.data),
        errorType: data.error ? data.error.type : null
      };
    } catch (err) {
      results.connectivity.apiConnectivity = `failed: ${err.message}`;
    }
    
    return new Response(
      JSON.stringify(results, null, 2),
      {
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json',
        },
      }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
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
