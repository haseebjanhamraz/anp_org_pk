'use client';

import { useState, useEffect } from 'react';

export default function BachaKhanQuotes() {
    const [quote, setQuote] = useState('');
    const [source, setSource] = useState('');

    useEffect(() => {
        fetch('/api/quote-generator')
            .then(res => res.json())
            .then(data => {
                setQuote(data.quote);
                setSource(data.source);
            });
    }, []);

    return (
        <div>
            <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-slate-800">
                <div className="max-w-4xl w-full mx-4">
                    <div className="bg-white rounded-lg shadow-xl p-8">
                        <div className="relative overflow-hidden">
                            <div
                                className="transition-transform duration-500 ease-in-out"
                                style={{
                                    opacity: quote ? 1 : 0,
                                    transform: `translateY(${quote ? '0' : '20px'})`,
                                    transition: 'all 0.5s ease-in-out'
                                }}
                            >
                                <blockquote className="text-2xl md:text-3xl lg:text-4xl font-serif italic text-gray-800 mb-8">
                                    "{quote}"
                                </blockquote>
                                <cite className="text-lg md:text-xl text-gray-600 block text-right">
                                    — {source}
                                </cite>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}


