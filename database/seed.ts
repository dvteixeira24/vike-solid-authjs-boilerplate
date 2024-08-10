import { db } from "./db";
import { userTable } from "./schema";
import bcryptjs from "bcryptjs";

async function seed() {
    // Await the user to enter y or n
    const answer: string = await new Promise((resolve) => {
        process.stdout.write("You are about to insert an an admin record to the db...");
        process.stdout.write("This is not needed for deployments, just run the migrate command.");
        process.stdout.write("Do you want to seed the database and add an admin user? (y/n) ");
        process.stdin.once("data", (data) => {
            resolve(data.toString().trim());
        });
    });

    if (answer.toLowerCase() !== "y") {
        console.log("Seeding cancelled.");
        process.exit(0);
    }

    if (!process.env.ADMIN_EMAIL || !process.env.ADMIN_PASSWORD) {
        throw new Error("ADMIN_EMAIL and ADMIN_PASSWORD must be set");
    }

    await db
        .insert(userTable)
        .values([
            {
                firstName: "Admin",
                lastName: "Admin",
                email: process.env.ADMIN_EMAIL!,
                password: bcryptjs.hashSync(process.env.ADMIN_PASSWORD!, 10),
            },
        ])
        .execute();

    console.log("Seed complete!");
}

seed();
