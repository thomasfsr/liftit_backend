import { Elysia } from "elysia";
import { t } from "elysia";
import { swagger } from "@elysiajs/swagger";
import { UserRepositoryDrizzle } from "../repositories/UserRepositoryDrizzle";

const app = new Elysia().use(
  swagger({
    path: "/swagger",
    documentation: {
      info: {
        title: "LiftIt API",
        version: "1.0.0",
      },
    },
  }),
);

app.post("/user");

app.listen(3000);
