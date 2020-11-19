import React from 'react'
import AppBar from '@material-ui/core/AppBar';
import { Toolbar, Typography, Button } from '@material-ui/core';
import logo from '../images/navlogo.png'
import PersonIcon from '@material-ui/icons/Person';


const Navbar = (props) => (

  <AppBar position="static" style={{ 'backgroundColor': "#000A29" }}>
    <Toolbar>
      <img src={logo} style={{ 'maxWidth': "50px", 'maxHeight': "50px" }} alt = 'SyntaxMeets'/>
      <Typography variant="h5" style={{ "color": "white", 'fontFamily': "poppins", "fontWeight": "800" }}>
        &nbsp;Syntax<span style={{ "color": "#FFD500"}}>Meets</span>
            </Typography>
      <Button variant="contained" startIcon={<PersonIcon />} color = "primary" style={{ 'fontFamily': "poppins", 'marginLeft': "auto", 'fontWeight': "600", 'color': "white" }}>
        RoomId : {props.roomId}
      </Button>
    </Toolbar>
  </AppBar>
)

export default Navbar;