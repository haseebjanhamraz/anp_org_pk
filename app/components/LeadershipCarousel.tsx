"use client";

import * as React from "react";
import Link from "next/link";
import LeadershipCarouselSkeleton from "./skeletons/LeadershipSkeleton";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  CarouselApi,
} from "./ui/carousel";
import useGetLeadership from "@/hooks/useGetLeadership";
import Image from "next/image";
import Loader from "./Loader";
import { cabinets, positions } from "../../lib/Data";

export default function LeadershipCarousel() {
  const { leaders, loading } = useGetLeadership();
  const [api, setApi] = React.useState<CarouselApi>();
  const [isPaused, setIsPaused] = React.useState(false);

  React.useEffect(() => {
    if (!api) return;

    // Start autoplay
    const interval = setInterval(() => {
      if (!isPaused) {
        api.scrollNext();
      }
    }, 3000); // Change slide every 3 seconds

    // Cleanup interval on unmount
    return () => clearInterval(interval);
  }, [api, isPaused]);

  if (loading) {
    return <LeadershipCarouselSkeleton />;
  }

  // Filter leaders to only show Central cabinet
  const centralLeaders = leaders.filter(
    (leader) =>
      leader.cabinet === "Central" ||
      leader.cabinet === "Khyber Pakhtunkhwa" ||
      leader.cabinet === "Balochistan" ||
      leader.cabinet === "Sindh" ||
      leader.cabinet === "Punjab"
  );
  centralLeaders.sort(
    (a, b) => positions.indexOf(a.position) - positions.indexOf(b.position)
  );
  centralLeaders.sort(
    (a, b) => cabinets.indexOf(a.cabinet) - cabinets.indexOf(b.cabinet)
  );

  return (
    <div className="p-10 mt-36">
      <h1 className="text-4xl font-[opensans] dark:text-white font-semibold mb-4 text-center">
        Party Leadership
      </h1>
      <div
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <Carousel
          opts={{
            align: "center",
            loop: true,
          }}
          className="w-full max-w-6xl mx-auto px-4"
          setApi={setApi}
        >
          <CarouselContent className="">
            {centralLeaders.map((leader, index) => (
              <CarouselItem
                key={leader._id || index}
                className="md:basis-1/2 lg:basis-1/4"
              >
                <div className="p-1">
                  <Card className="dark:bg-slate-700 dark:text-white h-80">
                    <CardContent className="flex flex-col aspect-square items-center justify-center p-6">
                      {loading && <Loader />}
                      {leader.imageUrl && (
                        <div className="relative w-32 h-32 mb-4 rounded-full overflow-hidden">
                          <Image
                            src={leader.imageUrl}
                            alt={leader.name}
                            fill
                            sizes="100px 100px"
                            className="object-cover"
                          />
                        </div>
                      )}
                      <span className="text-2xl font-semibold text-center leading-none">
                        <Link
                          href={`/party/leadership/${leader._id}`}
                          className="hover:underline hover:text-red-600 font-[opensans] font-medium"
                        >
                          {leader.name.length > 20
                            ? leader.name.slice(0, 25) + "..."
                            : leader.name}
                        </Link>
                      </span>
                      {leader.position && (
                        <span className="text-sm text-neutral-500 dark:text-neutral-400 mt-2 text-center">
                          {leader.position}
                        </span>
                      )}
                      <Badge className="mt-2 bg-red-800 dark:bg-red-600 hover:bg-red-900 dark:hover:bg-red-700 dark:text-white">
                        {leader.cabinet}
                      </Badge>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="text-red-500 dark:bg-red-800 dark:text-white" />
          <CarouselNext className="text-red-500 dark:bg-red-800 dark:text-white" />
        </Carousel>
      </div>
      <div className="flex justify-center">
        <Link href="/leadership-database">
          <Button
            variant="destructive"
            className="mt-10 text-center hover:bg-red-600"
          >
            View All Leadership
          </Button>
        </Link>
      </div>
    </div>
  );
}
