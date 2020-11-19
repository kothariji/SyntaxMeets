import React, {useState} from 'react'
import localclasses from './Home.module.css'
import bgimg from '../../images/home_svg.svg'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import { TextField, Button as MUIButton } from '@material-ui/core';
import { Link } from 'react-router-dom';


function makeId(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
       result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
 }

const Home = () => {
    
    const [roomId, setroomId] = useState(makeId(15));
    const [createRoomModal, setCreateRoomModal] = useState(false);
    const [joinRoomModal, setJoinRoomModal] = useState(false);

    const handleCreateModalShow = () => setCreateRoomModal(true);
    const handleCreateModalClose = () => setCreateRoomModal(false);
    
    const handleJoinModalShow = () => setJoinRoomModal(true);
    const handleJoinModalClose = () => setJoinRoomModal(false);

    return (
        <div className = {localclasses.home}>
            <Container fluid>
                <Row>
                    <Col xs={12} md={8}>
                        <img className = {localclasses.home__svg} src = {bgimg} />
                    </Col>
                    <Col xs={12} md={3}>
                        <Container className = {localclasses.home__buttons}>
                            <Row>
                                <Button block style={{backgroundColor: "#ffd500", padding: "10px", fontWeight: "400", color: "#000a29"}} size = "lg" onClick={handleCreateModalShow}>
                                    Create a room
                                </Button>
                            </Row>
                            <br />
                            <Row>
                                <Button block style={{backgroundColor: "#ffd500", padding: "10px", fontWeight: "400", color: "#000a29"}} size = "lg" onClick={handleJoinModalShow}>
                                    Join a room
                                </Button>
                            </Row>
                        </Container>
                    <Modal show={createRoomModal} onHide={handleCreateModalClose}>
                        <Modal.Header closeButton >
                        <Modal.Title><span style = {{fontFamily: 'poppins', fontWeight: '900', color: '#000'}}>Create a new <span style = {{color: '#000a29'}}>Syntax</span><span style = {{color: '#ffd500'}}>Room</span></span></Modal.Title>
                        </Modal.Header>
                        <Container className = {localclasses.home__modal__container}>
                            <TextField fullWidth id="outlined-basic" label="Your Name" variant="outlined" />
                        </Container>
                    <Modal.Footer>
                        <MUIButton variant= 'contained' color = 'primary' component={ Link} to={roomId} >
                          Create Room
                        </MUIButton>
                        </Modal.Footer>
                    </Modal>
                    <Modal show={joinRoomModal} onHide={handleJoinModalClose}>
                        <Modal.Header closeButton>
                        <Modal.Title>Join a Room</Modal.Title>
                        </Modal.Header>
                        <Container className = {localclasses.home_modal_container}>
                            <TextField fullWidth id="outlined-basic" label="Enter Your Name" variant="outlined" />
                            <TextField onChange={event => setroomId(event.target.value)} fullWidth id="outlined-basic" label="Enter Room ID" variant="outlined" />
                        </Container>
                    <Modal.Footer>
                        <MUIButton component={Link} to={roomId} >
                          Join Room
                        </MUIButton>
                        </Modal.Footer>
                    </Modal>
                    </Col>
                    <Col xs={12} md={1}>

                    </Col>
                </Row>
                
            </Container>    
        </div>
    )
}

export default Home
