"use client";

import React from "react";
import clsx from "clsx";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import CustomMap from "../components/Map/CustomMap";
import Card from "../components/Card/Card";
import { Status, reportsPageSections } from "../common/constants";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import {
  selectAllIssues,
  selectFilterCategories,
  selectFilterRange,
  selectStatus,
  selectViewMode,
  setSelectedIssueId,
  setViewMode,
} from "@/lib/features/issuesSlice";
import { viewModes } from "../common/interfaces";
import { useRouter } from "next/navigation";
import Loader from "../components/Loader/Loader";
import Filter from "@/app/components/Filter/Filter";
import MyList from "../components/MyList/MyList";
import filterIssues from "../utils/filterIssues";
import { selectMyLocation } from "@/lib/features/profileSlice";
import NoResults from "../components/NoResults/NoResults";

const Page = () => {
  const router = useRouter();
  const issues = useAppSelector(selectAllIssues);
  const viewMode = useAppSelector(selectViewMode);
  const status = useAppSelector(selectStatus);

  const filterRange = useAppSelector(selectFilterRange);
  const filterCategories = useAppSelector(selectFilterCategories);
  const myLocation = useAppSelector(selectMyLocation);

  const filteredIssues = filterIssues(
    filterRange,
    filterCategories,
    issues,
    myLocation
  );

  const dispatch = useAppDispatch();

  const handleTabClick = (index: number) => {
    dispatch(setViewMode(index as viewModes));
  };

  const handleIssueClick = (event: React.MouseEvent) => {
    event.stopPropagation();

    const currentTarget = event.currentTarget as HTMLElement;

    dispatch(setSelectedIssueId(Number(currentTarget.id)));
    router.push(`/issue/${currentTarget.id}`);
  };

  return (
    <>
      <div className="px-4">
        <Filter />
        <Tabs selectedIndex={viewMode} onSelect={handleTabClick}>
          <TabList
            className={clsx(
              "grid grid-cols-3  justify-items-center gap-4",
              "mb-8 text-primary_color"
            )}
          >
            {status === Status.Loading && <Loader />}
            {reportsPageSections.map((item, index) => (
              <Tab key={index} className={"cursor-pointer"}>
                <h2 className="font-bold pb-2">{item}</h2>
              </Tab>
            ))}
          </TabList>

          <TabPanel>
            {filteredIssues.length === 0 && <NoResults />}
            <div className="flex justify-center">
              <div
                className={
                  "grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4  gap-4"
                }
              >
                {filteredIssues.map((item, index) => (
                  <Card key={index} {...item} onClick={handleIssueClick} />
                ))}
              </div>
            </div>
          </TabPanel>
          <TabPanel>
            <CustomMap issues={filteredIssues} />
          </TabPanel>

          <TabPanel>
            <MyList />
          </TabPanel>
        </Tabs>
      </div>
    </>
  );
};

export default Page;
