"use client";

import { useParams } from "next/navigation";
import useDocument from "../hooks/useDocument";
import useGetDocuments from "../hooks/useGetDocuments";
import DescriptionIcon from '@mui/icons-material/Description';
import Loader from "./Loader";
import Link from "next/link";
import { useState } from "react";

const PDFViewer = () => {
  const params = useParams();
  const { document, loading } = useDocument(params.id as string);
  const [category, setCategory] = useState("")

  // Related documents
  const { documents, loading: loadingDocuments } = useGetDocuments();

  if (loading) {
    return <Loader/>
  }

  return (
    <div className="flex gap-4 flex-col md:flex-row sm:flex-col w-full overflow-hidden shadow-lg rounded-lg">
      {/* Document Information Section */}
      <div className="top-30 p-5 md:p-8 md:w-1/3 space-y-3 bg-gray-100 dark:bg-gray-800">
        <div className="flex gap-1">
        <DescriptionIcon className="text-gray-300" fontSize= "large"/>
        <h1 className="text-2xl md:text-5xl font-bold dark:text-white">
          {document.name}
        </h1>
        </div>
        <div className="flex flex-wrap gap-3 mt-5 p-4">
          <p className="px-3 py-1 bg-red-400 dark:bg-red-700 w-fit rounded-lg text-sm text-white font-bold">
            Category: {document.category}
          </p>
          <p className="px-3 py-1 bg-yellow-400 dark:bg-yellow-700 dark:text-white w-fit rounded-lg text-sm font-bold">
            Language: {document.language.toUpperCase()}
          </p>
          <p className="px-3 py-1 bg-purple-400 dark:bg-purple-700 w-fit text-white rounded-lg text-sm font-bold">
            Publish Year: {document.publishYear}
          </p>
          <p className="px-3 py-1 bg-orange-400 w-fit dark:bg-orange-700 text-white rounded-lg text-sm font-bold">
            Format: PDF
          </p>
          <p className="px-3 py-1 bg-pink-400 w-fit dark:bg-pink-700 text-white rounded-lg text-sm font-bold">
            Downloadable: Yes
          </p>
          <p className="px-3 py-1 text-justify text-gray-500 text-sm">
          This document is officially published by the Awami National Party (ANP), reflecting its commitment to transparency and effective communication with its members and the public. As a progressive political organization, ANP ensures that all official publications adhere to the highest standards of accuracy and authenticity. This document serves as an authoritative source of information, representing the party's values, vision, and initiatives aimed at fostering democracy, equality, and social justice. It underscores ANP's dedication to empowering communities and promoting a harmonious society through informed and active civic engagement.
          </p>
        </div>
        {loadingDocuments ? <Loader/> : (
          <div className="mt-5">
            <h2 className="text-2xl font-bold dark:text-white">
              Related Documents
            </h2>
            {documents.map((doc, index) => (
              <div key={index} className="bg-gray-100 dark:bg-gray-800 px-5">
                <Link href={`/display-doc/${doc._id}`}>
                <h2 className="text-sm dark:text-white hover:text-lg hover:font-bold dark:hover:text-red-500 hover:text-red-800 cursor-pointer transition-all duration-500">
                  {document.category !== doc.category ? (doc.name) : ""}
                </h2>
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* PDF Viewer Section */}
      <div className="flex-grow transition-all duration-200 mb-10">
        <div className="w-full h-full rounded-md overflow-hidden border dark:border-gray-700">
          <embed
            src={document.filepath || null}
            className="w-full h-svh"
            type="application/pdf"
          />
        </div>
      </div>
    </div>
  );
};

export default PDFViewer;
