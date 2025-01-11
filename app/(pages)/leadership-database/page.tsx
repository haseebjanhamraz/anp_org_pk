import LeadershipDatabase from "../../components/LeadershipDBTable";
import { Metadata } from "next";
import { generateMetadata } from "../../MetaData";

export const metadata: Metadata = generateMetadata("/leadership-database");
export default function LeadershipDatabasePage() {
  return (
    <div>
      <LeadershipDatabase />
    </div>
  );
}
