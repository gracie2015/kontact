var mongoose = require('mongoose');
var conn1 = mongoose.createConnection('mongodb://localhost:27017/test');



var Contact = conn1.model('Contact', new mongoose.Schema({
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


module.exports = Contact;
