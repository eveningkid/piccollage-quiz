# Piccollage Project

## Objective
Yelp-like website, let users query the opening restaurants according to the time they plan to go.

## Adopted Solution
The application is using Node/Express/PostgreSQL on the back-end and React on the front-end.

### Back-end
#### Database
The database contains only one table in order to store the restaurants' informations. I thought of using two tables instead, one for restaurants and another to hold the schedule information (*.hours*) and link them together but instead, I stored the information inside a *json* attribute of *restaurants*. It was the first time I used this type as I discovered it when browsing the documentation (I never used PostgreSQL before as well).  

So the *restaurants* schema is the following:
```sql
CREATE TABLE restaurants (
  id serial PRIMARY KEY,
  name varchar(50) NOT NULL,
  hours json NOT NULL
);
```

Another detail is that, for *.hours.day.time*, instead of saving the given string such as "7:00", I'm saving the sum of minutes that this time results in, e.g. `7:00` becomes `7 * 60 = 420`. I changed this in order to easily apply the `where` clause later: I want to easily compare the total minutes sum from the time sent by the user with each restaurant's opening hours. Comparing `7:00` with `420` on the other hand would have been more difficult so I changed this as soon as we feed the database.  
However, when the results —the open restaurants— are pulled from the database, I restore its initial value to use it directly inside the view (so the view actually gets `7:00`).

#### HTTP Server
The Express application exposes two endpoints:
- `/`: index that displays front-end build `index.html` file (located in `app/build/index.html` **after using `yarn install && yarn build` in `app`**)
- `/restaurants`: return a list of open restaurants when given a day and a time ('mon', '7:00') through a POST request

### Front-end
I tried to keep it as light as possible. After changing date and/or time, the application will send a POST request sending the associated timestamp.
*Note: timestamp used is based on JavaScript's timestamp, not unix's. This could be changed as long as it is also changed on the back-end.*

The application gathers server's response results and display information after adapting it to fit the interface better. This can be seen inside `app/src/Restaurant.js`. I believe this data treatment could be moved on the server-side so it would directly respond with data that fits the interface. I just didn't know, according to instructions, whether the returned data structure could be altered or not.  

## Environment
*This entire project has been built using the following environment. If you run into any issue, it may be version-related.*
- [Node@9.0.0](https://nodejs.org)
- [PostgreSQL@10.1](https://www.postgresql.org)
- [Yarn@0.24.6](https://yarnpkg.com)
- [React@16.1.1](https://reactjs.org)
- MacOS@10.13.1

## Server
The following server database is based on [PostgreSQL](https://www.postgresql.org).  
If the `postgres` command isn't available in your terminal, you may install it using `brew`:
```
brew install postgresql
```

### Configure PostgreSQL
**If no Postgres instance is running yet**, execute `yarn start-db` or use the following command:
```
postgres -D /usr/local/var/postgres
```
**Take note on which port the Postgres server is running.** We'll need it in the following steps.
```
LOG:  listening on IPv6 address "::1", port 5432
```
*Here, you should keep '5432'.*  

Now, as this project will use a database called `restaurants` by default, create it using:
```
createdb restaurants
```
*If you call it differently, you'll need to mention it inside [your `config.json` file](#application-configuration).*

Finally, you may want to check if it's all working fine so far or interact with the freshly created database:
```
psql -d restaurants
```

### Application Configuration
After configuring our PostgreSQL server, we need to tell our Express application how to communicate with it.  

**Now duplicate the `config.sample.json` file as `config.json`**, at the project's root.

At this point, you may only check the `database` section:
```json
{
  "database": {
    "HOST": "localhost",
    "PORT": 5432,
    "USER": "local username (i.e. $ echo $USERNAME)",
    "PASSWORD": "",
    "DATABASE": "restaurants"
  },
}
```
*Note: `PORT` is the number you wrote down earlier*

### Initialize Database
After filling in `config.json`, in order to structure your database and feed it with sample data, you'll need to run the following command:
```
yarn init-db
```

By default, the tool will feed database using `server/database/sample.txt`. **If you plan to use another file, you need to provide the `--samplePath` option when executing the command**:
```
node server/database/initialize.js --samplePath=<pathToSample>
```  
_Be careful, the sample file needs only one Restaurant object on each line. Please refer to `sample.txt` for further details._

## Front-end
You now need to go inside the `app` folder, install modules and start your first build:
```
cd app && yarn install
yarn build
```
More informations about the front-end application can be found in `app/README.md`.  

Finally, come back to the project's root and start the server:
```
yarn start
```
Server should normally start running at [http://localhost:9397](http://localhost:9397/).

(sorry, I know this was a *very* long readme file 🦊)
