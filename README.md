# SmartSchool

A responsive school management system demo for Bright Future Public School. All records and settings are stored in this browser using `localStorage`; payment recording, publishing, and notifications are simulations only.

## Run locally

1. Install Node.js 18 or newer.
2. In this folder, run `npm install`.
3. Start the development server with `npm run dev`.
4. Open the local URL printed by Vite.

Create a production build with `npm run build`.

Use **Reset demo data** in the profile menu to restore the fictional sample records.

## Deploy on Vercel

After pushing this project to a GitHub repository, import that repository from the Vercel dashboard. Vercel detects Vite automatically; use these settings if asked:

- **Framework preset:** Vite
- **Build command:** `npm run build`
- **Output directory:** `dist`
- **Install command:** `npm install`

The app is a frontend-only demo. School records are stored in each visitor's browser; there is no connected backend, live payment processing, or real notification service.
