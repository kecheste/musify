import dotenv from "dotenv";
import { connect } from "../db/client";
import { seedSongs } from "./songSeeder";
import mongoose from "mongoose";

// Load environment variables
dotenv.config();

async function runSeeder() {
  try {
    console.log("🚀 Starting Musify Database Seeder...\n");

    // Connect to database
    const MONGO_URI = process.env.MONGO_URL;
    console.log(`🔌 Connecting to MongoDB: ${MONGO_URI}`);
    await connect(MONGO_URI!);

    // Run seeders
    await seedSongs();

    console.log("\n🎉 Database seeding completed successfully!");
    console.log("🎵 Your Musify app is now ready with sample data.");
  } catch (error) {
    console.error("\n💥 Seeding failed:", error);
    process.exit(1);
  } finally {
    // Close database connection
    console.log("\n🔌 Closing database connection...");
    await mongoose.connection.close();
    console.log("✅ Connection closed. Seeding process complete!");
    process.exit(0);
  }
}

// Handle unhandled promise rejections
process.on("unhandledRejection", (err) => {
  console.error("Unhandled Promise Rejection:", err);
  process.exit(1);
});

// Run the seeder
if (require.main === module) {
  runSeeder();
}

export { runSeeder, seedSongs };
