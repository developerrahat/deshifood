# Deshi Food — Organic Shop UI

Static HTML/CSS/JS demo of the Deshi Food online store (খাঁটি পণ্য, সুস্থ জীবনের জন্য।).

## Pages

| Page | File |
| --- | --- |
| Home | `index.html` |
| Shop (filters) | `shop.html` |
| Product details | `product.html` (`?id=honey`, `?id=ghee`, …) |
| Checkout | `checkout.html` |
| Thank you | `thank-you.html` |
| Login / Register | `login.html` |
| My account | `account.html` |

## Run locally

Open `index.html` in a browser — no build step needed.

## Structure

- `assets/css/style.css` — design tokens, home page and shared components
- `assets/css/pages.css` — inner pages
- `assets/js/layout.js` — shared header, footer, mobile bottom nav and drawers
- `assets/js/main.js` — product data, quick view, cart, filters and page behaviour
- `assets/img/` — logo and brand images

This is a client demo: products, prices, orders and customer details are sample data, and there is no backend.
