import { Button, CircularProgress, Container, FormControl, FormHelperText, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { Stack } from "@mui/system";
import React, { useEffect } from "react";
import { useFormik } from "formik";
import { deviceSchema } from "../../schema/schema";
import * as Yup from "yup";
import axios from "axios";
const SignupSchema = Yup.object().shape({
  name: Yup.string().required("Required location name"),
  address: Yup.string().required("Required location address"),
  phone: Yup.string().length(10).required("Required location location"),
  devices: Yup.array().required("Required device status"),
});

export default function LocationForm({ location, setNotify, setOpen, setRefetch }) {
  const [loading, setLoading] = React.useState(false);
  const [devics, setDevices] = React.useState([]);
  const { values, errors, handleBlur, handleChange, handleReset, touched, setValues } = useFormik({
    initialValues: {
      name: "",
      address: "",
      phone: "",
      devices: [],
    },
    validationSchema: SignupSchema,
    onSubmit: handleSubmit,
  });

  async function addLocation() {
    setLoading(true);
    try {
      const data = await axios.post("http://localhost:8000/location", values);
      handleReset();
      window.location.reload();
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  async function updateLocation() {
    setLoading(true);
    try {
      const data = await axios.patch(`http://localhost:8000/location/${location.id}`, values);
      handleReset();
      window.location.reload();
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (location) {
      updateLocation();
      return;
    }
    addLocation();
  }

  useEffect(() => {
    async function getDeviceList() {
      const data = await axios.get("http://localhost:8000/device");
      console.log(data);
      setDevices(data.data);
    }
    getDeviceList();
  }, []);

  useEffect(() => {
    if (location) {
      setValues({
        name: location.locationName,
        address: location.address,
        phone: location.mobileNo,
        devices: location.devices,
      });
    }
  }, []);
  return (
    <Container>
      <form onSubmit={handleSubmit}>
        <Stack direction="column" justifyContent="center" alignItems="center" spacing={4}>
          <TextField
            fullWidth
            id="outlined-required"
            label="Location Name"
            name="name"
            value={values.name}
            onBlur={handleBlur}
            helperText={touched.name ? errors.name : ""}
            error={touched.name && Boolean(errors.name)}
            onChange={handleChange}
          />
          <TextField
            fullWidth
            id="outlined-required"
            label="Location address"
            name="address"
            value={values.address}
            onBlur={handleBlur}
            helperText={touched.address ? errors.address : ""}
            error={touched.address && Boolean(errors.address)}
            onChange={handleChange}
          />
          <TextField
            fullWidth
            id="outlined-required"
            label="Location Phone"
            name="phone"
            value={values.phone}
            onBlur={handleBlur}
            helperText={touched.phone ? errors.phone : ""}
            error={touched.phone && Boolean(errors.phone)}
            onChange={handleChange}
          />
          <FormControl fullWidth>
            <InputLabel error={errors.type} id="demo-simple-select-label">
              Select Devices
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              multiple
              value={values.devices}
              label="Devices"
              name="devices"
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.devices}
            >
              {devics &&
                devics.map((device) => {
                  return (
                    <MenuItem key={device?._id} value={device?._id}>
                      {device?.code}
                    </MenuItem>
                  );
                })}
            </Select>
            <FormHelperText error={errors.type}>{touched.type ? errors.type : ""}</FormHelperText>
          </FormControl>

          {location ? (
            <Button type="submit">{loading ? <CircularProgress width="100px" color="primary" /> : "Update Location"}</Button>
          ) : (
            <Button type="submit">{loading ? <CircularProgress width="100px" color="primary" /> : "Add Location"}</Button>
          )}
        </Stack>
      </form>
    </Container>
  );
}
