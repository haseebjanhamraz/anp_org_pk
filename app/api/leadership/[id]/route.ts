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

interface UpdateLeadershipRequest {
    name?: string;
    position?: string;
    period?: string;
    description?: string;
    imageUrl?: string;
    socialMedia?: SocialMediaLink[];
}

export async function PUT(
    req: Request,
    { params }: { params: { id: string } }
) {
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
        const body: UpdateLeadershipRequest = await req.json();
        console.log('Received update request body:', body);

        // Connect to database
        await connectToDatabase();

        // Check if leadership exists
        const existingLeadership = await Leadership.findById(params.id);
        if (!existingLeadership) {
            return NextResponse.json(
                { error: 'Leadership not found' },
                { status: 404 }
            );
        }

        // Prepare update data
        const updateData: UpdateLeadershipRequest = {};
        if (body.name) updateData.name = body.name;
        if (body.position) updateData.position = body.position;
        if (body.period) updateData.period = body.period;
        if (body.description !== undefined) updateData.description = body.description;
        if (body.imageUrl !== undefined) updateData.imageUrl = body.imageUrl;
        if (Array.isArray(body.socialMedia)) {
            updateData.socialMedia = body.socialMedia.map((social: SocialMediaLink) => ({
                platform: social.platform,
                url: social.url
            }));
        }

        // Update leadership record
        const updatedLeadership = await Leadership.findByIdAndUpdate(
            params.id,
            { $set: updateData },
            { new: true }
        );

        console.log('Updated leadership record:', updatedLeadership);

        return NextResponse.json(
            { message: 'Leadership updated successfully', leadership: updatedLeadership },
            { status: 200 }
        );

    } catch (error) {
        console.error('Error updating leadership:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}

export async function GET(
    req: Request,
    { params }: { params: { id: string } }
) {
    try {
        await connectToDatabase();

        const leadership = await Leadership.findById(params.id);
        if (!leadership) {
            return NextResponse.json(
                { error: 'Leadership not found' },
                { status: 404 }
            );
        }

        return NextResponse.json(leadership);
    } catch (error) {
        console.error('Error fetching leadership:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}

export async function DELETE(
    req: Request,
    { params }: { params: { id: string } }
) {
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

        await connectToDatabase();

        const leadership = await Leadership.findByIdAndDelete(params.id);
        if (!leadership) {
            return NextResponse.json(
                { error: 'Leadership not found' },
                { status: 404 }
            );
        }

        return NextResponse.json(
            { message: 'Leadership deleted successfully' },
            { status: 200 }
        );
    } catch (error) {
        console.error('Error deleting leadership:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}
