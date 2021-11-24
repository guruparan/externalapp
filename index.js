const express = require('express');
const axios = require('axios');
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
        "status": 20,
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
        "status": 50,
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
        "status": 80,
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
        "status":100,
        "reason": "Data deletion completed"
      });
      break;
  }
});

app.post('/acknowledge', (req, res) => {
  //call the IDP endpoint from here
  console.log(req.body.appId);
  axios
  .post('http://igocrm.somee.com/api/account/UpdateAppStatus', req.body.appId,{
    headers: {
        "Accept": "application/json",
        "Content-type": "application/json",
       
    }
})
  .then(res => {
    console.log("done");
  })
  .catch(error => {
    console.error(error)
  })

  res.send("Acknowlegement sent");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`)
});


