"use client";
import React from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import CustomMap from "../components/CustomMap";

const page = () => {
  return (
    <>
      <Tabs>
        <TabList className="grid grid-cols-2 gap-4 mb-8 text-primary_color">
          {["Listings", "Map"].map((item, index) => (
            <Tab key={index} className={"flex items-center justify-center"}>
              <h2 className="font-bold pb-4">{item}</h2>
            </Tab>
          ))}
        </TabList>

        <TabPanel>
          <h2>Any content 1</h2>
        </TabPanel>
        <TabPanel>
          <CustomMap />
        </TabPanel>
      </Tabs>
    </>
  );
};

export default page;
