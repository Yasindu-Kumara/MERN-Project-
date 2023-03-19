const Device = require("../model/device");

async function getDeviceList(req, res) {
  try {
    const devices = await Device.find();
    if (!devices) {
      return res.status(200).json({
        devices: [],
      });
    }
    res.status(200).json(devices);
  } catch (error) {
    res.status(500).send(error);
  }
}

async function getDevice(req, res) {
  try {
    const device = await Device.findById(req.params.id);
    res.send(device);
  } catch (error) {
    res.status(500).send(error);
  }
}

async function createDevice(req, res) {
  console.log(req.file);
  try {
    const device = new Device({
      image: "static/" + req.file.filename,
      code: req.body.code,
      status: req.body.status,
      type: req.body.type,
    });
    await device.save();
    res.status(200).json(device);
  } catch (error) {
    res.status(500).send(error);
  }
}

async function updateDevice(req, res) {
  try {
    const device = await Device.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.send(device);
  } catch (error) {
    res.status(500).send(error);
  }
}

async function deleteDevice(req, res) {
  try {
    const device = await Device.findByIdAndDelete(req.params.id);
    res.send(device);
  } catch (error) {
    res.status(500).send(error);
  }
}

module.exports = { getDeviceList, getDevice, createDevice, updateDevice, deleteDevice };
