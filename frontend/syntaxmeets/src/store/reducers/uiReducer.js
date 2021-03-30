import {

    SET_SNACKBAR_MESSAGE,
    CLOSE_SNACKBAR,
  
  } from "../types";
  
  const initialState = {
    setSnackBarMessage: null,
    isSnackBarOpen: false,
    snackBarType: "info"
  };
  
  export default function (state = initialState, action) {
    switch (action.type) {
    case SET_SNACKBAR_MESSAGE:
      return {
        ...state,
        isSnackBarOpen: true,
        snackBarType: action.payload.type,
        setSnackBarMessage: action.payload.message
      }
    case CLOSE_SNACKBAR:
      return {
        ...state,
        isSnackBarOpen: false
      }
    default:
      return state;
    }
  }
  