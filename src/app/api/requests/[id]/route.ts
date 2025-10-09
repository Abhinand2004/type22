import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db';
import { DesignRequest } from '@/models/DesignRequest';

// DELETE /api/requests/:id
export async function DELETE(req: Request) {
  await connectToDatabase();
  // extract id from the request URL: /api/requests/:id
  try {
    const url = new URL(req.url);
    const parts = url.pathname.split('/').filter(Boolean);
    const id = parts[parts.length - 1];

    if (!id) return NextResponse.json({ error: 'Missing id' }, { status: 400 });

    const deleted = await DesignRequest.findByIdAndDelete(id);
    if (!deleted) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('Delete request error', err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
