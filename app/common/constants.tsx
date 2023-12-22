import snow from "@/app/public/issues_icons/Snowflake.svg";
import slippery from "@/app/public/issues_icons/Slippery.svg";
import danger from "@/app/public/issues_icons/Danger.svg";
import disposal from "@/app/public/issues_icons/Disposal.svg";
import graffiti from "@/app/public/issues_icons/Graffiti.svg";
import brokenInfrastructure from "@/app/public/issues_icons/Broken_infastructure.svg";
import grass from "@/app/public/issues_icons/Grass.svg";
import brokenLight from "@/app/public/issues_icons/Broken_light.svg";
import misplacedVehicle from "@/app/public/issues_icons/No_Parking.svg";
import puzzled from "@/app/public/issues_icons/Puzzled.svg";
import { RiErrorWarningLine } from "react-icons/ri";
import { MdTimelapse } from "react-icons/md";
import { FaRegCheckCircle } from "react-icons/fa";
import { TiDeleteOutline } from "react-icons/ti";

enum ReportsPageSections {
  LISTINGS = "List",
  MAP = "Map",
  MY_REPORTS = "My List",
}
export const reportsPageSections = [
  ReportsPageSections.LISTINGS,
  ReportsPageSections.MAP,
  ReportsPageSections.MY_REPORTS,
];

export const issuesIcons = [
  { id: 1, value: "Snow", icon: snow },
  { id: 2, value: "Slippery", icon: slippery },
  { id: 3, value: "Danger", icon: danger },
  { id: 4, value: "Trash", icon: disposal },
  { id: 5, value: "Graffiti", icon: graffiti },
  {
    id: 6,
    value: "Broken infrastructure",
    icon: brokenInfrastructure,
  },
  { id: 7, value: "Overgrowth", icon: grass },
  {
    id: 8,
    value: "Broken light",
    icon: brokenLight,
  },
  {
    id: 9,
    value: "Misplaced vehicle",
    icon: misplacedVehicle,
  },
  { id: 10, value: "Misc", icon: puzzled },
];

export const issuesStatusColors = [
  { id: 1, color: "rgb(248 113 113)" },
  { id: 2, color: "rgb(132 204 22)" },
];

export const shangeStatusOptions = [
  {
    title: "Not started",
    icon: <RiErrorWarningLine size={20} />,
  },
  {
    title: "In progress",
    icon: <MdTimelapse size={20} />,
  },
  {
    title: "Completed",
    icon: <FaRegCheckCircle size={16} />,
  },
  {
    title: "Delete",
    icon: <TiDeleteOutline size={20} />,
  },
];

export enum StatusOptions {
  NotStarted = "Not started",
  InProgress = "In progress",
  Completed = "Completed",
  Delete = "Delete",
}

export enum Status {
  Idle = "idle",
  Loading = "loading",
  Error = "error",
}
