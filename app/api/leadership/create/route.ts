import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { connectToDatabase } from '@/app/lib/mongodb';
import Leadership from '@/app/models/Leadership';

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

export async function POST(req: Request) {
    try {
        // Verify authorization
        const authHeader = req.headers.get('authorization');
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return NextResponse.json(
                { error: 'Unauthorized - No token provided' },
                { status: 401 }
            );
        }

        // Verify JWT token
        const token = authHeader.split(' ')[1];
        try {
            jwt.verify(token, process.env.JWT_SECRET as string);
        } catch (error) {
            return NextResponse.json(
                { error: 'Unauthorized - Invalid token' },
                { status: 401 }
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
        console.error('Leadership creation error:', error);
        return NextResponse.json(
            { error: 'Internal server error', details: error.message },
            { status: 500 }
        );
    }
} 