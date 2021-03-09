import React from 'react'
import {
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
} from "@material-ui/core";

const nameGenerator = (name) => ((name[0][0] + (name.length > 1 ? name[1][0] : "")).toUpperCase()) 


export const ChatMessage = (props) => {
    return props.messages.map((data) => (
      <ListItem>
        <ListItemAvatar>
          <Avatar>{nameGenerator(data.name.split(" "))}</Avatar>
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
              <em>{data.name}</em>
            </span>
          }
          secondary={<span className="sx-chat-message">{data.message}</span>}
        />
      </ListItem>
    ));
  };