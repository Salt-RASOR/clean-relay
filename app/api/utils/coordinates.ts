import { IssuePost } from "../validation";

const COORDINATE_ACCURACY_MULTIPLIER = 1000000;

export const decodeCoordinates = (issue: IssuePost) => {
  issue.lat /= COORDINATE_ACCURACY_MULTIPLIER;
  issue.lng /= COORDINATE_ACCURACY_MULTIPLIER;
};

export const encodeCoordinates = (issue: IssuePost) => {
  issue.lat = Math.round(issue.lat * COORDINATE_ACCURACY_MULTIPLIER);
  issue.lng = Math.round(issue.lng * COORDINATE_ACCURACY_MULTIPLIER);
};
