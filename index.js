require("dotenv").config();
const express = require("express");
const server = express();

const morgan = require("morgan");
server.use(morgan("dev"));

const bodyParser = require("body-parser");
server.use(bodyParser.json());

const path = require("path");
server.use(express.static(path.join(__dirname, "build")));

server.use("/api", require("./routes"));

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

const { client } = require("./db");

if (process.env.NODE_ENV === 'production') {
  // Serve any static files
  server.use(express.static(path.join(__dirname, 'client/build')));
// Handle React routing, return all requests to React app
  server.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
  });
}

const PORT = process.env.PORT || 5000;
server.listen(PORT, async () => {
  console.log(`Server is running on ${PORT} !`);

  try {
    await client.connect();
    console.log("Data is open for business!");
  } catch (error) {
    console.error("Database is closed for repairs!\n", error);
  }
});
