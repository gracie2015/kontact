var express = require('express');
var router = express.Router();
var User = require('./userData');
var auth = require('./auth.js');

/**
 * register request
 */

router.post('/', function(req, res, next) {
  
  var newUser = new User({
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    username: req.body.username,
    password: req.body.password    
  });
  
  newUser.save(function(err) {
    if (err) throw err;
    console.log('User registered successfully!');
  });

  res.json({ result: 'done' });
});

/** 
 * login request*/
router.post('/checklogin', auth.login);



module.exports = router;
