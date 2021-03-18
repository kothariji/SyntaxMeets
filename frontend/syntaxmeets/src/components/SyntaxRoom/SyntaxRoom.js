import React, { Fragment, useState, useEffect} from "react";
import Navbar from "../Navbar/Navbar";
import { Grid, Snackbar } from "@material-ui/core";
import SyntaxEditor from "../SyntaxEditor/SyntaxEditor";
import SyntaxPad from "../SyntaxPad/SyntaxPad";
import io from "socket.io-client";
import { Redirect } from "react-router-dom";
import MuiAlert from "@material-ui/lab/Alert";
import Footer from "../Footer/Footer";
import { useParams } from "react-router-dom";

var connectionOptions = {
  transport: ["websocket"],
};
const socket = io.connect(
  process.env.REACT_APP_SYNTAXMEETS_BACKEND_API,
  connectionOptions
);
// to use for localhost
//var socket = io.connect("http://localhost:4000",connectionOptions);

const Alert = (props) => {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
};


const SyntaxRoom = (props) => {
  let paramsRoom = useParams().roomId;
  const [roomId] = useState(paramsRoom);
  const [name] = useState(props.location.name);
  const [goToHome, setGoToHome] = useState(false);
  const [open, setOpen] = useState(true);
  const [users, setUsers] = useState({});
  const [userDisconnect, setUserDisconnect] = useState(false);
  const [userJoinedName, setUserJoinedName] = useState();
  const [userLeftName, setUserLeftName] = useState();
  const [id, setId] = useState(); // Stores the userid default 1 and then increases and decreases according to the users.
  const [previousUser, setPreviousUser] = useState({}); //Store the id of an already existing user , so this user will emit the code when a new user joins
 
  
  useEffect(() => {
    // fetch the list of active rooms from backend
    var roomsList = [];
    const url = `${process.env.REACT_APP_SYNTAXMEETS_BACKEND_API}/rooms`;
    fetch(url)
      .then(res => {
        return res.json();
      })
      .then(rooms => {
        console.log(rooms);
        for (let i = 0; i < rooms.length; i++)
          roomsList.push(rooms[i]);
      });

    console.log(roomsList);
    // If disconnected then connect again to server
    // Trigerred when user leaves a room 
    socket.on("disconnect", (reason) => {

      socket.connect();
    });

    var roomid = localStorage.getItem('roomId');

    if (props.location.name === undefined || props.location.name === "") {
      // If user disconnects and want to connect back to same room
      var flag = false;
      flag = roomsList.includes(roomid);
      localStorage.setItem('flag', flag);
      if (localStorage.getItem('flag')) {
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
        setGoToHome(true);
      }
    }

    var patt = new RegExp("(([A-Za-z]{4})(-)){2}[A-Za-z]{4}");
    var result = patt.test(roomId);
    if (result === false || props.location.pathname === "") {
      alert("Invalid Room Id");
      setGoToHome(true);
    }
    // this will send server(backend) the roomId in which the props.socket needs to be joined
    //this code will run only once
    let data = {
      room: roomId,
      name: name,
    };
    socket.emit("joinroom", data);

    socket.on("addusers", (data) => {
      // When a new User joins in the room
      // Get all the users from the backend , when the current user joins in the room
      // so fetch all users from backend and store in the frontend
      // Also pass id of current user from backend
      setUsers(data.users);
      setUserJoinedName(data.users[data.id]);
      setOpen(true);
      setId(data.id);
    });

    socket.on("userjoined", (users) => {
      // For all other users (excluding the new user) , just get the new user data who entered the room
      // and a old user who will emit the code to be updated for new user
      // so update in the state

      const { newUser, oldUser } = users;
      const id = Object.keys(newUser)[0];
      setUsers((prevUsers) => {
        return { ...prevUsers, ...newUser };
      });
      setUserJoinedName(newUser[id]);
      setOpen(true);

      setPreviousUser({ id: Object.keys(oldUser)[0] });
    });

    socket.on("userleft", (userObject) => {
      setUsers((prevUsers) => {
        const { [userObject.id]: val, ...newUsers } = prevUsers;
        return newUsers;
      });
      setUserLeftName(userObject.name);
      setUserDisconnect(true);
    });
  }, []);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const handleDisconnectClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setUserDisconnect(false);
  };

  return (
    <Fragment>
      {goToHome ? (
        <Redirect to="/" />
      ) : (
        <Fragment>
          <Navbar name={name} roomId={roomId} socket={socket} users={users} />
          <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="success">
              {userJoinedName} , Welcome to Syntax Meets!
            </Alert>
          </Snackbar>
          <Snackbar
            open={userDisconnect}
            autoHideDuration={3000}
            onClose={handleDisconnectClose}
          >
            <Alert onClose={handleDisconnectClose} severity="error">
              {userLeftName} Left the Room.
            </Alert>
          </Snackbar>
          <div
            style={{
              backgroundColor: "#F3F7F7",
              fontFamily: "poppins",
              padding: "50px",
            }}
          >
            <Grid container spacing={5}>
              <Grid item xs={12} sm={12} md={6}>
                <SyntaxEditor
                  socket={socket}
                  roomId={roomId}
                  id={id}
                  previousUser={previousUser}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={6}>
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

export default SyntaxRoom;
