import React from 'react'
import MediaCard from './Card/MediaCard'
import { Typography } from '@material-ui/core';

import localclasses from './About.module.css'
import DhruvIMG from "../../images/dhruv.jpg"
import AkashIMG from "../../images/akash.jpg"
import NishantIMG from "../../images/nishant.jpg"

 const About = () => {
    return (
        <div className = {localclasses.aboutus} style = {{backgroundColor: "#000a29"}}>
            <Typography align = "center" variant="h1" style={{ "color": "white", paddingTop: "30px", 'fontFamily': "poppins", "fontWeight": "600" }}>
        &nbsp;Syntax<span style={{ "color": "#FFD500"}}>Meets</span> Creators
            </Typography>
            <div className = {localclasses.cards}>
                <MediaCard name = "Dhruv Kothari" image = {DhruvIMG} desc = "A 3rd Year UnderGraduate"/>
                <MediaCard name = "Akash Salvi"image = {AkashIMG}/>
                <MediaCard name = "Naughty Handge"image = {NishantIMG}/>
            </div>
        </div>
    )
}
export default About