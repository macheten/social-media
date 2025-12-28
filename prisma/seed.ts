import { prisma } from "./prisma-client";
import { hashSync } from "bcrypt";

// создаёт тестовые данные
async function up() {
  await prisma.user.createMany({
    data: [
      {
        id: 1,
        email: "user@test.com",
        name: "user",
        password: hashSync("user", 10),
      },

      {
        id: 2,
        email: "admin@test.com",
        name: "admin",
        password: hashSync("admin", 10),
      },
    ],
  });
  console.log("created users");
}

// зачищает таблицы в базе данных
async function down() {
  await prisma.user.deleteMany();
}

async function main() {
  await down();
  await up();
}

main()
  .then(() => {
    console.log("Test data has been pushed to database succesfully!");
  })
  .catch(async (error) => {
    console.error("Database SEED ERROR", error);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
