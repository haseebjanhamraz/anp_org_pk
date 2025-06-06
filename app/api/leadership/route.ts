import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import Leadership from '@/models/Leadership';
import { verifyAuth } from '@/middleware/auth';

export async function GET() {
    try {
        await connectToDatabase();

        const leadership = await Leadership.find({});

        return NextResponse.json(leadership, { status: 200 });
    } catch (error) {
        console.error('Error fetching leadership:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}

export async function DELETE(request: Request) {
    const { error, status } = await verifyAuth(request, ['admin']);
    if (error) {
        return NextResponse.json({ error }, { status });
    }
    try {
        await Leadership.deleteMany();
        return NextResponse.json({ message: "All leadership deleted successfully" }, { status: 200 });
    } catch (error) {
        console.error('Error deleting leadership:', error);
        return NextResponse.json(
            { error: 'Failed to delete leadership' },
            { status: 500 }
        );
    }
}