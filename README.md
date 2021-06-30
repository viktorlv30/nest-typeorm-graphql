## Run Application

1. Go to project root folder
2. Exec docker-compose up -d
3. Open GraphQL playground on http://localhost:5000/

## Development environment

-   Docker version 19.03.8,
-   docker-compose version 1.25.4
-   NodeJS version 12.14.0

## Task link

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
# Run docker container manually for dev on Windows (on Linux you can use relative path for volume)
docker run --name mysql -v C:/Users/User_Name/projects/nest-typeorm-graphql/mysql-data:/var/lib/mysql -p 6000:3306 -e MYSQL_USER=user -e MYSQL_PASSWORD=password -e MYSQL_ROOT_PASSWORD=root -e MYSQL_DATABASE=graphql mysql:5.7.29 --default-authentication-plugin=mysql_native_password

# Stop local Mysql server in docker and remove database with all data
-

# Enter into docker container on Windows
winpty docker exec -ti mysql bash

# Connect to the DB inside the container
mysql -h localhost -u user -ppassword
mysql -h localhost -u user -ppassword graphql
mysql -h localhost -u root -proot

# Exec script without entering to mysql client
mysql -h localhost -u user -ppassword -e "show databases"
```

### TASK

## Requirements

# A simple catalog of books

Stack of technologies:

-   Node.js
-   TypeScript
-   Nest.js
-   TypeORM
-   MySQL
-   GraphQL with code first approach

GraphQL diagram for the directory see the file schema.graphql.

The repository must have a docker-compose.yml file which:

-   Gives access to the node.js application via port 5000.
-   Gives access to mysql through port 6000.
-   Saves mysql data in volume ./mysql-data.

The application must be deployed on the locale with two commands:

```bash
npm install
docker-compose up
```

After docker-compose up in the Browser by http://localhost:5000/ a working GraphQL Playground must be available.

After docker-compose down the data in the database should not disappear.

Tests, query complexity, and a solution to the N + 1 SQL query problem are welcome (but not required).

## GraphQL Schema

```graphql
schema {
	query: Query
	mutation: Mutation
}

type Query {
	getAuthor(id: ID!): Author # returns null if nothing is found
	getBook(id: ID!): Book # returns null if nothing is found
	# getAuthors() returns all authors
	# getAuthors(minNumberOfBooks: 3) returns authors who have 3 or more books
	# getAuthors(maxNumberOfBooks: 10) returns authors who have no more than 10 books
	# getAuthors(minNumberOfBooks: 3, maxNumberOfBooks: 6) returns authors who have 3, 4, 5 or 6 books
	getAuthors(minNumberOfBooks: Int, maxNumberOfBooks: Int): [Author!]!

	# search case insensitive
	# must support like syntax
	# getBooks() returns all books
	# getBooks(title: "Art of %") returns books starting with 'Art of'
	getBooks(title: String): [Book!]!
}

type Mutation {
	createAuthor(author: AuthorInput!): Author!
	createBook(book: BookInput!): Book!
	addAuthor(bookId: ID!, authorId: ID!): Book!

	deleteAuthor(id: ID!): Int! # returns the number of deleted records (0 or 1)
	# removes the author and all his books without co-authors
	# for co-authored books removes the author from the list of authors
	# returns the number of deleted and modified entries (author + books without co-authors + books co-authored or 0)
	deleteAuthorWithBooks(id: ID!): Int!

	deleteBook(id: ID!): Int! # returns the number of deleted records (0 or 1)
}

type Author {
	id: ID!
	firstName: String!
	lastName: String!
	books: [Book!]!
}

input AuthorInput {
	firstName: String!
	lastName: String!
}

type Book {
	id: ID!
	title: String!
	authors: [Author!]!
}

input BookInput {
	title: String!
	authorIds: [ID!]!
}
```
