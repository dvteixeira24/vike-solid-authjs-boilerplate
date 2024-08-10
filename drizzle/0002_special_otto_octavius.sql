ALTER TABLE "users" RENAME COLUMN "name" TO "first_name";--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "last_name" text NOT NULL;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "active" boolean;--> statement-breakpoint
ALTER TABLE "users" DROP COLUMN IF EXISTS "role";