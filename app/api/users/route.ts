import { NextResponse } from 'next/server';
import { verifyAuth } from '@/app/middleware/auth';
import { connectToDatabase } from '@/app/lib/mongodb';
import User from '@/app/models/User';

export async function GET(req: Request) {
    try {
        // Verify that the user is an admin
        const authResult = await verifyAuth(req, ['admin']);
        if ('error' in authResult) {
            return NextResponse.json(
                { error: authResult.error },
                { status: authResult.status }
            );
        }

        await connectToDatabase();

        // Fetch all users from the database
        const users = await User.find({}, {
            password: 0 // Exclude password field
        });

        return NextResponse.json({
            users: users.map(user => ({
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                createdAt: user.createdAt
            }))
        });

    } catch (error) {
        console.error('Get users error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}
