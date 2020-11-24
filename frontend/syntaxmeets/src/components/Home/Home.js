import React, { useState, useRef} from "react";
import localclasses from "./Home.module.css";
import bgimg from "../../images/home_svg.svg";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { TextField, Button as MUIButton, Typography } from "@material-ui/core";
import { Link } from "react-router-dom";
import SkyLight from "react-skylight";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import MeetingRoomIcon from '@material-ui/icons/MeetingRoom';
import GroupAddIcon from '@material-ui/icons/GroupAdd';


function generateRoomId() {
  var tempId = "";
  var characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  var charactersLength = characters.length;
  for (var i = 0; i < 12; i++) {
    tempId += characters.charAt(Math.floor(Math.random() * charactersLength));
    if ((i + 1) % 4 === 0 && i !== 11) {
      tempId += "-";
    }
  }
  return tempId;
}

const styles = {
  input: {
    color: "white",
  },
};

const Home = (props) => {
  const { classes } = props;
  const skyLightCreateModal = useRef(SkyLight);
  const skyLightJoinModal = useRef(SkyLight);
  const [roomId] = useState(generateRoomId());
  const [joinRoomId, setjoinRoomId] = useState("123");
  const [name, setName] = useState("");
  

  const roomModal = {
        backgroundImage:
        "linear-gradient(to left top, #000a29, #053155, #035982, #0085af, #00b4d8)",
        width: "30%",
        marginTop: "-200px",
        marginLeft: "-15%",
    };

  const ModalTitle = (props) => (
    <Row className="justify-content-md-center mt-5">
      <span
        style={{
          fontFamily: "poppins",
          fontWeight: "600",
          color: "#fff",
          fontSize: "4vh",
        }}
      >
        {props.start}
        <span style={{ color: "#fff" }}>&nbsp;Syntax</span>
        <span style={{ color: "#ffd500" }}>Room</span>
      </span>
    </Row>
  );

  return (
    <div className={localclasses.home}>
      <Container fluid>
        <Row>
          <Col xs={12} md={8}>
            <img
              className={localclasses.home__svg}
              src={bgimg}
              alt="SyntaxMeets"
            />
          </Col>
          <Col xs={12} md={3}>
            <Container className={localclasses.home__buttons}>
              <Row>
                <MUIButton
                  block
                  variant="contained"
                  color="secondary"
                  style={{
                    padding: "10px",
                    fontSize: '3vh',
                    fontWeight: '600',
                    color: '#333'
                  }}
                  startIcon={<MeetingRoomIcon style={{ fontSize: 30 }} />}
                  size="large"
                  fullWidth
                  onClick={() => skyLightCreateModal.current.show()}
                >
                  Create a Room
                </MUIButton>
              </Row>
              <br />
              <br />
              <Row>
                <MUIButton
                  block
                  variant="contained"
                  color="secondary"
                  style={{
                    padding: "10px",
                    fontSize: '3vh',
                    fontWeight: '600',
                    color: '#333'
                  }}
                  startIcon={<GroupAddIcon style={{ fontSize: 30 }} />}
                  size="large"
                  fullWidth
                  onClick={() => skyLightJoinModal.current.show()}
                >
                  Join a room
                </MUIButton>
              </Row>
              
              
                  <SkyLight
                    dialogStyles={roomModal}
                    hideOnOverlayClicked
                    ref={skyLightCreateModal}
                    title={<ModalTitle start="Create a new" />}
                  >
                    <Container className={localclasses.home__modal__container}>
                      <Typography
                        style={{
                          color: "#fff",
                          marginBottom: "15px",
                          fontSize: "3vh",
                        }}
                      >
                        Enter Your Name
                      </Typography>
                      <TextField
                        className={classes.root}
                        InputProps={{ className: classes.input }}
                        fullWidth
                        id="outlined-basic"
                        label="Your Name"
                        variant="outlined"
                        value={name}
                        onChange={(e) => {
                          setName(e.target.value)
                        }}
                      />

                      <br />
                      <br />

                      <Row>
                        <MUIButton
                          style={{
                            marginLeft: "auto",
                            marginRight: "auto",
                            backgroundColor: "#ffd500",
                          }}
                          variant="contained"
                          size="lg"
                          component={Link}
                          to={{
                            pathname: roomId,
                            name: name,
                          }}
                        >
                          Create Room
                        </MUIButton>
                      </Row>
                    </Container>
                  </SkyLight>
                  <SkyLight
                    dialogStyles={roomModal}
                    hideOnOverlayClicked
                    ref={skyLightJoinModal}
                    title={<ModalTitle start="Join a" />}
                  >
                    <Container className={localclasses.home__modal__container}>
                      <Typography
                        style={{
                          color: "#fff",
                          marginBottom: "15px",
                          fontSize: "3vh",
                        }}
                      >
                        Enter Your Name
                      </Typography>
                      <TextField
                        className={classes.root}
                        InputProps={{ className: classes.input }}
                        fullWidth
                        id="outlined-basic"
                        label="Your Name"
                        variant="outlined"
                        value={name}
                        onChange={(e) => {
                          setName(e.target.value)
                        }}
                      />

                      <Typography
                        style={{
                          color: "#fff",
                          marginBottom: "15px",
                          fontSize: "3vh",
                        }}
                      >
                        Enter Room Id
                      </Typography>
                      <TextField
                        onChange={(event) => setjoinRoomId(event.target.value)}
                        fullWidth
                        id="outlined-basic"
                        className={classes.root}
                        InputProps={{ className: classes.input }}
                        label="Enter Room ID"
                        variant="outlined"
                      />

                      <br />
                      <br />

                      <Row>
                        <MUIButton
                          style={{
                            marginLeft: "auto",
                            marginRight: "auto",
                            backgroundColor: "#ffd500",
                          }}
                          variant="contained"
                          size="lg"
                          component={Link}
                          to={{
                            pathname: joinRoomId,
                            name: name,
                          }}
                        >
                          Join a Room
                        </MUIButton>
                      </Row>
                    </Container>
                  </SkyLight>
                
            </Container>
          </Col>
          <Col xs={12} md={1}></Col>
        </Row>
      </Container>
    </div>
  );
};

Home.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Home);
