import Link from "next/link";
import { contactDetails } from "../lib/Data";
import GoogleMap from "./GoogleMap";
import SocialIcons from "./SocialIcons";

export default function ContactDetails() {
  return (
    <div className="">
      <h1 className="text-center text-lg font-bold py-4 text-white bg-slate-600 rounded-md dark:bg-red-500">
        Reach Us
      </h1>
      <div className="p-3 dark:bg-slate-800 my-4">
        <div className="flex flex-col items-center justify-center mb-4">
          <p className="text-gray-600 dark:text-white">Headquarters</p>
          <h2 className="text-center text-xl font-bold dark:text-white">
            Bacha Khan Markaz
          </h2>
          <p className="text-center text-md font-thin dark:text-white">
            Pajaggi Road, Peshawar
          </p>
        </div>
        <GoogleMap />
        <div className="flex flex-col items-center justify-center">
          <h2 className="text-center text-xl font-bold dark:text-white mt-4">
            Contact Details
          </h2>
          <ul className="p-1">
            {contactDetails.map((item, index) => (
              <div
                key={index}
                className="bg-slate-200 dark:bg-slate-700 px-1 w-fit rounded-md"
              >
                <li>
                  <Link
                    href={item.link}
                    className="text-red-700 my-2 p-2 dark:text-white text-lg transition-all duration-300 hover:underline dark:hover:text-white flex items-center gap-2"
                  >
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
  );
}
