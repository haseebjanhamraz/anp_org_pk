import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import Achievement from '@/models/Achievements';
import { verifyAuth } from '@/middleware/auth';
import { uploadImageToCloudinary } from '@/utils/cloudinary';

export async function GET(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;
    try {
        await connectToDatabase();
        const achievement = await Achievement.findById(id);
        if (!achievement) {
            return NextResponse.json(
                { error: 'Achievement not found' },
                { status: 404 }
            );
        }
        return NextResponse.json(achievement, { status: 200 });
    } catch (error) {
        console.error('Error fetching achievement:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}

// Update leadership entry
export async function PUT(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;
    try {
        const authResult = await verifyAuth(req, ['admin', 'editor']);
        if ('error' in authResult) {
            return NextResponse.json(
                { error: authResult.error },
                { status: authResult.status }
            );
        }

        const { project, sector, province, tenure, budget, imageUrl } = await req.json();

        await connectToDatabase();

        // Handle image upload to Cloudinary
        let updatedImageUrl = imageUrl;
        if (imageUrl) {
            const uploadResult = await uploadImageToCloudinary(imageUrl);
            if (uploadResult.error) {
                return NextResponse.json(
                    { error: 'Image upload failed' },
                    { status: 500 }
                );
            }
            updatedImageUrl = uploadResult.url;
        }

        const achievement = await Achievement.findByIdAndUpdate(
            id,
            {
                project,
                sector,
                province,
                tenure,
                budget,
                imageUrl: updatedImageUrl
            },
            { new: true }
        );

        if (!achievement) {
            return NextResponse.json(
                { error: 'Achievement not found' },
                { status: 404 }
            );
        }

        return NextResponse.json({ achievement });
    } catch (error) {
        console.error('Update achievement error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}
// Delete achievement entry
export async function DELETE(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;
    try {
        const authResult = await verifyAuth(req, ['admin', 'editor']);
        if ('error' in authResult) {
            return NextResponse.json(
                { error: authResult.error },
                { status: authResult.status }
            );
        }

        await connectToDatabase();
        const achievement = await Achievement.findByIdAndDelete(id);

        if (!achievement) {
            return NextResponse.json(
                { error: 'Achievement not found' },
                { status: 404 }
            );
        }

        return NextResponse.json(
            { message: 'Achievement deleted successfully' },
            { status: 200 }
        );
    } catch (error) {
        console.error('Delete achievement error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}
