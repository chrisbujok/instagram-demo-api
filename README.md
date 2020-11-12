# Instagram Demo API

## How to run

1. Install deps:

```sh
npm install
```

2. Run docker compose:

```sh
docker-compose up -d
```

3. The API is available under `http://localhost:3000` port

4. Import data to the neo4j database

```sh
npm run import-data
```

5. Head over to [/swagger](http://localhost:3000/swagger) for API documentation

## Scraping Instagram

This is WIP, but there's a `import/import.js` script. It uses [instagram-private-api](https://github.com/dilame/instagram-private-api) package.
The output of that script is `createUsers.cypher` file which is being used by the `import-data` npm script.

## Current status

This POC is incomplete. Please refer to [the TODO file](TODO.md) for futher reference.
