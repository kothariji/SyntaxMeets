import React, { useState } from "react";
import GroupIcon from "@material-ui/icons/Group";
import {
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Button,
  Drawer,
  Typography,
  Divider,
  List,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  list: {
    width: 400,
  },
  fullList: {
    width: "auto",
  },
});
const nameGenerator = (name) =>
  (name[0][0] + (name.length > 1 ? name[1][0] : "")).toUpperCase();

function ParticipantsList(props) {
  const classes = useStyles();

  const { users } = props;
  const [openList, setOpenList] = useState(false);
  //   console.log(users);
  const renderParticipants = () => {
    console.log(users);
    return Object.keys(users).map((elem) => {
      const name = users[elem];
      return (
        <>
          <ListItem>
            <ListItemAvatar>
              <Avatar
                style={{ backgroundColor: "#FFD500", fontWeight: "bold" }}
              >
                {nameGenerator(name.split(" "))}
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              style={{
                borderRadius: "10px",
                padding: "10px",
                backgroundColor: "#00b4d8",
                color: "#fff",
                textAlign: "center",
                fontWeight: "bold",
              }}
              primary={name}
            />
          </ListItem>
        </>
      );
    });
  };
  return (
    <div>
      <Button
        onClick={() => setOpenList(true)}
        variant="contained"
        color="primary"
        startIcon={<GroupIcon />}
        style={{
          fontFamily: "poppins",
          marginLeft: "15px",
          fontWeight: "600",
          color: "white",
        }}
      >
        Participants
      </Button>
      <Drawer
        anchor={"right"}
        open={openList}
        onClose={() => setOpenList(false)}
      >
        <div
          className={classes.list}
          style={{
            display: "flex",
            flexDirection: "column",
            minHeight: "100%",
            overflowY: "scroll",
            backgroundColor: "#000A29",
          }}
          role="presentation"
        >
          <List>{renderParticipants()}</List>
        </div>
      </Drawer>
    </div>
  );
}

export default ParticipantsList;
