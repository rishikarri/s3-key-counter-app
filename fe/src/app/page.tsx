"use client"; // This is a client component 👈🏽

import S3KeyCount from '../pages/s3KeyCount';
import DataPoster from '../pages/dataPoster'; 
import { useState } from 'react';
import { Tabs, TabList, TabPanel, Tab } from 'react-tabs'; 
import 'react-tabs/style/react-tabs.css'; // Re-import react-tabs styles

export default function Home() {
  const [tabIndex, setTabIndex] = useState(0);

  return (
    <div className="container mx-auto p-4"> 
      <h1 className="text-2xl font-bold mb-4">S3 Key Counter</h1>
      <div className="bg-gray-100 p-6 rounded-lg shadow-md"> 
        <Tabs selectedIndex={tabIndex} onSelect={index => setTabIndex(index)}>
          <TabList className="flex mb-4"> 
            <Tab className="mr-4 px-4 py-2 rounded-md bg-gray-200 hover:bg-gray-300">S3 Key Count</Tab> 
            <Tab className="px-4 py-2 rounded-md bg-gray-200 hover:bg-gray-300">Data Poster</Tab> 
          </TabList>

          <TabPanel>
            <S3KeyCount />
          </TabPanel>

          <TabPanel>
            <DataPoster />
          </TabPanel>
        </Tabs>
      </div>
    </div>
  );
}