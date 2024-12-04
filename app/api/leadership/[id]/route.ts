import { NextResponse } from 'next/server';
import { connectToDatabase } from '../../../lib/mongodb';
import Leadership from '../../../models/Leadership';
import { verifyAuth } from '../../../middleware/auth';
import { uploadImageToCloudinary } from '../../../utils/cloudinary';

export async function GET(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;
    try {
        await connectToDatabase();
        const leadership = await Leadership.findById(id);
        return NextResponse.json(leadership, { status: 200 });
    } catch (error) {
        console.error('Error fetching leadership:', error);
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

        const { name, email, phone, position, province, cabinet, period, imageUrl, socialMedia } = await req.json();

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

        const leadership = await Leadership.findByIdAndUpdate(
            id,
            {
                name,
                email,
                phone,
                position,
                province,
                cabinet,
                period,
                imageUrl: updatedImageUrl,
                socialMedia: Array.isArray(socialMedia) ? socialMedia.map(social => ({
                    platform: social.platform,
                    url: social.url
                })) : []
            },
            { new: true }
        );

        if (!leadership) {
            return NextResponse.json(
                { error: 'Leadership entry not found' },
                { status: 404 }
            );
        }

        return NextResponse.json({ leadership });
    } catch (error) {
        console.error('Update leadership error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}

// Delete leadership entry
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
        const leadership = await Leadership.findByIdAndDelete(id);

        if (!leadership) {
            return NextResponse.json(
                { error: 'Leadership entry not found' },
                { status: 404 }
            );
        }

        return NextResponse.json(
            { message: 'Leadership entry deleted successfully' },
            { status: 200 }
        );
    } catch (error) {
        console.error('Delete leadership error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}
