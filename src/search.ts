import { Repository } from "typeorm";
import { Search } from "./entity/Search";

export const logSearch = async (
  connection: any,
  term: string,
  total: number
) => {
  let search = new Search();
  search.term = term;
  search.resultsCount = total;
  await connection.manager.save(search);
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
