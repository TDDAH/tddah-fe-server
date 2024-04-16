const express = require('express');
const bodyParser = require('body-parser'); // Import body-parser
const app = express();
const port = process.env.PORT || 8080;
const cors = require('cors');

app.use(cors());
app.use(bodyParser.json()); // Parse JSON bodies
app.use(bodyParser.urlencoded({ extended: true })); // Parse URL-encoded bodies
app.get('/', (req, res) => {
  res.send('OAuth Server Online...');
});


import('node-fetch').then(({ default: fetch }) => {
  app.get('/oauth/user/:token', (req, res) => {
    const accessToken = req.params.token;

    fetch('https://api.github.com/user', {
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to fetch user data');
      }
      return response.json();
    })
    .then(data => {
      console.log(data);
      res.send(data);
    })
    .catch(error => {
      console.error('Error:', error);
      res.status(500).send('Internal Server Error');
    });
  });

  app.post('/oauth/callback', (req, res) => {
    const requestBody = JSON.stringify(req.body);
    // console.log("req.body", requestBody);
    
    fetch('https://github.com/login/oauth/access_token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: requestBody 
    })
    .then(response => response.json())
    .then(data => {
      // console.log("data:", data);
      res.send(data);
    })
    .catch(error => {
      // console.error('Error:', error);
      res.status(500).send('Internal Server Error');
    });
  });
});

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
