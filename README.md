# artist-oeuvre

A RESTful server-side app that facilitates artists to securely catalogue their work.

## Description

[Repo](https://github.com/escowin/artist-oeuvre)

Experience secure and efficient cataloging for artists with this RESTful server-side application. As an artist, I've encountered numerous challenges when attempting to catalogue my own work. Developing this application is my solution to that.

Overcoming the limitations of pen and paper, spreadsheets, and insecure storage, this application allows artists to seamlessly manage the details of their work. In addition to making cataloguing work easier, I designed this app to also enhance my understanding of multi-level security, covering user authentication, session management, API endpoint authguarding, as well as field validation through regex testing.

Utilizing Test Driven Development (TDD) with `Jest`, I built string and regex validators, expediting app development and ensuring robust validation. And with `nodemon`, one of my additional goals here was to assess how quickly I could turn out a functional & secure MVP backend app as I could see changes occur in realtime.

On the technical side, the application utilizes a `PostgreSQL` database for its consistent data patterns.  Emphasizing security, the system ensures that CRUD operations are exclusively accessible to logged-in users, and this security is implemented through the use of the `Sequelize` ORM library.

Future plans include expanding the application into a fullstack PERN (`PostgreSQL`, `Express`, `React`, `Node.js`) application. Additionally, enhancements will involve incorporating additional model associations to facilitate the tracking of sales records.

## Table of Contents

- [Installation](#installation)
- [Test](#test)
- [Usage](#usage)
- [Features](#features)
- [Credits](#credits)
- [Author](#author)

## Installation

1. Run the following command in the terminal to clone the application locally & install its necessary dependencies:

   ```
   git clone git@github.com:escowin/artist-oeuvre.git; cd artist-oeuvre; npm i
   ```

2. Use `psql` to source the database into PostgreSQL. Replace `<username>` with the appropriate credential.

   ```
   psql -U <username> -d artist_oeuvre_db -a -f db/schema.sql -W
   ```

   If a password is required, you will then be asked to provide your PostgreSQL password in the terminal.

3. Rename the provided `.env.example` file in the root directory to `.env` and supply the appropriate values, ie:

   ```
   DB_NAME=artist_oeuvre_db
   DB_USER=postgres
   DB_PW=password123
   DB_PORT=5432
   DB_HOST=localhost
   SECRET=secret_example
   ```

## Test

Run the following command to run tests:

```
npm run test
```

## Usage

Run the following command to invoke the appliction:

```
npm start
```

After starting the app, use your preferred API developer tool to interact with the following endpoints:

- User registration:
  - URL: `http://localhost:3005/api/users/`
  - Method: `POST`
  - JSON Body:

    ```
    {
        "username":"<insert-username>",
        "password":"<insert-password>"
    }
    ```

- User login:

  - URL: `http://localhost:3005/api/users/login`
  - Method: `POST`
  - JSON Body: (same as registration)

- User logout:
   - URL: `http://localhost:3005/api/users/logout`
   - Method: `POST`

- CRUD operations:
  - Users endpoint: http://localhost:3005/api/users/
  - Artwork endpoint: http://localhost:3005/api/artwork/
  - Tags endpoint: http://localhost:3005/api/tags/
  - To perform `GET`, `PUT`, or `DELETE` requests for specific objects, append its `:id` value to the endpoint, ie: `http://localhost:3005/api/artwork/1`

![post request](./assets/img/artist-oeuvre-post.jpg)

![get request](./assets/img/artist-oeuvre-get.jpg)

## Features

1. **Secure Password Hashing:**

   - User passwords are securely hashed using industry-standard cryptographic algorithms, enhancing the security of user data.

2. **Sequelize Model Associations:**

   - SQL table joining is achieved through Sequelize model associations, allowing for efficient querying and retrieval of related data.

3. **Authentication-Guarded Routes:**

   - Certain routes are auth-guarded, ensuring that only authenticated users can access specific functionalities. This adds an extra layer of security to sensitive operations.

4. **Wildcard Route Handling:**
   - Efficient wildcard route handling ensures that the application gracefully manages all routes, providing a seamless user experience.

5. **Controller-Level Security**
   - CRUD operations are restricted to authenticated users, maintaining privacy during data queries and modifications in the database. This additional layer of security at the controller level ensures a secure and private user experience.

These features collectively contribute to a secure and robust application, offering a smooth user authentication experience, optimized database interactions, and enhanced route management.

## Credits

- Languages: JavaScript, SQL
- Frameworks: Node, Express, Jest
- Libraries: bcrypt, Sequelize, connect-session-sequelize, express-session, dotenv, pg, pg-hstore
- Database: PostgreSQL

## Author

### Edwin Escobar

- [Email](mailto:edwin@escowinart.com)
- [GitHub](https://github.com/escowin)
