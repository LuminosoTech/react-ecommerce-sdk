import { useContext, useEffect, useReducer, useState } from "react";
import { context } from "../store";

export const useLuminoso = () => {
  const { state } = useContext(context);

  const { ecommerceInstance } = state.core;

  return ecommerceInstance;
};
