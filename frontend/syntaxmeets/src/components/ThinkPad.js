import React, { Component, Fragment } from "react";
import { AppBar, Toolbar, Typography, Button } from "@material-ui/core";
import CanvasDraw from "react-canvas-draw";
import UndoIcon from "@material-ui/icons/Undo";
import DeleteIcon from "@material-ui/icons/Delete";
import ReactResizeDetector from "react-resize-detector";

class ThinkPad extends Component {

  constructor(props) {
    super(props);
    this.state = {
      canvasHeight: 400,
      canvasWidth: "auto",
    };
    this.onResize = this.onResize.bind(this);
  }

  onResize(w, h) {
    this.setState({
      canvasHeight: h,
      canvasWidth: w,
    });
  }

  render() {
    return (
      <Fragment>
        <AppBar position="static" style={{ backgroundColor: "#393b44" }}>
          <Toolbar>
            <Typography
              variant="h5"
              style={{ fontFamily: "poppins", color: "#f1f3f8" }}
            >
              ThinkPad
            </Typography>
            <Button
              variant="contained"
              onClick={() => {
                this.saveableCanvas.clear();
              }}
              startIcon={<DeleteIcon />}
              style={{
                fontFamily: "poppins",
                marginLeft: "auto",
                fontWeight: "600",
                color: "#f1f3f8",
                backgroundColor: "#99A3CD",
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
                color: "#f1f3f8",
                backgroundColor: "#99A3CD",
              }}
              onClick={() => {
                this.saveableCanvas.undo();
              }}
            >
              UNDO
            </Button>
          </Toolbar>
        </AppBar>
        
        <ReactResizeDetector
          handleWidth
          handleHeight
          onResize={this.onResize}
        />

        <CanvasDraw
          ref={(canvasDraw) => (this.saveableCanvas = canvasDraw)}
          canvasWidth={this.state.canvasWidth}
          canvasHeight={"548px"}
          brushRadius={3}
          brushColor={"#393b44"}
          catenaryColor={"#99A3CD"}
          gridColor={"#f1f3f8"}
        />

      </Fragment>
    );
  }
}

export default ThinkPad;
