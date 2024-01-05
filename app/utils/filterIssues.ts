import { FILTER_RANGE_MAX } from "../common/constants";
import { Coordinates, IssueGetResponse } from "../common/interfaces";
import calculateDistance from "./calculateDistance";

const filterIssues = (
  filterRange: number,
  filterCategories: number[],
  issueList: IssueGetResponse[],
  myLocation: Coordinates | null
) => {
  return issueList.filter((issue) => {
    let distance = 0;

    if (myLocation) {
      distance = calculateDistance(myLocation, {
        lat: issue.lat,
        lng: issue.lng,
      });
    }

    const categoryOkay =
      filterCategories.length === 0
        ? true
        : filterCategories.includes(issue.categoryId);

    return (
      (distance < filterRange || filterRange === FILTER_RANGE_MAX + 1) &&
      categoryOkay
    );
  });
};

export default filterIssues;
