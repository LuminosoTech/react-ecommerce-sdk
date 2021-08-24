import React from "react";
import { createContext, Dispatch, PropsWithChildren, useReducer } from "react";
import { Action } from "../models/store/Action";
import rootReducer, { initialRootState, InitialRootState } from "./reducers";

interface ProviderState {
  state: InitialRootState;
  dispatch?: Dispatch<Action>;
}

export const context = createContext<ProviderState>({ state: initialRootState });

export const Consumer = context.Consumer;

interface ContextProvicerProps {}

export const ContextProvicer = (props: PropsWithChildren<ContextProvicerProps>) => {
  const { children } = props;

  const Provider = context.Provider;

  const [state, dispatch] = useReducer(rootReducer, initialRootState);

  return <Provider value={{ state, dispatch }}>{children}</Provider>;
};
