import { NextResponse } from 'next/server';
import { connectToDatabase } from '../../../lib/mongodb';
import Leadership from '../../../models/Leadership';
import { verifyAuth } from '../../../middleware/auth';
import { uploadImageToCloudinary } from '../../../utils/cloudinary';

if (!process.env.JWT_SECRET) {
    throw new Error('Please add your JWT_SECRET to .env.local');
}

interface SocialMediaLink {
    platform: string;
    url: string;
}

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

        // Validate required fields
        if (!body.name || !body.province || !body.position || !body.cabinet || !body.period) {
            return NextResponse.json(
                { error: 'Missing required fields' },
                { status: 400 }
            );
        }

        // Connect to database
        await connectToDatabase();

        // Upload image to Cloudinary if imageUrl is provided
        let imageUrl = body.imageUrl || '';
        if (body.imageUrl) {
            const uploadResult = await uploadImageToCloudinary(body.imageUrl);
            if (uploadResult.error) {
                return NextResponse.json(
                    { error: 'Image upload failed' },
                    { status: 500 }
                );
            }
            imageUrl = uploadResult.url;
        }

        // Prepare the document with explicit social media handling
        const leadershipData = {
            name: body.name,
            email: body.email || '',
            phone: body.phone || '',
            province: body.province,
            position: body.position,
            cabinet: body.cabinet || '',
            period: body.period,
            imageUrl: imageUrl,
            socialMedia: Array.isArray(body.socialMedia) ? body.socialMedia.map((social: SocialMediaLink) => ({
                platform: social.platform,
                url: social.url
            })) : []
        };

        // Create leadership record
        const leadership = await Leadership.create(leadershipData);

        // Fetch the created record to verify
        const createdLeadership = await Leadership.findById(leadership._id);

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