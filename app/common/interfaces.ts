export type Category = {
  id: string;
  name: string;
};

export type CategoryOption = {
  id: string;
  value: string;
  label: string;
};

export type IssueOptions = {
  id: number;
  userId: number;
  lat: number;
  lng: number;
  categoryId: number;
  statusId: number;
  userText: string;
  imgUrl: string;
};
