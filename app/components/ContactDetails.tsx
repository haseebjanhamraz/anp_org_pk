import Link from "next/link"
import { contactDetails } from "../lib/Data"
import GoogleMap from "./GoogleMap"
import SocialIcons from "./SocialIcons"

export default function ContactDetails() {
    return (
        <div>
            <h1 className="text-center text-2xl font-[Montserrat] font-bold py-4 dark:text-white">Reach Us</h1>
            <div className="p-4 px-12 bg-slate-100 dark:bg-slate-800 my-4">
                <div className="flex flex-col items-center justify-center mb-4">
                <h2 className="text-center text-xl font-[Montserrat] font-bold dark:text-white">Bacha Khan Markaz</h2>
                <p className="text-center text-sm font-[Montserrat-Light] dark:text-white">Pajaggi Road, Peshawar</p>
                </div>
                <GoogleMap />
                <div className="flex flex-col items-center justify-center">
                    <h2 className="text-center text-xl font-[Montserrat] font-bold dark:text-white mt-4">Contact</h2>
                <ul className="p-3">
                    {contactDetails.map((item, index) => (
                    <div key={index} className="bg-slate-200 dark:bg-slate-700 px-1 w-fit rounded-md">
                    <li>
                        <Link href={item.link} className="text-red-700 my-2 text-lg transition-all duration-300 hover:underline dark:hover:text-white flex items-center gap-2">
                            <item.icon className="mr-4" />
                            {item.name}
                        </Link>
                    </li>
                    </div>
                ))}
                </ul>
                </div>
                <SocialIcons />
            </div>
        </div>
    )
}