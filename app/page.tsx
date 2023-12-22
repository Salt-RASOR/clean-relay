"use client";

import React from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import CustomMap from "./components/Map/CustomMap";
import Card from "./components/Card/Card";
import { Status, reportsPageSections } from "./common/constants";
import { useAppDispatch, useAppSelector, useAppStore } from "@/lib/hooks";
import {
  selectAllIssues,
  selectStatus,
  selectViewMode,
  setSelectedIssueId,
  setViewMode,
} from "@/lib/features/issuesSlice";
import { viewModes } from "./common/interfaces";
import { useRouter } from "next/navigation";
import Loader from "./components/Loader/Loader";

const Page = () => {
  const router = useRouter();
  const issues = useAppSelector(selectAllIssues);
  const viewMode = useAppSelector(selectViewMode);
  const status = useAppSelector(selectStatus);

  const dispatch = useAppDispatch();

  const handleTabClick = (index: number) => {
    dispatch(setViewMode(index as viewModes));
  };

  const handleIssueClick = (event: React.MouseEvent) => {
    event.stopPropagation();

    const currentTarget = event.currentTarget as HTMLElement;

    dispatch(setSelectedIssueId(Number(currentTarget.id)));
    router.push(`/issue`);
  };

  return (
    <>
      <div className="mt-20 mb-6">
        <Tabs selectedIndex={viewMode} onSelect={handleTabClick}>
          <TabList className="grid grid-cols-3 gap-4 mb-8 text-primary_color">
            {status === Status.Loading && <Loader />}
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
                <Card key={index} {...item} onClick={handleIssueClick} />
              ))}
            </div>
          </TabPanel>
          <TabPanel>
            <CustomMap />
          </TabPanel>

          <TabPanel>
            {status === Status.Loading && <Loader />}
            WIP: MY REPORTS
          </TabPanel>
        </Tabs>
      </div>
    </>
  );
};

export default Page;
