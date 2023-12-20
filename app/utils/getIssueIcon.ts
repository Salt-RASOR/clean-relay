import { issuesStatusColors } from "@/app/common/constants";
import { IconData } from "../common/interfaces";

const getCategoryIcon = (iconList: IconData[], categoryId: number) => {
  const foundCategory = iconList.find((icon) => icon.id === categoryId);
  return foundCategory ? foundCategory.svgString : "";
};

const getStatusColor = (statusId: number) => {
  const foundStatus = issuesStatusColors.find(
    (status) => status.id === statusId
  );
  return foundStatus ? foundStatus.color : "";
};

const getIssueIcon = (
  iconList: IconData[],
  iconId: number,
  statusId: number
) => {
  const bgColor = getStatusColor(statusId);
  const iconString = getCategoryIcon(iconList, iconId);

  const svgString = `
      <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30">
        <rect x="0" y="0" width="30" height="30" rx="6" ry="6" fill="${bgColor}" />
        ${iconString}
      </svg>
    `;

  const pinUrl = `data:image/svg+xml;utf-8,${encodeURIComponent(svgString)}`;
  return pinUrl;
};

export default getIssueIcon;
