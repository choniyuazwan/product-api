"use strict";

const dotenv = require( "dotenv" );
const postgres = require( "postgres" );

const init = async () => {
  // read environment variables
  dotenv.config();

  try {
    // connect to the local database server
    const sql = postgres();

    console.log( "dropping table, if exists..." );
    await sql`DROP TABLE IF EXISTS products`;

    console.log( "creating table..." );
    
    await sql`
CREATE TABLE IF NOT EXISTS products (
id INT NOT NULL PRIMARY KEY GENERATED ALWAYS AS IDENTITY
, name varchar(50) NOT NULL
, sku varchar(50) NOT NULL
, price int NOT NULL
, description text
, image varchar(50)
)
`;

    await sql.end();
  } catch ( err ) {
    console.log( err );
    throw err;
  }
};

init().then( () => {
  console.log( "finished" );
} ).catch( () => {
  console.log( "finished with errors" );
} );