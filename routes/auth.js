var jwt = require('jwt-simple');
var User = require('./userData');
var auth = {
 
  login: function(req, res) {
  console.log("login in auth.js entered!");
    var username = req.body.username || '';
    var password = req.body.password || '';
 
    if (username == '' || password == '') {
      res.status(401);
      res.json({
        "status": 401,
        "message": "Invalid credentials 111"
      });
      return;
    }
 
    // Fire a query to your DB and check if the credentials are valid
    
     User.findOne({"username": username,
               "password": password}, function(err, result){
                 if(err){
                   console.log('password not correct! please try again!');
                 }
                 else{
                   var dbUserObj = {
                      name: result.firstname,
                      username: result.username 
                   };
                   if (!dbUserObj) { // If authentication fails, we send a 401 back
                      console.log("dbUserObj not existed.");
                      res.status(401);
                      res.json({
                            "status": 401,
                             "message": "Invalid credentials 222"
                      });
                      return;
                    }
 
                 if (dbUserObj) {
 
      // If authentication is success, we will generate a token
      // and dispatch it to the client
 
                    res.json(genToken(dbUserObj));
                  }
                 } 
               })     
  },
 
  validateUser: function(username) {
    User.find({username: username}, function(err, result){
      if(err){
        console.log('did not find the user, please register!');
        return;
      }
      else{
        return{
          name: result.firstname,
          username: result.username
        }
      }
      })
  },
}
 
// private method
function genToken(user) {
  console.log("generating token.");
  var expires = expiresIn(7); // 7 days
  var token = jwt.encode({
    exp: expires
  }, require('../config/secret')());
 console.log("token: " + token);
 console.log("User firstname: "+ user.name + " -- username: " + user.username);
  return {
    token: token,
    expires: expires,
    user: user
  };
}
 
function expiresIn(numDays) {
  var dateObj = new Date();
  return dateObj.setDate(dateObj.getDate() + numDays);
}
 
module.exports = auth;