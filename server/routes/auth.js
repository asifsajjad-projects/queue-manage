import express from 'express';
import jwt from 'jsonwebtoken';

const router = express.Router();

const SECRET = process.env.JWT_SECRET || 'dev_secret';

function decideScope(username) {
  const s = username.toLowerCase();
  if (s.includes('admin')) return ['admin'];
  if (s.includes('manager')) return ['manager'];
  if (s.includes('super')) return ['super-user'];
  return ['user'];
}

// simple login: accepts { username, password }
router.post('/login', (req, res) => {
  const { username } = req.body || {};
  if (!username) return res.status(400).json({ error: 'username required' });

  const scopes = decideScope(username);
  const token = jwt.sign({ sub: username, scope: scopes }, SECRET, { expiresIn: '2h' });
  res.json({ token, scopes });
});

// simple signup (behaves same as login for demo)
router.post('/signup', (req, res) => {
  const { username } = req.body || {};
  if (!username) return res.status(400).json({ error: 'username required' });
  const scopes = ['user'];
  const token = jwt.sign({ sub: username, scope: scopes }, SECRET, { expiresIn: '2h' });
  res.json({ token, scopes });
});

// validate token
router.get('/me', (req, res) => {
  const auth = req.headers.authorization || '';
  const m = auth.match(/^Bearer\s+(.+)$/i);
  if (!m) return res.status(401).json({ error: 'missing token' });
  try {
    const payload = jwt.verify(m[1], SECRET);
    res.json({ user: payload });
  } catch (err) {
    res.status(401).json({ error: 'invalid token' });
  }
});

export default router;
