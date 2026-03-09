import { NextResponse } from 'next/server';

// POST /api/webhooks/sync
// Stub endpoint that would exist on SYNCgigs.co.uk to receive DJpromokit updates.
export async function POST(request: Request) {
    try {
        const body = await request.json();

        // In reality:
        // SYNCgigs verifies the signature
        // SYNCgigs updates its internal DJ profile database with the payload

        console.log("SYNCgigs Webhook received profile update:", body?.username);

        return NextResponse.json({ success: true, syncedAt: new Date().toISOString() });
    } catch (error) {
        return NextResponse.json({ error: "Bad Request" }, { status: 400 });
    }
}
