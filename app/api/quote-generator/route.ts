import { NextResponse } from 'next/server';


const quotes = [
    {
        quote: "Non-violence is not inaction. It is not discussion. It is not for the timid or weak. Non-violence is hard work.",
        source: "Khan Abdul Ghaffar Khan"
    },
    {
        quote: "The most powerful weapon is the weapon of non-violence. Even the most powerful cannot defeat you if you are non-violent.",
        source: "Khan Abdul Ghaffar Khan"
    },
    {
        quote: "I am going to give you such a weapon that the police and the army will not be able to stand against it. It is the weapon of the Prophet, but you are not aware of it. That weapon is patience and righteousness.",
        source: "Khan Abdul Ghaffar Khan"
    },
    {
        quote: "My religion is truth, love and service to God and humanity. Every religion that has come into the world has brought the message of love and brotherhood.",
        source: "Khan Abdul Ghaffar Khan"
    },
    {
        quote: "We are all children of the same soil. We must unite and work together for the betterment of our people.",
        source: "Khan Abdul Ghaffar Khan"
    }
];

export async function GET() {
    try {
        // Get random quote from array
        const randomIndex = Math.floor(Math.random() * quotes.length);
        const selectedQuote = quotes[randomIndex];


        return NextResponse.json({
            success: true,
            quote: selectedQuote.quote,
            source: selectedQuote.source
        });

    } catch (error) {
        console.error('Error generating quote:', error);
        return NextResponse.json(
            { error: 'Failed to generate quote' },
            { status: 500 }
        );
    }
}
