import { db } from "@/database/db";
import { userTable, UserInsert } from "@/database/schema";
import { TelefuncError, TelefuncSuccess } from "@/libs/telefunc";
import bcryptjs from "bcryptjs";
import z, { ZodError } from "zod";

export type OnSignupData = UserInsert & { passwordConfirm: string };

const onSignup = async (data: OnSignupData): Promise<TelefuncError | TelefuncSuccess<number>> => {
    const pwRegex = /^.*(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*"'()+,-./:;<=>?[\]^_`{|}~]).{8,}.*$/;
    try {
        // Password strength
        z.string()
            .regex(pwRegex, {
                message:
                    "Password must contain at least 8 characters, including at least one uppercase letter, one lowercase letter, one number and one special character.",
            })
            .parse(data.password);
        // Confirmed password ?
        z.string()
            .min(1, { message: "You must confirm your password" })
            .refine((value) => value === data.password, "Passwords do not match")
            .parse(data.passwordConfirm);
    } catch (e) {
        if (e instanceof ZodError) {
            return {
                res: "error",
                message: JSON.parse(e.message).at(0)?.message || "Failed to validate your submission.",
            };
        }
        return {
            res: "error",
            message: "Failed to validate your submission.",
        };
    }
    try {
        const createdUser = (
            await db
                .insert(userTable)
                .values({
                    ...data,
                    password: bcryptjs.hashSync(data.password),
                })
                .returning()
        ).at(0);
        if (!createdUser?.id) return { res: "error", message: "Failed to create user" };
        return { res: "success", data: createdUser?.id };
    } catch {
        return {
            res: "error",
            message: "Failed to create user",
        };
    }
};

export { onSignup };
