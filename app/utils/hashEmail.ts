import { createHash } from "crypto";

const hashEmail = (email: string) => {
  const salt = process.env.EMAIL_SALT;
  const hashedEmail = createHash("sha256")
    .update(email + salt)
    .digest("hex");

  return hashedEmail;
};

export default hashEmail;
