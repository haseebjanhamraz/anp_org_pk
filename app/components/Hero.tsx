"use client"

import Image from "next/image";
import Link from "next/link";


export default function Hero() {
    return (
        <section className="bg-white dark:bg-gray-900">
            <div className="grid max-w-screen-xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
                <div className="mr-auto place-self-center lg:col-span-7 animate-in zoom-in-50 duration-500">
                    <h1 className="max-w-2xl mb-4 text-3xl text-center font-bold uppercase tracking-tight leading-none text-red-500 md:text-5xl xl:text-6xl dark:text-white font-[Bebas Neue]">
                        Awami National Party
                    </h1>
                    <p className="max-w-2xl mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-lg dark:text-gray-400 text-justify">
                        The Awami National Party (ANP) has its origins rooted in the socio-political struggles of Khan Abdul Ghaffar Khan, famously known as Bacha Khan. He was a prominent Pashtun leader who, during the British colonial period, advocated for nonviolent resistance and established the Khudai Khidmatgar (Servants of God) movement in 1929. This movement was revolutionary, promoting nonviolence, justice, and unity within the Pashtun community, while challenging the oppressive British colonial system.
                        The Khudai Khidmatgar movement quickly gained popularity, mobilizing thousands of Pashtuns in British India and aligning ideologically with the Indian National Congress.
                    </p>
                    <div className="flex">
                        <Link href="#" className="inline-flex items-center justify-center px-5 py-3 mr-3 text-base font-medium text-center text-white rounded-lg bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-primary-300 dark:focus:ring-primary-900">
                            Get Registered
                            <svg className="w-5 h-5 ml-2 -mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                        </Link>
                        <Link href="/about" className=" px-5 py-3 text-base font-medium text-center text-gray-900 border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 dark:text-white dark:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-800">
                            Learn more
                        </Link>
                    </div>
                </div>
                <div className="w-full items-center gap-2 flex-col lg:mt-0 lg:col-span-5 lg:flex animate-in slide-in-from-right-96 duration-500">
                    <div className="w-fit p-10">
                        <Image src="/yawa-lara.png"
                            alt="mockup"
                            width={120}
                            height={120}
                            className="object-contain w-full h-full rounded-lg hidden lg:block"
                        />
                    </div>
                    <Image src="/leadership.png"
                        alt="mockup"
                        width={300}
                        height={300}
                        className="z-100 rounded-lg hidden lg:block"
                    />
                    <div className="w-fit p-10">
                        <Image src="/yaw-manzal.png"
                            alt="mockup"
                            width={120}
                            height={120}
                            className="object-contain w-full h-full rounded-lg hidden lg:block"
                        />
                    </div>
                </div>
            </div>
        </section>
    )
}
