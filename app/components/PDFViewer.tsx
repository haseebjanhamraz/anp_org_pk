"use client";

import { useParams } from "next/navigation";
import useDocument from "../hooks/useDocument";
import DescriptionIcon from "@mui/icons-material/Description";
import Loader from "./Loader";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import type { RenderPageProps } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";

// Dynamically import PDF viewer components
const PDFViewer = dynamic(
  () => import("@react-pdf-viewer/core").then((mod) => {
    const { Worker, Viewer } = mod;
    return function PDFViewerComponent({ url }: { url: string }) {
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

      return (
        <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
          <div style={{ height: "750px" }}>
            <Viewer fileUrl={url} renderPage={renderPage} />
          </div>
        </Worker>
      );
    };
  }),
  {
    ssr: false,
    loading: () => <Loader />,
  }
);

const DocumentViewer = () => {
  const params = useParams();
  const { document, loading, error } = useDocument(params.id as string);
  const [pdfUrl, setPdfUrl] = useState<string>("");

  useEffect(() => {
    if (document?.filepath) {
      setPdfUrl(document.filepath);
    }
  }, [document]);

  if (loading) return <Loader />;
  if (error) return <div>Error loading document: {error.message}</div>;
  if (!document) return <div>Document not found</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-800">{document.name}</h1>
          <div className="mt-2 text-sm text-gray-600">
            <p>Category: {document.category}</p>
            <p>Language: {document.language}</p>
            <p>Published: {document.publishYear}</p>
          </div>
        </div>
        
        {pdfUrl ? (
          <PDFViewer url={pdfUrl} />
        ) : (
          <div className="flex items-center justify-center h-96 bg-gray-100 rounded-lg">
            <DescriptionIcon className="text-gray-400 text-6xl" />
          </div>
        )}
      </div>
    </div>
  );
};

export default DocumentViewer;
