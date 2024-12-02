import Image from "next/image";
import { useCabinet } from "../hooks/useCabinet";
import { CabinetBadge } from "./CabinetBadge";

export default function SingleLeaderCard({ leader, cab }) {
    const { cabinets } = useCabinet();

    function getCabinetName() {
        const cabinet = cabinets.find((cab) => cab._id === leader.cabinet); // Match by ID
        return cabinet ? cabinet.cabinetType : "Unknown Cabinet"; // Return name or fallback
    }
    let cabinetName = getCabinetName()

    return (
        <div className="">
            {cab === cabinetName ?
                <div className="text-center dark:bg-slate-700 dark:text-white dark:border-white rounded-lg shadow-md p-2 w-auto mx-3 my-2">
                    <div className="flex flex-col items-center gap-2">
                        <Image src={leader.imageUrl} alt={`${leader.name}s image`} width={100} height={100} className="shadow" />
                        <h2 className="text-lg sm:text-xsm font-bold">{leader.name}</h2>
                        <p className="text-sm text-gray-600">{leader.position}</p>
                        <CabinetBadge cabinetType={cab.toUpperCase()} />
                    </div>
                </div>
                : (
                    ""
                )}
        </div>
    );
}
