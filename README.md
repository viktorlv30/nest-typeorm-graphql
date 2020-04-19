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
docker run --name mysql -v C:/Users/Viktor_Litvak/projects/nest-typeorm-graphql/mysql-data:/var/lib/mysql -p 6000:3306 -e MYSQL_USER=user -e MYSQL_PASSWORD=password -e MYSQL_ROOT_PASSWORD=root -e MYSQL_DATABASE=graphql mysql:5.7.29 --default-authentication-plugin=mysql_native_password

# Stop local Mysql server in docker and remove database with all data
docker rm -vf mysql api; rm -vrf mysql-data/* 

# Enter into docker container
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

# Простой каталог книг

Стек технологий:

* Node.js
* TypeScript
* Nest.js
* TypeORM
* MySQL
* GraphQL with code first approach

GraphQL схему для каталога смотри в файле schema.graphql.

Решение предоставить как ссылку на GitHub репозиторий.

В репозитории обязательно должен быть docker-compose.yml файл который:

* Дает доступ к node.js приложению через порт 5000.
* Дает доступ к mysql через порт 6000.
* Сохраняет mysql данные в volume ./mysql-data.

Приложение должно разворачиваться на локалке двумя командами:

```bash
npm install
docker-compose up
```

После docker-compose up в браузере по адресу http://localhost:5000/ должен быть доступен работоспособный GraphQL Playground.

После docker-compose down данные в базе не должны пропасть.

Приветствуются (но не обязательны) тесты, ограничение сложности GraphQL запросов (query complexity) и решение проблемы N+1 SQL запроса.


## GraphQL Schema


```graphql
schema {
  query: Query,
  mutation: Mutation
}

type Query {
  getAuthor(id: ID!): Author # возвращает null если ничего не нашло
  getBook(id: ID!): Book # возвращает null если ничего не нашло

  # getAuthors() возвращает всех авторов
  # getAuthors(minNumberOfBooks: 3) возвращает авторов у которых 3 и более книг
  # getAuthors(maxNumberOfBooks: 10) возвращает авторов у которых не больше 10 книг
  # getAuthors(minNumberOfBooks: 3, maxNumberOfBooks: 6) возвращает авторов у которых 3, 4, 5 или 6 книг
  getAuthors(minNumberOfBooks: Int, maxNumberOfBooks: Int): [Author!]!

  # поиск нечувствительный к регистру
  # должен поддерживать like синтаксис
  # getBooks() возвращает все книги
  # getBooks(title: "Art of %") возвращает книги начинающиеся с 'Art of'
  getBooks(title: String): [Book!]!
}

type Mutation {
  createAuthor(author: AuthorInput!): Author!
  createBook(book: BookInput!): Book!
  addAuthor(bookId: ID!, authorId: ID!): Book!

  deleteAuthor(id: ID!): Int! # возвращает количество удаленных записей (0 или 1)

  # удаляет автора и все его книги без соавторов
  # для книг в соавторстве удаляет автора из списка авторов
  # возвращает количество удаленных и измененных записей (автор+книги без соавторов+книги в соавторстве или 0)
  deleteAuthorWithBooks(id: ID!): Int!

  deleteBook(id: ID!): Int! # возвращает количество удаленных записей (0 или 1)
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