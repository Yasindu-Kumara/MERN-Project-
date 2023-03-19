import React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
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
import DeviceForm from "../form/deviceform";
export default function CustomDeviceCard({ id, deviceCode, type, image, status }) {
  const [openDevice, setOpenDevice] = React.useState(false);
  const deleteDevice = async () => {
    const dele = await axios.delete(`http://localhost:8000/device/${id}`);
    window.location.reload();
  };

  const updateDevice = async () => {
    setOpenDevice(true);
  };
  console.log(image);
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            {pascalcase(type)}
          </Avatar>
        }
        title={pascalcase(deviceCode)}
        subheader={pascalcase(status)}
      />
      <CardMedia component="img" height="194" image={"http://localhost:8000/" + image} alt="Paella dish" />
      <CardContent>
        <Typography variant="h6" color="text.secondary">
          Device Type -:{pascalcase(type)}
        </Typography>
      </CardContent>
      <CardActions disableSpacing sx={{ display: "flex", justifyContent: "end" }}>
        <IconButton aria-label="add to favorites" color="error" onClick={deleteDevice}>
          <DeleteIcon />
        </IconButton>
        <IconButton aria-label="share" color="info" onClick={updateDevice}>
          <EditLocationAltIcon />
        </IconButton>
      </CardActions>

      <CustomeDialog maxWidth={"sm"} open={openDevice} setOpen={setOpenDevice} title={"Update Device"}>
        <DeviceForm device={{ id, deviceCode, type, image, status }} />
      </CustomeDialog>
    </Card>
  );
}
