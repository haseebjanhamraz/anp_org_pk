"use client"

import { useState, useEffect } from "react";
import Image from "next/image";
import Box from '@mui/material/Box';
import { socialMedia } from '../lib/Data';
import DarkModeToggle from "./DarkModeToggle";
import Link from "next/link";
import DesktopMenu from "./DesktopMenu";
import MobileMenu from "./MobileMenu";

export const Navbar = () => {
    const [isMobile, setIsMobile] = useState(false);
    const [showMobileMenu, setShowMobileMenu] = useState(false);

    // Update the screen size state on resize
    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 768);
        handleResize(); // Initial check
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
        <div className="flex sticky top-0 flex-wrap gap-4 p-3 px-8 bg-gray-100 dark:bg-slate-800 items-center justify-between">
            <div className="flex items-center gap-4">
                <Image
                    src="/anp-logo.png"
                    width={70}
                    height={70}
                    alt="ANP Logo"
                />
                <div className="text-center">
                    <h4 className="text-2xl font-extrabold uppercase text-red-500">Awami National Party</h4>
                    <span className="text-gray-400 dark:text-red-800 font-light">PEACE - DEMOCRACY - DEVELOPMENT</span>
                </div>
            </div>

            {/* Conditional Rendering of Desktop and Mobile Menu */}
            <div className="hidden md:block">
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        '& > *': {
                            m: 1,
                        },
                    }}
                >
                    {!isMobile && <DesktopMenu />}
                </Box>
            </div>

            {isMobile ?
                <MobileMenu />
                : ""}
            {/* Social Media Links */}
            {!isMobile ?
                <div>
                    <ul className="flex gap-2 text-3xl text-red-600">
                        {socialMedia.map((item, index) => (
                            <li className="flex" key={index}>
                                <Link href={item.link} target="_blank">
                                    {<item.icon />}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
                : ""}

            {/* Dark Mode Toggle */}

            {!isMobile &&
                <DarkModeToggle />
            }

            {/* Mobile Menu */}
            <div className="md:hidden">
                {isMobile && showMobileMenu && <MobileMenu />}
            </div>
        </div>
    );
};
