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

var User = mongoose.model('User', userSchema);
module.exports = User;
