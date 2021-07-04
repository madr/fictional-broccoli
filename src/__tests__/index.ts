const request = require("supertest");
import { getConnection } from "typeorm";
import { Search } from "../entity/Search";
import { app } from "../index";
import { getTrending, logSearch, searchMovies } from "../search";
import connection from "./helpers/connection";
import * as apiFunctions from "../api-client";

beforeAll(async () => {
  await connection.create();
});

afterAll(async () => {
  await connection.close();
});

beforeEach(async () => {
  await connection.clear();
});

it("requires a query param to search", async () => {
  const expected = 400;
  const spy = jest.spyOn(apiFunctions, "getJSON");

  const res = await request(app).get("/search");

  expect(res.statusCode).toBe(expected);
  expect(spy).not.toHaveBeenCalled();
});

it("logs searches", async () => {
  const repo = getConnection().getRepository(Search);
  const term = "batman";
  const total = 43;

  const before = await repo.count();
  await logSearch(repo, term, total);
  const search = await repo.findOne({ term: term });

  expect(before).toBe(0);
  expect(search).not.toBe(undefined);
});

it("keep track of trending", async () => {
  const repo = getConnection().getRepository(Search);
  const term = "star wars";
  const total = 80;
  const term_alt = "Lord of the Rings";
  const total_alt = 20;

  await logSearch(repo, term, total);
  await logSearch(repo, term, total);
  await logSearch(repo, term_alt, total_alt);
  const trending = await getTrending(repo);

  expect(trending[0].term).toBe(term);
  expect(trending[0].count).toBe("2");
  expect(trending[1].term).toBe(term_alt);
  expect(trending[1].count).toBe("1");
});

it("search TMDB API for movies", async () => {
  const term = "Avatar";
  const expected = "https://api.themoviedb.org/3/search/movie?query=Avatar";
  const spy = jest.spyOn(apiFunctions, "getJSON");
  spy.mockImplementation(() => "mocked API Response");

  const res = await searchMovies(term);

  expect(res).toBe("mocked API Response");
  expect(spy).toBeCalledWith(expected);
});
