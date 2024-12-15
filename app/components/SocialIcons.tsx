import Link from "next/link"
import { socialMedia } from "../lib/Data"

export default function SocialIcons() {
    return (
        <div className="w-full flex flex-col items-center justify-center p-4 rounded-lg dark:bg-slate-800 m-3 shadow-md hover:shadow-lg transition-ease-in-out duration-300">
            <h4 className="text-md font-[Montserrat] text-slate-500 font-bold py-4 dark:text-white">Follow us on Social Media</h4>
            <ul className="flex gap-2 text-3xl text-red-600">
                        {socialMedia.map((item, index) => (
                            <li className="flex" key={index}>
                                <Link href={item.link} target="_blank">
                                    {<item.icon />}
                    </Link>
                    </li>
            ))}
            </ul>
        </div>
    )
}
