# eclassiqnum — Complete Deployment Guide
# From Zero to Live in 6 Steps

---

## WHAT YOU ARE DEPLOYING

eclassiqnum is a full-stack virtual number platform with:
- React frontend (Vite)
- Vercel Serverless API backend
- PostgreSQL database (Supabase)
- Hero SMS real number integration
- Paystack payment gateway
- NowPayments crypto gateway
- Affiliate system
- Admin dashboard

---

## STEP 1 — SET UP YOUR DATABASE (Supabase)

### 1.1 Create Supabase Account
1. Go to **https://supabase.com**
2. Click **Start your project**
3. Sign up with GitHub or Google
4. Click **New Project**
5. Fill in:
   - **Organization:** Personal (or your org name)
   - **Project Name:** eclassiqnum
   - **Database Password:** Create a strong password (SAVE THIS — you need it later)
   - **Region:** Choose closest to Nigeria → `West EU (Ireland)` or `US East`
6. Click **Create new project**
7. Wait 2 minutes for it to set up

### 1.2 Run the Database Schema
1. In your Supabase dashboard, click **SQL Editor** in the left sidebar
2. Click **New Query** (the + button)
3. Open the file `schema.sql` from your project
4. Copy ALL the SQL inside it
5. Paste it into the Supabase SQL Editor
6. Click the green **Run** button
7. You should see: **"Success. No rows returned"**
8. Click **Table Editor** in the sidebar — you should see all your tables listed (users, transactions, virtual_numbers, etc.)

### 1.3 Get Your Database URL
1. In Supabase, click **Project Settings** (gear icon at bottom left)
2. Click **Database** in the settings menu
3. Scroll down to **Connection string**
4. Click **URI** tab
5. Copy the connection string — it looks like:
   `postgresql://postgres:[YOUR-PASSWORD]@db.drtmvqdyzjzeigcgruyo.supabase.co:5432/postgres`
6. Replace `[YOUR-PASSWORD]` with the database password you created in Step 1.1
7. **SAVE THIS** — this is your `DATABASE_URL`

---

## STEP 2 — GET YOUR HERO SMS API KEY

1. Go to **https://hero-sms.com**
2. Click **Sign Up** or **Log In**
3. After logging in, click your **Profile** or **Account** in the top right
4. Look for **API** or **API Key** section
5. Copy your API key
6. **SAVE THIS** — this is your `HERO_SMS_API_KEY`

> **Fund your Hero SMS account:** Add credit to your Hero SMS balance so it can purchase real numbers for your users. Start with $10-20 worth of credit.

---

## STEP 3 — SET UP PAYSTACK

### 3.1 Create Paystack Account
1. Go to **https://paystack.com**
2. Click **Create a free account**
3. Fill in your details — use your Nigerian business information
4. Verify your email
5. Complete your business profile (required for live payments)

### 3.2 Get API Keys
1. In your Paystack dashboard, click **Settings** in the left sidebar
2. Click **API Keys & Webhooks**
3. You will see two keys:
   - **Public Key** — starts with `pk_live_...` (or `pk_test_...` for testing)
   - **Secret Key** — starts with `sk_live_...` (or `sk_test_...` for testing)
4. Copy both keys
5. **SAVE THESE:**
   - `PAYSTACK_SECRET_KEY` = the Secret Key
   - `VITE_PAYSTACK_PUBLIC_KEY` = the Public Key

### 3.3 Set Up Webhook (for automatic wallet funding)
1. Still in **Settings → API Keys & Webhooks**
2. Scroll to **Webhook URL** section
3. Enter: `https://YOUR-VERCEL-URL.vercel.app/api/webhooks/paystack`
   (Replace with your actual Vercel URL — you get this in Step 5)
4. Click **Update**
5. Paystack will now automatically notify eclassiqnum when payments are made

---

## STEP 4 — SET UP NOWPAYMENTS (Crypto)

1. Go to **https://nowpayments.io**
2. Click **Sign Up**
3. Verify your email
4. After login, click **Store Settings** in the sidebar
5. Click **API Keys**
6. Click **Generate API Key**
7. Copy the API key
8. **SAVE THIS** — this is your `NOWPAYMENTS_API_KEY`

> For the IPN (webhook) secret, go to **Store Settings → IPN Settings** and set your callback URL to: `https://YOUR-VERCEL-URL.vercel.app/api/webhooks/nowpayments`

---

## STEP 5 — PUSH TO GITHUB AND DEPLOY TO VERCEL

### 5.1 Push Your Code to GitHub
You have two options:

**Option A — From Google AI Studio:**
1. Open your project in Google AI Studio
2. Click the **GitHub** tab in the top right panel
3. Click **Sync** or **Push**
4. This pushes all your code to GitHub automatically

**Option B — From your computer:**
1. Extract the zip file you downloaded
2. Open Command Prompt (Windows) in the project folder
3. Run these commands one by one:
```
git init
git add .
git commit -m "eclassiqnum production ready"
git remote add origin https://github.com/YOUR-USERNAME/eclassiqnum.git
git push -u origin main
```

### 5.2 Deploy on Vercel
1. Go to **https://vercel.com**
2. Click **Add New Project**
3. Click **Import Git Repository**
4. Find and click your **eclassiqnum** repository
5. Leave all settings as default — Vercel will auto-detect it's a Vite project
6. Click **Environment Variables** to expand it
7. Add each variable one by one (click **+ Add More** for each):

