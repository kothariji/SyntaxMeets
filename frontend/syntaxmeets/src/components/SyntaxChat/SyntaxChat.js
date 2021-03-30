import React, { useState, useEffect, useRef } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Drawer,
  Button,
  Divider,
  TextField,
  Grid,
  Typography,
} from "@material-ui/core";
import { connect } from 'react-redux';
import * as actions from "../../store/actions/chatActions.js";
import SendIcon from "@material-ui/icons/Send";
import ForumIcon from "@material-ui/icons/Forum";
import { ChatMessage } from "./ChatMessage";
import CloseSharpIcon from "@material-ui/icons/CloseSharp";

const useStyles = makeStyles({
  list: {
    width: 400,
  },
  fullList: {
    width: "auto",
  },
});

const SyntaxChat = (props) => {
  const classes = useStyles();
  const messagesEndRef = useRef(null);
  const [openDrawer, setopenDrawer] = useState(false);

  const handleMessageSubmit = () => {
    if (props.message === "") return;
    let data = {
      name: props.name,
      roomId: props.roomId,
      message: props.message,
    };
    props.socket.emit("chatmessage", data);
    
    props.setMessages(data);
    props.setMessage("");
  };

  useEffect(() => {
  
    props.socket.on("chatmessage", (data) => {
      props.setMessages(data);
    });
    let timeout;
      // recieve the user who is currently typing's data from the backend
      props.socket.on("typing", (data) => {
      props.whoIsTyping(data.name);
      //Remove the timeout(to clear typing message) , if someone has again typed something
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        //Remove the typing message if no one is typing after 500ms
      props.whoIsTyping();
      }, 500);
    });
  }, []);

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(scrollToBottom, [props.messages]);

  const toggleDrawer = (open) => (event) => {
    if (event.type === "keydown" && (event.key === "Tab" || event.key === "Shift")){
      return;
    }
    setopenDrawer(open);
  };

  return (
    <div>
      <Button
        onClick={toggleDrawer(true)}
        variant="contained"
        startIcon={<ForumIcon />}
        color="primary"
        style={{
          fontFamily: "poppins",
          marginLeft: "15px",
          fontWeight: "600",
          color: "white",
        }}
      >
        Chat Box
      </Button>
      <Drawer anchor={"right"} open={openDrawer} onClose={toggleDrawer(false)}>
        <CloseSharpIcon
          style={{ padding: "5px", fontSize: "3em", cursor: "pointer" }}
          onClick={toggleDrawer(false)}
        />
        <div
          className={classes.list}
          style={{ display: "flex", flexDirection: "column" }}
          role="presentation"
        >
          <div
            style={{
              paddingBottom: "70px",
              marginBottom: "70px",
              height: "90%",
            }}
          >
            {<ChatMessage messages={props.messages} />}
            <div ref={messagesEndRef} />
          </div>
          <div
            style={{
              bottom: "0",
              position: "fixed",
              paddingBottom: "20px",
              paddingTop: "10px",
              backgroundColor: "#fff",
            }}
          >
            <Grid container justify="center" spacing={3}>
              <Grid item xs={12}>
                <Divider />
              </Grid>
            </Grid>
            {props.typingUser ? (
              <Grid container justify="center">
                <Grid item xs={1}></Grid>
                <Typography
                  display="block"
                  variant="overline"
                  color="textSecondary"
                  align="justify"
                  style={{ marginBottom: "4px" }}
                  gutterBottom
                >
                  <b>{props.typingUser}</b> is typing...
                </Typography>

                <Grid item xs={1}></Grid>
              </Grid>
            ) : undefined}

            <Grid container spacing={3}>
              <Grid item xs={1}></Grid>
              <Grid item xs={7}>
                <TextField
                  id="outlined-basic"
                  label="Enter Your Message"
                  variant="outlined"
                  fullWidth
                  size="small"
                  value={props.message}
                  onChange={(e) => {
                    props.socket.emit("typing", {
                      id: props.socket.id,
                      name: props.name,
                    });
                    props.setMessage(e.target.value);
                  }}
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
                  style={{
                    fontFamily: "poppins",
                    marginLeft: "auto",
                    fontWeight: "600",
                    color: "white",
                  }}
                >
                  Send
                </Button>
                <Grid item xs={1}></Grid>
              </Grid>
            </Grid>
          </div>
        </div>
      </Drawer>
    </div>
  );
};

const mapStateToProps = state => {
    return {
      typingUser: state.CHAT.typingUser,
      message:state.CHAT.message,
      messages : state.CHAT.chat,
    }
}

const mapDispatchToProps = (dispatch) => {
  return {
      setMessage: (msg) => dispatch(actions.setMessage(msg)),
      setMessages: (msg) => dispatch(actions.makeMessage(msg)),
      whoIsTyping: (user) => dispatch(actions.whoIsTyping(user))
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(SyntaxChat);
