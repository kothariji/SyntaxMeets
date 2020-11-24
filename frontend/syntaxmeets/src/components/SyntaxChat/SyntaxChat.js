import React, { useState, useEffect, useRef } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Drawer,
  Button,
  Divider,
  TextField,
  Grid,
} from "@material-ui/core";

import SendIcon from "@material-ui/icons/Send";
import ForumIcon from '@material-ui/icons/Forum';
import { ChatMessage } from "./ChatMessage";


const useStyles = makeStyles({
  list: {
    width: 400
  },
  fullList: {
    width: "auto"
  }
});




let allMessages = [];


const Chat = (props) => {


  const classes = useStyles();
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState(allMessages);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
  };

  const handleMessageSubmit = () => {

    if(message === "")
      return;
    let data = {
      name: props.name,
      message: message
    }
    props.socket.emit("chatmessage", data); 
    let tempChat = [...messages];
    tempChat.push(data);
    allMessages.push(data);
    setMessages(tempChat);
    setMessage("");
  };  


  props.socket.once("chatmessage", (data) => {
    let tempChat = [...messages];
    tempChat.push(data);
    allMessages.push(data);
    setMessages(tempChat);
  });

  useEffect(scrollToBottom, [messages]);

  return (
    <div
      className={classes.list}
      style={{ display: "flex", flexDirection: "column" }}
      role="presentation"
    >
      <div style={{ paddingBottom: "70px", marginBottom: "70px", height: "90%" }}>
        {<ChatMessage messages={messages} />}
        <div ref={messagesEndRef} />
      </div>
      
      <div
        style={{
          bottom: "0",
          position: "fixed",
          paddingBottom: "20px",
          paddingTop: "10px",
          backgroundColor: "#fff"
        }}
      >
        <Grid container justify="center" spacing={3}>
          <Grid item xs={12}>
            <Divider/>
          </Grid>
        </Grid>
        <br />
        <Grid container spacing={3}>
          <Grid item xs={1}></Grid>
          <Grid item xs={7}>
            <TextField
              id="outlined-basic"
              label="Enter Your Message"
              variant="outlined"
              fullWidth
              size="small"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleMessageSubmit();
                }
             }}
            />
          </Grid>
          <Grid item xs={3}>
            <Button
              variant="contained"
              color="primary"
              className={classes.button}
              endIcon={<SendIcon />}
              size="large"
              onClick={handleMessageSubmit}
              style={{ 'fontFamily': "poppins", 'marginLeft': "auto", 'fontWeight': "600", 'color': "white" }}
            >
              Send
            </Button>
            
            <Grid item xs={1}></Grid>
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

const TemporaryDrawer = (props) => {
  const classes = useStyles();
  const [state, setState] = useState(false);

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState(open);
  };

  return (
    <div>
      <Button onClick={toggleDrawer(true)} variant="contained" startIcon={<ForumIcon />} color = "primary" style={{ 'fontFamily': "poppins", 'marginLeft': "15px", 'fontWeight': "600", 'color': "white" }}>
      Chat Box
      </Button>
      <Drawer anchor={"right"} open={state} onClose={toggleDrawer(false)}>
        {<Chat name = {props.name} socket = {props.socket}/>}
      </Drawer>
    </div>
  );
}

export default TemporaryDrawer