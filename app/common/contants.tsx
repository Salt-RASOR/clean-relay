import snow from "../assets/issues_icons/Snowflake.svg";
import slippery from "../assets/issues_icons/Slippery.svg";
import danger from "../assets/issues_icons/Danger.svg";
import disposal from "../assets/issues_icons/Disposal.svg";
import graffity from "../assets/issues_icons/Graffity.svg";
import broken_infrastructure from "../assets/issues_icons/Broken_infastructure.svg";
import grass from "../assets/issues_icons/Grass.svg";
import broken_light from "../assets/issues_icons/Broken_light.svg";
import misplaced_vehicle from "../assets/issues_icons/No_Parking.svg";
import puzzled from "../assets/issues_icons/Puzzled.svg";

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
  { id: 5, value: "Graffiti", icon: graffity },
  { id: 6, value: "Broken infrastructure", icon: broken_infrastructure },
  { id: 7, value: "Overgrowth", icon: grass },
  { id: 8, value: "Broken light", icon: broken_light },
  { id: 9, value: "Misplaced vehicle", icon: misplaced_vehicle },
  { id: 10, value: "Misc", icon: puzzled },
];
