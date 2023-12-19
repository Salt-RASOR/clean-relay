import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient({ log: ["info", "query", "warn", "error"] });

export default prisma;
