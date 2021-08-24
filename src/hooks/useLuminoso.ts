import { useContext, useEffect, useReducer, useState } from "react";
import { EcommerceInstance } from "@luminoso/ecommerce-sdk";
import { context } from "../store";
import { initialRootState } from "../store/reducers";

export const useLuminoso = () => {
  const { state } = useContext(context);

  const { ecommerceInstance } = state.core;

  return ecommerceInstance;
};
