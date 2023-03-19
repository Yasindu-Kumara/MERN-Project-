const Location = require("../model/location");

async function getLocation(req, res) {
  try {
    const locations = await Location.find({});
    if (!locations) {
      res.status(200).json({
        location: {},
      });
    }
    res.status(200).json(locations);
  } catch (error) {
    res.status(500).send(error);
  }
}

async function createLocation(req, res) {
  try {
    const location = new Location(req.body);
    await location.save();
    res.send(location);
  } catch (error) {
    res.status(500).send(error);
  }
}

async function updateLocation(req, res) {
  try {
    const location = await Location.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.send(location);
  } catch (error) {
    res.status(500).send(error);
  }
}

async function deleteLocation(req, res) {
  try {
    const location = await Location.findByIdAndDelete(req.params.id);
    res.send(location);
  } catch (error) {
    res.status(500).send(error);
  }
}

async function getLocationList(req, res) {
  try {
    const locations = await Location.find({});
    if (!locations) {
      return res.status(200).json({
        locations: [],
      });
    }
    res.status(200).json(locations);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
}

module.exports = { getLocation, createLocation, updateLocation, deleteLocation, getLocationList };
