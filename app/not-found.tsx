import Link from 'next/link'
import { Metadata } from 'next'
import { generateMetadata } from './MetaData';
import FlagIcon from '@mui/icons-material/Flag';
import HistoryIcon from '@mui/icons-material/History';
import StorageIcon from '@mui/icons-material/Storage';
import Image from 'next/image';

export const metadata: Metadata = generateMetadata("/not-found");

export default function NotFound() {
    return (
        <div className='h-screen p-2 flex flex-col items-center justify-center'>
            <h1 className='text-8xl font-bold dark:text-red-500'>404</h1>
            <h4 className='text-4xl text-gray-400'>Oops!!! Page Not Found</h4>
            <Link href={"/"} className='bg-slate-800 hover:bg-slate-600 text-white p-3 rounded-xl mt-10 transition-all duration-500'>
                Go Home
            </Link>
            <h2 className='text-5xl mt-10 text-gray-500'>Explore Awami National Party</h2>
            <div className='flex gap-5'>
                <Link href={"/about"}>
                    <div className='flex gap-4 bg-gray-300 hover:bg-red-400 hover:text-white transition-all duration-500 w-fit items-center p-4 mt-10 rounded-lg'>
                        <FlagIcon className='text-4xl' />
                        <h5>About Us</h5>
                    </div>
                </Link>
                <Link href={"/history"}>
                    <div className='flex gap-4 bg-gray-300 hover:bg-red-400 hover:text-white transition-all duration-500 w-fit items-center p-4 mt-10 rounded-lg'>
                        <HistoryIcon className='text-4xl' />
                        <h5>Our History</h5>
                    </div>
                </Link>
                <Link href={"/leadership-database"}>
                    <div className='flex gap-4 bg-gray-300 hover:bg-red-400 hover:text-white transition-all duration-500 w-fit items-center p-4 mt-10 rounded-lg'>
                        <StorageIcon className='text-4xl' />
                        <h5>Leadership Database</h5>
                    </div>
                </Link>
            </div>
        </div>
    )
}