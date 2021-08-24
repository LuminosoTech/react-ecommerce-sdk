import { EcommerceInstance } from "@luminoso/ecommerce-sdk";
import { Action } from "../../../models/store/Action";
import { update } from "../../../utils/redux";
import { SET_ECOMMERCE_CLIENT } from "../../types/core";

export interface CoreState {
  isFetchingEcommerceInstance: boolean;
  ecommerceInstance?: EcommerceInstance;
}

export const coreInitialState: CoreState = {
  isFetchingEcommerceInstance: false,
  ecommerceInstance: undefined,
};

const coreReducer = (state: CoreState, action: Action): CoreState => {
  switch (action.type) {
    case SET_ECOMMERCE_CLIENT.REQUEST:
      return update(state, {
        isFetchingEcommerceInstance: true,
      });
    case SET_ECOMMERCE_CLIENT.SUCCESS:
      return update(state, {
        isFetchingEcommerceInstance: false,
        ecommerceInstance: action.payload,
      });
    case SET_ECOMMERCE_CLIENT.FAILURE:
      return update(state, {
        isFetchingEcommerceInstance: false,
      });
    default:
      return state;
  }
};

export default coreReducer;
