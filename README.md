# Plan It!

A degree planner for University of Toronto students.

The frontend uses React, backend uses Django. Postgres is used as the database.

## Getting started

### Setting up the frontend

You will need Node.js and npm.

1. To set up the frontend, run `npm install` in the frontend folder to install
   the required node dependencies.

2. Use `npm start` to start the React development webserver.

### Setting up the backend

You will need Python 3.6 or newer, and pip.

1. (optional) Setup a virtual environment with `virtualenv`. See
   [the Python documentation](https://docs.python.org/3/tutorial/venv.html) for
   more details.

2. Run `pip install -r requirements.txt` in the backend folder to install the
   required python dependencies (such as Django).

3. Make a copy of the `.sample.env` file, and call it `.env`. You will need to
   populate it with the appropriate values.

4. Run the server with `python manage.py runserver`. However, before you can
   run the server, you will need to setup the database.

### Setting up the database

You will need Postgres 11.2 or newer.

1. Enter the PostgreSQL shell through `psql`.

2. Create a database using `CREATE DATABASE plan_it;`.

3. If desired, create a user for the database with
   `CREATE USER myuser WITH PASSWORD 'password';`. Otherwise, use the default
   user (typically named `postgres`).

4. Alter the role of the user, and grant the user permissions with the
   following commands:

   ```SQL
   ALTER ROLE myuser SET client_encoding TO 'utf8';
   ALTER ROLE myuser SET timezone TO 'UTC';
   ALTER ROLE myuser SET default_transaction_isolation TO 'read committed';
   GRANT ALL PRIVILEGES ON DATABASE plan_it TO myuser;
   ```

5. Fill in the appropriate fields in the `.env` file (see
   [Setting up the backend](Setting-up-the-backend))

6. Run `python manage.py migrate` to generate the DB tables. If a change to the
   models are made, then run `python manage.py makemigrations` before calling
   migrate.
