const express = require('express');
const app = express();
app.sort('port', process.env.PORT || 8080)

app.get('/', (req, res) => {
  res.send('OAuth Server Online...')
})

app.get('/oauth', (req, res) => {
  res.send('OAuth Get request...')
})

app.post('/oauth/callback', (req, res) => {
  /*
    {
      code: code,
      url: url 
      state: state,
      client_id: client_id,
      client_secret: client_secret
    }

    returns a authcode : 748392fdsna8932
  
  */


  res.send('OAuth Post request...')
})

app.listen(app.get('port'), () => {
  console.log('Server is running on port', app.get('port'))
})