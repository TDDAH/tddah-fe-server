const express = require('express');
const app = express();
app.port('port', process.env.PORT || 8080)

app.get('/', (req, res) => {
  res.send('OAuth Server Online...')
})

const fetch = require('node-fetch')

app.get('/oauth/github/user', (req, res) => {
  const accessToken = 'OAUTH-TOKEN'; // Replace 'OAUTH-TOKEN' with the actual OAuth token

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

  fetch('https://github.com/login/oauth/access_token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Accept': 'application/json'
    },
    body: req.body
  })
  .then(response => response.json())
  .then(data => {
    console.log(data);
    res.send(data); 
  })
  .catch(error => {
    console.error('Error:', error);
    res.status(500).send('Internal Server Error');
  });
});

app.listen(app.get('port'), () => {
  console.log('Server is running on port', app.get('port'))
})