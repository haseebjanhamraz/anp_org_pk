"use client";

import * as React from "react";
import Link from "next/link";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";
import Loader from "../Loader";

export default function LeadershipCarouselSkeleton() {
  return (
    <div className="p-10 mt-36">
      <h1 className="text-4xl text-red-500 dark:text-red-700 font-semibold mb-4 text-center">
        Party Leadership
      </h1>
      <Carousel
        opts={{
          align: "center",
          loop: true,
        }}
        className="w-full max-w-6xl mx-auto px-4"
      >
        <CarouselContent className="">
          {[1, 2, 3, 4].map((_, index) => (
            <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/4">
              <div className="p-1">
                <Card className="dark:bg-slate-700 dark:text-white h-80">
                  <CardContent className="flex flex-col aspect-square items-center justify-center p-6">
                    <div className="relative w-32 h-32 mb-4 rounded-full bg-gray-300 dark:bg-gray-600 animate-pulse" />
                    <span className="w-24 h-6 bg-gray-300 dark:bg-gray-600 rounded animate-pulse mb-2"></span>
                    <span className="w-16 h-4 bg-gray-300 dark:bg-gray-600 rounded animate-pulse mb-4"></span>
                    <Badge className="mt-2 bg-gray-300 dark:bg-gray-600 rounded animate-pulse w-20 h-6" />
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="text-red-500 dark:bg-red-800 dark:text-white" />
        <CarouselNext className="text-red-500 dark:bg-red-800 dark:text-white" />
      </Carousel>
      <div className="flex justify-center">
        <Link href="/leadership-database">
          <Button variant="destructive" className="mt-10 text-center">
            View Leadership Database
          </Button>
        </Link>
      </div>
    </div>
  );
}
