import { defineConfig } from "drizzle-kit";
import envs from "./envs";

if (!envs.POSTGRES_URL) {
    throw new Error("POSTRGRES_URL is not defined");
}

export default defineConfig({
    dialect: "postgresql",
    schema: "./database/schema.ts",
    out: "./drizzle",
    dbCredentials: {
        url: envs.POSTGRES_URL,
    },
});
