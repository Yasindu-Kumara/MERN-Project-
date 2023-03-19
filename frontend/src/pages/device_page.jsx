import { Container, Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import CustomDeviceCard from "../components/card/CustomDeviceCard";
import axios from "axios";
export default function DevicePage() {
  const [devices, setDevices] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:8000/device")
      .then((response) => {
        setDevices(response.data);
        console.log(response.data)
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return <Container maxWidth="lg">
  <Grid container spacing={2}>
  {
    devices?.map((item)=>{
      return (
        <Grid item xs={4} key={item?._id}>
   <CustomDeviceCard id={item?._id} deviceCode={item?.code} image={item?.image} status={item?.Status}  type={item?.type}  />
   </Grid>
      )
    })
  }
  </Grid>
     
      </Container>;
}
