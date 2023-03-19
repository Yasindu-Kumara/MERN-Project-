const express = require("express");
const app = express();
const connect = require("./config/db_config");
const cors = require("cors");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    origin: "*",
  })
);
app.use("/static", express.static("uploads"));
app.listen(8000, () => {
  connect();
  app.use("/location", require("./route/location_route"));
  app.use("/device", require("./route/device_route"));
  console.log("Server is running on port 8000");
});
