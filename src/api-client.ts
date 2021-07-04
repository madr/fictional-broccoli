require("dotenv").config();
const bent = require("bent");
const API_SEARCH_URL = "https://api.themoviedb.org/3/search/movie";
const headers = {
  authorization: `Bearer ${process.env.API_KEY}`,
};
const getJSON = bent("json", headers);

export const SearchMovies = async (term: string) => {
  const url = new URL(API_SEARCH_URL);
  const params = new URLSearchParams();
  params.set("query", term);
  url.search = params.toString();
  return await getJSON(url.toString());
};
