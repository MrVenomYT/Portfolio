import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

declare global {
  // eslint-disable-next-line no-var
  var mongooseCache: MongooseCache | undefined;
}

let cached: MongooseCache = global.mongooseCache || { conn: null, promise: null };

if (!global.mongooseCache) {
  global.mongooseCache = cached;
}

export async function connectToDatabase(): Promise<typeof mongoose | null> {
  if (!MONGODB_URI) {
    // Graceful fallback when MONGODB_URI is not set in environment
    return null;
  }

  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    cached.promise = mongoose.connect(MONGODB_URI, opts).then((m) => {
      return m;
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    console.error('Failed to connect to MongoDB:', e);
    return null;
  }

  return cached.conn;
}

// Schemas & Models
const ContactSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  subject: { type: String, default: '' },
  message: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const GuestbookSchema = new mongoose.Schema({
  authorName: { type: String, required: true },
  authorRole: { type: String, default: 'Developer' },
  avatarUrl: { type: String, default: '' },
  comment: { type: String, required: true },
  rating: { type: Number, default: 5 },
  badge: { type: String, default: 'Peer' },
  createdAt: { type: Date, default: Date.now },
});

const ProjectReviewSchema = new mongoose.Schema({
  projectId: { type: String, required: true },
  reviewerName: { type: String, required: true },
  rating: { type: Number, required: true, min: 1, max: 5 },
  reviewText: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

export const MongoContact = mongoose.models.Contact || mongoose.model('Contact', ContactSchema);
export const MongoGuestbook = mongoose.models.Guestbook || mongoose.model('Guestbook', GuestbookSchema);
export const MongoReview = mongoose.models.ProjectReview || mongoose.model('ProjectReview', ProjectReviewSchema);
