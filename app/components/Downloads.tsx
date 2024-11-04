"use client"
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { documents } from '@/app/lib/Data';

interface DownloadsProps {
    year?: string;
}

export default function Downloads({ year }: DownloadsProps) {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 3;

    // Reset pagination when year changes
    useEffect(() => {
        setCurrentPage(1);
    }, [year]);

    const paginateItems = (items: any[]) => {
        // Filter by year if specified, otherwise show all
        const filteredItems = year ? items.filter(doc => doc.year === year) : items;

        // Apply pagination
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        return filteredItems.slice(startIndex, endIndex);
    };

    const getTotalDocuments = () => {
        const allDocs = [
            ...documents.manifesto,
            ...documents.constitution,
            ...documents.publications
        ];
        return year ? allDocs.filter(doc => doc.year === year).length : allDocs.length;
    };

    const totalPages = Math.ceil(getTotalDocuments() / itemsPerPage);

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Manifesto Section */}
                <div className="bg-white dark:bg-slate-700 rounded-lg shadow-md p-6">
                    <h2 className="text-xl font-bold mb-4 dark:text-white">Party Manifesto</h2>
                    <div className="space-y-4">
                        {paginateItems(documents.manifesto)
                            .map((doc, index) => (
                                <div key={index} className="border-b pb-4 last:border-b-0">
                                    <h3 className="font-medium dark:text-white">{doc.title}</h3>
                                    <p className="text-sm text-gray-500 dark:text-gray-300">Version {doc.version}</p>
                                    <Link
                                        href={doc.languages.en}
                                        className="mt-2 inline-block text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                                    >
                                        Download PDF
                                    </Link>
                                </div>
                            ))}
                    </div>
                </div>

                {/* Constitution Section */}
                <div className="bg-white dark:bg-slate-700 rounded-lg shadow-md p-6">
                    <h2 className="text-xl font-bold mb-4 dark:text-white">Party Constitution</h2>
                    <div className="space-y-4">
                        {paginateItems(documents.constitution)
                            .map((doc, index) => (
                                <div key={index} className="border-b pb-4 last:border-b-0">
                                    <h3 className="font-medium dark:text-white">{doc.title}</h3>
                                    <p className="text-sm text-gray-500 dark:text-gray-300">Version {doc.version}</p>
                                    <Link
                                        href={doc.languages.en}
                                        className="mt-2 inline-block text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                                    >
                                        Download PDF
                                    </Link>
                                </div>
                            ))}
                    </div>
                </div>

                {/* Publications Section */}
                <div className="bg-white dark:bg-slate-700 rounded-lg shadow-md p-6">
                    <h2 className="text-xl font-bold mb-4 dark:text-white">Publications</h2>
                    <div className="space-y-4">
                        {paginateItems(documents.publications)
                            .map((doc, index) => (
                                <div key={index} className="border-b pb-4 last:border-b-0">
                                    <h3 className="font-medium dark:text-white">{doc.title}</h3>
                                    <p className="text-sm text-gray-500 dark:text-gray-300">Version {doc.version}</p>
                                    <Link
                                        href={doc.languages.en}
                                        className="mt-2 inline-block text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                                    >
                                        Download PDF
                                    </Link>
                                </div>
                            ))}
                    </div>
                </div>
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
                <div className="mt-6 flex justify-center space-x-2">
                    <button
                        onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                        disabled={currentPage === 1}
                        className="px-4 py-2 border rounded-md disabled:opacity-50 dark:bg-slate-700 dark:text-white"
                    >
                        Previous
                    </button>
                    <span className="px-4 py-2 dark:text-white">
                        Page {currentPage} of {totalPages}
                    </span>
                    <button
                        onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                        disabled={currentPage === totalPages}
                        className="px-4 py-2 border rounded-md disabled:opacity-50 dark:bg-slate-700 dark:text-white"
                    >
                        Next
                    </button>
                </div>
            )}
        </div>
    );
}
