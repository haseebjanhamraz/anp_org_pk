import { Metadata } from "next";
import { generateMetadata } from "../../../MetaData";
import useDocument from "../../../hooks/useDocument";
import PDFViewer from "../../../components/PDFViewer";

export const metadata: Metadata = generateMetadata("/documents");

const DisplayDocument = () => {
  return (
    <>
      <PDFViewer />
    </>
  );
};

export default DisplayDocument;
