import React, { Fragment, useEffect, useState } from "react";
import Navbar from "../Navbar/Navbar";
import {
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  Grid,
} from "@material-ui/core";
import SyntaxEditor from "../SyntaxEditor/SyntaxEditor";
import SyntaxPad from "../SyntaxPad/SyntaxPad";
import { Redirect } from "react-router-dom";
import Footer from "../Footer/Footer";
import { socket } from "../../services/socket";
import { validateRoomID } from "../../util/util";
import { connect } from "react-redux";
import * as actions from "../../store/actions/roomActions.js";
import * as UIactions from "../../store/actions/uiActions.js";


// use following in case of localhost
//import io from "socket.io-client";
// to use for localhost
//var socket = io.connect("http://localhost:4000");

const SyntaxRoom = (props) => {
  const [popup, setPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");

  const roomId = props.roomId;
  useEffect(() => {
    // If disconnected then connect again to server
    // Trigerred when user leaves a room
    socket.on("disconnect", (reason) => {
      props.reset();
      socket.connect();
    });

  });
    useEffect(() => {
      // fetch the list of active rooms from backend
      var roomsList = [];
      // all active roomids are there in backend/rooms
      const url = `${process.env.REACT_APP_SYNTAXMEETS_BACKEND_API}/rooms`;
      // this fetch function fetches the list of active list
      fetch(url)
        .then(res => {
          return res.json();
        })
        .then(rooms => {
          console.log(rooms);
          for (let i = 0; i < rooms.length; i++)
            roomsList.push(rooms[i]);
        });
        // roomid gets the roomId from local storage
        var roomid = localStorage.getItem('roomId');

    if (props.Username === undefined || props.Username === "") {
      setPopup(true);
      setPopupMessage("Name not found");
    }


    if (props.location.name === undefined || props.location.name === "") {
      // If user disconnects and want to connect back to same room
      // flag is used to check whether roomid is active or not
      var flag = false;
      flag = roomsList.includes(roomid);
      localStorage.setItem('flag', flag);
      // this if statement is called when reload of page takes places
      // it just joins the user back to same roomId using socket
      if (localStorage.getItem('flag') && sessionStorage.getItem('isconnected')) {
        props.location.name = localStorage.getItem('name');
        let data = {
          room: localStorage.getItem('roomId'),
          name: localStorage.getItem('name'),
        }
        // join back to same room
        socket.emit("joinroom", data);
      }
      else {
        // direct back to home
        alert("Please Enter your name");
        props.reset();
        props.setGoToHome(true);
      }
    }
    
    if (validateRoomID(roomId) === false || props.location.pathname === "") {
      setPopup(true);
      setPopupMessage("Invalid Room Id");
    }
    // this will send server(backend) the roomId in which the props.socket needs to be joined
    //this code will run only once
    let data = {
      room: roomId,
      name: props.Username,
    };
    socket.emit("joinroom", data);
    localStorage.setItem("my_name", props.Username);
    socket.on("addusers", (data) => {
      // When a new User joins in the room
      // Get all the users from the backend , when the current user joins in the room
      // so fetch all users from backend and store in the frontend
      // Also pass id of current user from backend
      props.setUsers(data.users);
      let msg = data.users[data.id] + " , Welcome to Syntax Meets!";
      props.setSnackBar(msg, "success");
      props.setId(data.id);
    });
    socket.on("userjoined", (users) => {
      // For all other users (excluding the new user) , just get the new user data who entered the room
      // and a old user who will emit the code to be updated for new user
      // so update in the state
      const { newUser, oldUser } = users;
      const id = Object.keys(newUser)[0];
      props.setUsers(newUser);
      let msg = newUser[id] + " , Welcome to Syntax Meets!";
      props.setSnackBar(msg, "success");
      props.setPreviousUser({ id: Object.keys(oldUser)[0] });
    });

    socket.on("userleft", (userObject) => {
      props.removeUser(userObject);
      let msg = userObject.name + " Left the Room.";
      props.setSnackBar(msg, "error");
    });
  }, []);

  return (
    <Fragment>
      {props.goToHome ? (
        <Redirect to="/" />
      ) : (
        <Fragment>
          <Dialog fullWidth={true} maxWidth={"xs"} open={popup}>
            <DialogTitle style={{ textAlign: "center" }}>
              {popupMessage}
            </DialogTitle>
            <DialogActions>
              <Button
                onClick={() => {
                  setPopup(false);
                  setPopupMessage("");
                  props.reset();
                  props.setGoToHome(true);
                }}
                variant="contained"
                size="large"
                style={{ backgroundColor: "#f57c00" }}
              >
                OK
              </Button>
            </DialogActions>
          </Dialog>
          <Navbar name={props.Username} roomId={roomId} socket={socket} />
          <div
            style={{
              backgroundColor: "#F3F7F7",
              fontFamily: "poppins",
              padding: "50px",
            }}
          >
            <Grid container spacing={5}>
              <Grid item xs={12} sm={12} md={props.isFocusMode ? 12 : 6}>
                <SyntaxEditor socket={socket} />
              </Grid>
              <Grid item xs={12} sm={12} md={props.isFocusMode ? 12 : 6}>
                <SyntaxPad socket={socket} roomId={roomId} />
              </Grid>
            </Grid>
          </div>
        </Fragment>
      )}
      <Footer />
    </Fragment>
  );
          };
const mapStateToProps = (state) => {
  return {
    users: state.ROOM.users,
    roomId: state.ROOM.roomId,
    id: state.ROOM.id, // Stores the userid default 1 and then increases and decreases according to the users.
    Username: state.ROOM.name,
    previousUser: state.ROOM.previousUser, //Store the id of an already existing user , so this user will emit the code when a new user joins
    goToHome: state.ROOM.goToHome,
    isFocusMode: state.UI.isFocusMode,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setUsers: (users) => dispatch(actions.setUsers(users)),
    setName: (name) => dispatch(actions.setName(name)),
    setId: (id) => dispatch(actions.setId(id)),
    setPreviousUser: (user) => dispatch(actions.setPreviousUser(user)),
    setGoToHome: (isvalid) => dispatch(actions.setGoToHome(isvalid)),
    removeUser: (name) => dispatch(actions.removeUser(name)),
    reset: () => dispatch(actions.reset()),
    setSnackBar: (msg, type) => dispatch(UIactions.setSnackBar(msg, type)),
  };
};


export default connect(mapStateToProps, mapDispatchToProps)(SyntaxRoom);