# Northcoders Backend News API

An API designed to host news articles, allows interaction with articles, comments, topics and users.

## Getting Setup

1. Clone down the repo and move into the folder:

```
git clone https://github.com/SattySingh96/Northcoders---Backend---News-API-.git

cd ./Northcoders---Backend---News-API
```

2. Install all non-dev dependencies:

```
npm install
```
3. The latest version of node-postgres will also be needed, in order to setup & seed the databases:

```
npm install pg
```

4. Setup & Seed the database:

```
npm setup-dbs

npm seed
```
5. Run tests to ensure that util functions and endpoints are correctly setup:

```
npm run test-utils

npm test
```

## Using the API

1. The API was deployed using Herokuapp and can be accessed at:

```
http://satnams-news-api.herokuapp.com
```

2. A JSON list of endpoints can be found at:

```
http://satnams-news-api.herokuapp.com/api
```
