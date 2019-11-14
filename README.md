# Library API

Library API created by using koa and mysql

## Installation and run

You have two ways to start the server: local starting or starting using docker-compose.

### Locally

#### Install dependencies

You need to install dependencies to start the server:

```sh
$ npm install
```

#### Connect to database

You can specify few enviroment variables to getting access to the MySql server.

| Enviroment variable | Default value   |
| :-----------------: |:---------------:|
| MYSQL_HOST          | 'localhost'     |
| MYSQL_PORT          | 3306            |
| MYSQL_USER          | 'root'          |
| MYSQL_PASSWORD      | 'root_password' |
| MYSQL_DATABASE      | 'test_database' |

#### Setup database structure

Before starting the server you need to setup database structure:

```sh
$ npm run init-db
```

Alternatively, if you want to automatically filling the database after it's structure is setuped, you should use script bellow instead of 'init-db':

```sh
$ npm run init-db:fill
```

You also can specify how much books and authors will be added to the database by using enviroment variables.

| Enviroment variable | Default value   |
| :-----------------: |:---------------:|
| BOOKS_COUNT         | 100000          |
| AUTHORS_COUNT       | 500             |

#### Server starting

Now you can start the server:

```sh
$ npm run start
```

### Using docker-compose

With docker-compose you just need perform this command:

```sh
$ docker-compose up -d
```

> The database will be filled with random values. The number of records added to the database depends on the BOOKS_COUNT and AUTHORS_COUNT enviroment variables and can be changed from 'docker-compose.yaml' file

## Docs

Docs available [here](https://eliseevnp.github.io/library-api/).

## License

MIT.
