import z from "zod";

const IssuePostSchema = z.object({
  userId: z.number().int(),
  categoryId: z.number().int(),
  lat: z.number(),
  lng: z.number(),
  userText: z.string(),
});

const IssuePatchSchema = z.object({
  statusText: z.string(),
});

type IssuePost = z.infer<typeof IssuePostSchema>;
type IssuePatch = z.infer<typeof IssuePatchSchema>;

export const validateIssuePost = (data: IssuePost) => {
  return IssuePostSchema.safeParse(data);
};

export const validateIssuePatch = (data: IssuePatch) => {
  return IssuePatchSchema.safeParse(data);
};
