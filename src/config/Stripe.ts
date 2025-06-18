// src/config/stripe.ts
// This file manages Stripe configuration from environment variables

export const stripeConfig = {
  // For client-side (safe to expose)
  publishableKey: import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || 'pk_test_yourdevkey',
  
  // This should only be used server-side (in Edge Functions, not in the browser)
  // Only included here for documentation purposes
  secretKey: import.meta.env.VITE_STRIPE_SECRET_KEY,
  
  // Webhook secret for verifying Stripe events
  webhookSecret: import.meta.env.VITE_STRIPE_WEBHOOK_SECRET,
  
  // Is this the test environment?
  testMode: import.meta.env.VITE_STRIPE_TEST_MODE !== 'false', // Default to test mode
  
  // Helper functions
  isConfigured: () => {
    return !!import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY;
  },
  
  isDevelopment: () => {
    return import.meta.env.DEV;
  }
};