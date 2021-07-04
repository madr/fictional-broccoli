import "reflect-metadata";
import express from "express";
import { Request, Response } from "express";
import { createConnection } from "typeorm";

require("dotenv").config();

createConnection()
  .then((connection) => {
    const app = express();
    const PORT = process.env.EXPRESS_PORT;

    app.use(express.json());

    app.get("/", async function (req: Request, res: Response) {
      res.send("Hello, World!");
    });

    app.listen(PORT);
  })
  .catch((error) => console.log(error));
