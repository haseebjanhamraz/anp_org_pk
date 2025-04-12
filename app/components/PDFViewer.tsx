"use client";

import { useParams } from "next/navigation";
import useDocument from "../hooks/useDocument";
import useGetDocuments from "../hooks/useGetDocuments";
import DescriptionIcon from "@mui/icons-material/Description";
import Loader from "./Loader";
import Link from "next/link";
import {
  Worker,
  Viewer,
  RenderPageProps,
  ProgressBar,
} from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";

const renderPage = (props: RenderPageProps) => {
  return (
    <>
      {props.canvasLayer.children}
      <div
        style={{
          userSelect: "none",
          alignItems: "center",
          display: "flex",
          height: "100%",
          justifyContent: "center",
          left: 0,
          position: "absolute",
          top: 0,
          width: "100%",
        }}
      >
        <div
          style={{
            color: "rgba(0, 0, 0, 0.2)",
            fontSize: `${5 * props.scale}rem`,
            fontWeight: "bold",
            textTransform: "uppercase",
            transform: "rotate(-45deg)",
            userSelect: "none",
          }}
        >
          @ANPMarkaz
        </div>
      </div>
      {props.textLayer.children}
      {props.annotationLayer.children}
    </>
  );
};

const PDFViewer = () => {
  const params = useParams();
  const { document, loading } = useDocument(params.id as string);
  // Related documents
  const { documents, loading: loadingDocuments } = useGetDocuments();

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="flex gap-4 flex-col md:flex-row sm:flex-col w-full overflow-hidden shadow-lg rounded-lg">
      {/* Document Information Section */}
      <div className="top-30 p-5 md:p-8 md:w-1/3 space-y-3 bg-gray-100 dark:bg-gray-800">
        <div className="flex gap-1">
          <DescriptionIcon className="text-gray-300" fontSize="large" />
          <div className="flex flex-col gap-3">
            <h1 className="text-2xl md:text-5xl font-bold dark:text-white">
              {document.name}
            </h1>
            <div className="border-2 border-gray-300 w-fit px-2 py-1 rounded-lg">
              <h5 className="text-lg font-medium text-gray-600 dark:text-gray-200">
                {document.publishYear}
              </h5>
            </div>
          </div>
        </div>
        <div className="flex flex-wrap gap-3 mt-5 p-4">
          <p className="px-3 py-1 bg-red-400 dark:bg-red-700 w-fit rounded-lg text-sm text-white font-bold">
            Category: {document.category}
          </p>
          <p className="px-3 py-1 bg-yellow-400 dark:bg-yellow-700 dark:text-white w-fit rounded-lg text-sm font-bold">
            Language: {document.language.toUpperCase()}
          </p>
          <p className="px-3 py-1 bg-orange-400 w-fit dark:bg-orange-700 text-white rounded-lg text-sm font-bold">
            Format: PDF
          </p>
          <p className="px-3 py-1 bg-pink-400 w-fit dark:bg-pink-700 text-white rounded-lg text-sm font-bold">
            Downloadable: Yes
          </p>
          <p className=" py-1 text-gray-600 dark:text-gray-100 text-sm">
            This document is officially published by the Awami National Party
            (ANP), reflecting its commitment to transparency and effective
            communication with its members and the public. As a progressive
            political organization, ANP ensures that all official publications
            adhere to the highest standards of accuracy and authenticity. This
            document serves as an authoritative source of information,
            representing the party's values, vision, and initiatives aimed at
            fostering democracy, equality, and social justice. It underscores
            ANP's dedication to empowering communities and promoting a
            harmonious society through informed and active civic engagement.
          </p>
        </div>
        {loadingDocuments ? (
          <Loader />
        ) : (
          <div className="mt-5">
            <h2 className="text-2xl font-bold dark:text-white">
              Related Documents
            </h2>
            {documents.map((doc, index) => (
              <div
                key={index}
                className="bg-gray-100 dark:bg-gray-800 px-1 mt-2"
              >
                <Link href={`/documents/${doc._id}`}>
                  <h2 className="text-sm dark:text-white hover:text-xl p-2 hover:bg-red-500 transition-all duration-500">
                    {document.category !== doc.category ? doc.name : null}
                  </h2>
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* PDF Viewer Section */}
      <div className="flex-grow">
        <div className="w-full h-screen rounded-md overflow-hidden border dark:border-gray-700">
          <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js">
            <Viewer
              fileUrl={document.filepath}
              renderPage={renderPage}
              renderLoader={(percentages: number) => (
                <div style={{ width: "240px" }}>
                  <ProgressBar progress={Math.round(percentages)} />
                </div>
              )}
            />
          </Worker>
        </div>
      </div>
    </div>
  );
};

export default PDFViewer;
