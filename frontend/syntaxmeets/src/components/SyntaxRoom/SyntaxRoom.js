import React, { Fragment, useState, useEffect } from 'react'
import Navbar from '../Navbar/Navbar';
import Grid from '@material-ui/core/Grid';
import SyntaxEditor from "../SyntaxEditor/SyntaxEditor"
import SyntaxPad from "../SyntaxPad/SyntaxPad"
import io from "socket.io-client";
import { Redirect} from "react-router-dom";

const socket = io.connect("http://localhost:4000");

const SyntaxRoom = (props) => {
  
  
  const [roomId] = useState(window.location.href.substr(window.location.href.lastIndexOf('/') + 1))
  console.log(props)
  const [name] = useState(props.location.name)
  const [goToHome, setGoToHome] = useState(false)


  useEffect(() => {
    if(props.location.name === undefined || props.location.name === "" ){
      alert("Please Enter your name");
      setGoToHome(true);
    }

    var patt = new RegExp("(([A-Za-z]{4})(-)){2}[A-Za-z]{4}");
    var result = patt.test(roomId);
    if(result === false ||  props.location.pathname === ""){
      alert("Invalid Room Id");
      setGoToHome(true);
    }
    // this will send server(backend) the roomId in which the props.socket needs to be joined
    //this code will run only once
    socket.emit("joinroom", roomId);
  }, []);


  return (
    <Fragment>
      {goToHome ? <Redirect to="/" /> : 
    <Fragment>
        <Navbar name = {name} roomId = {roomId} socket = {socket}/>
        <div style={{ backgroundColor: "#F3F7F7", fontFamily: "poppins", padding: '50px' }}>
          <Grid container spacing={5}>
            <Grid item xs={12} sm={12} md={6}>
              <SyntaxEditor socket = {socket} roomId = {roomId}/>
            </Grid>
            <Grid item xs={12} sm={12} md={6}>
                <SyntaxPad socket = {socket} roomId = {roomId}/>
            </Grid>
          </Grid>
        </div>
      </Fragment>
    }
    </Fragment>
    
    )
}

export default SyntaxRoom
