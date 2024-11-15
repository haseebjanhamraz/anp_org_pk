"use client"

import { useParams } from "next/navigation";
import useDocument from '../../../../hooks/useDocument';
import AnimatedLoader from '../../../../components/Animated-Loader';


const ViewDocument = () => {
    const params = useParams();
    const { document, loading } = useDocument(params.id as string);

    if (loading) {
        return <AnimatedLoader />;
    }

    return (
        <div className='flex flex-col h-screen'>
            <ul className='flex flex-col gap-2'>
                <li className='dark:text-white'>Title
                    <span className='dark:text-white font-bold ml-2 rounded-md'>{document.name}</span>
                </li>
                <li className='dark:text-white'>Category
                    <span className='dark:text-white font-bold ml-2 rounded-md'>{document.category}</span>
                </li>
                <li className='dark:text-white'>Language
                    <span className='dark:text-white font-bold ml-2 rounded-md'>{document.language}</span>
                </li>
                <li className='dark:text-white'>File
                    <span className='dark:text-white font-bold ml-2 rounded-md'>{document.filepath}</span>
                </li>
                <li className='dark:text-white'>Created At
                    <span className='dark:text-white font-bold ml-2 rounded-md'>
                        {new Date(document.createdAt).toLocaleDateString()}
                    </span>
                </li>
            </ul>
            <div className='flex-1 p-4 flex flex-col gap-4'>
                <h1 className='text-2xl font-bold'>{document.name} - Preview</h1>
                <iframe src={document.filepath} className='w-full h-full rounded-md' />
            </div>
        </div>
    );
};

export default ViewDocument;