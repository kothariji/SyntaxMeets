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
  List
} from "@material-ui/core";

function ParticipantsList(props) {
  const { users } = props;
  const [openList, setOpenList] = useState(false);
  //   console.log(users);
  const renderParticipants = () => {
    console.log(users);
    return Object.keys(users).map((elem) => {
      const name = users[elem];
      console.log(name);
      return (
        <>
          <ListItem alignItems="flex-start">
            <ListItemAvatar>
              <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg" />
            </ListItemAvatar>
            <ListItemText
              primary={name}
            />
          </ListItem>
          <Divider variant="inset" component="li" />
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
          style={{ display: "flex", flexDirection: "column" }}
          role="presentation"
        >
          Participants
          <List>{renderParticipants()}</List>
        </div>
      </Drawer>
    </div>
  );
}

export default ParticipantsList;
