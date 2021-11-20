const express = require('express')
const app = express();
const port = env.PORT ||  8000;
var session = require('express-session');
var jwt_decode = require("jwt-decode");
app.use(express.json())

app.use(session({ secret: 'keyboard cat', cookie: { maxAge: 60000 } }));


app.use('/', express.static('static'))

app.get('/token', (req, res) => {
  res.send(req.session.auth);
});

app.get('/callback', (req, res) => {

  //var token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c";
  var decoded = jwt_decode(req.query.key);

  console.log(JSON.stringify(decoded));
  req.session.auth = decoded;
  res.redirect('/')
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`)
});

