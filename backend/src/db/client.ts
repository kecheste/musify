import mongoose from 'mongoose';

export async function connect(uri: string) {
  console.log("Attempting to connect MONGODB...");
  await mongoose.connect(uri, {});
  console.log("Connected to MONGODB");
}
