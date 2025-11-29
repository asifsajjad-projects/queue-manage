import express from 'express';
const router = express.Router();

router.get('/profile', (req, res) => {
  res.json({ dashboard: 'user', name: 'Guest', ticket: 123 });
});

router.post('/join', (req, res) => {
  const { queueId } = req.body;
  res.json({ ok: true, queueId });
});

export default router;
