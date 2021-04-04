import React from "react";
import AceEditor from "react-ace";
import { connect } from "react-redux";

const OUTPUT = (props) => {
  
    return (
        <AceEditor
        mode="c_cpp"
        theme="monokai"
        height="150px"
        width={"auto"}
        readOnly
        value={props.codeOutput}
        fontSize={16}
        showPrintMargin
        showGutter
        name="OUTPUTEDITOR"
        setOptions={{
          useWorker: false,
          enableLiveAutocompletion: false,
        }}
      />
    );
  };


  const mapStateToProps = (state) => {
    return {
      codeOutput: state.EDITOR.codeOutput, 
    };
  };
export default connect(mapStateToProps)(OUTPUT);