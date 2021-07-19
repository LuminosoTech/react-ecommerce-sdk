import { createInstance, User } from "@luminoso/ecommerce-sdk";
import React from "react";
import { LuminosoProvider } from "../store";

interface InitializeProps {}

export const initialize = (sdkKey: string) => (props: React.PropsWithChildren<InitializeProps>) => {
  const instance = createInstance({ sdkKey });

  return <LuminosoProvider instance={instance}>{props.children}</LuminosoProvider>;
};
