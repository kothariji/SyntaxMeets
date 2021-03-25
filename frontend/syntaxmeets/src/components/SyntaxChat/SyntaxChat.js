import React, { useState, useEffect, useRef } from "react";
import { makeStyles } from "@material-ui/core/styles";
import InsertEmoticonIcon from "@material-ui/icons/InsertEmoticon";
import {
  Drawer,
  Button,
  Divider,
  TextField,
  Grid,
  Typography,
} from "@material-ui/core";

import SendIcon from "@material-ui/icons/Send";
import ForumIcon from "@material-ui/icons/Forum";
import { ChatMessage } from "./ChatMessage";
import CloseSharpIcon from "@material-ui/icons/CloseSharp";
import "emoji-mart/css/emoji-mart.css";
import { Picker } from "emoji-mart";

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
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [typingUser, setTypingUser] = useState();
  const [emojiPickerState, SetEmojiPicker] = useState(false);
  const messagesEndRef = useRef(null);

  const [mCount, setMCount] = useState(0);
  const [state, setState] = useState(false);

  const handleMessageSubmit = () => {
    SetEmojiPicker(false);
    if (message === "") return;
    let data = {
      name: props.name,
      roomId: props.roomId,
      message: message,
    };
    props.socket.emit("chatmessage", data);
    setMessages((messages) => [...messages, data]);
    setMCount(mCount + 1);
    setMessage("");
  };

  useEffect(() => {
    props.socket.on("chatmessage", (data) => {
      setMessages((messages) => [...messages, data]);
    });
    let timeout;
    // recieve the user who is currently typing's data from the backend
    props.socket.on("typing", (data) => {
      setTypingUser(data.name);
      //Remove the timeout(to clear typing message) , if someone has again typed something
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        //Remove the typing message if no one is typing after 500ms
        setTypingUser();
      }, 500);
    });
  }, []);

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  function triggerPicker(event) {
    event.preventDefault();
    SetEmojiPicker(!emojiPickerState);
  }
  useEffect(scrollToBottom, [messages]);
  let emojiPicker;
  if (emojiPickerState) {
    emojiPicker = (
      <Picker
        title="Pick your emoji…"
        emoji="point_up"
        onSelect={(emoji) => setMessage(message + emoji.native)}
        // style={{width: "90%", display: "flex"}}
      />
    );
  }

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
      <Drawer anchor={"right"} open={state} onClose={toggleDrawer(false)}>
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
            {<ChatMessage messages={messages} />}
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
            {typingUser ? (
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
                  <b>{typingUser}</b> is typing...
                </Typography>

                <Grid item xs={1}></Grid>
              </Grid>
            ) : undefined}

            <Grid container spacing={3}>
              {/* <Grid item xs={1}></Grid> */}
              <Grid item xs={1}>
                {/* <Button
                  variant="contained"
                  // className={classes.button}
                  // class="ma4 b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
                  onClick={triggerPicker}
                  color="white"
                  size="small"
                ></Button> */}
                <Grid item xs={1}></Grid>
                <InsertEmoticonIcon
                  onClick={triggerPicker}
                  color="primary"
                  // className={classes.list}
                  style={{ display: "flex", alignSelf: "center" }}
                ></InsertEmoticonIcon>
                {/* <Grid item xs={1}></Grid> */}
              </Grid>

              <Grid item xs={7}>
                <TextField
                  id="outlined-basic"
                  label="Enter Your Message"
                  variant="outlined"
                  fullWidth
                  size="small"
                  value={message}
                  onChange={(e) => {
                    // Send the user who is currently typings , name and id to the backend
                    props.socket.emit("typing", {
                      id: props.socket.id,
                      name: props.name,
                    });
                    setMessage(e.target.value);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleMessageSubmit();
                    }
                  }}
                />
                {/* <input
                  id="name"
                  class="input-reset ba b--black-20 pa2 mb2 db w-100"
                  type="text"
                  aria-describedby="name-desc"
                  value={message}
                  onChange={(event) => SetMessage(event.target.value)}
                /> */}
              </Grid>
              <Grid item xs={3}>
                <Button
                  variant="contained"
                  color="primary"
                  className={classes.button}
                  // size="large"
                  style={{
                    fontFamily: "poppins",
                    marginLeft: "auto",
                    fontWeight: "600",
                    color: "white",
                  }}
                  endIcon={<SendIcon />}
                  onClick={handleMessageSubmit}
                >
                  Send
                </Button>
                <Grid item xs={1}></Grid>
              </Grid>
            </Grid>
            <Grid container spacing={3} style={{ paddingTop: "10px" }}>
              <Grid item xs={1}></Grid>
              {emojiPicker}
              <Grid item xs={1}></Grid>
            </Grid>
          </div>
        </div>
      </Drawer>
    </div>
  );
};

export default SyntaxChat;
