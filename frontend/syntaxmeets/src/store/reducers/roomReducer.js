import {

    SET_ROOOM_ID,
    SET_NAME,
    SET_USERS,
    SET_USER_ID,
    SET_PREVIOUS_USER,
    REMOVE_USER,
    SET_GOTO_HOME,
  } from "../types";
  
  import {generateRoomId} from "../../util/util"
  

  const initialState = {
    roomId: generateRoomId(),
    name: "",
    id:null,
    users: {},
    previousUser:{},
    goToHome:false,
  };
  
  export default function (state = initialState, action) {
    switch (action.type) {
      case SET_ROOOM_ID:
        return {
          ...state,
          roomId:action.roomId,
        };
      case SET_NAME:
        return {
          ...state,
          name:action.name,
        };
      case SET_USERS:
        return {
          ...state,
          users:{...state.users,...action.users}
        };
      case REMOVE_USER:
        const olduser = action.userObject.id;
        const {[olduser]:remove, ...newState} = state.users;
        console.log(newState);
        return { ...state,
          users:newState,
        };
      case SET_USER_ID:
        return {
          ...state,
          id: action.id,
        };
      case SET_PREVIOUS_USER:
        return {
          ...state,
          previousUser: action.userObject,
        };
      case SET_GOTO_HOME:
        return {
          ...state,
          goToHome: action.isvalid,
        };
      default:
        return state;
    }
  }
  