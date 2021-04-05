import {

  SET_MESSAGES,
  SET_MESSAGE,
  SET_TYPING_USER,

} from "../types";

const initialState = {
  message: "",
  chat: [],
  typingUser: "",
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_MESSAGES:
      return {
        ...state,
        chat:[...state.chat, action.message],
      };
    case SET_MESSAGE:
      return {
        ...state,
        message:action.message,
      };
    case SET_TYPING_USER:
      return {
        ...state,
        typingUser: action.typingUser,
      };
    default:
      return state;
  }
}
