import React from 'react'
import AppBar from '@material-ui/core/AppBar';
import { Toolbar, Typography, Button} from '@material-ui/core';
import logo from '../../images/navlogo.png'
import PersonIcon from '@material-ui/icons/Person';
import SyntaxChat from '../SyntaxChat/SyntaxChat'
import copy from "copy-to-clipboard"; 
import { Link } from 'react-router-dom';

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
        <Button variant="contained" startIcon={<PersonIcon />} component={Link} to="/about" color = "secondary" style={{ 'fontFamily': "poppins", 'marginLeft': "15px", 'fontWeight': "600", 'color': "white" }}>
        About Us
      </Button>
    </Toolbar>
  </AppBar>
)
}

export default Navbar;