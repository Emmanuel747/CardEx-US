require("dotenv").config();
const express = require("express");
const server = express();
const morgan = require("morgan");
const bodyParser = require("body-parser");
const path = require("path");
const { Client } = require("pg");

server.use(morgan("dev"));
server.use(bodyParser.json());
server.use(express.static(path.join(__dirname, "build")));

// Database connection
const DB_URL = `postgres://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:5432/${process.env.DB_NAME}`;
const client = new Client({
  connectionString: DB_URL,
  ssl: {
    rejectUnauthorized: false // This is necessary if you are using a self-signed certificate
  }
});

// Connect to the database once
client.connect()
  .then(() => console.log('Connected to the database'))
  .catch(err => console.error('Connection error', err.stack));

// // API route to read data from the database
// server.get('/api/cards', async (req, res) => {
//   try {
//     const result = await client.query('SELECT * FROM cards');
//     res.json(result.rows);
//   } catch (error) {
//     console.error('Error reading from database:', error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// });

server.use("/api", require("./routes")); // Updated path if necessary

server.use((req, res, next) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

server.use((error, req, res, next) => {
  console.error("SERVER ERROR: ", error);
  if (res.statusCode < 400) res.status(500);
  res.send({
    error: error.message,
    name: error.name,
    message: error.message,
    table: error.table,
  });
});

if (process.env.NODE_ENV === 'production') {
  // Serve any static files
  server.use(express.static(path.join(__dirname, 'client/build')));
  // Handle React routing, return all requests to React app
  server.get('*', function (req, res) {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
  });
}

const PORT = process.env.PORT || 5075;
server.listen(PORT, () => {
  console.log(`Server is running on ${PORT} !`);
});