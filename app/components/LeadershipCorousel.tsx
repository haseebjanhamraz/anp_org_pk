import useGetLeadership from "../hooks/useGetLeadership"
import { useCabinet } from '../hooks/useCabinet';
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "./ui/carousel"
import { Divider } from "@mui/material";
import SingleLeaderCard from "./SingleLeaderCard";
export default function LeadershipCarousel() {
    const { leaders, loading } = useGetLeadership();
    const { cabinets } = useCabinet();

    return (
        <div className="p-10">
            <Carousel>
                <CarouselContent>
                    {/* <h1 className="font-bold text-center">{cabinet.cabinetType.toUpperCase()} Cabinet</h1> */}
                    {cabinets.map((cabinet, index) => (
                        <CarouselItem key={index} className="flex flex-wrap">
                            {leaders.map((leader, index) => (
                                <>
                                    <SingleLeaderCard key={index} leader={leader} cab={cabinet.cabinetType} />
                                </>
                            ))}
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious className="dark:text-white" />
                <CarouselNext className="dark:text-white" />
            </Carousel>
        </div>


    )
}

