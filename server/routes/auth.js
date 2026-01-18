import express from 'express';
import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import jwt from 'jsonwebtoken';
import cookieParser from 'cookie-parser';
import Role from '../models/Role.js';

const router = express.Router();

const SECRET = process.env.JWT_SECRET || 'dev_secret';

// Passport Google Strategy
passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: '/auth/google/callback'
}, async (accessToken, refreshToken, profile, done) => {
  try {
    const email = profile.emails[0].value;
    let roleDoc = await Role.findOne({ email });
    let role = 'user'; // default
    if (roleDoc) {
      role = roleDoc.role;
    } else {
      // Optionally, create a new role entry with default 'user'
      await Role.create({ email, role: 'user' });
    }
    const user = { email, role };
    return done(null, user);
  } catch (err) {
    return done(err);
  }
}));

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

// Middleware
router.use(cookieParser());
router.use(passport.initialize());
router.use(passport.session());

// Google OAuth routes
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/auth' }), (req, res) => {
  const token = jwt.sign({ sub: req.user.email, role: req.user.role }, SECRET, { expiresIn: '2h' });
  res.cookie('jwt', token, { httpOnly: true, secure: false }); // Set secure: true in production
  res.redirect('/'); // Redirect to home or dashboard
});

// Logout
router.post('/logout', (req, res) => {
  res.clearCookie('jwt');
  res.json({ message: 'Logged out' });
});

// Validate token (from cookie)
router.get('/me', (req, res) => {
  const token = req.cookies.jwt;
  if (!token) return res.status(401).json({ error: 'No token' });
  try {
    const payload = jwt.verify(token, SECRET);
    res.json({ user: payload });
  } catch (err) {
    res.status(401).json({ error: 'Invalid token' });
  }
});

export default router;
