const {
  invoices,
  customers,
  revenue,
  users,
} = require('../app/lib/placeholder-data.js');


const mysql = require('serverless-mysql')({
  config: {
    host: process.env.MYSQLDB_HOST,
    port: process.env.MYSQLDB_DOCKER_PORT,
    database: process.env.MYSQLDB_DATABASE,
    user: process.env.MYSQLDB_USER,
    password: process.env.MYSQLDB_PASSWORD
  }
})

async function seedUsers(client) {
  try {
    console.log(`starting seedUsers()`);

    // Create the "users" table if it doesn't exist
    const createTable = await client
      .query(
        'CREATE TABLE IF NOT EXISTS users ('
        +'id varchar(36) PRIMARY KEY, '
          + 'name VARCHAR(255) NOT NULL, '
          + 'email VARCHAR(300) NOT NULL UNIQUE, '
          + 'password TEXT NOT NULL,'
          + 'created_at TIMESTAMP NOT NULL,'
          + 'updated_at TIMESTAMP NOT NULL,'
          + 'deleted_at TIMESTAMP NULL'
        +'); '
    )
   
    console.log(`Created "users" table`);

    // Insert data into the "users" table
    const insertedUsers = await Promise.all(
      users.map(async (user) => {
        let query = `INSERT INTO users (id, name, email, password,created_at,updated_at) values 
                    ('${user.id}', '${user.name}','${user.email}', '${user.password}', now(), now());`
        return client.query(query);
      }),
    );


    console.log(`ending seedUsers()`);

  } catch (error) {
    console.error('Error seeding users:', error);
    throw error;
  }
}

async function main() {
  // Connect to your MySQL instance first
  await mysql.connect();

  // Get the connection object
  let client = mysql.getClient()

  await seedUsers(client);
  
  // Run clean up function
  await mysql.quit();
}
main().catch((err) => {
  console.error(
    'An error occurred while attempting to seed the database:',
    err,
  );
});