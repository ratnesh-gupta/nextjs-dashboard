import createTable, { createTable } from "@/app/lib/db";



const {
  users,
} = require('../app/lib/placeholder-data.js');
const bcrypt = require('bcrypt');

async function seedUsers(client) {
  try {
    
    // Create the "users" table if it doesn't exist
    const createTable = await createTable({
      'CREATE TABLE IF NOT EXISTS users (id UUID DEFAULT uuid_generate_v4() PRIMARY KEY, email TEXT NOT NULL UNIQUE, password TEXT NOT NULL  ); '
    })
      ;
    ;

    console.log(`Created "users" table`);

    return {
      createTable
    };

  } catch (error) {
    console.error('Error seeding users:', error);
    throw error;
  }
}

async function main() {

  await seedUsers();
}

main().catch((err) => {
  console.error(
    'An error occurred while attempting to seed the database:',
    err,
  );
});
