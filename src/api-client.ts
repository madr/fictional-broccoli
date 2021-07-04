require("dotenv").config();
const bent = require("bent");

const headers = {
  authorization: `Bearer ${process.env.API_KEY}`,
};

export const API_SEARCH_URL = "https://api.themoviedb.org/3/search/movie";

export const getJSON = bent("json", headers);
