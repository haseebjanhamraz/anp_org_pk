import styles from "./style.module.css";
import GoogleMap from "../../components/GoogleMap";
import { Divider } from "@mui/material";
import Link from "next/link";
import { contactDetails } from "../../../lib/Data";
import ContactForm from "../../components/ContactForm";
import { Metadata } from 'next'
import { generateMetadata } from "../../MetaData";

export const metadata: Metadata = generateMetadata("/contact");

const Contact = () => {
  const contact = contactDetails.map((item, index) => (
    <li className="flex items-center gap-2 dark:text-white" key={index}>
      <item.icon />
      <Link href={item.link} target="_blank">{item.name}</Link>
    </li>
  ))
  return (
    <>
      <div
        className={`h-96 bg-cover flex flex-col justify-center items-center bg-center ${styles.parallax}  bg-no-repeat bg-[url('/markaz.png')] p-6 sm:p-12 md:p-16 lg:p-20`}
      >
        <div className="bg-black/50 h-full w-full absolute top-0 left-0" />
        <div className="sticky top-40 left-0 ">
          <h1 className="text-white text-4xl font-bold uppercase text-center hover:animate-bounce">
            Contact Us
          </h1>
          <p className="text-gray-300 font-thin text-sm mt-10 text-center">
            We value your feedback and inquiries. Whether you want to connect
            with Awami National Party (ANP) for updates, share your concerns, or
            collaborate with us, we're here to listen. Reach out to us through
            the provided contact details or visit our offices to engage
            directly. Your voice matters, and together, we can work towards a
            prosperous and united future.
          </p>
        </div>
      </div>

      <div className="flex gap-12 p-10 flex-col md:flex-row">
        <div className="animate-in fade-in duration-2000">
          <h1 className="text-4xl p-4 uppercase text-center dark:text-white">
            Find Us On Map
          </h1>
          <Divider className="dark:bg-gray-500" />
          <div className="flex items-start gap-2 m-4">
            <h4 className="text-xl text-gray-500 dark:text-gray-300">
              Secreteriate: <span className="text-xl dark:text-white font-bold">
                Bacha Khan Markaz, Pajaggi Road, Peshawar, Khyber Pakhtunkhwa,
                Pakistan. 25000
              </span>
            </h4>
          </div>
          <ul className="flex p-4 flex-col gap-2">
            {contact}
          </ul>
        </div>
        <div className="animate-in fade-in duration-2000">
          <h1 className="text-4xl p-4 uppercase text-center dark:text-white">Contact Form</h1>
          <Divider className="dark:bg-gray-500" />
          <ContactForm />
        </div>
      </div>
    </>
  );
};

export default Contact;
