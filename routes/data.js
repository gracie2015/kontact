var mongoose = require('mongoose');
var conn1 = mongoose.createConnection('mongodb://localhost:27017/test');
//var conn2 = mongoose.createConnection('mongodb://localhost:27017/test');


var User = conn1.model('User', new mongoose.Schema({
  id: Number,
  firstname: String,
  lastname: String,
  gender: String,
  cell: Number,
  email: String,
  coords:{
    latitude: Number,
    longitude: Number
  },
  location: String
}));
/*
var RegisterUser = conn2.model('RegisterUser', new mongoose.Schema({
  firstname: String,
  lastname: String,
  username: String,
  password: String
}));
*/

module.exports = User;
//module.exports = RegisterUser;

/*
var User = conn1.model('User', new mongoose.Schema({
  id: {type: Number, default:'model in test1 database'},
  firstname: {type: String, default:'model in test1 database'},
  lastname: {type: String, default:'model in test1 database'},
  gender: {type: String, default:'model in test1 database'},
  cell: {type: Number, default:'model in test1 database'},
  email: {type: String, default:'model in test1 database'},
  coords:{type:{
    latitude: Number,
    longitude: Number
  }, default:'model in test1 database'},
  location: {type: String, default:'model in test1 database'}
}));

var RegisterUser = conn2.model('RegisterUser', new mongoose.Schema({
  firstname: {type: String, default:'model in test2 database'},
  lastname: {type: String, default:'model in test2 database'},
  username: {type: String, default:'model in test2 database'},
  password: {type: String, default:'model in test2 database'}
}));
*/


/* 
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/test');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error'));

//db.once('open', function (callback) {
//});

var Schema = mongoose.Schema;

var userSchema = new Schema({
  id: Number,
  firstname: String,
  lastname: String,
  gender: String,
  cell: Number,
  email: String,
  coords:{
    latitude: Number,
    longitude: Number
  },
  location: String,
  created_at: Date,
  updated_at: Date 
});

var registerUserSchema = new Schema({
  firstname: String,
  lastname: String,
  username: String,
  password: String
}) 


var User = mongoose.model('User', userSchema);

var RegisterUser = mongoose.model('RegisterUser', registerUserSchema);

module.exports = User;
module.exports = RegisterUser;

*/