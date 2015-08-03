var jwt = require('jwt-simple');
//var validateUser = require('../routes/auth').validateUser; not working as validateUser is asynchronous operation.
 var User = require('../routes/userData');
module.exports = function(req, res, next) {

  var token = (req.body && req.body.access_token) || (req.query && req.query.access_token) || req.headers['x-access-token'];
  var key = (req.body && req.body.x_key) || (req.query && req.query.x_key) || req.headers['x-key'];
  console.log("middleware entered!");
  console.log("token: " + token);
  console.log("key: " + key);
  if (token || key) {
    try {
      var decoded = jwt.decode(token, require('../config/secret.js')());
 
      if (decoded.exp <= Date.now()) {
        res.status(400);
        res.json({
          "status": 400,
          "message": "Token Expired"
        });
        return;
      }
      
      // Authorize the user to see if s/he can access our resources
      
      User.find({username: key}, function(err, result){
        if(err){
          console.log('did not find the user, please register!');
          return;
          }
        else{
          var dbUser = {
            name: result.firstname,
            username: result.username
            }
          if (dbUser) {
            console.log("Congratulations! Middleware authentication passed!!!");
            next();
            } else {
              
        // No user with this name exists, respond back with a 401
              res.status(401);
              res.json({
                "status": 401,
                "message": "Invalid User"
                });
                return;
                }
           }
      })  

    } catch (err) {
      res.status(500);
      res.json({
        "status": 500,
        "message": "Oops something went wrong",
        "error": err
      });
    }
  } else {
    res.status(401);
    res.json({
      "status": 401,
      "message": "Invalid Token or Key---"
    });
    return;
  }
};
