import React from 'react'
import bgimg from "../../images/mobilehome_svg.svg";
import localclasses from "./Mobile.module.css";

const Mobile = () => {
    return (
        <div style = {{backgroundColor: "#000a29"}}>
            <img
              className={localclasses.mobilehome__svg}
              src={bgimg}
              alt="SyntaxMeets"
            />
        </div>
    )
}

export default Mobile
