import * as types from "../types.js";

export const setSnackBar = (msg, type) => {
  return (dispatch) => {
    dispatch({
      type: types.SET_SNACKBAR_MESSAGE,
      payload: { message: msg, type: type },
    });
    setTimeout(() => {
      dispatch({ type: "CLOSE_SNACKBAR" });
    }, 4000);
  };
};
