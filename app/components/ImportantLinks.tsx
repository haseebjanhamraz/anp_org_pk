import Link from "next/link"
import { importantLinks } from "../lib/Data"
import { FiLink } from "react-icons/fi";
import { Divider } from "@mui/material";


export default function ImportantLinks() {
    return (
        <div>
            <h1 className="text-center text-lg font-bold py-4 text-white bg-slate-600 rounded-md dark:bg-red-500 p-2">Important Links</h1>
            <div className="p-4 px-12">
                <ul>
                    {importantLinks.map((item, index) => (
                        <li key={index}>
                            <Link href={item.link} className="text-red-500 transition-all duration-300 hover:underline dark:hover:text-white flex items-center gap-2">
                                <FiLink />
                                {item.name}
                            </Link>
                            {index !== importantLinks.length - 1 && <Divider className="w-1/2 dark:border-gray-500 my-2" />}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}