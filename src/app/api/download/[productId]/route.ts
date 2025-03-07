import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { createHash } from 'crypto';

const MEGA_LINKS = {
  'hist_caie_s1': 'https://mega.nz/folder/2r5glDrR#cycQCqlkTfCh6w-Ad614_w'
};

// Verify the security token
function verifyToken(token: string, productId: string, userId: string, expires: number) {
  // Check if token has expired
  if (Date.now() > expires) {
    return false;
  }

  // Recreate the token to verify it matches
  const data = `${productId}-${userId}-${expires}`;
  const secret = process.env.SECURE_DELIVERY_SECRET || 'your-secret-key';
  
  const expectedHash = createHash('sha256')
    .update(data + secret)
    .digest('hex');

  return token === expectedHash;
}

// In a real application, you would verify the transaction ID against your database
const verifyTransaction = async (productId: string, transactionId: string) => {
  // Simulate database check
  return true;
};

export async function GET(
  request: NextRequest,
  { params }: { params: { productId: string } }
) {
  try {
    const { productId } = params;
    const { searchParams } = new URL(request.url);
    const transactionId = searchParams.get('txn');

    if (!transactionId) {
      return new NextResponse('Transaction ID is required', { status: 400 });
    }

    // Verify the transaction
    const isValid = await verifyTransaction(productId, transactionId);
    if (!isValid) {
      return new NextResponse('Invalid transaction', { status: 403 });
    }

    // In a real application, you would:
    // 1. Get the file path from your database
    // 2. Stream the file securely
    // 3. Update download counts/logs
    // 4. Handle file not found cases

    // For now, we'll return a success response
    return NextResponse.json({
      success: true,
      downloadUrl: `/secure-files/${productId}.pdf`,
      message: 'Download authorized'
    });

  } catch (error) {
    console.error('Download error:', error);
    return new NextResponse('Internal server error', { status: 500 });
  }
} 