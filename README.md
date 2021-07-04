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

1. [Register an account](signup) on TMDB.
2. Copy the [API Read Access Token (v4 auth)](apikey) from the settings. Bookmark this link or store the token in a safe place. **do not add it to version control!**
3. Rename `.env-template` to `.env`.
4. Open `.env` and set `API_KEY` variable to your API key.

[signup]: https://www.themoviedb.org/signup
[apikey]: https://www.themoviedb.org/settings/api#v4_auth_key
