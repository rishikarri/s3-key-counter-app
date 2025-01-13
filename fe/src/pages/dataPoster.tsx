"use client"; // This is a client component 👈🏽

// DataPoster.tsx
import axios from 'axios';
import { useState } from 'react';

// interface Data {
//   // Define the structure of your data object here
//   // For example:
//   // name: string;
//   // age: number;
// }

const DataPoster: React.FC = () => {
  const [data, setData] = useState<Data>({}); // Initialize data as an empty object
  const [response, setResponse] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const response = await axios.post('YOUR_API_ENDPOINT_HERE', data);
      setResponse(JSON.stringify(response.data));
    } catch (error) {
      console.error('Error posting data:', error);
      setResponse('Error posting data');
    }
  };

  return (
    <div>
      <h2>Post Data</h2>
      <form onSubmit={handleSubmit}>
        {/* Modify these fields based on your data structure */}
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          value={data.name || ''} // Access specific data properties
          onChange={(e) => setData({ ...data, name: e.target.value })}
        />
        <label htmlFor="age">Age:</label>
        <input
          type="number"
          id="age"
          value={data.age || ''}
          onChange={(e) => setData({ ...data, age: Number(e.target.value) })}
        />
        <button type="submit">Submit</button>
      </form>
      {response && <p>Response: {response}</p>}
    </div>
  );
};

export default DataPoster;