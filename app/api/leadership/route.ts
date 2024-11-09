import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/app/lib/mongodb';
import Leadership from '@/app/models/Leadership';

export async function GET() {
    try {
        await connectToDatabase();

        const leadership = await Leadership.find({});
        console.log(leadership);

        return NextResponse.json(leadership, { status: 200 });
    } catch (error) {
        console.error('Error fetching leadership:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}
