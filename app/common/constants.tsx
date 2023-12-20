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

enum ReportsPageSections {
  LISTINGS = "Listings",
  MAP = "Map",
}
export const reportsPageSections = [
  ReportsPageSections.LISTINGS,
  ReportsPageSections.MAP,
];

enum NewReportPageSections {
  TAKE_PHOTO = "Take a photo",
  DESCRIPTION = "Description",
}

export const newReportPageSections = [
  NewReportPageSections.TAKE_PHOTO,
  NewReportPageSections.DESCRIPTION,
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
