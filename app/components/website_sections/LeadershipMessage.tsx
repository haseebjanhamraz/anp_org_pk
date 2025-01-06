import Image from "next/image";
import { leadershipMessages } from "../../lib/Data"


// Change message to two columns on smaller screens


export default function LeadershipMessage() {
    return (
        <div className="flex w-full h-screen mt-10 lg:p-20 sm:p-4">
            {leadershipMessages.map((leader, index) =>
                <div key={index} className="w-full flex flex-col items-center text-center">
                    <div className="bg-white rounded-md drop-shadow-xl h-fit px-2 pt-4 w-fit">
                        <Image src={leader.image} width={300} height={300} alt={`${leader.name}'s Image`} />
                    </div>
                    <div className="p-3">
                        <h1 className="text-3xl font-bold text-red-600 dark:text-white">{leader.name}</h1>
                        <p className="text-md mb-3 text-center text-gray-600 px-2 rounded-md md:text-xl">{leader.position}</p>
                        <p className={`text-gray-500 special text-justify md:text-lg sm:text-xs w-auto col-span-2`}>
                            {leader.message}
                        </p>
                    </div>
                </div>
            )}
        </div>
    )
}