import React, { useState, useEffect, useRef } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Drawer,
  Button,
  List,
  Divider,
  ListItem,
  ListItemIcon,
  ListItemText,
  TextField,
  Grid,
  ListItemAvatar,
  Avatar,
} from "@material-ui/core";
import FolderIcon from "@material-ui/icons/Folder";
import SendIcon from "@material-ui/icons/Send";
import ForumIcon from '@material-ui/icons/Forum';


const useStyles = makeStyles({
  list: {
    width: 400
  },
  fullList: {
    width: "auto"
  }
});

const ShowMessages = (props) => {
  return props.messages.map((message) => (
    <ListItem>
      <ListItemAvatar>
        <Avatar>DK</Avatar>
      </ListItemAvatar>
      <ListItemText
        style={{
          paddingTop: "5px",
          borderRadius: "15px",
          paddingLeft: "20px",
          paddingBottom: "10px",
          backgroundColor: "#00b4d8",
          color: "#fff"
        }}
        primary={
          <span style={{ color: "#fff" }}>
            <em>Dhruv Kothari</em>
          </span>
        }
        secondary={<span style={{ color: "#fff" }}>{message}</span>}
      />
    </ListItem>
  ));
};

let messages = [];


const handleMessageSubmit = (socket, message) => {
  socket.emit("chatmessage", message); 
};  

const Chat = (props) => {


  const classes = useStyles();
  const [message, setMessage] = useState("");
  const [random, setRandom] = useState(true);
  
  

useEffect(() => {
  props.socket.on("chatmessage", (message) => {
    console.log("ON", message);
    messages.push(message);
  });
})
  
  
  

  

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [random]);

  return (
    <div
      className={classes.list}
      style={{ display: "flex", flexDirection: "column" }}
      role="presentation"
    >
      <div style={{ paddingBottom: "70px", marginBottom: "70px", height: "90%" }}>
        {<ShowMessages messages={messages} />}
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
            />
          </Grid>
          <Grid item xs={3}>
            <Button
              variant="contained"
              color="primary"
              className={classes.button}
              endIcon={<SendIcon />}
              size="large"
              onClick={() => {
                handleMessageSubmit(props.socket, message);
                setMessage("");
              }}
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
        {<Chat socket = {props.socket}/>}
      </Drawer>
    </div>
  );
}

export default TemporaryDrawer