'use client'

import { useParams } from "next/navigation";
import useDocument from '../../../hooks/useDocument';
import Loader from '../../../components/Loader';

const DisplayDocument = () => {
    const params = useParams();
    const { document, loading } = useDocument(params.id as string);

    if (loading) {
        return <Loader />;
    }

    return (
        <div className='flex flex-col w-full h-screen overflow-hidden'>
            <div className='flex-1 p-4 flex flex-col gap-4'>
                <h1 className='text-2xl font-bold dark:text-white'>{document.name}</h1>
                <div className='flex-1 flex'>
                    <ul className='flex flex-col gap-2'>
                        <li className='dark:text-white'>Language
                            <span className='dark:text-white font-bold ml-2 rounded-md'>{document.language}</span>
                        </li>
                        <li className='dark:text-white'>Created At
                            <span className='dark:text-white font-bold ml-2 rounded-md'>
                                {new Date(document.createdAt).toLocaleDateString()}
                            </span>
                        </li>
                        <li className='dark:text-white'>Category
                            <span className='dark:text-white font-bold ml-2 rounded-md'>{document.category}</span>
                        </li>
                    </ul>
                </div>
                <iframe 
                    src={document.filepath} 
                    className='w-full h-full rounded-md border border-neutral-200 dark:border-neutral-800'
                    title={document.name}
                />
            </div>
        </div>
    );
};

export default DisplayDocument;
