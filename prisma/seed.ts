import { Prisma, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const seedData: {
  products: Prisma.ProductCreateInput[];
} = {
  products: [],
};

const productImage = "/wooden-chair.jpg";
const productCondition = ["NEW", "HOT", "REGULAR"];
const categories = ["Chair", "Table", "Sofa"];

for (let i = 1; i <= 50; i++) {
  const category = categories[Math.floor(Math.random() * 3)];
  const condition = productCondition[Math.floor(Math.random() * 3)] as "NEW";

  seedData.products.push({
    name: `Furniture ${i}`,
    description: `Description for Furniture ${i}`,
    price: Math.floor(Math.random() * 1000) + 100,
    salePrice:
      Math.random() * 10 > 43
        ? Math.floor(Math.random() * 1000) + 100
        : undefined,
    thumbnail: productImage,
    images: [productImage, productImage],
    stock: Math.floor(Math.random() * 20) + 1,
    published: true,
    condition,
    attributes: {
      create: {
        label: "Color",
        value: ["White", "Black", "Brown"],
      },
    },
    category: {
      connectOrCreate: {
        where: {
          name: category,
        },
        create: {
          name: category,
        },
      },
    },
  });
}

async function main() {
  for (const product of seedData.products) {
    await prisma.product.create({
      data: product,
    });
  }
}

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
