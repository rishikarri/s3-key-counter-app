"use client"; // This is a client component 👈🏽

import S3KeyCount from '../pages/s3KeyCount';
import DataPoster from '../pages/dataPoster'; 
import { useState } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'; // Import the components correctly
import 'react-tabs/style/react-tabs.css'; 

export default function Home() {
  const [tabIndex, setTabIndex] = useState(0);

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <Tabs selectedIndex={tabIndex} onSelect={index => setTabIndex(index)}>
          <TabList>
            <Tab>S3 Key Count</Tab>
            <Tab>Data Poster</Tab>
          </TabList>

          <TabPanel>
            <S3KeyCount />
          </TabPanel>

          <TabPanel>
            <DataPoster />
          </TabPanel>
        </Tabs>
      </main>
    </div>
  );
}