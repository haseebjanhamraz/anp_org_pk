"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Box from "@mui/material/Box";
import { MdDashboard } from "react-icons/md";
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
        <nav className="flex md:sticky z-50 top-0 flex-wrap items-center justify-between p-3 px-8 bg-gray-100 dark:bg-slate-800">
            {/* Logo Section */}
            <Link href="/" className="flex items-center gap-4">
                <Image src="/anp-logo.png" width={70} height={70} alt="ANP Logo" />
                <div className="text-center">
                    {!isMobile ? (
                        <>

                            <h4 className="text-xl font-extrabold uppercase text-red-500">
                                Awami National Party
                            </h4>
                            <span className="lg:text-md md:text-sm text-gray-400 dark:text-red-800 font-light">
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
