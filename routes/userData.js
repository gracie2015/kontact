var mongoose = require('mongoose');

var conn2 = mongoose.createConnection('mongodb://localhost:27017/test');

var User = conn2.model('User', new mongoose.Schema({
  firstname: String,
  lastname: String,
  username: String,
  password: String
}));

module.exports = User;
