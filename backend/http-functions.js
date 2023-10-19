/*************************
backend/http-functions.js
*************************

'backend/http-functions.js' is a reserved Velo file that lets you expose APIs that respond to fetch requests from external services.

In this file you create APIs to expose the functionality of your site as a service. That is, other people can use 
the functionality of your site by writing code that calls your site's APIs, as defined by the functions you create here.

Using the provided code (below this comment block) as an example, users of your HTTP functions can call your API using the following patterns: 

Production endpoints:

 • Premium site:
   https://mysite.com/_functions/multiply?leftOperand=3&rightOperand=4
 • Free sites:
   https://username.wixsite.com/mysite/_functions/multiply?leftOperand=3&rightOperand=4

Test endpoints:
 • Premium sites:
   https://mysite.com/_functions-dev/multiply?leftOperand=3&rightOperand=4
 • Free sites:
   https://username.wixsite.com/mysite/_functions-dev/multiply?leftOperand=3&rightOperand=4

---
About HTTP functions: 
https://support.wix.com/en/article/velo-exposing-a-site-api-with-http-functions

API Reference:
https://www.wix.com/velo/reference/wix-http-functions

**********************/

// The following is an example of an HTTP function, which gets the product of 2 operands. Adapt the code below for your specific use case.

import { ok, badRequest } from 'wix-http-functions';
import { post_payfastCallback } from 'backend/payfast'; // Import the actual PayFast function


//New add 2023/10/18

export function post_payfastForward(request) {
  // Forward the request to the actual PayFast code
  return post_payfastCallback(request);
}

//End

export function get_multiply(request) {

    const response = {
        "headers": {
            "Content-Type": "application/json"
        }
    };

    try {

        const leftOperand = parseInt(request.query["leftOperand"], 10);
        const rightOperand = parseInt(request.query["rightOperand"], 10);

        response.body = {
            "product": leftOperand * rightOperand
        };
        return ok({
            body: {
                "product": leftOperand * rightOperand
            },
            headers: { 'Access-Control-Allow-Origin': '*' }
        });

    } catch (err) {
        response.body = {
            "error": err
        };
        return badRequest({
            body: {
                "error": err
            },
            headers: { 'Access-Control-Allow-Origin': '*' }
        });
    }
}

