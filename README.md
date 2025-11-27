# Hiyadigital - React + Vite + Tailwind Starter

Files included:
- package.json
- vite.config.js
- tailwind.config.cjs
- postcss.config.cjs
- index.html
- src/main.jsx
- src/App.jsx
- src/index.css

## Setup (locally)
1. Install Node.js (v18+ recommended).
2. Run `npm install` to install dependencies.
3. Run `npm run dev` to start local dev server.
4. Build with `npm run build`.

## Deploy
Deploy to Vercel / Netlify by connecting this folder's repo. Select `npm run build` as build command and `dist` as output directory.


## Serverless form (Vercel) — SendGrid integration

This project includes a Vercel Serverless Function at `/api/submit` which sends onboarding submissions to your email using SendGrid.

### Required environment variables (set these in your Vercel Project -> Settings -> Environment Variables)
- `SENDGRID_API_KEY` — Your SendGrid API Key (create in SendGrid dashboard)
- `TO_EMAIL` — Destination email address where you want to receive submissions

### How it works
- The site POSTs onboarding form JSON to `/api/submit`.
- Vercel function calls SendGrid API to send formatted email.

### Testing locally
You can test the function locally with `vercel dev` or deploy to Vercel. To test via curl after deployment:

```bash
curl -X POST https://<your-deployment-url>/api/submit \
  -H "Content-Type: application/json" \
  -d '{"businessName":"Test","contactName":"Krutarth","phone":"99999","email":"test@example.com","website":"https://example.com","industry":"Wellness","goals":["Increase leads"],"package":"basic","message":"Hello"}'
```
