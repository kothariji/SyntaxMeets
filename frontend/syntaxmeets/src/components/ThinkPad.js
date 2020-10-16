import React, { Component, Fragment } from "react";
import { InputLabel, MenuItem, Select, AppBar, Toolbar, Typography, Button } from "@material-ui/core"
import ShareIcon from '@material-ui/icons/Share';
import CanvasDraw from "react-canvas-draw";

class ThinkPad extends Component {
    render() {
        return (
            <Fragment>
                <AppBar position="static" style={{ 'backgroundColor': "#393b44" }}>
                    <Toolbar>
                        <Typography variant="h5" style={{ 'fontFamily': "poppins", "color": "#f1f3f8" }}>
                            ThinkPad
                    </Typography>
                        <Button variant="contained" startIcon={<ShareIcon />} style={{ 'fontFamily': "poppins", 'marginLeft': "auto", 'fontWeight': "600", 'color': "#f1f3f8", 'backgroundColor': "#99A3CD" }}>

                            Share</Button>
                    </Toolbar>
                </AppBar>
                <CanvasDraw
                    canvasWidth={690}
                    canvasHeight={548}
                    brushRadius={6}
                    brushColor={"#393b44"}
                    catenaryColor={"#99A3CD"}
                    gridColor={"#f1f3f8"}
                />
            </Fragment>
        );
    }
}

export default ThinkPad;

