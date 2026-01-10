import { Post, Prisma } from "@prisma/client";
import { prisma } from "./prisma-client";
import { hashSync } from "bcrypt";
import { faker } from "@faker-js/faker";

// создаёт тестовые данные
async function up() {
  const users = await prisma.user.createManyAndReturn({
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
        role: "ADMIN",
      },
    ],
  });
  console.log("created users");

  let posts = [];
  for (let i = 0; i < 70; i++) {
    posts.push({
      authorId: users[0].id,
      content: faker.lorem.paragraph({ min: 3, max: 5 }),
      title: faker.lorem.words({ min: 3, max: 5 }),
      createdAt: faker.date.between({
        from: '2020-01-01T00:00:00.000Z',
        to: '2025-01-01T00:00:00.000Z'
      })
    });
  }

  await prisma.post.createMany({
    data: posts,
  });
  console.log('created posts')
}

// зачищает таблицы в базе данных
async function down() {
  await prisma.post.deleteMany();
  await prisma.verificationCode.deleteMany();
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
