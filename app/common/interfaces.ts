export interface Category {
  id: string;
  name: string;
}

export interface CategoryOption {
  id: string;
  value: string;
  label: string;
}

export interface IssueResponse {
  userId: number | null;
  id: number;
  categoryId: number;
  statusId: number;
  lat: number;
  lng: number;
  userText: string;
  imgUrl: string;
  address: string;
}

export interface IssuePostResponse extends IssueGetResponse {
  userId: number;
}

export interface IssueGetResponse extends IssueResponse {
  categoryName: string;
  statusText: string;
}

export interface IssueDBData extends IssueResponse {
  // Optional keys because they must be deleted to transform a DBdata object into a Get response object

  filePath?: string;

  status?: {
    id: number;
    text: string;
  };

  category?: {
    id: number;
    name: string;
  };
}

export interface IconData {
  id: number;
  svgString: string;
  url: string;
  value: string;
}
