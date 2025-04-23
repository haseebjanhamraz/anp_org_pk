"use client";

import { useParams } from "next/navigation";
import useDocument from "../hooks/useDocument";
import DescriptionIcon from "@mui/icons-material/Description";
import {useEffect, useState} from "react" 
import Loader from "./Loader";

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
      <div className="rounded-lg shadow-lg p-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-800">{document.name}</h1>
          <div className="mt-2 text-sm text-gray-600">
            <p>Category: {document.category}</p>
            <p>Language: {document.language}</p>
            <p>Published: {document.publishYear}</p>
          </div>
        </div>

        {pdfUrl ? (
          <iframe
            src={pdfUrl}
            width="100%"
            height="600"
            frameBorder="0"
            scrolling="yes"
            className="rounded-lg"
          />
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
