
import * as React from 'react';

interface EmailTemplateProps {
  name: string;
  email: string;
  message: string;
}

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
  name,
  email,
  message,
}) => (
  <>
    <div className="flex bg-red-700 h-auto justify-between items-center p-4">
      <img src="/anp-logo.png" alt="anp-logo" width={100} height={100} className="p-2" />
      <div className="flex flex-col">
        <h1 className="text-3xl font-bold text-white">Awami National Party</h1>
        <p className="text-gray-200">PEACE | DEVELOPMENT | DEMOCRACY</p>
      </div>
    </div>
    <div className="w-full p-8 bg-blue-100">
      <h1 className="text-3xl font-thin text-gray-800">
        <span className="font-bold">{name}</span> sent a message to Awami National Party
      </h1>
      <div className="p-2 shadow-lg mt-4">
        <h4 className="text-2xl">Message Details</h4>
        <p className="text-lg">
          Name : <span className="font-bold">{name}</span>
        </p>
        <p className="text-lg">
          Email : <span className="font-bold">{email}</span>
        </p>
        <p className="text-lg">
          Message : <span className="font-bold">{message}</span>
        </p>
      </div>
    </div>
  </>
);
