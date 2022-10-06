import mongoose from 'mongoose';

let dbUrl = 'mongodb+srv://admin:HrTCeStOe2WpH9H6@cluster0.gsjlhku.mongodb.net/Cluster0?retryWrites=true&w=majority';

export default async () => {
  await mongoose.connect(dbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
  await mongoose.set('maxTimeMS', 15000);
  console.log("Connected to MongoDB");
};