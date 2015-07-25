var express = require('express');
var router = express.Router();
var User = require('./data');

var users = [];

/* GET users listing. */
router.get('/', function(req, res, next) {
  User.find({}, function(err, users){
    if(err) throw err;
    
    res.json(users);
  });
});

/*GET Selected User Information : not working...

router.get('/:id', function(req, res, next) {
  //sort_users(users);
  User.find({id : req.params.id}, function(err, users){
    if(err) throw err;
    console.log("User Info is : " + users.firstname);
    res.json(users);
  });
});
*/

var currentId = 0;

router.post('/', function(req, res, next) {
  
  var newUser = new User({
    id: currentId,
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    gender: req.body.gender,
    cell: req.body.cell,
    email: req.body.email,
    coords:req.body.coords,
    location: req.body.location    
  });
  
  newUser.save(function(err) {
    if (err) throw err;
    console.log('User saved successfully!');
  });
  
  currentId++;
  
 
  res.json({ result: 'done' });
});

//Modify Selected User
//worked.
router.post('/:id', function(req, res, next) {
  console.log("Update User ID: " + req.params.id);
  console.log("req.body.location: "+ req.body.location);
  User.update({id: req.params.id},
    {$set:{
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    gender: req.body.gender,
    cell: req.body.cell,
    email: req.body.email,
    coords:req.body.coords,
    location: req.body.location     
    }},
    {upsert: true},
    function(err) {
      if(err) throw err;
      console.log("UserInfo updated Successfully!");
    }
    
  );
  /* //not working, wiered results...
  
   var UserInfo = new User({
    id: req.params.id,
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    gender: req.body.gender,
    cell: req.body.cell,
    email: req.body.email,
    coords:req.body.coords,
    location: req.body.location    
  });
  var upsertData = UserInfo.toObject();
  delete upsertData._id;
  User.update(req.params.id,upsertData,{upsert: true}, function(err){
    if(err) throw err;
    console.log("User Updated!");
  });
*/
  res.json({ result: 'done' });
});

router.delete('/:id', function(req, res, next) {
  console.log(req.params.id);
  User.remove({id: req.params.id}, function(err,user){
    if(err) throw err;
    console.log('User Removed!');
  });
  res.json({ result: 'done' });
});



module.exports = router;
