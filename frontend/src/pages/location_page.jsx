import React, { useEffect, useState } from "react";
import { Container, Grid, Stack } from "@mui/material";
import axios from "axios";
import CustomCard from "../components/card/CustomCard";

export default function LocationPage() {
  const [locations, setlocations] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8000/location")
      .then((response) => {
        setlocations(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <Container maxWidth="lg">
      <Grid container spacing={2}>
        {locations?.map((item) => {
          return (
            <Grid item xs={4} key={item?._id}>
              <CustomCard id={item?._id} address={item.name} locationName={item.address} mobileNo={item.phone} devices={item.devices} />
            </Grid>
          );
        })}
      </Grid>
    </Container>
  );
}
