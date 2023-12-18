"use client";
import React from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import Image from "next/image";
import BG from "../assets/bg.svg";
import { newReportPageSections } from "../common/contants";
import FileInput from "../components/FileInput/FileInput";

const page = () => {
  return (
    <Tabs>
      <TabList className="grid grid-cols-2 gap-4 mb-8 text-primary_color">
        {newReportPageSections.map((item, index) => (
          <Tab
            key={index}
            className={"flex items-center justify-center cursor-pointer"}>
            <h2 className="font-bold pb-6">{item}</h2>
          </Tab>
        ))}
      </TabList>
      <div className="background-container bg-violet">
        <TabPanel>
          <FileInput />
        </TabPanel>

        <TabPanel>Provide the description</TabPanel>
      </div>
    </Tabs>
  );
};

export default page;
