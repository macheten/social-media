import { prisma } from "./prisma-client";
import { hashSync } from "bcrypt";

// создаёт тестовые данные
async function up() {
  await prisma.user.createMany({
    data: [
      {
        activated: true,
        email: "user@test.com",
        username: "user",
        password: hashSync("user", 10),
      },

      {
        activated: true,
        email: "admin@test.com",
        username: "admin",
        password: hashSync("admin", 10),
        role: 'ADMIN'
      },
    ],
  });
  console.log("created users");
}

// зачищает таблицы в базе данных
async function down() {
  await prisma.user.deleteMany();
  await prisma.verificationCode.deleteMany();
  await prisma.post.deleteMany();
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
