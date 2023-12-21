import { fileTypeFromBuffer } from "file-type";
import z from "zod";

const IssuePostSchema = z.object({
  userId: z.number().int(),
  categoryId: z.number().int(),
  lat: z.number(),
  lng: z.number(),
  userText: z.string(),
});

const IssuePatchSchema = z.object({
  statusId: z.number(),
});

export type IssuePost = z.infer<typeof IssuePostSchema>;
export type IssuePatch = z.infer<typeof IssuePatchSchema>;

export const validateIssuePost = (data: IssuePost) => {
  return IssuePostSchema.safeParse(data);
};

export const validateIssuePatch = (data: IssuePatch) => {
  return IssuePatchSchema.safeParse(data);
};

export const validateImageBuffer = async (buffer: Buffer | ArrayBuffer) => {
  const fileType = await fileTypeFromBuffer(buffer);

  switch (fileType?.mime) {
    case "image/jpeg":
    case "image/png":
    case "image/webp":
    case "image/avif":
      return { success: true, mime: fileType.mime, ext: fileType.ext };
    default:
      return { success: false, mime: fileType?.mime, ext: fileType?.ext };
  }
};
