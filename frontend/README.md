This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `src/app/page.tsx`. The page auto-updates as you edit the file.

If you move the app directory (for example, from `app` to `src/app`) while the development server is running, restart it so Next.js detects the new location. An existing server can otherwise report `ENOENT: scandir '/app/app'`.

For Docker development, run this from the repository root:

```bash
docker compose --env-file .env.dev -f docker-compose.dev.yml restart frontend-dev
```

Docker stores frontend dependencies in a separate `frontend_node_modules` volume. After installing packages locally or pulling changes to `package-lock.json`, sync the container dependencies and restart the frontend:

```bash
docker compose --env-file .env.dev -f docker-compose.dev.yml exec -T frontend-dev npm ci
docker compose --env-file .env.dev -f docker-compose.dev.yml restart frontend-dev
```

This also resolves missing Material UI modules when they are installed locally but absent from the container.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
