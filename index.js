const express = require('express')
const app = express();
const port = process.env.PORT || 8000;
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

app.get('/deletedata/{userId}', (req, res) => {
  res.send({
    "result": "success"
  });
});

app.get('/deletionstatus', (req, res) => {
  const responseId = Math.round(Math.random() * 3);

  switch (responseId) {
    case 0:
      res.send({
        "request_id": "234234sdfwer23f3f",
        "deleted_keys": [
          "firstName",
          "lastName"
        ],
        "undeleted_keys": [
          "email",
          "phone"
        ],
        "status": "full",
        "reason": "Name is displayed in some sections of the app"
      });
      break;

    case 1:
      res.send({
        "request_id": "234234sdfwer23f3f",
        "deleted_keys": [
          "firstName",
          "lastName"
        ],
        "undeleted_keys": [
          "email",
          "phone"
        ],
        "status": "full",
        "reason": "The data is critical to the system."
      });
      break;


    case 2:
      res.send({
        "request_id": "234234sdfwer23f3f",
        "deleted_keys": [
          "email",
        ],
        "undeleted_keys": [
          "firstName",
          "lastName",
          "phone"
        ],
        "status": "full",
        "reason": "Email is as a mapping in our tables"
      });
      break;


    default:
      res.send({
        "request_id": "234234sdfwer23f3f",
        "deleted_keys": [
          "firstName",
          "lastName",
          "email",
          "phone"
        ],
        "undeleted_keys": [
        ],
        "status": "full",
        "reason": "Data deletion completed"
      });
      break;
  }
});

app.post('/acknowledge', (req, res) => {
  //call the IDP endpoint from here

  res.send("Acknowlegement sent");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`)
});


