import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/firebase';
import { collection, addDoc, getDocs, query, orderBy, limit } from 'firebase/firestore';
import { connectToDatabase, MongoGuestbook } from '@/lib/mongodb';

// Default initial endorsements
const fallbackEntries = [
  {
    id: 'seed-1',
    authorName: 'Alex Rivers',
    authorRole: 'Senior Tech Lead @ CloudScale',
    comment: 'Hasil built our Discord automation system and modernized our API endpoints. Incredibly fast turnaround and solid MERN code!',
    rating: 5,
    badge: 'Client',
    createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
  },
  {
    id: 'seed-2',
    authorName: 'Sarah Lin',
    authorRole: 'Product Designer @ DevFlow',
    comment: 'The frontend responsiveness and UI polish Hasil brings to full-stack applications is top-tier. Clean React & Tailwind components.',
    rating: 5,
    badge: 'Peer',
    createdAt: new Date(Date.now() - 86400000 * 5).toISOString(),
  },
  {
    id: 'seed-3',
    authorName: 'Marcus Vance',
    authorRole: 'Engineering Manager',
    comment: 'Deep understanding of Node.js microservices, Discord.js bots, and MongoDB aggregation pipelines. Highly recommended!',
    rating: 5,
    badge: 'Recruiter',
    createdAt: new Date(Date.now() - 86400000 * 8).toISOString(),
  },
];

export async function GET() {
  try {
    let items: any[] = [];

    // Try Firestore first
    try {
      const q = query(collection(db, 'guestbook'), orderBy('createdAt', 'desc'), limit(50));
      const snap = await getDocs(q);
      if (!snap.empty) {
        items = snap.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      }
    } catch (fbErr) {
      console.warn('Firestore guestbook read warning:', fbErr);
    }

    // Try MongoDB if Firestore empty or unavailable
    if (items.length === 0) {
      try {
        const mongo = await connectToDatabase();
        if (mongo) {
          const docs = await MongoGuestbook.find().sort({ createdAt: -1 }).limit(50).lean();
          if (docs.length > 0) {
            items = docs.map((d: any) => ({ id: d._id.toString(), ...d }));
          }
        }
      } catch (mErr) {
        console.warn('MongoDB guestbook read warning:', mErr);
      }
    }

    // Fallback if both are empty initially
    if (items.length === 0) {
      items = fallbackEntries;
    }

    return NextResponse.json({ success: true, entries: items });
  } catch (err) {
    console.error('Error getting guestbook:', err);
    return NextResponse.json({ success: true, entries: fallbackEntries });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { authorName, authorRole, comment, rating, badge } = body;

    if (!authorName || !comment) {
      return NextResponse.json({ error: 'Author name and comment are required' }, { status: 400 });
    }

    const payload = {
      authorName,
      authorRole: authorRole || 'Software Enthusiast',
      comment,
      rating: Number(rating) || 5,
      badge: badge || 'Visitor',
      createdAt: new Date().toISOString(),
    };

    let docId = 'entry-' + Date.now();

    // 1. Firebase Firestore write
    try {
      const ref = await addDoc(collection(db, 'guestbook'), payload);
      docId = ref.id;
    } catch (e) {
      console.warn('Firestore guestbook write warning:', e);
    }

    // 2. MongoDB write
    try {
      const mongo = await connectToDatabase();
      if (mongo) {
        await MongoGuestbook.create(payload);
      }
    } catch (e) {
      console.warn('MongoDB guestbook write warning:', e);
    }

    return NextResponse.json({
      success: true,
      entry: { id: docId, ...payload },
    });
  } catch (error) {
    console.error('Failed to post guestbook entry:', error);
    return NextResponse.json({ error: 'Failed to save entry' }, { status: 500 });
  }
}
