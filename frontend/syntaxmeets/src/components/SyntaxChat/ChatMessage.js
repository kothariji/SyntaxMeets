import React from 'react'
import {
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
} from "@material-ui/core";



export const ChatMessage = (props) => {
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