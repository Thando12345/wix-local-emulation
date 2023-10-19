const { created, serverError } = require('wix-http-functions');
const { fetch } = require('wix-fetch');
const crypto = require('crypto');

const merchantId = '10031244'; // Replace with your actual merchant ID
const merchantKey = 'ixjvjpninbdvy'; // Replace with your actual merchant key
const passphrase = '324188db116d6781e65db60dc7a58e00'; // Use your passphrase

export function post_payfastCallback(request) {
  const payFastEndpoint = 'https://sandbox.payfast.co.za/eng/process';
  const options = {
    "headers": {
      "Content-Type": "application/x-www-form-urlencoded"
    }
  };

  return request.body.text()
    .then((body) => {
      // Payment details
      const paymentDetails = {
        merchant_id: merchantId,
        merchant_key: merchantKey,
        return_url: 'https://www.encona.org/payment-success',
        cancel_url: 'https://www.encona.org/payment-cancelled',
        notify_url: 'https://www.encona.org/payment-failed',
        amount: '100.00', // Convert the amount to a string
        item_name: 'Test Item'
      };

      // Generate signature
      const dataString = Object.entries(paymentDetails).map(([key, value]) => `${key}=${encodeURIComponent(value)}`).join('&');
      const signature = crypto.createHash('md5').update(dataString + passphrase).digest('hex');

      // Add signature to payment details
      paymentDetails.signature = signature;

      const payFastRequest = {
        url: payFastEndpoint,
        method: 'POST',
        headers: options.headers,
        body: new URLSearchParams(paymentDetails).toString() // Convert URLSearchParams to string
      };

      return fetch(payFastRequest.url, payFastRequest)
        .then((response) => {
          if (response.status === 200) {
            const successOptions = {
              "headers": {
                "Content-Type": "application/json"
              },
              "body": JSON.stringify({
                "redirectUrl": 'https://www.encona.org/payment-success'
              })
            };

            // Add your payment success processing here

            return created(successOptions);
          } else {
            const failureOptions = {
              "headers": {
                "Content-Type": "application/json"
              },
              "body": JSON.stringify({
                "redirectUrl": 'https://www.encona.org/payment-failed'
              })
            };

            // Add your payment failure handling here

            return created(failureOptions);
          }
        })
        .catch((error) => {
          const errorOptions = {
            "headers": {
              "Content-Type": "application/json"
            },
            "body": JSON.stringify({
              "error": error.message
            })
          };

          // Add your error handling here

          return serverError(errorOptions);
        });
    })
    .catch((error) => {
      const requestErrorOptions = {
        "headers": {
          "Content-Type": "application/json"
        },
        "body": JSON.stringify({
          "error": error.message
        })
      };

      // Add your request error handling here

      return serverError(requestErrorOptions);
    });
}
