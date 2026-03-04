import { NextResponse } from 'next/server';

// POST /api/webhooks/sync
// Stub endpoint that would exist on SYNCdj.co.uk to receive DJpromokit updates.
export async function POST(req: Request) {
    try {
        const body = await req.json();

        // In real implementation:
        // SYNCdj verifies the signature
        // SYNCdj updates its internal DJ profile database with the payload

        console.log("SYNCdj Webhook received profile update:", body?.username);

        return NextResponse.json({ success: true, syncedAt: new Date().toISOString() });
    } catch (error) {
        return NextResponse.json({ error: "Bad Request" }, { status: 400 });
    }
}
