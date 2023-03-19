import { AppBar, Box, Button, IconButton, Stack, Toolbar, Typography } from "@mui/material";
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import CustomeDialog from "../dialog/customdialog";
import DeviceForm from "../form/deviceform";
import LocationForm from "../form/locationform";
export default function CustomAppBar() {
  const [open, setOpen] = useState(false);
  const [openLoaction, setOpenLocation] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  function handleClick() {
    console.log(location.pathname);
    if (location.pathname === "/") {
      console.log("clicked calue");
      setOpenLocation(true);
    }

    if (location.pathname === "/device") {
      setOpen(true);
    }
  }
  return (
    <>
      <AppBar position="absolute">
        <Toolbar variant="dense">
          <Box sx={{ display: "flex", flexGrow: 1, justifyContent: "space-between" }}>
            <Box>
              <Button color="inherit" variant="text" onClick={() => navigate("/")}>
                Location Manage
              </Button>
              <Button color="inherit" variant="text" onClick={() => navigate("/device")}>
                Device Manage
              </Button>
            </Box>
            <Box>
              <Button color="inherit" variant="text" endIcon={<AddIcon />} onClick={handleClick}>
                {location.pathname === "/" ? "Add Location" : "Add Device"}
              </Button>
            </Box>
          </Box>
        </Toolbar>
      </AppBar>

      <CustomeDialog maxWidth={"sm"} open={open} setOpen={setOpen} title={"Add Device"}>
        <DeviceForm />
      </CustomeDialog>
      <CustomeDialog maxWidth={"sm"} open={openLoaction} setOpen={setOpenLocation} title={"Add Location"}>
        <LocationForm />
      </CustomeDialog>
    </>
  );
}
