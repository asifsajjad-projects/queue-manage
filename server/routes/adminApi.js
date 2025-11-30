import express from 'express';
import FieldConfig from '../models/FieldConfig.js';

const router = express.Router();

router.get('/stats', (req, res) => {
  res.json({ dashboard: 'admin', users: 42, queues: 3 });
});

router.post('/action', (req, res) => {
  const { action } = req.body;
  res.json({ ok: true, action });
});

// GET fields?org=...&dept=...
router.get('/fields', async (req, res) => {
  try {
    const org = req.query.org || 'default';
    const dept = req.query.dept || 'default';
    const doc = await FieldConfig.findOne({ org, dept }).lean();
    if (!doc) return res.json({ org, dept, fields: [] });
    return res.json(doc);
  } catch (err) {
    console.error('Failed to read fields', err);
    res.status(500).json({ error: 'Failed to read fields' });
  }
});

// POST fields (body: { org, dept, fields })
router.post('/fields', async (req, res) => {
  try {
    const { org = 'default', dept = 'default', fields = [] } = req.body || {};
    const doc = await FieldConfig.findOneAndUpdate(
      { org, dept },
      { $set: { fields } },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    ).lean();
    res.json(doc);
  } catch (err) {
    console.error('Failed to save fields', err);
    res.status(500).json({ error: 'Failed to save fields' });
  }
});

export default router;
