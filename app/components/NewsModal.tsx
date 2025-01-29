import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

export default function NewsModal({ post, onClose }) {
  useEffect(() => {
    if (!post) return;
    // Dynamically load the Facebook SDK if Facebook video embed exists in the content
    const fbScript = document.createElement("script");
    fbScript.src =
      "https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v3.2";
    fbScript.async = true;
    fbScript.defer = true;
    document.body.appendChild(fbScript);

    return () => {
      if (post) {
        document.body.removeChild(fbScript); // Clean up script
      }
    };
  }, [post]);

  if (!post) return null;
  // Replace Facebook video links with embed structures
  const embedFacebookVideos = (html) => {
    const fbVideoRegex = /https:\/\/www\.facebook\.com\/[^/]+\/videos\/\d+/g;
    return html.replace(
      fbVideoRegex,
      (match) =>
        `<div class="fb-video" data-href="${match}" data-width="500" data-show-text="false"></div>`
    );
  };

  const sanitizedDescription = embedFacebookVideos(post.description);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="relative bg-white dark:bg-slate-700 p-4 rounded-lg shadow-lg max-w-2xl w-full max-h-[90vh] overflow-hidden">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-2 hover:text-red-700 right-4 text-gray-600 dark:text-white"
        >
          ✖
        </button>

        {/* Modal content */}
        <div className="flex flex-col h-full">
          {/* Title */}
          <h2 className="text-2xl text-red-700 dark:text-red-500 font-bold mb-4 text-center font-[nastaleeq]">
            {post.title.replace("&#8230;", "")}
          </h2>

          {/* Scrollable content */}
          <div
            className="overflow-y-auto px-8 flex flex-col items-center gap-4"
            style={{ maxHeight: "75vh" }}
          >
            {post.featuredImage && (
              <Image
                src={post.featuredImage}
                alt={post.title}
                className="w-full h-64 object-cover mb-4 rounded-lg"
                width={300}
                height={300}
              />
            )}
            <p
              className="text-gray-700 dark:text-white text-right font-[nastaleeq] text-lg"
              dangerouslySetInnerHTML={{
                __html: sanitizedDescription.replace(/u[0-9a-fA-F]{4}/g, ""),
              }}
            ></p>
            <Link
              href={post.link}
              target="_blank"
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
