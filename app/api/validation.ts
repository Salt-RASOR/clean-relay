import { fileTypeFromBuffer } from "file-type";
import z from "zod";

const IssuePostSchema = z.object({
  userId: z.string().optional(),
  categoryId: z.number().int(),
  lat: z.number(),
  lng: z.number(),
  userText: z.string(),
});

const IssuePatchSchema = z.object({
  statusId: z.number(),
});

const ProfileGetSchema = z.object({
  email: z.string().email(),
});

const ProfilePostSchema = ProfileGetSchema.extend({
  name: z.string(),
  phone: z.string(),
  roleId: z.number().int(),
  userId: z.string().optional(),
});

const ProfilePatchSchema = ProfilePostSchema.partial().omit({
  userId: true,
  email: true,
});

export type IssuePost = z.infer<typeof IssuePostSchema>;
export type IssuePatch = z.infer<typeof IssuePatchSchema>;

export type ProfileGet = z.infer<typeof ProfileGetSchema>;
export type ProfilePost = z.infer<typeof ProfilePostSchema>;
export type ProfilePatch = z.infer<typeof ProfilePatchSchema>;

export const validateIssuePost = (data: IssuePost) => {
  return IssuePostSchema.safeParse(data);
};

export const validateIssuePatch = (data: IssuePatch) => {
  return IssuePatchSchema.safeParse(data);
};

export const validateProfileGet = (data: ProfileGet) => {
  return ProfileGetSchema.safeParse(data);
};

export const validateProfilePost = (data: ProfilePost) => {
  return ProfilePostSchema.safeParse(data);
};

export const validateProfilePatch = (data: ProfilePatch) => {
  return ProfilePatchSchema.safeParse(data);
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
