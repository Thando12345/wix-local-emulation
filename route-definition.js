const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

// Import your backend functions
const { post_payfastCallback } = require('./backend/payfast');
const { post_payfastForward, get_multiply } = require('./backend/http-functions');

app.post('/_functions/payfastCallback', (req, res) => {
  const request = {
    body: req.body
  };

  post_payfastCallback(request)
    .then(response => {
      res.status(response.statusCode).json(response.body);
    })
    .catch(error => {
      res.status(error.statusCode).json(error.body);
    });
});

app.post('/_functions/payfastForward', (req, res) => {
  const request = {
    body: req.body
  };

  post_payfastForward(request)
    .then(response => {
      res.status(response.statusCode).json(response.body);
    })
    .catch(error => {
      res.status(error.statusCode).json(error.body);
    });
});

app.get('/_functions/multiply', (req, res) => {
  const request = {
    query: req.query
  };

  get_multiply(request)
    .then(response => {
      res.status(response.statusCode).json(response.body);
    })
    .catch(error => {
      res.status(error.statusCode).json(error.body);
    });
});

app.listen(port, () => {
  console.log(`Local server is running on port ${port}`);
});
