"use client";
import React from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import { newReportPageSections } from "../common/contants";
import FileInput from "../components/FileInput/FileInput";
import Button from "../components/Button/Button";
import TextArea from "../components/TextArea";

const page = () => {
  const sendReport = () => {
    // ToDo implement sending report
  };

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
      <div className="background-container bg-violet px-2">
        <TabPanel>
          <FileInput />
        </TabPanel>

        <TabPanel>
          <TextArea />
          <Button buttonText={"Send report"} clickHandler={sendReport} additionalClasses="mt-12"/>
        </TabPanel>
      </div>
    </Tabs>
  );
};

export default page;
