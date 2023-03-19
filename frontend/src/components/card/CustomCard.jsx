import React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import DeleteIcon from "@mui/icons-material/Delete";
import EditLocationAltIcon from "@mui/icons-material/EditLocationAlt";
import { pascalcase } from "pascalcase";
import axios from "axios";
import CustomeDialog from "../dialog/customdialog";
import LocationForm from "../form/locationform";
export default function CustomCard({ id, locationName, address, mobileNo, devices }) {
  const [openLoaction, setOpenLocation] = React.useState(false);
  const deleteLocation = async () => {
    const dele = await axios.delete(`http://localhost:8000/location/${id}`);
    window.location.reload();
  };

  const updateLocation = async () => {
    console.log(id);
    setOpenLocation(true);
  };

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            {pascalcase(locationName)}
          </Avatar>
        }
        title={pascalcase(locationName)}
        subheader={pascalcase(address)}
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          Mobile No -:{mobileNo}
        </Typography>
      </CardContent>
      <CardActions disableSpacing sx={{ display: "flex", justifyContent: "end" }}>
        <IconButton aria-label="add to favorites" color="error" onClick={deleteLocation}>
          <DeleteIcon />
        </IconButton>
        <IconButton aria-label="share" color="info" onClick={updateLocation}>
          <EditLocationAltIcon />
        </IconButton>
      </CardActions>
      <CustomeDialog maxWidth={"sm"} open={openLoaction} setOpen={setOpenLocation} title={"Update Location"}>
        <LocationForm location={{ id, locationName, address, mobileNo, devices }} />
      </CustomeDialog>
    </Card>
  );
}
