import React, { PropsWithChildren, useContext, useEffect, useMemo } from "react";
import { context, ContextProvicer } from "../store";
import { initializeActions } from "../store/actions/init/initializationActions";

interface InitializeProps {}

interface LuminosoContainerProps {
  sdkKey: string;
}

const InitContainer = (props: PropsWithChildren<LuminosoContainerProps>) => {
  const { sdkKey } = props;

  const { dispatch } = useContext(context);

  useEffect(() => {
    if (dispatch) {
      initializeActions(sdkKey)(dispatch);
    }
  }, [dispatch]);

  return <>{props.children}</>;
};

export const initialize = (sdkKey: string) => (props: React.PropsWithChildren<InitializeProps>) => {
  return useMemo(
    () => (
      <ContextProvicer>
        <InitContainer sdkKey={sdkKey}>{props.children}</InitContainer>
      </ContextProvicer>
    ),
    []
  );
};
