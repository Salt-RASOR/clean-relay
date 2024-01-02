import { createHash } from "crypto";

const hashEmail = (email: string) => {
  const hashedEmail = createHash("sha256").update(email).digest("hex");

  return hashedEmail;
};

export default hashEmail;
