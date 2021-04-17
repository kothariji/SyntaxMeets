import * as types from "../types.js";
import axiosExecute from "../../services/axios.js";

export function setCode(code) {
  return {
    type: types.SET_CODE,
    code,
  };
}
export function setLanguage(lang) {
  return {
    type: types.SET_LANG,
    lang,
  };
}
export function setFontSize(size) {
  return {
    type: types.SET_FONT_SIZE,
    size,
  };
}
export function setAutoCompletion(isactive) {
  return {
    type: types.SET_AUTO_COMPLETION,
    isactive,
  };
}
export function setCodeInput(input) {
  return {
    type: types.SET_CODE_INPUT,
    input,
  };
}
export function setCodeOutput(msg) {
  return {
    type: types.SET_CODE_OUTPUT,
    msg,
  };
}
export function setCodeIsCompiling(isactive) {
  return {
    type: types.SET_CODE_IS_COMPILING,
    isactive,
  };
}
export function setIsError(isactive) {
  return {
    type: types.SET_ERROR,
    isactive,
  };
}
export function setCodeError(err) {
  return {
    type: types.SET_CODE_ERROR,
    err,
  };
}
export function setPopup(typingUser) {
  return {
    type: types.SET_POPUP,
    typingUser,
  };
}

export const toggleFocusMode = () => {
  return (dispatch) => {
    dispatch({ type: types.TOGGLE_FOCUS_MODE });
  };
};

// API CALLS

export const executeCode = (LangID, CODE, INPUT) => (dispatch) => {
  dispatch(setCodeIsCompiling(true));
  var codeToken = 0;
  axiosExecute
    .post(`/submissions`, {
      language_id: LangID,
      source_code: CODE,
      stdin: INPUT,
    })
    .then((res) => {
      codeToken = res.data.token;
      setTimeout(() => {
        axiosExecute
          .get("submissions/" + codeToken)
          .then((response) => {
            console.log(response);
            if (response.data.stderr !== null) {
              dispatch(setCodeIsCompiling(false));
              dispatch(setCodeError(response.data.stderr));
              dispatch(setIsError(true));
            } else {
              dispatch(setCodeOutput(response.data.stdout));
              dispatch(setCodeIsCompiling(false));
            }
          })
          .catch(function (error) {
            dispatch(setCodeIsCompiling(false));
            dispatch(
              setCodeError("Compilation Error: " + error.response.data.error)
            );
            dispatch(setIsError(true));
          });
      }, 7000);
    })
    .catch((err) => {
      dispatch(setCodeIsCompiling(false));
      console.log(err.response);
    });
};
