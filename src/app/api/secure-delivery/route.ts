import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { headers } from 'next/headers';
import { createHash } from 'crypto';

const MEGA_LINKS = {
  'hist_caie_s1': 'https://mega.nz/folder/2r5glDrR#cycQCqlkTfCh6w-Ad614_w'
};

// Verify the purchase is legitimate
async function verifyPurchase(productId: string, transactionId: string) {
  // Here you would implement your verification logic
  // For example, checking against your database that this transaction exists and is valid
  return true;
}

// Generate a secure, time-limited token
function generateSecureToken(productId: string, userId: string) {
  const timestamp = Date.now();
  const expiryTime = timestamp + 1800000; // 30 minutes
  
  const data = `${productId}-${userId}-${expiryTime}`;
  const secret = process.env.SECURE_DELIVERY_SECRET || 'your-secret-key';
  
  const hash = createHash('sha256')
    .update(data + secret)
    .digest('hex');
    
  return {
    token: hash,
    expires: expiryTime
  };
}

export async function POST(req: Request) {
  try {
    // Get the session to verify user is authenticated
    const session = await getServerSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Get request data
    const body = await req.json();
    const { productId, transactionId } = body;

    // Basic validation
    if (!productId || !transactionId) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Verify the purchase
    const isValid = await verifyPurchase(productId, transactionId);
    if (!isValid) {
      return NextResponse.json({ error: 'Invalid purchase' }, { status: 403 });
    }

    // Get the actual download link
    const downloadUrl = MEGA_LINKS[productId as keyof typeof MEGA_LINKS];
    if (!downloadUrl) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    // Generate a secure token
    const { token, expires } = generateSecureToken(productId, session.user?.email || '');

    // Return the secure URL with token
    return NextResponse.json({
      downloadUrl: `/api/download/${productId}?token=${token}&expires=${expires}`,
      expires
    });

  } catch (error) {
    console.error('Secure delivery error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
} 