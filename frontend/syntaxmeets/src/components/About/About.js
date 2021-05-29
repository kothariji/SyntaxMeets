import React from "react";
import MediaCard from "./Card/MediaCard";
import { Typography } from "@material-ui/core";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import localclasses from "./About.module.css";
import DhruvIMG from "../../images/dhruv.jpg";
import AkashIMG from "../../images/akash.jpg";
import NishantIMG from "../../images/nishant.jpg";

const About = ({handleClose}) => {
  return (
    <div
      className={localclasses.aboutus}
      style={{ backgroundColor: "#000a29" }}
    >
      <div>
        <ArrowBackIcon 
          style={{ fontSize: "3em", 
            position: "absolute", 
            left: "1%", 
            top: "1.5%", 
            color: "#000a29", 
            background: "white", 
            borderRadius: "50%", 
            cursor: "pointer" 
          }} 
          onClick={handleClose}/>
        <Typography
          align="center"
          variant="h1"
          style={{
            color: "white",
            paddingTop: "30px",
            fontFamily: "poppins",
            fontWeight: "600",
          }}
        >
          &nbsp;Syntax<span style={{ color: "#FFD500" }}>Meets</span> Creators
        </Typography>  
      </div>
      <div className={localclasses.cards}>
        <MediaCard
          name="Dhruv Kothari"
          image={DhruvIMG}
          desc="A 3rd Year CSE Undergrad👨‍🎓🚀| Competitive Programmer 🏆 | Web Developer👨‍💻 | Technical Writer ✍️"
          github="https://github.com/kothariji"
          linkedin="https://www.linkedin.com/in/kotharidhruv/"
          twitter="https://twitter.com/_kothariji"
          gmail="mailto:kotharidhruv25@gmail.com"
          insta="https://www.instagram.com/junior.kothari/"
        />
        <MediaCard
          name="Akash Salvi"
          image={AkashIMG}
          desc="I'm a Web Developer 👨‍💻 by heart , I love exploring new technologies 👨🏻‍🎓. I have interest in competitive programmer ✍️. "
          github="https://github.com/Akash-Salvi"
          linkedin="https://www.linkedin.com/in/akash-salvi-30327217b/"
          twitter="https://twitter.com/AkashAjaySalvi"
          gmail="mailto:akashsalvi21@gmail.com"
          insta="https://www.instagram.com/akash.1_11_00/"
        />
        <MediaCard
          name="Nishant Handge"
          image={NishantIMG}
          desc="An aspiring React and Django developer🚀💻. Endeavouring competitve programming👨‍💻. Always open for the opportunities.🙌"
          github="https://github.com/Nishant127"
          linkedin="https://www.linkedin.com/in/nishant-handge-618673190/"
          twitter="https://twitter.com/Nishant40079455"
          gmail="mailto:handgenishant@gmail.com"
          insta="https://www.instagram.com/nishant_127/"
        />
      </div>
    </div>
  );
};
export default About;
