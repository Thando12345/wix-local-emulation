// import { fetch } from 'wix-fetch';
// import crypto from 'crypto';

// // Store your credentials securely
// const merchantId = '10031244';
// const merchantKey = 'ixjvjpninbdvy';
// const passphrase = 'thandonogemane12';

// export async function initiatePayment() {
//   // Payment details
//   const paymentDetails = {
//     merchant_id: merchantId,
//     merchant_key: merchantKey,
//     return_url: 'https://www.encona.org/payment-success',
//     cancel_url: 'https://www.encona.org/payment-cancelled',
//     notify_url: 'https://www.encona.org/payment-failed',
//     amount: '100.00', // Convert the amount to a string
//     item_name: 'Test Item'
//   };

//   // Generate signature
//   const dataString = Object.entries(paymentDetails).map(([key, value]) => `${key}=${encodeURIComponent(value)}`).join('&');
//   const signature = crypto.createHash('md5').update(dataString + passphrase).digest('hex');

//   // Add signature to payment details
//   paymentDetails.signature = signature;

//  // Send request to PayFast
// const response = await fetch('https://sandbox.payfast.co.za/eng/process', { 
//   method: 'POST', 
//   headers: { 
//     'Content-Type': 'application/x-www-form-urlencoded' 
//   }, 
//   body: new URLSearchParams(paymentDetails).toString() // Convert URLSearchParams to string
// });


//   // Handle response...
//   if (response.ok) {
//     console.log('Payment initiated successfully');
//   } else {
//     console.log('Failed to initiate payment');
//   }
// }
