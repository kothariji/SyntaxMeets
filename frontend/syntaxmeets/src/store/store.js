import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import chatReducer from "./reducers/chatReducer";
import editorReducer from "./reducers/editorReducer";
import roomReducer from "./reducers/roomReducer";
import uiReducer from "./reducers/uiReducer";

const initialState = {};

//ThunkMiddleware 
const middleware = [thunk];

// Reducers Object
const reducers = combineReducers({
  CHAT: chatReducer,
  ROOM: roomReducer,
  EDITOR:editorReducer,
  UI:uiReducer
});

const rootReducer = (state, action) => {
  if (action.type === 'RESET') {
    state = undefined
  }

  return reducers(state, action)
}

const composeEnhancers =
      (process.env.NODE_ENV !== 'production' &&
      typeof window !== 'undefined' &&
      window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
      compose;

const enhancer = composeEnhancers(applyMiddleware(...middleware));
const store = createStore(rootReducer, initialState, enhancer);

export default store;
