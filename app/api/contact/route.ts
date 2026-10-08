import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/firebase';
import { adminDb } from '@/lib/firebaseAdmin';
import { collection, addDoc } from 'firebase/firestore';
import { connectToDatabase, MongoContact } from '@/lib/mongodb';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, subject, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Name, email, and message are required' },
        { status: 400 }
      );
    }

    const payload = {
      name,
      email,
      subject: subject || 'New Portfolio Inquiry',
      message,
      createdAt: new Date().toISOString(),
    };

    let firestoreSaved = false;
    let mongoSaved = false;
    let emailJsSent = false;
    let emailJsError: string | null = null;

    // 1. Save to Firebase Firestore (Try Firebase Admin SDK first, fallback to JS SDK)
    try {
      if (adminDb) {
        await adminDb.collection('contact_inquiries').add(payload);
        firestoreSaved = true;
      } else {
        const docRef = await addDoc(collection(db, 'contact_inquiries'), payload);
        if (docRef.id) {
          firestoreSaved = true;
        }
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

    // 3. Send Email notification via EmailJS REST API
    const templateId =
      process.env.EMAILJS_TEMPLATE_ID ||
      process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID ||
      process.env.VITE_EMAILJS_TEMPLATE_ID;
    const publicKey =
      process.env.EMAILJS_PUBLIC_KEY ||
      process.env.EMAILJS_USER_ID ||
      process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY ||
      process.env.NEXT_PUBLIC_EMAILJS_USER_ID ||
      process.env.VITE_EMAILJS_PUBLIC_KEY;
    const serviceId =
      process.env.EMAILJS_SERVICE_ID ||
      process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID ||
      process.env.VITE_EMAILJS_SERVICE_ID ||
      'default_service';
    const privateKey =
      process.env.EMAILJS_PRIVATE_KEY || process.env.EMAILJS_SECRET_KEY;

    if (templateId && publicKey) {
      try {
        const emailJsData: Record<string, any> = {
          service_id: serviceId,
          template_id: templateId,
          user_id: publicKey,
          template_params: {
            from_name: name,
            from_email: email,
            reply_to: email,
            subject: subject || 'New Inquiry from Portfolio Website',
            message: message,
            to_name: 'Muhammad Hasil',
            to_email: 'm.hasil123@gmail.com',
          },
        };

        if (privateKey) {
          emailJsData.accessToken = privateKey;
        }

        const emailRes = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(emailJsData),
        });

        if (emailRes.ok) {
          emailJsSent = true;
        } else {
          const errText = await emailRes.text();
          emailJsError = errText || `EmailJS returned HTTP ${emailRes.status}`;
          console.warn('EmailJS response warning:', errText);
        }
      } catch (e: any) {
        emailJsError = e?.message || 'Failed to dispatch email via EmailJS';
        console.warn('EmailJS dispatch exception:', e);
      }
    } else {
      console.log(
        'EmailJS template ID or Public Key missing in secrets. Saved to database.'
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Message sent successfully!',
      stored: {
        firebase: firestoreSaved,
        mongodb: mongoSaved,
        emailjs: emailJsSent,
      },
      emailJsStatus: emailJsSent
        ? 'sent'
        : emailJsError
        ? `error: ${emailJsError}`
        : 'skipped (keys missing)',
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
