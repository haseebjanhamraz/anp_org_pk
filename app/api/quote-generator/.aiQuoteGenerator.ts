import { NextResponse } from 'next/server';
import OpenAI from 'openai';
import { connectToDatabase } from '@/app/lib/mongodb';

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

export async function POST() {
    try {
        // Generate quote using OpenAI
        const completion = await openai.chat.completions.create({
            messages: [
                {
                    role: "system",
                    content: "You are an expert on Khan Abdul Ghaffar Khan (Bacha Khan). Generate an inspiring quote from him about peace, non-violence, social justice, or Pashtun unity. Return only the quote text."
                }
            ],
            model: "gpt-3.5-turbo",
        });

        const quote = completion.choices[0].message.content;

        // Connect to MongoDB
        const { db } = await connectToDatabase();

        // Save quote to database
        await db.collection('quotes').insertOne({
            quote,
            source: "Khan Abdul Ghaffar Khan",
            generatedAt: new Date(),
        });

        return NextResponse.json({
            success: true,
            quote
        });

    } catch (error) {
        console.error('Error generating quote:', error);
        return NextResponse.json(
            { error: 'Failed to generate quote' },
            { status: 500 }
        );
    }
}
