import { combineReducers } from "../../utils/redux";
import checkoutReducer, { checkoutInitialState, CheckoutState } from "./checkout/checkoutReducer";
import coreReducer, { coreInitialState, CoreState } from "./core/coreReducer";
import userReducer, { userInitialState, UserState } from "./user/user";

export interface InitialRootState {
  core: CoreState;
  user: UserState;
  checkout: CheckoutState;
}

export const initialRootState: InitialRootState = {
  core: coreInitialState,
  user: userInitialState,
  checkout: checkoutInitialState,
};

export default combineReducers({
  core: coreReducer,
  user: userReducer,
  checkout: checkoutReducer,
});
