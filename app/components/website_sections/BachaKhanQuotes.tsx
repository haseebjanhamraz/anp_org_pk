'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Loader from '../Loader';

export default function BachaKhanQuotes() {
    const [quote, setQuote] = useState('');
    const [source, setSource] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('/api/quote-generator')
            .then(res => res.json())
            .then(data => {
                setQuote(data.quote);
                setSource(data.source);
                setLoading(false);
            });
    }, []);

    return (
        <div>
            <div className="min-h-screen flex flex-col rounded-md md:flex-row items-center shadow-2xl justify-start dark:bg-slate-800 relative">
                <div className="w-full md:w-1/3 md:min-w-[400px]">
                    <Image
                        src="/baba.png"
                        alt="Bacha Khan"
                        className="h-screen pt-16"
                        width={500}
                        height={500}
                    />
                </div>
                {!loading ? (
                    <div className="absolute top-80 left-0 right-0 md:static max-w-4xl w-auto mx-4">
                        <div className="bg-white bg-opacity-50 rounded-lg dark:bg-slate-700 shadow-xl p-8">
                            <div className="relative overflow-hidden">
                                <div className="flex flex-col md:flex-row gap-8 items-center">
                                    <div
                                        className="transition-transform duration-500 ease-in-out"
                                        style={{
                                            opacity: quote ? 1 : 0,
                                            transform: `translateY(${quote ? '0' : '20px'})`,
                                            transition: 'all 0.5s ease-in-out'
                                        }}
                                    >
                                        <blockquote className="text-2xl md:text-3xl lg:text-4xl font-serif italic text-gray-800 dark:text-white mb-8">
                                            "{quote}"
                                        </blockquote>
                                        <cite className="text-lg md:text-xl text-gray-600 dark:text-white block text-right">
                                            — {source}
                                        </cite>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : <Loader />}
            </div>
        </div>
    );
}


