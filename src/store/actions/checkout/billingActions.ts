import { Dispatch } from "redux";
import { CheckoutService, createInstance, EcommerceInstance } from "@luminoso/ecommerce-sdk";
import braintree, { Client } from "braintree-web";

import { Action } from "../../../models/store/Action";
import { SET_ECOMMERCE_CLIENT } from "../../types/core";
import { createAction } from "../../../utils/redux";
import { SET_BILLING_CLIENT } from "../../types";

const setupLuminosoEcommerceClientSuccess = (instance: EcommerceInstance) =>
  createAction(SET_ECOMMERCE_CLIENT.SUCCESS, instance);
const setupLuminosoEcommerceClientFailed = (e: Error) => createAction(SET_ECOMMERCE_CLIENT.FAILURE, e);

export const addPaymentMethodAction = (sdkKey: string) => async (dispatch: Dispatch<Action>) => {
  try {
    dispatch({ type: SET_ECOMMERCE_CLIENT.REQUEST });

    const instance = createInstance({ sdkKey });

    return dispatch(setupLuminosoEcommerceClientSuccess(instance));
  } catch (e) {
    return dispatch(setupLuminosoEcommerceClientFailed(e));
  }
};
