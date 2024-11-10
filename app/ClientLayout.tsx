"use client";
import { usePathname } from "next/navigation";
import { Navbar } from "./components/Navbar";
import Footer from "./components/Footer";

export default function ClientLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();
    return (
        <>
            {pathname.startsWith("/dashboard") ? "" : <Navbar />}
            <main className="p-10 dark:bg-slate-900">
                {children}
            </main>
            <Footer />
        </>
    );
} 