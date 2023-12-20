import { IssuePost } from "../api/validation";
import {
  IssueDBData,
  IssueGetResponse,
  IssuePostResponse,
} from "../common/interfaces";

const COORDINATE_ACCURACY_MULTIPLIER = 1000000;

const decodeCoordinate = (coordinate: number) => {
  return (coordinate /= COORDINATE_ACCURACY_MULTIPLIER);
};

const transformDBDataToResponse = (issue: IssueDBData) => {
  const result = {
    ...issue,
    categoryName: issue.category!.name,
    statusText: issue.status!.text,
  };

  delete result.category;
  delete result.status;
  delete result.userId;

  return result as IssueGetResponse;
};

export const decodeGetCoordinates = (issue: IssueDBData) => {
  issue.lat = decodeCoordinate(issue.lat);
  issue.lng = decodeCoordinate(issue.lng);

  return transformDBDataToResponse(issue);
};

export const decodePostCoordinates = (issue: IssuePostResponse) => {
  issue.lat /= COORDINATE_ACCURACY_MULTIPLIER;
  issue.lng /= COORDINATE_ACCURACY_MULTIPLIER;

  return issue;
};

export const encodeCoordinates = (issue: IssuePost) => {
  issue.lat = Math.round(issue.lat * COORDINATE_ACCURACY_MULTIPLIER);
  issue.lng = Math.round(issue.lng * COORDINATE_ACCURACY_MULTIPLIER);
};
