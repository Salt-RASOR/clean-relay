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
  userId: number;
  lat: number;
  lng: number;
  categoryId: number;
  userText: string;
};
