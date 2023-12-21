import { IssuePost } from "../api/validation";
import {
  IssueDBData,
  IssueGetResponse,
  IssuePostResponse,
} from "../common/interfaces";

const COORDINATE_ACCURACY_MULTIPLIER = 1000000;

const decodeCoordinates = (issue: IssueDBData) => {
  issue.lat /= COORDINATE_ACCURACY_MULTIPLIER;
  issue.lng /= COORDINATE_ACCURACY_MULTIPLIER;
};

export const encodeCoordinates = (issue: IssuePost) => {
  issue.lat = Math.round(issue.lat * COORDINATE_ACCURACY_MULTIPLIER);
  issue.lng = Math.round(issue.lng * COORDINATE_ACCURACY_MULTIPLIER);
};

const transformDBDataToResponse = (issue: IssueDBData, isPost: boolean) => {
  const result = {
    ...issue,
    categoryName: issue.category!.name,
    statusText: issue.status!.text,
  };

  delete result.category;
  delete result.status;
  delete result.filePath;

  if (!isPost) {
    result.userId = null;
  }

  return result;
};

export const transformIssueGetData = (issue: IssueDBData) => {
  decodeCoordinates(issue);
  return transformDBDataToResponse(issue, false) as IssueGetResponse;
};

export const transformIssuePostData = (issue: IssueDBData) => {
  decodeCoordinates(issue);
  return transformDBDataToResponse(issue, true) as IssuePostResponse;
};