| Variable Name | Value |
|---|---|
| `DATABASE_URL` | `postgresql://postgres:YOUR-PASSWORD@db.YOUR-REF.supabase.co:5432/postgres` |
| `JWT_SECRET` | Any random 32-character string |
| `HERO_SMS_API_KEY` | Your Hero SMS API key |
| `PAYSTACK_SECRET_KEY` | `sk_live_...` |
| `VITE_PAYSTACK_PUBLIC_KEY` | `pk_live_...` |
| `NOWPAYMENTS_API_KEY` | Your NowPayments key |
| `APP_URL` | Leave blank for now (fill after deploy) |

8. Click **Deploy**
9. Wait 2-3 minutes for the build to finish
10. Vercel will give you a URL like: `https://eclassiqnum-xxxx.vercel.app`
11. Copy this URL and go back to Vercel → Settings → Environment Variables
12. Add `APP_URL` = `https://eclassiqnum-xxxx.vercel.app` and click **Save**
13. Go to **Deployments** → click the three dots on your latest deployment → click **Redeploy**

### 5.3 Update Paystack Webhook
1. Go back to Paystack → Settings → API Keys & Webhooks
2. Update the Webhook URL to: `https://eclassiqnum-xxxx.vercel.app/api/webhooks/paystack`
3. Click **Update**

---

## STEP 6 — TEST EVERYTHING

### 6.1 Test Registration and Login
1. Open your live site
2. Click **Register**
3. Create a test account with your email
4. You should see the personalized greeting: "Good morning, [Your Name]! 👋"
5. Your wallet should show ₦0.00 | $0.00

### 6.2 Test Admin Login
1. Log out of your test account
2. Log in with:
   - Email: `admin@eclassiqnum.com`
   - Password: `admin123`
3. You should see the **Admin** tab in the navigation
4. Click Admin → you should see the dashboard with metrics

> **Important:** Change the admin password immediately after first login. In the Admin dashboard go to Settings and update the admin account credentials.

### 6.3 Test Wallet Funding
1. Log in with your test user account
2. Click **Wallet**
3. Select **Bank Transfer**
4. Enter amount: 1000
5. Click **Fund Wallet**
6. In demo/sandbox mode, funds credit instantly
7. Your balance should update to ₦1,000

### 6.4 Test Buying a Number
1. Click **Virtual Numbers**
2. Select a country (e.g., Nigeria)
3. Select a service (e.g., WhatsApp)
4. Click Purchase
5. Go to **OTP Inbox**
6. You should see the number appear with status "Waiting for SMS"
7. Within 10-15 seconds (demo mode) an SMS should arrive with a code
8. The code appears with a "Copy" button

### 6.5 Test Cancel & Refund
1. Buy another number
2. Before SMS arrives, click **Cancel Order**
3. Your wallet should immediately refund the amount
4. Transaction history should show the refund

### 6.6 Test Affiliate System
1. Go to **Affiliate** tab
2. Copy your referral link
3. Log out
4. Register a new account using that referral link
5. Log into the new account and fund the wallet
6. Log back into the original account → Affiliate → you should see commission earned

---

## STEP 7 — GO LIVE CHECKLIST

Before announcing to users, verify:

- [ ] Admin password changed from default `admin123`
- [ ] Hero SMS account funded with credit
- [ ] Paystack account verified and approved for live transactions
- [ ] Live Paystack keys used (not test keys)
- [ ] Webhook URLs updated with live Vercel URL
- [ ] Database URL uses production Supabase (not local)
- [ ] `APP_URL` environment variable set to your live URL
- [ ] Test a real Paystack payment with a real card for ₦100
- [ ] Test a real Hero SMS number purchase for WhatsApp or Telegram
- [ ] Admin → Settings → Enter your real Hero SMS API key and click Save

---

## ADMIN CONTROLS REFERENCE

### How to add your Hero SMS API Key in Admin:
1. Log in as admin
2. Click **Admin** tab
3. Scroll to **System Configs** section
4. Find **Hero SMS Integration Key** field
5. Paste your Hero SMS API key
6. Click **Save Settings**

### How to adjust prices:
1. Admin → System Configs
2. Change **Global Markup %** (currently 35%)
3. Higher = more profit per number sold
4. Click **Save Settings**

### How to approve affiliate withdrawals:
1. Admin → scroll to **Pending Affiliate Withdrawal** section
2. Click **Pay Out** to approve and pay
3. Click **Reject** to reject (funds return to affiliate)

### How to manually credit a user wallet:
1. Admin → **Adjust User Balance** section
2. Select the user from dropdown
3. Enter amount and choose NGN or USD
4. Select **Manual Credit (+)**
5. Click **Execute Override Adjustment**

---

## TROUBLESHOOTING

**Site shows blank page:**
- Check Vercel build logs for errors
- Make sure `vite.config.ts` has no errors
- Check that all environment variables are set

**Cannot connect to database:**
- Verify `DATABASE_URL` is correct
- Make sure the password in the URL is URL-encoded (replace `@` with `%40` if it appears in the password)
- Check Supabase project is not paused (free tier pauses after 1 week of inactivity)

**Hero SMS numbers not working:**
- Check your Hero SMS balance — add more credit
- Verify API key is entered correctly in Admin Settings
- Some services require specific countries — try different country/service combinations

**Paystack payments not crediting:**
- Verify webhook URL is correct and matches your live Vercel URL
- Check Paystack dashboard → Activity for webhook delivery logs
- Make sure you are using Live keys, not Test keys

**Users can't register:**
- Check `DATABASE_URL` is correct
- Run the `schema.sql` again in Supabase SQL Editor

---

## SUPPORT

- WhatsApp: +234 8169208316
- Email: eclassiqnum@gmail.com

---

*eclassiqnum — Built for Africans. Powered by real virtual numbers.*
