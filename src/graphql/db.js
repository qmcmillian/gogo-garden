// Import dependencies
const MongoClient = require('mongodb').MongoClient;
const url = require('url');

// Create cached connection variable
let cachedDb = null;

module.exports = async () => {
  // If the database connection is cached,
  // use it instead of creating a new connection
  if (cachedDb) {
    return cachedDb;
  }

  // Prepare variable for client connection
  let client;

  // If no connection is cached, create a new one
  // Error if the client connection fails
  try {
    client = await MongoClient.connect(process.env.MONGODB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  } catch (err) {
    throw new Error('[MongoDB] Connection Error: ' + err);
  }

  // Select the database through the connection,
  // using the database path of the connection string
  const database = await client.db('music');

  // Cache the database connection and return the connection
  // eslint-disable-next-line require-atomic-updates
  cachedDb = database;
  return database;
};
