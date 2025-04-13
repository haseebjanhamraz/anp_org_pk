"use client";

import { useParams } from "next/navigation";
import useDocument from "../hooks/useDocument";
import DescriptionIcon from "@mui/icons-material/Description";
import Loader from "./Loader";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { pdfjs } from 'react-pdf';

// Initialize pdfjs worker
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

// Dynamically import PDF viewer to avoid SSR issues
const PDFViewer = dynamic(
  () => import("react-pdf").then(mod => {
    const { Document: PDFDocument, Page } = mod;
    return function PDFViewerComponent({ url }: { url: string }) {
      const [numPages, setNumPages] = useState<number>(1);
      const [pageNumber, setPageNumber] = useState<number>(1);

      function onDocumentLoadSuccess({ numPages }: { numPages: number }): void {
        setNumPages(numPages);
      }

      return (
        <div className="pdf-container">
          <PDFDocument
            file={url}
            onLoadSuccess={onDocumentLoadSuccess}
            loading={<Loader />}
            error={<div>Failed to load PDF</div>}
          >
            <Page
              pageNumber={pageNumber}
              renderTextLayer={false}
              renderAnnotationLayer={false}
              className="pdf-page"
            />
          </PDFDocument>
          <div className="pdf-controls">
            <button
              onClick={() => setPageNumber(page => Math.max(page - 1, 1))}
              disabled={pageNumber <= 1}
              className="px-4 py-2 bg-red-500 text-white rounded disabled:opacity-50"
            >
              Previous
            </button>
            <p className="mx-4">
              Page {pageNumber} of {numPages}
            </p>
            <button
              onClick={() => setPageNumber(page => Math.min(page + 1, numPages))}
              disabled={pageNumber >= numPages}
              className="px-4 py-2 bg-red-500 text-white rounded disabled:opacity-50"
            >
              Next
            </button>
          </div>
          <style jsx>{`
            .pdf-container {
              display: flex;
              flex-direction: column;
              align-items: center;
              gap: 1rem;
              padding: 1rem;
            }
            .pdf-controls {
              display: flex;
              align-items: center;
              justify-content: center;
              margin-top: 1rem;
            }
            .pdf-page {
              max-width: 100%;
              height: auto;
            }
          `}</style>
        </div>
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
