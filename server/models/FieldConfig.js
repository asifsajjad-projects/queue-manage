import mongoose from 'mongoose';

const FieldSchema = new mongoose.Schema({
  org: { type: String, required: true, index: true },
  dept: { type: String, required: true, index: true },
  fields: [{ name: String, type: String }]
}, { timestamps: true });

FieldSchema.index({ org: 1, dept: 1 }, { unique: true });

const FieldConfig = mongoose.models.FieldConfig || mongoose.model('FieldConfig', FieldSchema);
export default FieldConfig;
