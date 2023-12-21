"use client";

import React, { useEffect } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import CustomMap from "./components/Map/CustomMap";
import Card from "./components/Card/Card";
import { reportsPageSections } from "./common/constants";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import {
  selectAllIssues,
  selectViewMode,
  setViewMode,
} from "@/lib/features/issuesSlice";
import SelectedCard from "./components/Card/SelectedCard";

const Page = () => {
  const issues = useAppSelector(selectAllIssues);
  const viewMode = useAppSelector(selectViewMode);
  const dispatch = useAppDispatch();

  const handleTabClick = (index: number) => {
    dispatch(setViewMode(index as 0 | 1 | 2));
  };

  return (
    <>
      <div className="mt-20 mb-[120px]">
        <Tabs defaultIndex={viewMode} onSelect={handleTabClick}>
          <TabList className="grid grid-cols-3 gap-4 mb-8 text-primary_color">
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
          <TabPanel>{/* <SelectedCard /> */}</TabPanel>
        </Tabs>
      </div>
    </>
  );
};

export default Page;
