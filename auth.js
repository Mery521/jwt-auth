const express = require('express')
const app = express();
app.use(express.static(__dirname + '/public'));

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const dotenv = require("dotenv");
dotenv.config();
const jsonwebtoken = require("jsonwebtoken");

app.post('/checkToken', function(req, res) {
    const token = req.headers['token'];
    if (!token) return res.status(401).send({ auth: false, message: 'No token provided.' });
    
    jsonwebtoken.verify(token, process.env.JWT_SECRET, function(err, decoded) {
        console.log(err)
      if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
      
      res.status(200).send(decoded);
    });
  });

app.listen(3000);