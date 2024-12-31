import { defineConfig } from "drizzle-kit";

export default defineConfig({
    out: "./drizzle",
    dialect: "postgresql",
    schema: "./src/config/drizzle/schema/*",
    dbCredentials: {
        url: Deno.env.get("DATABASE_URL")!,
      },
});