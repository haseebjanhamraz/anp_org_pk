"use client"

import { useState, useEffect } from 'react';

export default function CurrentDateTime() {
  const [dateTime, setDateTime] = useState<Date>(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setDateTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const options: Intl.DateTimeFormatOptions = {
    timeZone: 'Asia/Karachi', // GST+4/UAE timezone
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false
  };

  const formattedDateTime = dateTime.toLocaleString('en-US', options);

  return (
    <div className="text-gray-600 dark:text-gray-300 bg-slate-200 dark:bg-slate-700 px-3 py-2 rounded-lg shadow-md hidden md:block">
      {formattedDateTime}
    </div>
  );
}
