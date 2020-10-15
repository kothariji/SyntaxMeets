import React, { Component, Fragment } from 'react'
import Editor from './components/Editor'
import Button from '@material-ui/core/Button'
var Sketchpad = require('responsive-sketchpad');

class App extends Component {



  componentDidMount() {

    var el = document.getElementById('sketchpad');
    var pad = new Sketchpad(el, {
      line: {
        color: '#f44335',
        size: 5
      }
    });
    // Initialize Sketchpad


    // Set line color
    pad.setLineColor('#f44336');

    // Set line size
    pad.setLineSize(10);

  }
  undocanvas() {
    var el = document.getElementById('sketchpad');
    var pad = new Sketchpad(el, {
      line: {
        color: '#f44335',
        size: 5
      }
    });
    pad.undo();
  }
  clearcanvas() {
    var el = document.getElementById('sketchpad');
    var pad = new Sketchpad(el, {
      line: {
        color: '#f44335',
        size: 5
      }
    });
    pad.clear();
  }
  render() {
    return (
      <Fragment>
        <Button variant="contained" color="primary" size="large">
          Hello
        </Button>
        <Editor />
        <div id="sketchpad"></div>
        <button onClick={this.clearcanvas}>clear</button>
        <button onClick={this.undocanvas}>undo</button>
      </Fragment>
    )
  }
}

export default App