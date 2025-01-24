import Image from "next/image";
import Link from "next/link";
export default function NewsModal({ post, onClose }) {
  if (!post) return null;
  const regex = /[^\p{Script=Arabic}\s]+/gu;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="relative bg-white dark:bg-slate-700 p-4 rounded-lg shadow-lg max-w-2xl w-full max-h-[90vh] overflow-hidden">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-600 dark:text-white hover:text-gray-800"
        >
          ✖
        </button>

        {/* Modal content */}
        <div className="flex flex-col h-full">
          {/* Title */}
          <h2 className="text-2xl text-red-700 font-bold mb-4 text-center font-nastaleeq">
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
              className="text-gray-700 dark:text-white text-right font-nastaleeq text-lg"
              dangerouslySetInnerHTML={{
                __html: post.description.replace(regex, ""),
              }}
            ></p>
            <Link
              href={post.link}
              target="_blank"
              className="bg-red-700 rounded-lg shadow-md text-xl text-white px-4 py-2 hover:scale-95 transition-all duration-300"
            >
              Read full story
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
