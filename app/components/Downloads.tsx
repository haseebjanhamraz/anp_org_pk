"use client";
import useGetDocuments from "../hooks/useGetDocuments";
import DownloadsList from "./DownloadsList";
import DownloadsListSkeleton from "./skeletons/DownloadsListSkeleton";
import React from "react";

const Downloads = () => {
  const { documents, loading } = useGetDocuments();
  return (
    <div className="w-full mt-20 dark:border-2 dark:border-solid dark:border-gray-600 rounded-md shadow-lg p-4">
      <h1 className="text-4xl dark:text-white font-[opensans] font-semibold mb-4 text-center">
        Downloads & Documents{" "}
      </h1>
      <React.Suspense fallback={<DownloadsListSkeleton />}>
        {loading ? (
          <DownloadsListSkeleton />
        ) : (
          <DownloadsList documents={documents} />
        )}
      </React.Suspense>
    </div>
  );
};

export default Downloads;
