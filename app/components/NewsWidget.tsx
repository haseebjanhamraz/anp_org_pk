"use client";

import { useEffect, useState } from "react";
import getPosts from "../hooks/useWordPress";
import TruncateText from "../utils/Truncate";
import NewsModal from "./NewsModal";
import Loader from "./Loader";

export default function News() {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);

  const perPage = 4;

  useEffect(() => {
    loadPosts();
  }, []);

  const loadPosts = async () => {
    try {
      const response = await getPosts();
      setData((prev) => [...prev, ...response]);
      setIsLoading(false);
    } catch (error) {
      setError(error);
      setIsLoading(false);
    }
  };

  const handlePostClick = (post) => {
    setSelectedPost(post);
    setOpenModal(true);
  };

  if (isLoading) return <Loader />;
  if (error)
    return <p className="text-center text-red-500">Error: {error.message}</p>;
  return (
    <>
      {openModal && (
        <NewsModal post={selectedPost} onClose={() => setOpenModal(false)} />
      )}
      <div className="flex flex-col gap-4 w-full mt-20 dark:border-2 dark:border-solid dark:border-gray-600 rounded-md shadow-lg p-4">
        <h1 className="text-4xl dark:text-white font-semibold mb-4 text-center">
          News & Updates{" "}
        </h1>
        {data.slice(0, perPage).map((post, index) => (
          <div
            key={index}
            onClick={() => handlePostClick(post)}
            className="bg-white dark:bg-slate-900 rounded-lg shadow-md overflow-hidden transform transition duration-300 hover:scale-105 cursor-pointer"
          >
            <div className="p-4">
              <h2 className="text-xl font-[nastaleeq] text-right font-semibold text-gray-800 dark:text-white hover:text-red-700">
                <TruncateText
                  text={post.title.replace("&#8230;", "")}
                  maxLength={250}
                />
              </h2>
              <p className="text-sm text-gray-500 mb-2">
                {new Date(post.date).toLocaleDateString()}
              </p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
