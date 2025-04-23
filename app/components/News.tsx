"use client";

import { useEffect, useState } from "react";
import getPosts from "@/hooks/useWordPress";
import Image from "next/image";
import NewsModal from "./NewsModal";
import Loader from "./Loader";
import TruncateText from "../../utils/Truncate";
export default function News() {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);


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
      <div className="w-full p-8 bg-gray-100 dark:bg-slate-700 rounded-lg text-right">
        <h1 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-6">
          Latest News
        </h1>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {data.map((post, index) => (
            <div
              key={index}
              onClick={() => handlePostClick(post)}
              className="bg-white dark:bg-slate-900 rounded-lg shadow-md overflow-hidden transform transition duration-300 hover:scale-105 cursor-pointer"
            >
              {post.featuredImage ? (
                <Image
                  src={post.featuredImage}
                  alt={post.title}
                  width={400}
                  height={200}
                  className="w-full h-48 object-cover"
                />
              ) : (
                <Image
                  src={"/placeholder.png"}
                  alt="placeholder"
                  width={400}
                  height={200}
                  className="w-full h-48 object-cover"
                />
              )}
              <div className="p-4">
                <h2 className="text-lg font-[nastaleeq] font-semibold text-gray-800 dark:text-white">
                  {/* {post.title.replace("&#8230;", "")} */}
                  <TruncateText
                    text={post.title.replace("&#8230;", "")}
                    maxLength={100}
                  />
                </h2>
                <p className="text-sm text-gray-500 mb-2">
                  {new Date(post.date).toLocaleDateString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
