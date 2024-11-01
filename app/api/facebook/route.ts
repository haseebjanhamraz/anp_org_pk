// app/api/facebook/route.ts

import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
    const { FACEBOOK_ACCESS_TOKEN, FACEBOOK_PAGE_ID } = process.env;

    if (!FACEBOOK_ACCESS_TOKEN || !FACEBOOK_PAGE_ID) {
        return NextResponse.json(
            { error: 'Missing Facebook API access token or page ID' },
            { status: 500 }
        );
    }

    // Define the Graph API endpoint URL
    const url = `https://graph.facebook.com/v16.0/${FACEBOOK_PAGE_ID}/posts?fields=message,created_time,attachments{media}&access_token=${FACEBOOK_ACCESS_TOKEN}`;

    try {
        const response = await fetch(url);

        if (!response.ok) {
            const errorData = await response.json();
            return NextResponse.json(
                { error: errorData.error.message },
                { status: response.status }
            );
        }

        const data = await response.json();

        // Send the raw data back as received from the Graph API
        return NextResponse.json(data, { status: 200 });
    } catch (error) {
        console.error('Error fetching Facebook posts:', error);
        return NextResponse.json(
            { error: 'Failed to fetch Facebook posts' },
            { status: 500 }
        );
    }
}
