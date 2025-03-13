"use client";
import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import ImportantLinks from "./ImportantLinks";
import ContactDetails from "./ContactDetails";
import NewsletterForm from "./NewsletterForm";

export default function Footer() {
  useEffect(() => {
    const handleContextmenu = (e) => {
      e.preventDefault();
    };
    document.addEventListener("contextmenu", handleContextmenu);
    return function cleanup() {
      document.removeEventListener("contextmenu", handleContextmenu);
    };
  }, []);

  return (
    <>
      <div className="flex dark:bg-slate-800 pt-20 gap-4 flex-col font-[opensans] lg:flex-row shadow-inner drop-shadow-2xl p-10">
        <div className="w-full p-4 pt-6 dark:bg-slate-800 flex flex-col items-center justify-start">
          <Image
            src="/anp-logo.png"
            className="mb-4"
            alt="ANP Logo"
            width={100}
            height={100}
          />
          <Image
            src="/anp-calligraphy.png"
            className="mb-4"
            alt="عوامي نېشنل پارټي"
            width={200}
            height={200}
          />
          <p className="dark:text-white text-sm text-justify">
            The Awami National Party (ANP) is one of Pakistan's most prominent
            progressive and secular political organizations, with deep roots in
            Pashtun nationalism, social justice, and federalism. The ANP’s
            mission is to promote peace, democracy, and prosperity across
            Pakistan, with a special focus on securing the rights of
            marginalized communities, particularly the Pashtuns. Since its
            founding in 1986, ANP has become a significant voice in Pakistani
            politics, carrying forward the legacy of its founding leaders, Khan
            Abdul Wali Khan and his father, Khan Abdul Ghaffar Khan (known as
            Bacha Khan), whose influence as a champion of nonviolence and social
            justice continues to inspire the party's philosophy and direction.
            <Link
              href="/about"
              className="font-md text-red-500 hover:underline dark:hover:text-white"
            >
              Read More
            </Link>
          </p>
        </div>
        <div className="w-full p-2">
          <NewsletterForm />
        </div>
        <div className="w-full p-2">
          <ImportantLinks />
        </div>
        <div className="w-full p-2">
          <ContactDetails />
        </div>
      </div>
    </>
  );
}
