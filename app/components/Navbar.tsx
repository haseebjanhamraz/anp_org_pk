"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Box from "@mui/material/Box";
import { Divider } from "@mui/material";
import Link from "next/link";
import DarkModeToggle from "./DarkModeToggle";
import DesktopMenu from "./DesktopMenu";
import MobileMenu from "./MobileMenu";
import useUser from "../hooks/useUser";

export const Navbar = () => {
  const [isMobile, setIsMobile] = useState(false);
  const user = useUser();

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1020);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <nav className="flex sticky z-50 top-0 flex-wrap items-center justify-between p-3 px-8 bg-gray-100 dark:bg-slate-800">
      {/* Logo Section */}
      <Link href="/" className="flex items-center gap-4">
        <Image src="/anp-logo.png" width={70} height={70} alt="ANP Logo" />
        <div className="text-center">
          {!isMobile ? (
            <>
              <h4 className="text-3xl font-extrabold uppercase text-red-500 font-[Teko]">
                Awami National Party
              </h4>
              <Divider className="bg-red-100 dark:bg-red-900" />
              <span className="lg:text-md md:text-md font-[Teko] text-gray-500 dark:text-gray-400 font-light">
                PEACE - DEMOCRACY - DEVELOPMENT
              </span>
            </>
          ) : null}
        </div>
      </Link>

      {/* Menu Section */}
      <div className="flex items-center justify-center gap-4">
        {isMobile ? (
          <MobileMenu />
        ) : (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              "& > *": {
                m: 1,
              },
            }}
          >
            <DesktopMenu />
          </Box>
        )}
        <DarkModeToggle />
      </div>
    </nav>
  );
};
