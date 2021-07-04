import { Repository } from "typeorm";
import { Search } from "./entity/Search";
import { API_SEARCH_URL, getJSON } from "./api-client";

export const searchMovies = async (term: string) => {
  const url = new URL(API_SEARCH_URL);
  const params = new URLSearchParams();
  params.set("query", term);
  url.search = params.toString();
  return await getJSON(url.toString());
};

export const logSearch = async (
  repository: Repository<Search>,
  term: string,
  total: number
) => {
  let search = new Search();
  search.term = term;
  search.resultsCount = total;
  await repository.manager.save(search);
};

export const getTrending = async (repository: Repository<Search>) => {
  const limit = 100;
  const searches = await repository
    .createQueryBuilder("search")
    .select("COUNT(term), term", "term")
    .groupBy("search.term")
    .orderBy("count", "DESC")
    .limit(limit)
    .getRawMany();
  return searches;
};
