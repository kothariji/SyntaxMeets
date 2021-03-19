import React from "react";
import localclasses from "./Loader.module.css";
import { XlviLoader } from "react-awesome-loaders";
function Loader() {
  return (
    <div className={localclasses.load}>
      <XlviLoader
        boxColors={["#FFD500", "#0077B6", "#00B4D8"]}
        desktopSize={"128px"}
        mobileSize={"100px"}
      />
    </div>
  );
}
export default Loader;
