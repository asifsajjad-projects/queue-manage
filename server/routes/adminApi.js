import express from 'express';
const router = express.Router();

router.get('/stats', (req, res) => {
  res.json({ dashboard: 'admin', users: 42, queues: 3 });
});

router.post('/action', (req, res) => {
  const { action } = req.body;
  res.json({ ok: true, action });
});

export default router;
