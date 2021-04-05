import * as types from '../types.js';


export function setRoomID(roomId) {
    return {
      type: types.SET_ROOOM_ID,
      roomId
    };
}
export function setId(id) {
    return {
      type: types.SET_USER_ID,
      id
    };
}
export function setUsers(users) {
    return {
      type: types.SET_USERS,
      users
    };
}
export function setName(name) {
    return {
      type: types.SET_NAME,
      name
    };
}
export function setPreviousUser(userObject){
    return {
      type: types.SET_PREVIOUS_USER,
      userObject
    };
}
export function removeUser(userObject){
  return {
    type: types.REMOVE_USER,
    userObject
  };
}
export function setGoToHome(isvalid){
  return {
    type: types.SET_GOTO_HOME,
    isvalid
  };
}
export function reset(){
  return {
    type: types.RESET,

  };
}