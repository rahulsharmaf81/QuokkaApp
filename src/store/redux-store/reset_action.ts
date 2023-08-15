// import * as Helper from "../../constants/reducer_names";


import LoginUserReducer from "../slices/user_slice";
import SignUpReducer from "../slices/sign_up"


export const LoginUserReducerWrapper = (state: any, action: any) => {
//   if (action.type === `${Helper.LOGIN_USER}/reset`) {
//     state = undefined;
//   }
  return LoginUserReducer(state, action);
};

export const SignUpReducerWrapper = (state: any, action: any) => {
//   if (action.type === `${Helper.FORGOT_PASSWORD}/reset`) {
//     state = undefined;
//   }
  return SignUpReducer(state, action);
};
