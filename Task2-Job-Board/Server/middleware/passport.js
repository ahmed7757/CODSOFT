import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import User from '../models/user.js';  // Assuming you have a User model

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,  // Set this in environment variables
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "/api/auth/google/callback",  // Redirect URI set in Google Cloud
    passReqToCallback: true
  },
  async (req, accessToken, refreshToken, profile, done) => {
    try {
      // Find the user based on Google ID
      let user = await User.findOne({ googleId: profile.id });
      
      if (!user) {
        // If user doesn't exist, create a new one
        user = new User({
          googleId: profile.id,
          name: profile.displayName,
          email: profile.emails[0].value,
          avatar: profile.photos[0].value
        });
        await user.save();
      }

      done(null, user);
    } catch (error) {
      done(error, null);
    }
  }
));

// Serialize and deserialize user to maintain session
passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser((id, done) => User.findById(id, done));

export default passport;
