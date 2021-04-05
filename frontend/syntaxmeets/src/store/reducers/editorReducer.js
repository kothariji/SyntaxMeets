import {

    SET_AUTO_COMPLETION,
    SET_POPUP,
    SET_CODE_ERROR,
    SET_ERROR,
    SET_CODE_IS_COMPILING,
    SET_CODE_INPUT,
    SET_CODE_OUTPUT,
    SET_FONT_SIZE,
    SET_LANG,
    SET_THEME,
    SET_CODE,
    SET_VISH,
 
  } from "../types";
  
  import {defaultValue} from "../../components/SyntaxEditor/LanguageData"
  

  const initialState = {
    code:defaultValue,
    lang: "C++",
    fontSize:16,
    autoCompletion: true,
    codeInput:"",
    codeOutput: "",
    isCompiling:false,
    codeError:"",
    isError:false,
    popup:false,
  };
  
  export default function (state = initialState, action) {
    switch (action.type) {
      case SET_CODE:
        return {
          ...state,
          code:action.code,
        };
      case SET_LANG:
        return {
          ...state,
          lang:action.lang,
        };
      case SET_FONT_SIZE:
        return {
          ...state,
          fontSize:action.size,
        };
      case SET_AUTO_COMPLETION:
        return {
          ...state,
          autoCompletion:action.isactive,
        };
      case SET_CODE_INPUT:
        return {
          ...state,
          codeInput: action.input,
        };
      case SET_CODE_OUTPUT:
        return {
          ...state,
          codeOutput: action.msg,
        };
      case SET_CODE_IS_COMPILING:
        return {
          ...state,
          isCompiling: action.isactive,
        };
      case SET_ERROR:
        return {
          ...state,
          isError: action.isactive,
        };
      case SET_CODE_ERROR:
        return {
          ...state,
          codeError: action.err,
        };
      case SET_POPUP:
        return {
          ...state,
          goToHome: action.isvalid,
        };
      default:
        return state;
    }
  }
  