import { createInstance, User } from "@luminoso/ecommerce-sdk";
import React, { PropsWithChildren, useEffect, useMemo } from "react";
import { Provider, useDispatch } from "react-redux";
import { store } from "../store";
import { initializeActions } from "../store/actions/init/initializationActions";

interface InitializeProps {}

interface LuminosoContainerProps {
  sdkKey: string;
}

const InitContainer = (props: PropsWithChildren<LuminosoContainerProps>) => {
  const { sdkKey } = props;

  const dispatch = useDispatch();

  useEffect(() => {
    initializeActions(sdkKey)(dispatch);
  }, []);

  return <>{props.children}</>;
};

export const initialize = (sdkKey: string) => (props: React.PropsWithChildren<InitializeProps>) => {
  return useMemo(
    () => (
      <Provider store={store}>
        <InitContainer sdkKey={sdkKey}> {props.children}</InitContainer>
      </Provider>
    ),
    []
  );
};
