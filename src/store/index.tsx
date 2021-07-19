import React, { createContext, Provider } from "react";
import { EcommerceInstance } from "@luminoso/ecommerce-sdk";

interface Store {
  instance?: EcommerceInstance;
}

const initialState: Store = {
  instance: undefined,
};

export const context = createContext<Store>(initialState);

export const Consumer = context.Consumer;
const { Provider } = context;

export interface LuminosoProviderProps {
  instance: EcommerceInstance;
}

interface LuminosoProviderState {}

export class LuminosoProvider extends React.Component<LuminosoProviderProps, LuminosoProviderState> {
  constructor(props: LuminosoProviderProps) {
    super(props);
  }

  render() {
    const { instance, children } = this.props;
    const value = {
      instance,
    };

    return <Provider value={value}>{children}</Provider>;
  }
}
