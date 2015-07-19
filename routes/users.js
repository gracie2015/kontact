var express = require('express');
var router = express.Router();

var users = [
  {
    id: 0,
    firstname: 'Jack',
    lastname: 'Sparrow',
    gender: 'M',
    cell: '1234567',
    email: 'jack@gmail.com',
    coords: {
        latitude: 47.618819,
        longitude: -122.168126
      },
      location: 'Bellevue'
  },
  {
    id: 1,
    firstname: 'Don',
    lastname: 'Omar',
    gender: 'M',
    cell: '2346543',
    email: 'don@hotmail.com',
    coords:{
        latitude: 47.673406,
        longitude: -122.119031
      },
      location: 'Redmond'
  },
  {
    id: 2,
    firstname: 'Alice',
    lastname: 'Cooper',
    gender: 'F',
    cell: '0322244',
    email: 'alice@live.com',
    coords:{
        latitude: 47.616042, 
        longitude: -122.042813
      },
      location: 'Sammamish'
  },
  {
    id: 3,
    firstname: 'Jerry',
    lastname: 'Shawn',
    gender: 'F',
    cell: '0322244',
    email: 'jerry@live.com',
    coords:{
        latitude: 47.569770,  
        longitude: -122.223569
      },
      location: 'Mercer Island'
  },
];

var sort_users = function(users) {
  var i = 0;
  var j = 1;
  while(i < users.length - 1){
    while(j < users.length) {
      if (users[i].lastname <= users[j].lastname) {//according the first character only.
        j++;
      }
      else{
        var temp = users[i];
        users[i] = users[j];
        users[j] = temp;
        j++;
      }
    };
    i++;
    j = i + 1;
  };

  console.log("i: " + i);
  console.log("j: " + j);
  console.log("users length: " + users.length)
  for( t = 0; t < users.length; t++){
    console.log(t + ": "+ users[t].lastname );
  }
  
  return users;
};



/* GET users listing. */
router.get('/', function(req, res, next) {
  //sort_users(users);
  res.json(users);
});

var currentId = users.length;

router.post('/', function(req, res, next) {
  users.push({
    id: currentId,
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    gender: req.body.gender,
    cell: req.body.cell,
    email: req.body.email,
    coords:req.body.coords,
    location: req.body.location
  });
  currentId++;
  
 // sort_users(users);
  res.json({ result: 'done' });
});

router.delete('/:id', function(req, res, next) {
  //console.log(req.params.id);
  var idx = -1;
  for (var i = users.length - 1; i >= 0; i--) {
    console.log(users[i].id, req.params.id);
    if (users[i].id.toString() === req.params.id) {
      idx = i;
      break;
    }
  }
  users.splice(idx, 1);
  res.json({ result: 'done' });
});

module.exports = router;
