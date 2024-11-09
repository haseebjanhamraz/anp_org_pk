import { NextResponse } from 'next/server'
import { connectToDatabase } from '@/app/lib/mongodb'
import { Document } from '@/app/models/Downloads'

export async function GET(
    req: Request,
    { params }: { params: { id: string } }
) {
    try {
        await connectToDatabase()
        const document = await Document.findById(params.id)

        if (!document) {
            return NextResponse.json(
                { error: 'Document not found' },
                { status: 404 }
            )
        }

        return NextResponse.json(document)
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
    { params }: { params: { id: string } }
) {
    try {
        await connectToDatabase()
        await Document.findByIdAndDelete(params.id)
        return NextResponse.json({ message: 'Document deleted' }, { status: 200 })
    } catch (error) {
        console.error('Error deleting document:', error)
        return NextResponse.json({ error: 'Failed to delete document' }, { status: 500 })
    }
}