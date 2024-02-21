![Chair | Ecommerce admin dashboard](/public/screenshots/dashboard.png)

# Notice

This project is still in development, and is not ready for real use.

# Chair

Chair is a simple furniture admin dashboard built with NextJS.

## Technologies

- Next.js
- Shadcn UI
- Tailwind CSS
- Typescript
- Prisma
- React
- Zod
- React Hook Form
- TipTap Editor

# Screenshots

![products table](/public/screenshots/products.png)

![new product page](/public/screenshots/new-product.png)

# Installation

1 - clone this repo

2 - run `pnpm install`

3 - add env variables:

    - DATABASE_URL="" (postgres database)
    - NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME="" (for production use)
    - CLOUDINARY_API_KEY="" (for production use)
    - CLOUDINARY_API_SECRET="" (for production use)

4 - run `npx ts-node /prisma/seed.ts`

5 - run `npm run dev`
