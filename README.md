# Vike + Drizzle + Auth.js + Telefunc + Shadcn + Tailwindcss + Solid + Biome

Generated with [Bati](https://batijs.dev) ([version 240](https://www.npmjs.com/package/create-bati/v/0.0.240)) using this command:

```sh
yarn dlx @batijs/cli --solid --tailwindcss --authjs --telefunc --drizzle --biome
```

### Routes

- `/api/auth/*`: [Auth rest endpoints](https://next-auth.js.org/getting-started/rest-api)
- `/api/auth/_telefunc`: [Telefunc endpoint](https://telefunc.com/)

### Pages

- `/auth/signin`: Signin page
- `/auth/signout`: Signout page
- `/app/*`: Protected pages

## *Drizzle*

It's set up to use Postgres...

### Database operations

```sh
pnpm drizzle:generate # a script that executes drizzle-kit generate.
pnpm drizzle:migrate # a script that executes drizzle-kit migrate.
pnpm drizzle:seed # a script that executes tsx ./database/seed.ts.
```

## *Authjs*

Signin/Signout mechanism: Custom form onSubmit functions 

### Providers

- [Credentials](https://next-auth.js.org/providers/credentials)