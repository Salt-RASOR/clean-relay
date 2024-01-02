import { IssuePost } from "../api/validation";

const decodeForm = (formData: FormData) => {
  const userText = formData.get("userText") as string;
  const userId = formData.get("userId") as string;
  const categoryId = (Number(formData.get("categoryId")) as number) || 1;
  const lat = (Number(formData.get("lat")) as number) || 1;
  const lng = (Number(formData.get("lng")) as number) || 1;
  return { userText, userId, categoryId, lat, lng } as IssuePost;
};

export default decodeForm;
