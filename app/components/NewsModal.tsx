"use client"

import { useEffect, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";

interface NewsModalProps {
  post: {
    title: string;
    description: string;
    featuredImage?: string;
    link: string;
  } | null;
  onClose: () => void;
}

const useFacebookSDK = (post: NewsModalProps['post']) => {
  useEffect(() => {
    if (!post) return;

    const fbScript = document.createElement("script");
    fbScript.src = "https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v3.2";
    fbScript.async = true;
    fbScript.defer = true;
    document.body.appendChild(fbScript);

    return () => {
      document.body.removeChild(fbScript);
    };
  }, [post]);
};

const useSanitizedDescription = (description: string) => {
  return useMemo(() => {
    const embedFacebookVideos = (html: string) => {
      const fbVideoRegex = /https:\/\/www\.facebook\.com\/[^/]+\/videos\/\d+/g;
      return html.replace(
        fbVideoRegex,
        (match) => `<div class="fb-video" data-href="${match}" data-width="500" data-show-text="false"></div>`
      );
    };

    return embedFacebookVideos(description).replace(/u[0-9a-fA-F]{4}/g, "");
  }, [description]);
};

export default function NewsModal({ post, onClose }: NewsModalProps) {
  useFacebookSDK(post);
  const sanitizedDescription = useSanitizedDescription(post?.description || "");

  if (!post) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="relative bg-white dark:bg-slate-700 p-4 rounded-lg shadow-lg max-w-2xl w-full max-h-[90vh] overflow-hidden">
        <button
          onClick={onClose}
          className="absolute top-2 hover:text-red-700 right-4 text-gray-600 dark:text-white"
          aria-label="Close modal"
        >
          ✖
        </button>

        <div className="flex flex-col h-full">
          <h2 className="text-2xl text-red-700 dark:text-red-500 font-bold mb-4 text-center font-[nastaleeq]">
            {post.title.replace("&#8230;", "")}
          </h2>

          <div className="overflow-y-auto px-8 flex flex-col items-center gap-4" style={{ maxHeight: "75vh" }}>
            {post.featuredImage && (
              <Image
                src={post.featuredImage}
                alt={post.title}
                className="w-full h-64 object-cover mb-4 rounded-lg"
                width={300}
                height={300}
                priority
              />
            )}
            <p
              className="text-gray-700 dark:text-white text-right font-[nastaleeq] text-lg"
              dangerouslySetInnerHTML={{ __html: sanitizedDescription }}
            />
            <Link
              href={post.link}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-red-700 rounded-lg shadow-md text-lg text-white px-4 py-2 hover:scale-95 transition-all duration-300"
            >
              Read full story
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
