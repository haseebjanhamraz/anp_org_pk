import { NextResponse } from 'next/server';
import { v2 as cloudinary } from 'cloudinary';
import { verifyAuth } from '@/middleware/auth';
import { cloudinaryConfig } from '@/utils/cloudinary';

cloudinary.config(cloudinaryConfig);

export async function POST(req: Request) {
    try {
        // Verify authentication
        const authResult = await verifyAuth(req, ['admin', 'editor']);
        if ('error' in authResult) {
            return NextResponse.json(
                { error: authResult.error },
                { status: authResult.status }
            );
        }

        const formData = await req.formData();
        const file = formData.get('file') as File;

        if (!file) {
            return NextResponse.json(
                { error: 'No file provided' },
                { status: 400 }
            );
        }

        // Convert file to base64
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);
        const base64String = `data:${file.type};base64,${buffer.toString('base64')}`;

        // Upload to Cloudinary
        const result = await cloudinary.uploader.upload(base64String, {
            folder: 'leadership',
            resource_type: 'auto'
        });

        return NextResponse.json({ 
            url: result.secure_url,
            public_id: result.public_id 
        });

    } catch (error) {
        console.error('Upload error:', error);
        return NextResponse.json(
            { error: 'Failed to upload image' },
            { status: 500 }
        );
    }
}

export const config = {
    api: {
        bodyParser: false,
    },
}; 