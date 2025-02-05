//@ts-types="npm:@types/express"
import express from "express"
import "jsr:@std/dotenv/load";


const APP_PORT = Deno.env.get("APP_PORT")


const app = express()

app.get("/", (req, res) => {
  console.log(Deno.env.get("GREETINGS"))
  res.send(Deno.env.get("GREETINGS") || "No .env set");
});

app.listen(APP_PORT, () => {
  console.log(`Server is running on port ${APP_PORT}`);
});
