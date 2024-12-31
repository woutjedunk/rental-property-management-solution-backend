import { defineConfig } from "npm:drizzle-kit";

export default defineConfig({
    dialect: "postgresql",
    schema: "./src/config/schema/*",
});