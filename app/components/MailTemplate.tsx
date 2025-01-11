import React from "react";
import Image from "next/image";
const MailTemplate: React.FC<{
  title: string;
  message: string;
  buttonText?: string;
  buttonLink?: string;
}> = ({ title, message, buttonText, buttonLink }) => {
  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="flex items-center justify-center gap-5 bg-gradient-to-r from-red-500 to-orange-600 p-6 text-center">
          <Image
            src={"/anp-logo.png"}
            alt="ANP Logo"
            height={100}
            width={100}
          />
          <h1 className="text-2xl uppercase font-semibold text-white"></h1>
        </div>
        <div className="p-6">
          <p className="text-gray-700 text-lg">{title}</p>
          <p className="text-gray-700 text-lg">{message}</p>
          {buttonText && buttonLink && (
            <div className="mt-6 text-center">
              <a
                href={buttonLink}
                className="inline-block px-6 py-2 text-white font-semibold bg-red-600 rounded-lg shadow hover:bg-red-700"
              >
                {buttonText}
              </a>
            </div>
          )}
        </div>
        <div className="bg-gray-50 p-4 text-center text-sm text-gray-500">
          <p>Thank you for choosing Awami National Party!</p>
          <p>
            If you have any questions, contact us at{" "}
            <a href="mailto:info@anp.org.pk" className="text-red-600 underline">
              info@anp.org.pk
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  );
};

export default MailTemplate;
