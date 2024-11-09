"use client"

import { useParams } from "next/navigation";
import useDocument from "@/app/hooks/useDocument";


const ViewDocument = () => {
    const params = useParams();
    const document = useDocument(params.id as string);

    return (
        <div className='flex h-screen'>
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

        </div>
    );
};

export default ViewDocument;