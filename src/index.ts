import "reflect-metadata";
import express from "express";
import { Request, Response } from "express";
import { createConnection } from "typeorm";
import { Search } from "./entity/Search";
import { getTrending, logSearch, searchMovies } from "./search";

require("dotenv").config();
export const app = express();

createConnection()
  .then((connection) => {
    const repository = connection.getRepository(Search);
    const PORT = process.env.EXPRESS_PORT;

    app.use(express.json());

    app.get("/search", async function (req: Request, res: Response) {
      const term = <string>req.query.q;
      if (!term) {
        res
          .status(400)
          .send("Please provide a search term. Example: ?q=terminator");
      } else {
        const movies = await searchMovies(term);
        logSearch(repository, term, movies.total_results);
        return res.json(movies);
      }
    });

    app.get("/trending", async function (req: Request, res: Response) {
      const searches = await getTrending(repository);
      res.json(searches);
    });

    if (process.env.NODE_ENV !== "test") {
      app.listen(PORT);
    }
    module.exports = app;
  })
  .catch((error) => console.log(error));
