import { Button, CircularProgress, Container, FormControl, FormHelperText, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { Stack } from "@mui/system";
import React, { useEffect } from "react";
import { useFormik } from "formik";
import { deviceSchema } from "../../schema/schema";
import * as Yup from "yup";
import axios from "axios";
const SignupSchema = Yup.object().shape({
  code: Yup.string().required("Required Device Code"),
  type: Yup.string().required("Required device type"),
  status: Yup.string().required("Required device status"),
});

export default function DeviceForm({ device, setNotify, setOpen, setRefetch }) {
  const [image, setImage] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const { values, errors, handleBlur, handleChange, handleReset, touched, validateForm, setValues } = useFormik({
    initialValues: {
      code: "",
      type: "",
      status: "",
    },
    validationSchema: SignupSchema,
    onSubmit: handleSubmit,
  });
  function imagehandle(e) {
    setImage(e.target.files[0]);
  }
  async function addDevice() {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("code", values.code);
      formData.append("type", values.type);
      formData.append("status", values.status);
      formData.append("file", image);

      const data = await axios.post("http://localhost:8000/device", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      handleReset();
      window.location.reload();
      // if (data.success) {
      //   setNotify({ isOpen: true, message: "Device Added Successfully", type: "success" });
      //   setOpen(false);
      //   setRefetch(true);
      // } else {
      //   setNotify({ isOpen: true, message: "Device Not Added", type: "error" });
      // }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  async function updateDevice() {
    setLoading(true);
    try {
      const data = await axios.patch(`http://localhost:8000/device/${device.id}`, values);
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
    if (device) {
      updateDevice();
      return;
    }
    addDevice();
  }

  useEffect(() => {
    if (device) {
      setValues({ code: device.deviceCode, type: device.type, status: device.status });
    }
  }, []);
  console.log("device", device);
  return (
    <Container>
      <form onSubmit={handleSubmit}>
        <Stack direction="column" justifyContent="center" alignItems="center" spacing={4}>
          <TextField
            fullWidth
            id="outlined-required"
            label="Device Code"
            name="code"
            value={values.code}
            onBlur={handleBlur}
            helperText={touched.code ? errors.code : ""}
            error={touched.code && Boolean(errors.code)}
            onChange={handleChange}
          />
          <FormControl fullWidth>
            <InputLabel error={errors.type} id="demo-simple-select-label">
              Device Type
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={values.type}
              label="Device Type"
              name="type"
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.type}
            >
              <MenuItem value={"pos"}>POS</MenuItem>
              <MenuItem value={"kiosk"}>KISOK</MenuItem>
              <MenuItem value={"signage"}>SIGNAGE</MenuItem>
            </Select>
            <FormHelperText error={errors.type}>{touched.type ? errors.type : ""}</FormHelperText>
          </FormControl>

          <FormControl fullWidth>
            <InputLabel error={errors.status} id="demo-simple-select-label">
              Device Status
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              value={values.status}
              error={errors.status}
              label="Device Status"
              onChange={handleChange}
              onBlur={handleBlur}
              name="status"
            >
              <MenuItem value={"active"}>Active</MenuItem>
              <MenuItem value={"inactive"}>InActive</MenuItem>
            </Select>
            <FormHelperText error={errors.status}>{touched.status ? errors.status : ""}</FormHelperText>
          </FormControl>
          <img src={device ? `http://localhost:8000/${device.image}` : image ? URL.createObjectURL(image) : ""} alt="" width="100px" height="100px" />
          <input accept="image/*" style={{ display: "none" }} id="raised-button-file" multiple type="file" onChange={imagehandle} />
          <label htmlFor="raised-button-file">
            <Button variant="raised" component="span">
              Upload
            </Button>
          </label>
          {device ? (
            <Button type="submit">{loading ? <CircularProgress width="100px" color="primary" /> : "Update Device"}</Button>
          ) : (
            <Button type="submit">{loading ? <CircularProgress width="100px" color="primary" /> : "Add Device"}</Button>
          )}
        </Stack>
      </form>
    </Container>
  );
}
