"use client";

import React, { useEffect } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import CustomMap from "./components/Map/CustomMap";
import Card from "./components/Card/Card";
import { reportsPageSections } from "./common/constants";
import { useAppSelector } from "@/lib/hooks";
import { selectAllIssues } from "@/lib/features/issuesSlice";

const Page = () => {
  const issues = useAppSelector(selectAllIssues);

  return (
    <>
      <Tabs>
        <TabList className="grid grid-cols-2 gap-4 mb-8 text-primary_color">
          {reportsPageSections.map((item, index) => (
            <Tab
              key={index}
              className={"flex items-center justify-center cursor-pointer"}
            >
              <h2 className="font-bold pb-6">{item}</h2>
            </Tab>
          ))}
        </TabList>

        <TabPanel>
          <div
            className={"grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4"}
          >
            {issues.map((item, index) => (
              <Card key={index} {...item} />
            ))}
          </div>
        </TabPanel>
        <TabPanel>
          <CustomMap />
        </TabPanel>
      </Tabs>
    </>
  );
};

export default Page;
