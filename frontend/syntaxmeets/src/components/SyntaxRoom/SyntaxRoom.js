import React, { Fragment, useState, useEffect } from 'react'
import Navbar from '../Navbar';
import Grid from '@material-ui/core/Grid';
import SyntaxEditor from "../SyntaxEditor/SyntaxEditor"
import SyntaxPad from "../SyntaxPad/SyntaxPad"
import io from "socket.io-client";


const socket = io.connect("http://localhost:4000");

const SyntaxRoom = (props) => {
  
  const [roomId] = useState(window.location.href.substr(window.location.href.lastIndexOf('/') + 1))
  console.log(props.location.name)
  const [name] = useState(props.location.name)


  useEffect(() => {

    // this will send server(backend) the roomId in which the props.socket needs to be joined
    //this code will run only once
    socket.emit("joinroom", roomId);
  }, []);


  return (
    <Fragment>
        <Navbar name = {name} roomId = {roomId} socket = {socket}/>
        <div style={{ backgroundColor: "#F3F7F7", fontFamily: "poppins", padding: '50px' }}>
          <Grid container spacing={5}>
            <Grid item xs={12} sm={12} md={6}>
              <SyntaxEditor socket = {socket} roomId = {roomId}/>
            </Grid>
            <Grid item xs={12} sm={12} md={6}>
                <SyntaxPad roomId = {roomId}/>
            </Grid>
          </Grid>
        </div>
      </Fragment>
    )
}

export default SyntaxRoom
