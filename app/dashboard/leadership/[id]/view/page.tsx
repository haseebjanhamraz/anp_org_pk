'use client';

import * as React from 'react';
import { useParams, usePathname } from 'next/navigation';
import Typography from '@mui/material/Typography';
import { LeadershipData } from '../../../../types/leadership';
import { Facebook, Twitter, Instagram, LinkedIn } from '@mui/icons-material';
import Loading from '../../../../loading';
import Image from 'next/image';
import Link from 'next/link';

export default function ViewLeadership() {
    const params = useParams();
    const pathname = usePathname();
    const [leadership, setLeadership] = React.useState<LeadershipData | null>(null);
    const [loading, setLoading] = React.useState(true);
    const [editLink, setEditLink] = React.useState("");
    const currentURL = usePathname();
    const editPath = currentURL.replace("/view", "/edit");
    React.useEffect(() => {
        const fetchLeadership = async () => {
            try {
                const response = await fetch(`/api/leadership/${params.id}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch leadership data');
                }
                const data = await response.json();
                setLeadership(data);
            } catch (error) {
                console.error('Error fetching leadership:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchLeadership();
    }, [params.id]);

    if (loading) {
        return <Loading />;
    }

    if (!leadership) {
        return <Typography>Leadership not found</Typography>;
    }

    return (
        <div className="h-screen dark:bg-gray-700 bg-gray-200 pt-12">
            <div className="max-w-lg mx-auto bg-white dark:bg-gray-900 rounded-lg overflow-hidden shadow-lg">
                <div className="border-b px-4 pb-6">
                    <div className="text-center my-4">
                        <Image width={100} height={100} className="h-32 w-32 rounded-full border-4 border-white dark:border-gray-800 mx-auto my-4"
                            src={leadership.imageUrl} alt="" />
                        <div className="py-2">
                            <h3 className="font-bold text-2xl text-gray-800 dark:text-white mb-1">{leadership.name}</h3>
                            <div className="inline-flex text-gray-700 dark:text-gray-300 items-center">
                                Position: {leadership.position} <br />
                            </div>
                        </div>
                    </div>
                    <div className="flex gap-2 px-2">
                        <button
                            className="flex-1 rounded-full bg-red-600 dark:bg-red-800 text-white dark:text-white antialiased font-bold hover:bg-blue-800 dark:hover:bg-blue-900 px-4 py-2">
                            Delete
                        </button>
                        <Link href={editPath}
                            className="flex-1 rounded-full border-2 border-gray-400 text-center dark:border-gray-700 font-semibold text-black dark:text-white px-4 py-2">
                            Edit
                        </Link>
                    </div>
                </div>
                <div className='flex'>
                    <div className="px-4 py-4 border-b">
                        <div className="flex gap-2 items-center text-gray-800 dark:text-gray-300 mb-4">
                            <span><strong className="text-black dark:text-white">Email</strong> {leadership.email} </span>
                        </div>
                        <div className="flex gap-2 items-center text-gray-800 dark:text-gray-300 mb-4">
                            <span><strong className="text-black dark:text-white">Phone</strong> {leadership.phone} </span>
                        </div>
                        <div className="flex gap-2 items-center text-gray-800 dark:text-gray-300 mb-4">
                            <span><strong className="text-black dark:text-white">Province</strong> {leadership.province} </span>
                        </div>
                        <div className="flex gap-2 items-center text-gray-800 dark:text-gray-300 mb-4">
                            <span><strong className="text-black dark:text-white">Position</strong> {leadership.position} </span>
                        </div>
                        <div className="flex gap-2 items-center text-gray-800 dark:text-gray-300 mb-4">
                            <span><strong className="text-black dark:text-white">Cabinet</strong> {leadership.cabinet} </span>
                        </div>
                        <div className="flex gap-2 items-center text-gray-800 dark:text-gray-300 mb-4">
                            <span><strong className="text-black dark:text-white">Period</strong> {leadership.period} </span>
                        </div>
                    </div>
                    <div>
                        {(leadership.socialMedia.length !== 0) ?
                            <div className='p-3'>
                                <h3 className='text-xl text-gray-800 dark:text-white'>Social Media</h3>
                                <div className='flex gap-2 p-2'>
                                    <Facebook />
                                    <p>
                                        {leadership.socialMedia[0].url}
                                    </p>
                                </div>
                                <div className='flex gap-2 p-2'>
                                    <Twitter />
                                    <p>
                                        {leadership.socialMedia[1].url}
                                    </p>
                                </div>
                                <div className='flex gap-2 p-2'>
                                    <Instagram />
                                    <p>
                                        {leadership.socialMedia[2].url}
                                    </p>
                                </div>
                            </div> : null
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}
