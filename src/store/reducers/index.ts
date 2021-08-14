import { combineReducers } from "redux";

import checkoutReducer, { CheckoutState } from "./checkout/checkoutReducer";
import coreReducer, { CoreState } from "./core/coreReducer";
import userReducer, { UserState } from "./user/user";

export interface RootState {
  core: CoreState;
  user: UserState;
  checkout: CheckoutState;
}

export default combineReducers({
  core: coreReducer,
  user: userReducer,
  checkout: checkoutReducer,
});
