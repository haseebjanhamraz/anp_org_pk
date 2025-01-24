import { Metadata } from "next";
import News from "../../components/News";
import { generateMetadata } from "../../MetaData";

export const metadata: Metadata = generateMetadata("/news");

export default function NewsPge() {
  return <News />;
}
