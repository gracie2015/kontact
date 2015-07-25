var express = require('express');
var router = express.Router();
var RegisterUser = require('./registerData');

router.post('/register', function(req, res, next) {
  
  var registerUser = new RegisterUser({
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    username: req.body.username,
    password: req.body.password    
  });
  
  registerUser.save(function(err) {
    if (err) throw err;
    console.log('User registered successfully!');
  });

  res.json({ result: 'done' });
});


router.post('/checklogin', function(req, res, next) {
  console.log("username: " + req.body.username + ". pwd: "+ req.body.password);
  RegisterUser.findOne({username: req.body.username}, function(err, result){
    if(err) {
      console.log('did not find the user, please register!');
      return;
    }
    if(result.password == req.body.password){
      console.log("User found, the password is: " + req.body.password);
     // $location.path('/list');// location not working...
    }
    else{
      console.log("User exists, but the password is nor correct!");
    }
    
  })

  res.json({ result: 'done' });
});



module.exports = router;
