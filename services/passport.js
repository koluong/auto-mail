const passport = require('passport');
const GoogleStragety = require('passport-google-oauth20');
const mongoose = require('mongoose');
const config = require('../config');

const User = mongoose.model('User');

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then((user) => {
    done(null, user);
  });
});

// tell passport to use google-stragety
passport.use(new GoogleStragety(
  {
    clientID: config.googleClientId,
    clientSecret: config.googleClientSecret,
    callbackURL: '/auth/google/callback',
    proxy: true
  },
  async (accessToken, refreshToken, profile, done) => {
    const user = await User.findOne({ googleId: profile.id });
    if (user) {
      console.log('There is already an existing user');
      return done(null, user);
    }
    try {
      const user = await User.create({ googleId: profile.id });
      done(null, user);
    } catch (e) {
      console.log(e);
    }
  }
));
