"use client";

import { useEffect, useState } from "react";
import getPosts from "../hooks/useWordPress";
import Image from "next/image";
import NewsModal from "./NewsModal";
import Loader from "./Loader";

export default function News() {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const perPage = 5;

  useEffect(() => {
    loadPosts();
  }, [page]);

  const loadPosts = async () => {
    try {
      const response = await getPosts(page, perPage);
      setData((prev) => [...prev, ...response]);
      setHasMore(response.length === perPage); // Check if more posts are available
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

  if (isLoading && page === 1) return <Loader />;
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
          {data.map((post) => (
            <div
              key={post.id}
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
                <h2 className="text-lg font-nastaleeq font-semibold text-gray-800 dark:text-white">
                  {post.title.replace("&#8230;", "")}
                </h2>
                <p className="text-sm text-gray-500 mb-2">
                  {new Date(post.date).toLocaleDateString()}
                </p>
                <p className="text-sm text-gray-600">
                  {post.excerpt.match(/(<([^>]+)>p)/gi, "")}
                </p>
              </div>
            </div>
          ))}
        </div>
        {hasMore && (
          <div className="text-center mt-6">
            <button
              onClick={() => setPage((prev) => prev + 1)}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
              Load More
            </button>
          </div>
        )}
      </div>
    </>
  );
}
