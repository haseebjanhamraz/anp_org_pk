import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { connectToDatabase } from '@/app/lib/mongodb';
import Leadership from '@/app/models/Leadership';
import { verifyAuth } from '@/app/middleware/auth';

if (!process.env.JWT_SECRET) {
    throw new Error('Please add your JWT_SECRET to .env.local');
}

interface SocialMediaLink {
    platform: string;
    url: string;
}

interface CreateLeadershipRequest {
    name: string;
    position: string;
    period: string;
    description?: string;
    imageUrl?: string;
    socialMedia?: SocialMediaLink[];
}

// Example role permissions
const ROLE_PERMISSIONS = {
    // Admin can do everything
    admin: ['create', 'read', 'update', 'delete'],

    // Editor can create and edit content
    editor: ['create', 'read', 'update'],

    // Subscriber can only read content and edit their own profile
    subscriber: ['read']
};

export async function POST(req: Request) {
    try {
        // Use the verifyAuth middleware instead of manual token check
        const authResult = await verifyAuth(req, ['admin', 'editor']);
        if ('error' in authResult) {
            return NextResponse.json(
                { error: authResult.error },
                { status: authResult.status }
            );
        }

        // Get request body
        const body = await req.json();
        console.log('Received request body:', body);

        // Validate required fields
        if (!body.name || !body.position || !body.period) {
            return NextResponse.json(
                { error: 'Missing required fields' },
                { status: 400 }
            );
        }

        // Connect to database
        await connectToDatabase();

        // Prepare the document with explicit social media handling
        const leadershipData = {
            name: body.name,
            position: body.position,
            period: body.period,
            description: body.description || '',
            imageUrl: body.imageUrl || '',
            socialMedia: Array.isArray(body.socialMedia) ? body.socialMedia.map((social: SocialMediaLink) => ({
                platform: social.platform,
                url: social.url
            })) : []
        };

        console.log('Creating leadership with data:', leadershipData);

        // Create leadership record
        const leadership = await Leadership.create(leadershipData);

        // Fetch the created record to verify
        const createdLeadership = await Leadership.findById(leadership._id);
        console.log('Created leadership record:', createdLeadership);

        return NextResponse.json(
            {
                message: 'Leadership record created successfully',
                leadership: createdLeadership
            },
            { status: 201 }
        );

    } catch (error: any) {
        console.error('Create leadership error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
} 