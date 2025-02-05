import DarkModeToggle from "../DarkModeToggle";
import CurrentDateTime from "./CurrentDateTime";
import { useSession } from "next-auth/react";
import AccountMenu from "./AccountMenu";


export default function Header() {
  return (
    <div className="flex justify-between items-center">
      <div className="flex flex-col sm:flex-row justify-evenly items-start sm:items-center gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold dark:text-white">Dashboard</h1>
          <p className="text-gray-600 dark:text-gray-300">
            Welcome,
            <span className="font-bold"> {useSession().data?.user?.name}</span>
          </p>
        </div>
      </div>
      <CurrentDateTime/>
      <div className="flex gap-1">
        <DarkModeToggle />
        <AccountMenu />
      </div>
    </div>
  );
}
