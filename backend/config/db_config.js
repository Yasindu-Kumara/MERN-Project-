const mongoose = require("mongoose");

async function connect() {
  mongoose.set("strictQuery", false);
  await mongoose.connect("mongodb+srv://kumarayasindu:8EB4iPIvcE9aWbmY@cluster0.wju02um.mongodb.net/LocationDB", {});
}

mongoose.connection.on("connected", () => {
  console.log("Mongoose connected to db😍");
});
mongoose.connection.on("error", (err) => {
  console.log("Mongoose connection error:😢", err);
  process.exit(1);
});

mongoose.connection.on("disconnected", () => {
  console.log("Mongoose disconnected😢");
});

module.exports = connect;
