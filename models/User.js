const mongoose = require('mongoose');

// user schema setup
const userSchema = new mongoose.Schema({
  googleId: String
});

module.exports = mongoose.model('User', userSchema);
