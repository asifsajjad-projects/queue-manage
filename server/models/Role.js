import mongoose from 'mongoose';

const roleSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  role: { type: String, required: true, enum: ['user', 'admin', 'manager', 'super-user'] },
});

const Role = mongoose.model('Role', roleSchema);

export default Role;