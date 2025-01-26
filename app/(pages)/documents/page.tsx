import Downloads from "../../components/Downloads";
import { Metadata } from "next";
import { generateMetadata } from "../../MetaData";

export const metadata: Metadata = generateMetadata("/documents");

export default function page() {
  return <Downloads />;
}
