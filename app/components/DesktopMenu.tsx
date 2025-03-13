import React from "react";
import Link from "next/link";
import { menu } from "../lib/Data";
import { usePathname } from "next/navigation";

export default function DesktopMenu() {
  const pathname = usePathname();

  return (
    <div>
      <ul className="flex gap-6 uppercase font-[opensans] text-2xl font-normal text-red-600 relative">
        {menu.map((item, index) => {
          // Check if the current path matches the parent or any child
          const isActive =
            pathname === item.link ||
            (item.subMenu && pathname.startsWith(item.link));

          return (
            <li key={index} className="relative group">
              {/* Main Menu Item */}
              <Link
                className={`${
                  isActive
                    ? "bg-gray-100 dark:bg-slate-700 dark:text-red-600 py-4 shadow-xl p-2 rounded-lg transition-all duration-300"
                    : "text-slate-800 rounded-lg p-2 hover:bg-slate-200 hover:text-slate-800 dark:hover:bg-red-500 dark:hover:text-white dark:text-red-800 transition-all duration-500"
                }`}
                href={item.link}
              >
                {item.name}
              </Link>

              {/* Submenu */}
              {item.subMenu && (
                <ul className="hidden group-hover:block text-lg w-60 absolute top-full left-0 bg-white dark:bg-slate-800 p-2 shadow-lg rounded-lg">
                  {item.subMenu.map((subItem, subIndex) => {
                    const isSubActive = pathname === subItem.link;

                    return (
                      <li key={subIndex} className="py-1">
                        <Link
                          className={`block px-4 py-2 rounded-lg leading-none ${
                            isSubActive
                              ? "bg-gray-100 dark:bg-slate-700 dark:text-red-600"
                              : "hover:bg-slate-200 dark:hover:bg-red-500 dark:hover:text-white text-slate-800 dark:text-red-600"
                          }`}
                          href={subItem.link}
                        >
                          {subItem.name}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
