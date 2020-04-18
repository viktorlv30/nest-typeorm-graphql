Task:
https://github.com/V1c70r/simple-book-catalog

## Installation

```bash
$ npm install
```

## Running the app

Default PORT=3000 if not passed

```bash
#
# production mode
$ PORT=4999 npm start

# development watch mode
$ PORT=4999 npm run start:dev
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Migrations

```bash
# Migration up
ts-node ./node_modules/typeorm/cli.js migration:run

# Migration down
ts-node ./node_modules/typeorm/cli.js migration:revert
```

## Development DB

```bash
# Run docker container manually for dev
docker run --name mysql -v C:/Users/Viktor_Litvak/projects/nest-typeorm-graphql/mysql-data:/var/lib/mysql -p 6000:3306 -e MYSQL_USER=user -e MYSQL_PASSWORD=password -e MYSQL_ROOT_PASSWORD=root -e MYSQL_DATABASE=graphql mysql:5.7.29

# Enter into docker container
winpty docker exec -ti mysql bash

# Connect to the DB inside the container
mysql -h localhost -u user -ppassword
mysql -h localhost -u user -ppassword graphql
mysql -h localhost -u root -proot

# Exec script without entering to mysql client
mysql -h localhost -u user -ppassword -e "show databases"
```
