import mongoose from "mongoose";

// Extend globalThis to include mongoose cache
declare global {
  var mongoose: { conn: mongoose.Connection | null; promise: Promise<typeof mongoose> | null };
}

// Ensure global cache is preserved across hot reloads in development
let cached = global.mongoose || (global.mongoose = { conn: null, promise: null });

if (!process.env.MONGO_URI) {
  throw new Error("❌ process.env.MONGO_URI is not defined in environment variables.");
}

export async function connectDatabase() {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose.connect(process.env.MONGO_URI as string)
    .then((mongooseInstance) => {
      return { conn: mongooseInstance.connection, promise: cached.promise };
    });
  }

  cached.conn = (await cached.promise).conn;
  return cached.conn;
}