import { NextResponse } from 'next/server'
import { connectToDatabase } from '../../../lib/mongodb'
import { Document } from '../../../models/Downloads'
import { getSignedUrl } from '../../../hooks/getBucket'




export async function GET(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;
    try {
        await connectToDatabase()
        const document = await Document.findById(id)

        if (!document) {
            return NextResponse.json(
                { error: 'Document not found' },
                { status: 404 }
            )
        }

        // Get public URL
        const publicUrl = await getSignedUrl(
            process.env.BUCKET_NAME || '', 
            document.filepath
        );
        
        // Return document with public URL
        return NextResponse.json({
            ...document.toObject(),
            filepath: publicUrl
        });

    } catch (error) {
        console.error('Error fetching document:', error)
        return NextResponse.json(
            { error: 'Failed to fetch document' },
            { status: 500 }
        )
    }
}

export async function DELETE(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;
    try {
        await connectToDatabase()
        await Document.findByIdAndDelete(id)
        return NextResponse.json({ message: 'Document deleted' }, { status: 200 })
    } catch (error) {
        console.error('Error deleting document:', error)
        return NextResponse.json({ error: 'Failed to delete document' }, { status: 500 })
    }
}