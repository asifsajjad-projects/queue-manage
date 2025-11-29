import jwt from 'jsonwebtoken';

const SECRET = process.env.JWT_SECRET || 'dev_secret';

export default function verifyToken(requiredScopes = []) {
  return (req, res, next) => {
    const auth = req.headers.authorization || '';
    const m = auth.match(/^Bearer\s+(.+)$/i);
    if (!m) return res.status(401).json({ error: 'missing token' });
    try {
      const payload = jwt.verify(m[1], SECRET);
      req.user = payload;
      if (requiredScopes.length > 0) {
        const has = requiredScopes.some(s => (payload.scope || []).includes(s));
        if (!has) return res.status(403).json({ error: 'insufficient scope' });
      }
      next();
    } catch (err) {
      res.status(401).json({ error: 'invalid token' });
    }
  };
}
