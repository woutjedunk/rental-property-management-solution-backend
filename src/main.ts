//@ts-types="npm:@types/express"
import express from "express"
import "jsr:@std/dotenv/load";

const app = express()

app.get("/", (req, res) => {
  console.log(Deno.env.get("GREETINGS"))
  res.send(Deno.env.get("GREETINGS") || "No .env set");
});

app.listen(8000);