# Moffatt Ranch Management Platform

> Full-stack e-commerce and operations platform for a family-owned U-Pick orchard in Brentwood, CA. Built as a freelance project under [Utopian Creations](https://utopiancreations.one).

**Live Site:** [moffattranchbrentwood.com](https://moffattranchbrentwood.com)

---

## Project Overview

Moffatt Ranch is a seasonal agricultural business that needed a modern web presence and a backend system capable of managing fruit inventory, merchandise sales, and order logistics. This platform handles everything from the public-facing storefront to an internal admin dashboard used by ranch operators.

The goal was to replace manual processes with a streamlined digital workflow — giving the Moffatt family visibility into orders, inventory status, and customer data without requiring technical knowledge to operate.

---

## Tech Stack

| Layer | Technologies |
|---|---|
| **Frontend** | React 18, TypeScript, Vite |
| **Styling** | Tailwind CSS, shadcn/ui, Radix UI |
| **Backend** | Supabase (PostgreSQL + Auth + Storage) |
| **Payments** | Stripe Checkout, Stripe Webhooks |
| **Edge Functions** | Deno / Supabase Edge Functions |
| **Hosting** | Firebase Hosting |
| **State** | TanStack Query, React Context |

---

## Features

### Public Storefront
- Responsive marketing site with video hero, fruit variety catalog, visit info, and contact form
- Seasonal availability messaging synced to admin-controlled settings
- 16+ fruit variety listings with descriptions, featured badges, and harvest windows
- Merchandise page with in-stock/out-of-stock states

### Admin Dashboard
- **Order Manager** — full lifecycle tracking from pending → paid → shipped → delivered, with cancellation and refund workflows
- **Ship Order Flow** — carrier selection, tracking number entry, and automatic tracking URL generation (USPS, UPS, FedEx, DHL)
- **Fruit Manager** — CRUD interface for managing seasonal varieties by type (yellow/white peach, yellow/white nectarine, Asian pear)
- **Product Manager** — merchandise catalog management with image upload via Supabase Storage
- **Content Manager** — tabbed editor for updating page copy across About, Visit, Fruit, and Home sections
- **Settings Manager** — operating hours, season dates, contact info, and social links
- **Stripe Config** — publishable key and webhook secret management stored in the database

### Payments & Fulfillment
- Stripe Checkout sessions created via Edge Function with dynamic line items
- Webhook handler for `checkout.session.completed` and `payment_intent.payment_failed` events — automatically updates order status in Supabase
- Stripe PaymentIntent metadata updated on shipment for tracking synchronization
- Order status always consistent between Stripe dashboard and internal records

### Auth & Access
- Supabase Auth with email/password login
- Admin user table with `is_super_admin` flag
- RLS policies enforced at the database level via `is_admin()` and `is_user_admin()` functions
- Protected admin routes with redirect-on-unauthenticated

---

## Architecture

```
┌─────────────────────────────┐
│     React / TypeScript      │  Vite SPA, deployed to Firebase Hosting
│   (Storefront + Admin UI)   │
└────────────┬────────────────┘
             │
┌────────────▼────────────────┐
│        Supabase              │
│  ┌──────────────────────┐   │
│  │  PostgreSQL (RLS)    │   │  orders, order_items, products, fruits,
│  │                      │   │  content, settings, stripe_config, admin_users
│  └──────────────────────┘   │
│  ┌──────────────────────┐   │
│  │  Auth (email/pw)     │   │
│  └──────────────────────┘   │
│  ┌──────────────────────┐   │
│  │  Storage (R2-backed) │   │  product images, fruit images, content images
│  └──────────────────────┘   │
│  ┌──────────────────────┐   │
│  │  Edge Functions      │   │  create-checkout, verify-checkout,
│  │  (Deno runtime)      │   │  stripe-webhook, stripe-tracking
│  └──────────────────────┘   │
└────────────┬────────────────┘
             │
┌────────────▼────────────────┐
│           Stripe             │  Checkout Sessions, PaymentIntents, Webhooks
└─────────────────────────────┘
```

---

## Database Schema (key tables)

| Table | Purpose |
|---|---|
| `orders` | Full order records including shipping address, payment status, tracking info |
| `order_items` | Line items per order with product name, size, price, quantity |
| `products` | Merchandise catalog with pricing, images, stock status |
| `fruits` | Seasonal fruit varieties with type enum, availability window, featured flag |
| `content` | CMS records keyed by page + section for editable copy |
| `settings` | Single-row ranch configuration (hours, season, contact, social) |
| `stripe_config` | Encrypted Stripe keys managed via admin UI |
| `admin_users` | Maps Supabase auth users to admin access |

---

## Local Development

**Prerequisites:** Node.js 18+, npm

```bash
# 1. Clone
git clone https://github.com/utopiancreations/moffatt-ranch.git
cd moffatt-ranch

# 2. Install
npm install

# 3. Environment
cp .env.example .env
# Fill in:
# VITE_SUPABASE_URL=
# VITE_SUPABASE_ANON_KEY=
# VITE_STRIPE_PUBLISHABLE_KEY=

# 4. Run
npm run dev
```

For Edge Functions, you'll need the Supabase CLI and `STRIPE_SECRET_KEY` set in your project's Edge Function secrets.

---

## Project Structure

```
src/
├── components/          # Shared UI components (Navbar, Hero, Footer, cards)
│   ├── admin/           # Admin-specific components (OrderDetails, StripeConfig, etc.)
│   └── ui/              # shadcn/ui primitives
├── data/                # Static data (fruit varieties, merchandise)
├── hooks/               # Custom hooks (useCart, use-mobile, use-toast)
├── integrations/        # Supabase client and generated types
├── lib/                 # Utilities (cn, formatCurrency)
├── pages/               # Route-level components
│   └── admin/           # Admin pages (Dashboard, OrderManager, FruitManager, etc.)
supabase/
└── functions/           # Edge Functions (create-checkout, verify-checkout, stripe-webhook, stripe-tracking)
```

---

## Notes

- This is a client project built and maintained by [Utopian Creations](https://utopiancreations.one)
- The admin panel is not publicly accessible; credentials are managed by the ranch operators
- Stripe is configured in test mode for development; live keys are managed via the admin Stripe Config panel
