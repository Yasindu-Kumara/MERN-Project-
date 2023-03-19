import { AppBar, Box } from '@mui/material'
import React from 'react'
import { Outlet } from 'react-router-dom'
import CustomAppBar from '../components/appbar/appbar'

export default function HomePage() {
  return (
    <>
        <CustomAppBar/>
        <Box sx={{mt:10}}><Outlet/></Box>
    </>
  )
}
