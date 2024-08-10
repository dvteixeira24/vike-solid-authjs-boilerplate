import { db } from "./db";
import { todoTable } from "./schema";

async function seed() {
	await db
		.insert(todoTable)
		.values([{ text: "Buy milk" }, { text: "Buy strawberries" }])
		.execute();

	console.log("Seed complete!");
}

seed();
