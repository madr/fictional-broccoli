## The Movie DB client

Simple, opinionated client for The Movie Database API (TMDB).

- Perform search by free text terms
- Log searches over time
- Display trending searches (top 100 most searched terms)

This client currently targets **v3** of the API, but is using v4
compatible API authentication.

## Getting started

This client needs a valid THMB **API key**. Follow the below
instructions to obtain a key.

1. [Register an account](signup) on TMDB. It's free.
2. Copy the [API Read Access Token (v4 auth)](apikey) from the settings. Bookmark this link or store the token in a safe place. **Do not add it to version control!**
3. Copy the file `.env-template` and to a new file: `.env`.
4. Open `.env` and set `API_KEY` variable to your API key.

After this, start the app by doing these 2 steps:

    $> docker-compose up -d
    $> npm start

The app is now online at http://localhost:3000.

- To do a search, browse or curl http://localhost:3000/search?q=Lord+Of+The+Rings (change the `q` query parameter to your likings).
- To view list of trending searches, browse or curl http://localhost:3000/trending. Use the search endpoint a couple of times to get some numbers going.

There are also some other help scripts.

- To run the test suite, use `$> npm test`.
- To verify all code is correctly formatted, use `$> npm run lint`. (This project is formatted by [Prettier](prttr)).

[signup]: https://www.themoviedb.org/signup
[apikey]: https://www.themoviedb.org/settings/api#v4_auth_key
[prttr]: https://prettier.io/
