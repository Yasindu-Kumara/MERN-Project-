const express = require("express");
const { createLocation, deleteLocation, getLocation, getLocationList, updateLocation } = require("../controller/location_controller.js");
const Router = express.Router();

Router.route("/").get(getLocationList).post(createLocation);
Router.route("/:id").get(getLocation).patch(updateLocation).delete(deleteLocation);

module.exports = Router;
