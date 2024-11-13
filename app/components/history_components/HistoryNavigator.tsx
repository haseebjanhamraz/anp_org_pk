"use client";
import * as React from 'react';
import { useState, useEffect } from 'react';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';

export default function HistoryNavigator() {
    const [isOpen, setIsOpen] = useState(false);

    const sections = [
        { id: "overview", title: "Overview of Pashtun Nationalism" },
        { id: "bachakhan", title: "Bacha Khan and Non-violent Resistance" },
        { id: "partition", title: "Partition of India" },
        { id: "nap-wali", title: "NAP and Rise of Wali Khan" },
        { id: "nap-alliance", title: "NAP Alliance with Pakistan" },
        { id: "anp-formation", title: "The Formation of ANP" },
        { id: "repression", title: "Political Repression and Challenges" },
        { id: "democratic-era", title: "Democratic Era and ANP's Role" },
        { id: "terrorism", title: "ANP's Stance on Terrorism" },
        { id: "recent", title: "ANP in Recent Decades" }
    ];

    // Close menu when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            const menu = document.getElementById('toc-menu');
            const button = document.getElementById('toc-button');
            if (isOpen && menu && button &&
                !menu.contains(event.target as Node) &&
                !button.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [isOpen]);

    const scrollToSection = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            const offset = 100; // Adjust offset to account for fixed header
            const elementPosition = element.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - offset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
            setIsOpen(false);
        }
    };

    return (
        <div className="relative dark:bg-slate-900 dark:text-white mt-10">

            <button
                id="toc-button"
                onClick={() => setIsOpen(!isOpen)}
                className="fixed top-30 right-4 z-50 bg-white dark:bg-slate-900 p-4 shadow-md rounded-md flex items-center gap-2 hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors"
            >
                <span>Table of Contents</span>
                {isOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />}
            </button>


            {isOpen && (
                <div
                    id="toc-menu"
                    className="fixed top-30 right-[230px] z-50 bg-white dark:bg-slate-900 p-4 shadow-md rounded-md max-h-[80vh] overflow-y-auto"
                >
                    <ul className="flex flex-col gap-2">
                        {sections.map((section) => (
                            <li
                                key={section.id}
                                onClick={() => scrollToSection(section.id)}
                                className="px-4 py-2 text-sm bg-red-900 cursor-pointer text-white rounded-md hover:bg-red-700 transition-colors whitespace-nowrap"
                            >
                                {section.title}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}
