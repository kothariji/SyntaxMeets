import {
  SET_SNACKBAR_MESSAGE,
  CLOSE_SNACKBAR,
  TOGGLE_FOCUS_MODE,
} from "../types";

const initialState = {
  setSnackBarMessage: null,
  isSnackBarOpen: false,
  snackBarType: "info",
  isFocusMode: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_SNACKBAR_MESSAGE:
      return {
        ...state,
        isSnackBarOpen: true,
        snackBarType: action.payload.type,
        setSnackBarMessage: action.payload.message,
      };
    case CLOSE_SNACKBAR:
      return {
        ...state,
        isSnackBarOpen: false,
      };

    case TOGGLE_FOCUS_MODE:
      return {
        ...state,
        isFocusMode: !state.isFocusMode,
      };
    default:
      return state;
  }
}
