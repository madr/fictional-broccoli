#!/bin/bash
set -e

psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$POSTGRES_DB" <<-EOSQL
    CREATE USER tmdb password 'password';
    CREATE DATABASE tmdb;
    GRANT ALL PRIVILEGES ON DATABASE tmdb TO tmdb;
EOSQL