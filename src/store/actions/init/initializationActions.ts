import { Dispatch } from "redux";
import { CheckoutService, createInstance, EcommerceInstance } from "@luminoso/ecommerce-sdk";
import braintree, { Client } from "braintree-web";

import { Action } from "../../../models/store/Action";
import { SET_ECOMMERCE_CLIENT } from "../../types/core";
import { createAction } from "../../../utils/redux";
import { SET_BILLING_CLIENT } from "../../types";

export const initializeActions = (sdkKey: string) => async (dispatch: Dispatch<Action>) => {
  try {
    const { type, payload } = await setupLuminosoEcommerceClientAction(sdkKey)(dispatch);
    if (type === SET_ECOMMERCE_CLIENT.SUCCESS) {
      const ecommerceInstance = payload as EcommerceInstance;

      setupBillingClientActions(ecommerceInstance.checkoutService())(dispatch);
    }
  } catch (e) {
    console.error(e);
  }
};

const setupLuminosoEcommerceClientSuccess = (instance: EcommerceInstance) =>
  createAction(SET_ECOMMERCE_CLIENT.SUCCESS, instance);
const setupLuminosoEcommerceClientFailed = (e: Error) => createAction(SET_ECOMMERCE_CLIENT.FAILURE, e);

export const setupLuminosoEcommerceClientAction = (sdkKey: string) => async (dispatch: Dispatch<Action>) => {
  try {
    dispatch({ type: SET_ECOMMERCE_CLIENT.REQUEST });

    const instance = createInstance({ sdkKey });

    return dispatch(setupLuminosoEcommerceClientSuccess(instance));
  } catch (e) {
    return dispatch(setupLuminosoEcommerceClientFailed(e));
  }
};

const setupBillingClientSuccess = (billingClient: Client) => createAction(SET_BILLING_CLIENT.SUCCESS, billingClient);
const setupBillingClientFailed = (e: Error) => createAction(SET_BILLING_CLIENT.FAILURE, e);

export const setupBillingClientActions = (checkout: CheckoutService) => async (dispatch: Dispatch<Action>) => {
  try {
    dispatch({ type: SET_BILLING_CLIENT.REQUEST });

    const { token } = await checkout.getClientPaymentToken();

    const client = await braintree.client.create({
      authorization: token,
    });

    dispatch(setupBillingClientSuccess(client));
  } catch (e) {
    dispatch(setupBillingClientFailed(e));
  }
};
