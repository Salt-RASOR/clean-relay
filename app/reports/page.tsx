"use client";
import React from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import CustomMap from "../components/CustomMap";
import Card from "../components/Card/Card";
import { MOCK_DATA } from "../mockData";

const page = () => {
  return (
    <>
      <Tabs>
        <TabList className="grid grid-cols-2 gap-4 mb-8 text-primary_color">
          {["Listings", "Map"].map((item, index) => (
            <Tab key={index} className={"flex items-center justify-center"}>
              <h2 className="font-bold pb-6">{item}</h2>
            </Tab>
          ))}
        </TabList>

        <TabPanel>
          {MOCK_DATA.map((item, index) => (
            <Card key={index} {...item} />
          ))}
        </TabPanel>
        <TabPanel>
          <CustomMap />
        </TabPanel>
      </Tabs>
    </>
  );
};

export default page;
