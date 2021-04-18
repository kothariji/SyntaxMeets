import React, { useState, useRef,useEffect} from "react";
import localclasses from "./Home.module.css";
import bgimg from "../../images/homepage.svg";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { TextField, Button as MUIButton, Typography } from "@material-ui/core";
import { Link } from "react-router-dom";
import SkyLight from "react-skylight";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import MeetingRoomIcon from "@material-ui/icons/MeetingRoom";
import GroupAddIcon from "@material-ui/icons/GroupAdd";
import { connect } from "react-redux";
import { validateRoomID } from '../../util/util.js'
import * as actions from "../../store/actions/roomActions.js";

const styles = {
  input: {
    color: "#000",
  },
};

const Home = (props) => {
  const { classes } = props;
  const skyLightCreateModal = useRef(SkyLight);
  const skyLightJoinModal = useRef(SkyLight);
  const [disabledName, setDisabledName] = useState(true);
  const [disabledRoomId, setDisabledRoomId] = useState(true);
  const createRoomButton = useRef(null);
  const joinRoomButton = useRef(null);


  useEffect(() => {
    props.reset();
  },[]);

  const roomModal = {
    backgroundImage:
      "linear-gradient(to top, #d6d4ee, #e1dff2, #ebe9f6, #f5f4fb, #ffffff)",
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
          color: "#000",
          fontSize: "4vh",
        }}
      >
        {props.start}
        <span style={{ color: "#000", fontWeight: "800" }}>&nbsp;Syntax</span>
        <span style={{ color: "#ffd500", fontWeight: "800" }}>Room</span>
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
                    fontSize: "3vh",
                    fontWeight: "600",
                    color: "#333",
                    width: "310px",
                    textDecoration: "none",
                  }}
                  startIcon={<MeetingRoomIcon style={{ fontSize: 30 }} />}
                  size="large"
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
                    fontSize: "3vh",
                    fontWeight: "600",
                    color: "#333",
                    width: "310px",
                  }}
                  startIcon={<GroupAddIcon style={{ fontSize: 30 }} />}
                  size="large"
                  onClick={() => skyLightJoinModal.current.show()}
                >
                  Join a Room
                </MUIButton>
              </Row>

              <SkyLight
                dialogStyles={roomModal}
                hideOnOverlayClicked
                ref={skyLightCreateModal}
                title={<ModalTitle start="Create a" />}
              >
                <Container className={localclasses.home__modal__container}>
                  <Typography
                    style={{
                      color: "#000",
                      marginBottom: "10px",
                      fontSize: "2vh",
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
                    value={props.name}
                    onChange={(e) => {
                      props.setName(e.target.value);
                      e.target.value.length >= 1
                        ? setDisabledName(false)
                        : setDisabledName(true);
                    }}
                    onKeyPress={(ev) => {
                      if(ev.key === 'Enter') {
                        ev.preventDefault();
                        if(!disabledName)
                        {
                          createRoomButton.current.click();
                        }
                      }
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
                      size="large"
                      disabled={disabledName}
                      component={Link}
                      ref={createRoomButton}
                      to={{
                        pathname: props.joinRoomId,
                      }}
                      onClick={()=>{
                        // it stores the details in localstorage which is used later
                        localStorage.setItem('roomId',props.joinRoomId);
                        localStorage.setItem('name',props.name);
                        // isconnected is used to reconnect 
                        sessionStorage.setItem('isconnected',true);
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
                      color: "#000",
                      marginBottom: "10px",
                      fontSize: "2vh",
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
                    value={props.name}
                    onChange={(e) => {
                      props.setName(e.target.value);
                      e.target.value.length >= 1
                        ? setDisabledName(false)
                        : setDisabledName(true);
                    }}
                    style={{ color: "#000" }}
                  />

                  <Typography
                    style={{
                      color: "#000",
                      marginTop: "10px",
                      marginBottom: "10px",
                      fontSize: "2vh",
                    }}
                  >
                    Enter Room Id
                  </Typography>
                  <TextField
                    onChange={(event) => {
                      props.setRoomID(event.target.value);
                        validateRoomID(event.target.value)
                        ? setDisabledRoomId(false)
                        : setDisabledRoomId(true);
                    }}
                    onKeyPress={(ev) => {
                      if(ev.key === 'Enter') {
                        ev.preventDefault();
                        if(!disabledName && !disabledRoomId)
                        {
                          joinRoomButton.current.click();
                        }
                      }
                    }}
                    fullWidth
                    id="outlined-basic"
                    className={classes.root}
                    InputProps={{ className: classes.input }}
                    label="Enter Room ID"
                    variant="outlined"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    placeholder="xxxx-yyyy-zzzz"
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
                      size="large"
                      disabled={disabledName || disabledRoomId}
                      component={Link}
                      ref={joinRoomButton}
                      to={{
                        pathname: props.joinRoomId,
                      }}
                      onClick={ ()=>{
                        // it stores the details in localstorage which are later used
                        localStorage.setItem('roomId',props.joinRoomId)
                        localStorage.setItem('name',props.name)
                        sessionStorage.setItem('isconnected',true);  
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
const mapStateToProps = (state) => {
  return {
    joinRoomId: state.ROOM.roomId,
    name: state.ROOM.name,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setName: (name) => dispatch(actions.setName(name)),
    setRoomID: (ID) => dispatch(actions.setRoomID(ID)),
    reset: () => dispatch(actions.reset()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Home));