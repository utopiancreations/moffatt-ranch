# Moffatt Ranch Platform

E-commerce and logistics platform for a sustainable family orchard — covers the full order lifecycle: browsing, checkout, payment, fulfillment tracking, and seasonal inventory management.

**Live:** https://moffatt-ranch.vercel.app

## What I Built vs. What Was Scaffolded

The UI shell started from an AI-assisted scaffold (Lovable), which got a working React/Tailwind/shadcn-ui interface in place fast. Everything that actually carries risk, I built and hardened by hand:

**Payments:** a full Stripe integration as Supabase Edge Functions — create-checkout, stripe-webhook, verify-checkout, plus dedicated stripe-debug and stripe-tracking functions for order-status reconciliation. Webhook signature verification and idempotency are the parts scaffolding tools don't get right; those were hand-built.

**Access control:** a SECURITY DEFINER Postgres function (is_user_admin) backing the admin dashboard's row-level security, so admin-only data stays admin-only at the database layer, not just hidden in the UI.

**Production hardening:** fixed SPA route-reload behavior on Vercel, corrected missing WebP assets and unreliable social-share preview images.

For from-scratch, unscaffolded work, see [ghostwriter](https://github.com/utopiancreations/ghostwriter) (Python/Ollama) or [radical-resolve](https://github.com/utopiancreations/radical-resolve) (Flutter) — neither started from a template.

## Tech Stack

React, TypeScript, Tailwind CSS, shadcn-ui, Vite, Supabase, Stripe API
