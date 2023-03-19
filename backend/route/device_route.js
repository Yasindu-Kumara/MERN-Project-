const express = require("express");
const { getDeviceList, getDevice, createDevice, updateDevice, deleteDevice } = require("../controller/device_controller");
const upload = require("../config/multer_config");

const Router = express.Router();

Router.route("/").get(getDeviceList).post(upload.single("file"), createDevice);
Router.route("/:id").get(getDevice).patch(updateDevice).delete(deleteDevice);

module.exports = Router;
