import { config } from "dotenv";
config();
import prisma from "@/app/api/prismaClient";

const seed = async () => {
  await prisma.$queryRawUnsafe(`TRUNCATE "Issue" RESTART IDENTITY CASCADE`);
  await prisma.$queryRawUnsafe(`TRUNCATE "User" RESTART IDENTITY CASCADE`);

  const roles = ["User", "SuperUser"];
  const categories = [
    "Snow",
    "Slippery",
    "Danger",
    "Trash",
    "Graffiti",
    "Broken infrastructure",
    "Overgrowth",
    "Broken light",
    "Misplaced vehicle",
    "Misc",
  ];
  const statuses = ["Not Started", "In Progress"];
  const users = ["TestUser", "TestSuperUser"];

  console.log("Upserting Roles");
  let i = 1;
  for (const role of roles) {
    console.log(i + "/" + roles.length + ": " + roles[i - 1]);

    await prisma.role.upsert({
      where: { id: i++ },
      update: { name: role },
      create: { name: role },
    });
  }

  console.log("");
  console.log("Upserting Categories");
  i = 1;
  for (const category of categories) {
    console.log(i + "/" + categories.length + ": " + categories[i - 1]);

    await prisma.category.upsert({
      where: { id: i++ },
      update: { name: category },
      create: { name: category },
    });
  }

  console.log("");
  console.log("Upserting Statuses");
  i = 1;
  for (const status of statuses) {
    console.log(i + "/" + statuses.length + ": " + statuses[i - 1]);

    await prisma.issueStatus.upsert({
      where: { id: i++ },
      update: { text: status },
      create: { text: status },
    });
  }

  console.log("");
  console.log("Upserting Users");
  i = 1;
  for (const user of users) {
    console.log(i + "/" + users.length + ": " + users[i - 1]);

    await prisma.user.upsert({
      where: { id: i },
      update: { name: user, roleId: i },
      create: { name: user, roleId: i++ },
    });
  }

  console.log("");
  console.log("Data seeded successfully!");
};

seed();
