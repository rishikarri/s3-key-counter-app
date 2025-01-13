"use client"; // This is a client component 👈🏽

import S3KeyCount from '../pages/s3KeyCount';
import DataPoster from '../pages/dataPoster'; 
import { useState } from 'react';
import { Tabs, TabList, TabPanel, Tab } from 'react-tabs'; 
import 'react-tabs/style/react-tabs.css';

export default function Home() {
  const [tabIndex, setTabIndex] = useState(0);

  return (
    <div className="container mx-auto p-4">  {/* Base container styles */}
      <h1 className="text-2xl font-bold mb-4">S3 Counter App</h1>
      <div className="bg-gray-100 p-6 rounded-lg shadow-md"> {/* Tab container styles */}
        <Tabs selectedIndex={tabIndex} onSelect={index => setTabIndex(index)}>
          <TabList className="flex mb-4"> {/* Tab list styles */}
            <Tab className="mr-4 px-4 py-2 rounded-md bg-blue-500 text-white">S3 Key Count</Tab>
            <Tab className="px-4 py-2 rounded-md bg-gray-200">Data Poster</Tab>
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