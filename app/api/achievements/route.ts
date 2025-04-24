import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import { verifyAuth } from '@/middleware/auth';
import { uploadImageToCloudinary } from '@/utils/cloudinary';
import Achievement from '@/models/Achievements';
import { paginate } from '@/utils/paginate';

if (!process.env.JWT_SECRET) {
    throw new Error('Please add your JWT_SECRET to .env.local');
}

export async function GET(req: Request) {
    try {
        await connectToDatabase();
        const achievements = await Achievement.find();
        const url = new URL(req.url);
        const page = Number(url.searchParams.get('page')) || 1;
        const pageSize = Number(url.searchParams.get('pageSize')) || 10;
        return NextResponse.json(paginate(achievements, page, pageSize));
    } catch (error) {
        console.error('Error fetching achievements:', error);
        return NextResponse.json(
            { error: 'Failed to fetch achievements' },
            { status: 500 }
        );
    }
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
        if (!body.project || !body.sector || !body.district || !body.province || !body.tenure || !body.budget ) {
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
        const achievementData = {
            project: body.project,
            sector: body.sector,
            district: body.district,
            province: body.province,
            tenure: body.tenure,
            imageUrl: imageUrl,
            budget: body.budget
        };

        // Create achievement record
        const achievement = await Achievement.create(achievementData);

        // Fetch the created record to verify
        const createdAchievement = await Achievement.findById(achievement._id);

        return NextResponse.json(
            {
                message: `Achievement for ${body.project} created successfully`,
                achievement: createdAchievement
            },
            { status: 201 }
        );

    } catch (error: any) {
        console.error('Create achievement error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
} 