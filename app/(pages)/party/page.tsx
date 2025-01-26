import LeadershipDatabase from "../leadership-database/page";
import Downloads from "../../components/Downloads";
import PartyDetailsCard from "../../components/PartyDetailsCard";
import LeadershipCarousel from "../../components/LeadershipCarousel";
import { Metadata } from "next";
import { generateMetadata } from "../../MetaData";
import NewsWidget from "../../components/NewsWidget";

export const metadata: Metadata = generateMetadata("/party");
export default function MediaCard() {
  return (
    <div>
      <PartyDetailsCard />
      <LeadershipCarousel />
      <div className="flex flex-col gap-4 lg:flex-row w-full justify-between">
        <Downloads />
        <NewsWidget />
      </div>
    </div>
  );
}
