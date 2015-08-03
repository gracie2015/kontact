var express = require('express');
var router = express.Router();
var Contact = require('./contactData');

var contacts = [];

/* GET contacts listing. */
router.get('/', function(req, res, next) {
  Contact.find({}, function(err, contacts){
    if(err) throw err;
    
    res.json(contacts);
  });
});


// create new contact
var currentId = 0;

router.post('/', function(req, res, next) {
  
  var newContact = new Contact({
    id: currentId,
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    gender: req.body.gender,
    cell: req.body.cell,
    email: req.body.email,
    coords:req.body.coords,
    location: req.body.location    
  });
  
  newContact.save(function(err) {
    if (err) throw err;
    console.log('contact saved successfully!');
  });
  
  currentId++;
  
 
  res.json({ result: 'done' });
});

//Modify Selected contact
//worked.
router.post('/:id', function(req, res, next) {
  console.log("Update Contact ID: " + req.params.id);
  console.log("req.body.location: "+ req.body.location);
  Contact.update({id: req.params.id},
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
      console.log("ContactInfo updated Successfully!");
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
  Contact.remove({id: req.params.id}, function(err,contact){
    if(err) throw err;
    console.log('Contact Removed!');
  });
  res.json({ result: 'done' });
});



module.exports = router;
