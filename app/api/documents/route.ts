import { NextResponse } from 'next/server'
import { connectToDatabase } from '@/app/lib/mongodb'
import { Document } from '@/app/models/Downloads'


export async function GET(req: Request, res: Response) {
    try {
        await connectToDatabase()
        const documents = await Document.find({})

        return NextResponse.json(documents)
    } catch (error) {
        console.error('Error fetching documents:', error)
        return NextResponse.json(
            { error: 'Failed to fetch documents' },
            { status: 500 }
        )
    }
}