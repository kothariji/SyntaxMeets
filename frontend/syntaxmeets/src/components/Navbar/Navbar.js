import React,{useState} from 'react'
import AppBar from '@material-ui/core/AppBar';
import { Toolbar, Typography, Button, Drawer ,TextField} from '@material-ui/core';
import logo from '../../images/navlogo.png'
import PersonIcon from '@material-ui/icons/Person';
import SyntaxChat from '../SyntaxChat/SyntaxChat'
import copy from "copy-to-clipboard"; 


const Navbar = (props) => {

  const Copytext = (value) => {  
    copy(value);  
    alert("Copied Room ID : " + value)
  }  

  return (
  <AppBar position="static" style={{ 'backgroundColor': "#000A29" }}>
    <Toolbar>
      <img src={logo} style={{ 'maxWidth': "50px", 'maxHeight': "50px" }} alt = 'SyntaxMeets'/>
      <Typography variant="h5" style={{ "color": "white", 'fontFamily': "poppins", "fontWeight": "800" }}>
        &nbsp;Syntax<span style={{ "color": "#FFD500"}}>Meets</span>
            </Typography>
      
      <Button variant="contained" startIcon={<PersonIcon />} onClick={() => Copytext(props.roomId)} color = "primary" style={{ 'fontFamily': "poppins", 'marginLeft': "auto", 'fontWeight': "600", 'color': "white" }}>
        RoomId : {props.roomId}
      </Button>
        <SyntaxChat name = {props.name} socket = {props.socket} />
    </Toolbar>
  </AppBar>
)
}

export default Navbar;