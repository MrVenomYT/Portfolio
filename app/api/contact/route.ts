import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/firebase';
import { collection, addDoc } from 'firebase/firestore';
import { connectToDatabase, MongoContact } from '@/lib/mongodb';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, subject, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Name, email, and message are required' }, { status: 400 });
    }

    const payload = {
      name,
      email,
      subject: subject || 'General Inquiry',
      message,
      createdAt: new Date().toISOString(),
    };

    let firestoreSaved = false;
    let mongoSaved = false;

    // 1. Save to Firebase Firestore
    try {
      const docRef = await addDoc(collection(db, 'contact_inquiries'), payload);
      if (docRef.id) {
        firestoreSaved = true;
      }
    } catch (fbErr) {
      console.warn('Firestore write warning:', fbErr);
    }

    // 2. Save to MongoDB if configured
    try {
      const mongoConn = await connectToDatabase();
      if (mongoConn) {
        await MongoContact.create(payload);
        mongoSaved = true;
      }
    } catch (mongoErr) {
      console.warn('MongoDB write warning:', mongoErr);
    }

    return NextResponse.json({
      success: true,
      message: 'Message sent successfully!',
      stored: {
        firebase: firestoreSaved,
        mongodb: mongoSaved,
      },
      data: payload,
    });
  } catch (error) {
    console.error('Error handling contact submission:', error);
    return NextResponse.json(
      { error: 'Failed to process message' },
      { status: 500 }
    );
  }
}
