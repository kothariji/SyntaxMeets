import * as types from '../types.js';


export function makeMessage(message) {
    return {
      type: types.SET_MESSAGES,
      message
    };
}
export function setMessage(message) {
    return {
      type: types.SET_MESSAGE,
      message
    };
}
export function whoIsTyping(typingUser){
    return {
      type: types.SET_TYPING_USER,
      typingUser
    };
}