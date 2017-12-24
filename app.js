const express = require('express');
const jwt = require('jsonwebtoken');

const app = express();
const secretkey = "%^@$.&=M3mpS4G$Q(`p@G:os.oLbKs$1gi8JGsP/uV'uB`OsIQg[FItQ=%M1nC)";

app.get('/api', (req, res) => {
    res.json({
        message: 'Welcome to the API'
    });
    res.sendStatus(200);
});

app.post('/api/posts', verivyToken, (req, res) => {
    jwt.verify(req.token, secretkey, (err, authData) => {
        if (err) {
            res.sendStatus(403);
        } else {
            res.json({
                message: 'Post created...',
                authData
            });
        }
    });
    res.sendStatus(200);
});

app.post('/api/login', (req, res) => {
  // Mock user
  const user = {
    id: 1, 
    username: 'hafizh',
    email: 'hafizh@gmail.com'
  }

  jwt.sign({user}, secretkey, { expiresIn: '30s' }, (err, token) => {
    res.json({
      token
    });
    res.sendStatus(200);
  });
});

// FORMAT OF TOKEN
// Authorization: Bearer <access_toke>

// Verivy Token
function verivyToken (req, res, next) {
    // Get auth header value
    const bearerHeader = req.headers['authorization'];
    // Check if bearer is undefined
    if(typeof bearerHeader !== 'undefined') {
        // Split at the space
        const bearer = bearerHeader.split(' ');
        // Get token from array
        const bearerToken = bearer[1];
        // Set the token
        req.token = bearerToken;
        // Next middleware
        next();
    } else {
        // Forbiden
        res.sendStatus(403);
    }

}

app.listen(5000, () => console.log('Server started on port 5000'));