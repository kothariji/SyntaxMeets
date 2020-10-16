import React, { Component, Fragment } from 'react'
import Editor from './components/Editor'
import Navbar from './components/Navbar';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import ThinkPad from './components/ThinkPad';


var Sketchpad = require('responsive-sketchpad');



class App extends Component {

  // componentDidMount() {

  //   var el = document.getElementById('sketchpad');
  //   var pad = new Sketchpad(el, {
  //     line: {
  //       color: '#f44335',
  //       size: 5
  //     }
  //   });
  //   // Initialize Sketchpad


  //   // Set line color
  //   pad.setLineColor('#f44336');

  //   // Set line size
  //   pad.setLineSize(10);

  // }
  // undocanvas() {
  //   var el = document.getElementById('sketchpad');
  //   var pad = new Sketchpad(el, {
  //     line: {
  //       color: '#f44335',
  //       size: 5
  //     }
  //   });
  //   pad.undo();
  // }
  // clearcanvas() {
  //   var el = document.getElementById('sketchpad');
  //   var pad = new Sketchpad(el, {
  //     line: {
  //       color: '#f44335',
  //       size: 5
  //     }
  //   });
  //   pad.clear();
  // }
  render() {
    return (
      <Fragment>
        <Navbar />
        <div style={{ 'backgroundColor': "#f1f3f8", 'fontFamily': "poppins", 'padding': '50px' }}>
          <Grid container spacing={5}>
            <Grid item xs={12} sm={12} md={6}>
              <Editor />
            </Grid>
            <Grid item xs={12} sm={12} md={6}>
              <ThinkPad />
            </Grid>
          </Grid>
          {/* <div id="sketchpad"></div>
          <button onClick={this.clearcanvas}>clear</button>
          <button onClick={this.undocanvas}>undo</button> */}
        </div>
      </Fragment>
    )
  }
}

export default App