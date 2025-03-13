import React from "react";
import Image from "next/image";

export default function DashboardPage() {
  return (
    <div className="min-h-screen flex">
      <main className="flex-1 p-4 md:p-6 lg:p-8">
        <div
          className="
                grid lg:grid-cols-4 md:grid-cols-2 gap-2 dark:text-black
                "
        >
          <div className="flex flex-col gap-2 items-center justify-center h-auto bg-orange-200 dark:bg-orange-400 rounded-lg p-4">
            <Image
              src={"/icons/leadership.png"}
              width={50}
              height={50}
              alt="icon"
            />
            <h4 className="text-xl font-medium font-[opensans]">400 Leaders</h4>
            <div className="flex justify-center items-center leading-3 gap-2 flex-wrap">
              <p className="font-[opensans]">
                Central: <span>500</span>
              </p>
              <p className="font-[opensans]">
                Pakhtunkhwa: <span>500</span>
              </p>
              <p className="font-[opensans]">
                Punjab: <span>500</span>
              </p>
              <p className="font-[opensans]">
                Sindh: <span>500</span>
              </p>
              <p className="font-[opensans]">
                Balochistan: <span>500</span>
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-2 items-center justify-center h-auto bg-blue-200 rounded-lg p-4">
            <Image
              src={"/icons/folders.png"}
              width={50}
              height={50}
              alt="icon"
            />
            <h4 className="text-xl font-medium font-[opensans]">
              30 Documents
            </h4>
            <div className="flex justify-center items-center leading-3 gap-2 flex-wrap">
              <p className="font-[opensans]">
                Constitution: <span>5</span>
              </p>
              <p className="font-[opensans]">
                Manifesto: <span>500</span>
              </p>
              <p className="font-[opensans]">
                Publication: <span>500</span>
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
