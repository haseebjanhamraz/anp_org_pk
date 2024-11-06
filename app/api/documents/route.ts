import { NextResponse } from 'next/server'
import { connectToDatabase } from '@/app/lib/mongodb'
import { Document } from '@/app/models/Downloads'
import { verifyAuth } from '@/app/middleware/auth'

export async function GET(req: Request, res: Response) {
    const { error, status } = await verifyAuth(req, ['admin'])
    console.log(error, status)
    if (error) {
        return NextResponse.json({ error }, { status })
    }
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