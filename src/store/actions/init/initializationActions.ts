import {
  CheckoutService,
  createInstance,
  EcommerceInstance,
  PaymentService,
  StoreService,
  UserService,
} from "@luminoso/ecommerce-sdk";
import braintree, { Client } from "braintree-web";

import { Action } from "../../../models/store/Action";
import { SET_ECOMMERCE_CLIENT } from "../../types/core";
import { createAction } from "../../../utils/redux";
import { SET_BILLING_CLIENT } from "../../types";
import { Dispatch } from "react";

export const initializeActions = (sdkKey: string) => async (dispatch: Dispatch<Action>) => {
  try {
    const { type, payload } = await setupLuminosoEcommerceClientAction(sdkKey)(dispatch);
    if (type === SET_ECOMMERCE_CLIENT.SUCCESS) {
      const ecommerceInstance = payload as EcommerceInstance;

      const userAgent = window.navigator.userAgent;
      const language = navigator.language;

      await ecommerceInstance.user.initializeForBrowser(userAgent, language);

      const storeService = ecommerceInstance.store;
      const paymentService = ecommerceInstance.payment;

      setupBillingClientActions(storeService, paymentService)(dispatch);
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

    const emit = setupLuminosoEcommerceClientSuccess(instance);

    dispatch(emit);

    return emit;
  } catch (e) {
    const emit = setupLuminosoEcommerceClientFailed(e);

    dispatch(emit);

    return emit;
  }
};

const setupBillingClientSuccess = (billingClient: Client) => createAction(SET_BILLING_CLIENT.SUCCESS, billingClient);
const setupBillingClientFailed = (e: Error) => createAction(SET_BILLING_CLIENT.FAILURE, e);

export const setupBillingClientActions =
  (storeService: StoreService, paymentService: PaymentService) => async (dispatch: Dispatch<Action>) => {
    try {
      dispatch({ type: SET_BILLING_CLIENT.REQUEST });

      const storePaymentConfig = await storeService.getStorePaymentConfig();

      if (storePaymentConfig.isBraintreeLinked) {
        const { token } = await paymentService.getBraintreeClientToken();

        const client = await braintree.client.create({
          authorization: token,
        });

        dispatch(setupBillingClientSuccess(client));
      }

      if (storePaymentConfig.isStripeConnectLinked) {
        const { publisherKey } = await paymentService.getStripeClientToken();
      }
    } catch (e) {
      dispatch(setupBillingClientFailed(e as Error));
    }
  };
