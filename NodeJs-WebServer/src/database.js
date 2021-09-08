const mongoose = require("mongoose");

const uri = "mongodb://localhost/mern-tasks";

mongoose
  .connect(uri)
  .then((db) => console.log("Connect to db"))
  .catch((err) => console.error(err));

module.exports = mongoose;
