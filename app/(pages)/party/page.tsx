import LeadershipDatabase from "../leadership-database/page";
import Downloads from "../../components/Downloads";
import PartyDetailsCard from "../../components/PartyDetailsCard";
import LeadershipCarousel from "../../components/LeadershipCarousel";
import { Metadata } from "next";
import { generateMetadata } from "../../MetaData";

export const metadata: Metadata = generateMetadata("/party");
export default function MediaCard() {
  return (
    <div>
      <PartyDetailsCard />
      <LeadershipCarousel />
      <Downloads />
    </div>
  );
}
