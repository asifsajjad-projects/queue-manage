import mongoose from 'mongoose';

export async function connectDb(uri) {
  const mongoUri = uri || process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/queue_manage';
  try {
    await mongoose.connect(mongoUri, { dbName: process.env.MONGODB_DB || undefined });
    console.log('Connected to MongoDB:', mongoUri);
  } catch (err) {
    console.error('MongoDB connection error', err);
    throw err;
  }
}

export default mongoose;
