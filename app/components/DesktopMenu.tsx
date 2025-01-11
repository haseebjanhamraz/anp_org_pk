import React from "react";
import Link from "next/link";
import { menu } from "../lib/Data";
import { usePathname } from "next/navigation";

export default function DesktopMenu() {
  const pathname = usePathname();
  return (
    <div>
      <ul className="flex gap-2 uppercase text-lg font-bold text-red-600">
        {menu.map((item, index) => (
          <li key={index}>
            <Link
              className={`text-red-500 ${
                pathname === item.link
                  ? "bg-gray-200 p-2 rounded-lg"
                  : "text-red-800 rounded-lg p-2 hover:bg-red-100 dark:hover:bg-red-500 dark:hover:text-white dark:text-red-800 transition-all duration-500"
              }`}
              href={item.link}
            >
              {item.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
