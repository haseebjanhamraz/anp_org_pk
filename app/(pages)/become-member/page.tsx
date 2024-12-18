"use client"
import Link from "next/link";
import Image from "next/image";
import  MembershipForm  from "../../components/MembershipForm";
export default function BecomeMember() {

    return (

        <div className="flex flex-wrap lg:flex-nowrap w-full dark:bg-slate-800 rounded-lg">
        <div className=" animate-in slide-in-from-left-60 delay-3000 w-full block bg-fixed bg-[url('/markaz.png')] bg-contain bg-no-repeat dark:bg-blend-overlay dark:bg-black/50 rounded-lg">
        </div>
        <div className="flex flex-col w-full shadow-inner h-dvh p-20 items-center justify-start">
            <Image src="/leadership.png" alt="ANP Logo" width={250} height={250}/>
            <h1 className="text-5xl dark:text-white  animate-in duration-1000 slide-in-from-right-60">Become 
                <span className="font-extrabold text-red-600">ANP</span>
                Member
            </h1>
            <p className="text-lg text-justify my-5 font-thin dark:text-white animate-in duration-1000 slide-in-from-left-60">
                We welcome everyone who work for their nation prosperity, peace and development can join Awami National Party!
                <br />
                You can do online registration here with your real legal name, email, phone number and other information.
            </p>
            <div className="animate-in duration-1000 slide-in-from-bottom-60">
            <MembershipForm />
            </div>

            <p className="text-sm text-justify my-5 font-thin dark:text-gray-400">Read <Link href="/terms-and-conditions" className="text-red-600">Terms and Conditions</Link> before registration.</p>
        </div>
    </div>
    )
};