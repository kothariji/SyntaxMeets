import React from "react";
import {
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
} from "@material-ui/core";

const nameGenerator = (name) =>
  (name[0][0] + (name.length > 1 ? name[1][0] : "")).toUpperCase();

export const ChatMessage = (props) => {
  return props.messages.map((data) => (
    <ListItem
      style={{
        flexDirection: `${
          localStorage.getItem("my_name") === data.name ? "row-reverse" : "row"
        }`,
      }}
    >
      <ListItemAvatar
        style={{
          padding: `${
            localStorage.getItem("my_name") === data.name ? "0.6rem" : "unset"
          }`,
        }}
      >
        <Avatar>{nameGenerator(data.name.split(" "))}</Avatar>
      </ListItemAvatar>
      <ListItemText
        style={{
          paddingTop: "5px",
          borderRadius: "15px",
          paddingLeft: "20px",
          paddingBottom: "10px",
          backgroundColor: `${
            localStorage.getItem("my_name") === data.name
              ? "#00b4d8"
              : "#f0f0f0"
          }`,
          color: `${
            localStorage.getItem("my_name") === data.name ? "#fff" : "#404040"
          }`,
        }}
        primary={
          <span
            style={{
              color: `${
                localStorage.getItem("my_name") === data.name
                  ? "#fff"
                  : "#404040"
              }`,
            }}
          >
            <em>{data.name}</em>
          </span>
        }
        secondary={
          <span
            style={{
              color: `${
                localStorage.getItem("my_name") === data.name
                  ? "#fff"
                  : "#404040"
              }`,
              wordWrap: "break-word",
              overflowWrap: "break-word",
              hyphens: "auto",
              WebkitHyphens: "auto",
            }}
          >
            {data.message}
          </span>
        }
      />
    </ListItem>
  ));
};
