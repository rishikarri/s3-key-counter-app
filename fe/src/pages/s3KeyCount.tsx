"use client"; // This is a client component 👈🏽


import axios from 'axios'; // Import axios for making HTTP requests
import { useState, useEffect } from 'react';
const get = require('lodash.get');



export default function S3KeyCount() {
  const [s3KeysCount, setS3KeysCount] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://b7xj1i3tki.execute-api.us-east-1.amazonaws.com/s3-keys-length2'); // Replace with your actual API endpoint

        console.log('response', response)

        const fetchedKeyCount = get(response, 'data.numKeys')
        console.log('fetchedKeyCount', fetchedKeyCount)
        setS3KeysCount(fetchedKeyCount); 
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []); 

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        Number of S3 Keys in file: {s3KeysCount}
      </main>
      
    </div>
  );
}