// const express = require('express');
// const bodyParser = require('body-parser');
// const app = express();
// const port = 3000;

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false }));

// // Define your routes and functions here

// app.listen(port, () => {
//   console.log(`Local server is running on port ${port}`);
// });




//New test
const express = require('express');
const bodyParser = require('body-parser');
const payfastCallback = require('./payfast'); // assuming payfast.js is in the same directory
const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.post('/_functions/payfastCallback', payfastCallback.post_payfastCallback);

app.listen(port, () => {
  console.log(`Local server is running on port ${port}`);
});
