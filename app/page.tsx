import Hero from "./components/Hero";
import BachaKhanQuotes from "./components/website_sections/BachaKhanQuotes";
import Downloads from "./components/Downloads";
import LeaderCard from "./components/LeaderCard";
import Divider from "@mui/material/Divider";

export default function Home() {
  return (
    <div>
      <Hero />
      <BachaKhanQuotes />
      <div className="flex flex-col md:flex-row mt-10 gap-10 justify-center">
        <div className="px-4 md:px-0">
          <h1 className="text-2xl font-bold text-center md:text-left dark:text-white">Downloads</h1>
          <Divider className="my-2 dark:border-gray-500" />
          <Downloads />
        </div>
        <div className="px-4 md:px-0">
          <h1 className="text-2xl ml-10 font-bold text-center md:text-left dark:text-white">Leadership</h1>
          <Divider className="my-2 dark:border-gray-500" />
          <LeaderCard />
        </div>
      </div>
    </div>
  );
}
