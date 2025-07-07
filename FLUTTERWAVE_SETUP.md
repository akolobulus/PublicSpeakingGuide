# Flutterwave Integration Setup Guide

## Important: Replace Test Keys with Your Live Keys

Your book website is now integrated with Flutterwave for payments. To receive payments in your Flutterwave account, you need to replace the test public key with your actual live public key.

## Steps to Complete the Integration:

### 1. Get Your Flutterwave Keys
- Log into your Flutterwave Dashboard
- Go to Settings > API Keys
- Copy your **Live Public Key** (starts with `FLWPUBK_LIVE-`)

### 2. Replace the Test Key
In the file `buy.html`, find this line (around line 398 and 418):
```javascript
public_key: "FLWPUBK_TEST-SANDBOXDEMOKEY-X"
```

Replace it with your actual live public key:
```javascript
public_key: "FLWPUBK_LIVE-your-actual-key-here"
```

### 3. Test the Integration
- Click "Buy Digital Edition" or "Buy Print Edition" on your buy page
- Fill in the customer information form
- Complete a test transaction
- Verify the payment appears in your Flutterwave dashboard

## Features Included:

✅ **Customer Information Collection**
- Full name, email, phone, and country
- Validation for all required fields

✅ **Payment Processing**
- Digital Edition: ₦5,000
- Print Edition: ₦8,000
- Multiple payment options (Card, Mobile Money, USSD)

✅ **Payment Verification**
- Unique transaction references
- Customer metadata stored with each transaction
- Success/failure handling

✅ **User Experience**
- Loading states during payment
- Success notifications
- Payment cancellation handling

## Security Notes:
- Never commit your live keys to version control
- The public key is safe to use in frontend code
- Always verify payments on your server in production
- Store sensitive customer data securely

## Next Steps for Production:
1. Set up webhook endpoints to receive payment notifications
2. Implement server-side payment verification
3. Automate digital book delivery via email
4. Set up shipping integration for print books
5. Create customer account system for purchase history

Your payments will now drop directly into your Flutterwave account once you replace the test key with your live key!