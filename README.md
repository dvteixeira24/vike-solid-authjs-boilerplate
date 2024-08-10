Generated with [Bati](https://batijs.dev) ([version 240](https://www.npmjs.com/package/create-bati/v/0.0.240)) using this command:

```sh
yarn dlx @batijs/cli --solid --tailwindcss --authjs --telefunc --hono --drizzle --biome
```

# Next steps
## *Drizzle*
- First, ensure all dependencies are installed using your preferred package manager.
- Execute the commands below with your preferred package manager, e.g., for pnpm:
```bash
pnpm drizzle:generate # a script that executes drizzle-kit generate.
pnpm drizzle:migrate # a script that executes drizzle-kit migrate.
pnpm drizzle:seed # a script that executes tsx ./database/seed.ts.
```

> [!NOTE]
> The `drizzle-kit generate` command is used to generate SQL migration files based on your Drizzle schema.
>
> The `drizzle-kit migrate` command is used to apply the generated migrations to your database.
>
> The `tsx ./database/seed.ts` command is used to run a custom seed script to populate data to your database. 

Read more on [Drizzle ORM documentation](https://orm.drizzle.team/docs/overview)

# About this app
This app is ready to start. It's powered by [Vike](https://vike.dev) and [SolidJS](https://www.solidjs.com/guides/getting-started).

### `/pages/+config.ts`

Such `+` files are [the interface](https://vike.dev/config) between Vike and your code. It defines:
- A default [`<Layout>` component](https://vike.dev/Layout) (that wraps your [`<Page>` components](https://vike.dev/Page)).
- A default [`title`](https://vike.dev/title).
- Global [`<head>` tags](https://vike.dev/head-tags).

### Routing

[Vike's built-in router](https://vike.dev/routing) lets you choose between:
 - [Filesystem Routing](https://vike.dev/filesystem-routing) (the URL of a page is determined based on where its `+Page.jsx` file is located on the filesystem)
 - [Route Strings](https://vike.dev/route-string)
 - [Route Functions](https://vike.dev/route-function)

### `/pages/_error/+Page.jsx`

The [error page](https://vike.dev/error-page) which is rendered when errors occur.

### `/pages/+onPageTransitionStart.ts` and `/pages/+onPageTransitionEnd.ts`

The [`onPageTransitionStart()` hook](https://vike.dev/onPageTransitionStart), together with [`onPageTransitionEnd()`](https://vike.dev/onPageTransitionEnd), enables you to implement page transition animations.

### SSR

SSR is enabled by default. You can [disable it](https://vike.dev/ssr) for all your pages or only for some pages.

### HTML Streaming

You can enable/disable [HTML streaming](https://vike.dev/streaming) for all your pages, or only for some pages while still using it for others.

