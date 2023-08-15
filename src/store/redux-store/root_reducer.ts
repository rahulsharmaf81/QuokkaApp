import * as Helper from "./reset_action";

// import { LOGIN_USER } from "../../constants/reducer_names";
import { combineReducers } from "redux";

const combinedReducers = combineReducers({
  loginUser:Helper.LoginUserReducerWrapper,
  signUp:Helper.SignUpReducerWrapper
});

const rootReducer = (state: any, action: any) => {
//   if (action.type === `${LOGIN_USER}/logout`) state = undefined;
  return combinedReducers(state, action);
};
export default rootReducer;
