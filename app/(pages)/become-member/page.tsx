import Link from "next/link";
export default function BecomeMember() {

    return <div className="flex flex-wrap lg:flex-nowrap w-full dark:bg-slate-800">
        <div className="w-full h-dvh bg-[url('/jalalabad-bacha-khan-tomb.png')] bg-cover bg-center">
        
        </div>
        <div className="flex flex-col w-full shadow-inner h-dvh p-20 items-center justify-start">
            <h1 className="text-5xl dark:text-white">Become <span className="font-extrabold animate-in slide-in-from-top text-red-600">ANP</span> Member</h1>
            <p className="text-lg text-justify my-5 font-thin dark:text-white">
                We welcome everyone who work for their nation prosperity, peace and development can join Awami National Party!
                <br />
                You can do online registration here with your real legal name, email, phone number and other information.
            </p>
            
            <p className="text-sm text-justify my-5 font-thin dark:text-gray-400">Read <Link href="/terms-and-conditions" className="text-red-600">Terms and Conditions</Link> before registration.</p>
        </div>
    </div>;
};