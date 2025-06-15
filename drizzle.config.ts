import { config } from "dotenv";
import { defineConfig } from "drizzle-kit";

config({ path: process.env.NODE_ENV === "production" ? ".env" : ".env.local" });

export default defineConfig({
    out: "./src/db/migrations",
    schema: "./src/db/schema.ts",
    dialect: "postgresql",
    dbCredentials: {
        url: process.env.DATABASE_URL!,
    },
});
