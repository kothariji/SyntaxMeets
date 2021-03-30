import React from "react";
import AceEditor from "react-ace";
import { connect } from "react-redux";
import * as actions from "../../store/actions/editorActions.js";
const INPUT = (props) => {
    const handleIChange = (newValue) => {
      props.setCodeInput(newValue);
    };
  
    return (
      <AceEditor
        mode="c_cpp"
        theme="monokai"
        height="150px"
        width={"auto"}
        onChange={handleIChange}
        value={props.codeInput}
        fontSize={18}
      />
    );
  };

  const mapStateToProps = (state) => {
    return {
      codeInput: state.EDITOR.codeInput, 
    };
  };
  
  const mapDispatchToProps = (dispatch) => {
    return {
      setCodeInput: (input) => dispatch(actions.setCodeInput(input)),
    };
  };

export default connect(mapStateToProps,mapDispatchToProps)(INPUT);