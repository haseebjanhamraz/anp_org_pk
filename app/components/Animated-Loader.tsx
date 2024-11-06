"use client";

import React from "react";

export default function AnimatedLoader() {
    return (
        <div className="flex flex-col gap-4 items-center justify-center bg-slate-800 min-h-screen">
            <h1 className="text-white text-2xl font-bold">Dashboard Loading...</h1>
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-500"></div>
        </div>
    );
}
