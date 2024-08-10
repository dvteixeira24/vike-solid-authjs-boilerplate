import { default as pg } from "postgres";
import { drizzle } from "drizzle-orm/postgres-js";
import * as schema from "./schema";
import envs from "@/envs";

if (!envs.POSTGRES_URL) {
	throw new Error("POSTGRES_URL is not defined");
}

const postgres = pg(envs.POSTGRES_URL);
export const db = drizzle(postgres, { schema });
