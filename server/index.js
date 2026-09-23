import mongoose from 'mongoose';

export default async () => {
  const dbUrl = process.env.DB_URL;
  if (!dbUrl) {
    console.log('DB_URL is not set; skipping the unused MongoDB connection.');
    return;
  }

  await mongoose.connect(dbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
  await mongoose.set('maxTimeMS', 15000);
  console.log('Connected to MongoDB');
};
