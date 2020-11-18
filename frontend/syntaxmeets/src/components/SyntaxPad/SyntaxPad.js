import React, { Component, Fragment ,useRef} from "react";
import { AppBar, Toolbar, Typography, Button } from "@material-ui/core";
import CanvasDraw from "react-canvas-draw";
import UndoIcon from "@material-ui/icons/Undo";
import DeleteIcon from "@material-ui/icons/Delete";
import ReactResizeDetector from "react-resize-detector";
import localClasses from "./SyntaxPad.module.css"

const SyntaxPad = (props) => {

    const saveableCanvas = useRef(CanvasDraw);

    return (
      <Fragment>
        <AppBar position="static" style={{ backgroundColor: "#000A29" }}>
        <div className={localClasses.Editor__navbar}>
            <Typography
              variant="h5"
              style={{ fontFamily: "poppins", color: "white", marginRight: "auto", marginTop: "auto", marginBottom: "auto", marginLeft: "30px", fontWeight: "800" }}
            >
              &nbsp;Syntax<span style={{ "color": "#FFD500"}}>Pad</span>
          </Typography>
          <Toolbar >
            <Button
              variant="contained"
              color = 'primary'
              onClick={() => {
                saveableCanvas.current.clear();
              }}
              startIcon={<DeleteIcon />}
              style={{
                fontFamily: "poppins",
                marginLeft: "auto",
                fontWeight: "600",
                color: "white",
                
              }}
            >
              Clear
            </Button>
            <Button
              variant="contained"
              startIcon={<UndoIcon />}
              style={{
                fontFamily: "poppins",
                marginLeft: "15px",
                fontWeight: "600",
                color: "white",
                backgroundColor: "#FFD500",
              }}
              onClick={() => {
                saveableCanvas.current.undo();
              }}
            >
              UNDO
            </Button>
          </Toolbar>
          </div>
        </AppBar>

        <CanvasDraw
          ref={saveableCanvas}
          canvasWidth={"auto"}
          canvasHeight={"548px"}
          brushRadius={3}
          brushColor={"#000A29"}
          catenaryColor={"#FFD500"}
          gridColor={"rgba(0, 180, 216, 0.1)"}
        />

      </Fragment>
    );
  
}

export default SyntaxPad;
