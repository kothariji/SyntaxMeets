import React, { Component, Fragment } from 'react'
import Editor from './components/Editor'
import Navbar from './components/Navbar';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import ThinkPad from './components/ThinkPad';


var Sketchpad = require('responsive-sketchpad');



class App extends Component {
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
          {}
        </div>
      </Fragment>
    )
  }
}

export default App