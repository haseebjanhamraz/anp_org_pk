import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import { Document } from '@/models/Downloads';
import { uploadToGCS } from '@/hooks/uploadBucket';

export async function POST(request: NextRequest) {
    try {
        // Connect to MongoDB
        await connectToDatabase();

        const formData = await request.formData();

        // Get file and metadata from form
        const file = formData.get('file') as File;
        const name = formData.get('name') as string;
        const publishYear = formData.get('publishYear') as string;
        const lastModifiedYear = formData.get('lastModifiedYear') as string;
        const category = formData.get('category') as string; // e.g. manifesto, constitution
        const language = formData.get('language') as string; // e.g. en, ur

        if (!file || !name || !publishYear || !category || !language) {
            return NextResponse.json(
                { error: 'Missing required fields' },
                { status: 400 }
            );
        }

        // Convert file to buffer
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        // Create filename for GCS
        const filename = `${category}-${publishYear}-${language}.pdf`;

        // Upload file to Google Cloud Storage
        const fileUrl = await uploadToGCS(buffer, filename);

        // Save record to MongoDB
        const document = await Document.create({
            name,
            publishYear: parseInt(publishYear),
            lastModifiedYear: lastModifiedYear ? parseInt(lastModifiedYear) : null,
            category,
            language,
            filepath: fileUrl // Store the GCS URL instead of local path
        });

        return NextResponse.json(
            { message: 'Document uploaded successfully', document },
            { status: 201 }
        );

    } catch (error) {
        console.error('Error uploading document:', error);
        return NextResponse.json(
            { error: 'Error uploading document' },
            { status: 500 }
        );
    }
}
