"use client"; // This is a client component 


import axios from 'axios'; // Import axios for making HTTP requests
import { useState, useEffect } from 'react';
const get = require('lodash.get');



export default function S3KeyCount() {
  const [s3KeysCount, setS3KeysCount] = useState('');

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
    <div className="p-4 bg-gray-100 rounded-lg shadow-md">
        Number of S3 Keys in file: {s3KeysCount}
    </div>
  );
}