"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { docCategories, languages } from "../../lib/Data";

export default function UploadDocumentForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      if (selectedFile.type !== "application/pdf") {
        toast.error("Please upload a PDF file");
        return;
      }
      setFile(selectedFile);
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const formData = new FormData(event.currentTarget);

      // Validate required fields
      const name = formData.get("name");
      const publishYear = formData.get("publishYear");
      const category = formData.get("category");
      const language = formData.get("language");

      if (!name || !publishYear || !category || !language || !file) {
        throw new Error("Please fill in all required fields");
      }

      const response = await fetch("/api/upload-documents", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Failed to upload document");
      }

      setSuccess("Document uploaded successfully");
      toast.success(success);
      router.refresh();
      router.push("/dashboard/documents/create");
    } catch (err: any) {
      setError(err.message);
      toast.error(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-bold">Upload Document</h1>
      {isLoading ? (
        <p>Uploading document...</p>
      ) : (
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4"
          method="post"
          encType="multipart/form-data"
        >
          <div className="flex flex-col gap-2">
            <label className="text-lg font-bold" htmlFor="name">
              Name *
            </label>
            <input
              className="p-2 rounded-md border border-gray-300"
              type="text"
              name="name"
              required
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-lg font-bold" htmlFor="publishYear">
              Publish Year *
            </label>
            <input
              className="p-2 rounded-md border border-gray-300"
              type="number"
              name="publishYear"
              required
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-lg font-bold" htmlFor="lastModifiedYear">
              Last Modified Year
            </label>
            <input
              className="p-2 rounded-md border border-gray-300"
              type="number"
              name="lastModifiedYear"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-lg font-bold" htmlFor="category">
              Category *
            </label>
            <select
              className="p-2 rounded-md border border-gray-300"
              name="category"
              required
            >
              <option value="">Select a category</option>
              {docCategories.map((category, index) => (
                <option key={index} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-lg font-bold" htmlFor="language">
              Language *
            </label>
            <select
              className="p-2 rounded-md border border-gray-300"
              name="language"
              required
            >
              <option value="">Select a language</option>
              {languages.map((language, index) => (
                <option key={index} value={language}>
                  {language}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-lg font-bold" htmlFor="file">
              File (PDF only) *
            </label>
            <input
              className="p-2 rounded-md border border-gray-300"
              type="file"
              name="file"
              accept=".pdf"
              onChange={handleFileChange}
              required
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 disabled:bg-gray-400"
            disabled={isLoading}
          >
            {isLoading ? "Uploading..." : "Upload"}
          </button>
        </form>
      )}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
}
