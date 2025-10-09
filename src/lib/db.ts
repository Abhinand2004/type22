import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI || "";

if (!MONGODB_URI) {
  // Intentionally avoid throwing at import-time in production builds
  // to allow build to succeed without envs, but log for visibility.
  console.warn("MONGODB_URI is not set. Database connection will fail at runtime.");
}

type Cached = {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
};

declare global {
  var mongooseCache: Cached | undefined;
}

const cached: Cached = global.mongooseCache || { conn: null, promise: null };

export async function connectToDatabase() {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose
      .connect(MONGODB_URI, {
        dbName: process.env.MONGODB_DB || "type22",
      })
      .then((m) => m);
  }
  cached.conn = await cached.promise;
  global.mongooseCache = cached;
  return cached.conn;
}


