import SingleLeaderDetails from "../../../../components/website_sections/SingleLeaderDetails";
import { Metadata } from "next";
import { generateMetadata } from "../../../../MetaData";


export const metadata: Metadata = generateMetadata("/party/leadership/");

export default function LeaderDetails() {
    return (
        <SingleLeaderDetails />
    );
}
