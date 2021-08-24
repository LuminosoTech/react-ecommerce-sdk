import { Action } from "../../models/store/Action";

export const createActionType = (value: string) => ({
  SUCCESS: `${value}_SUCCESS`,
  REQUEST: `${value}_REQUEST`,
  FAILURE: `${value}_FAILURE`,
});

export const createAction = (type: string, payload?: any): Action => {
  if (payload) {
    return { type, payload };
  }
  return { type };
};

export const combineReducers = (slices: any) => (prevState: any, action: any) =>
  Object.keys(slices).reduce(
    (nextState, nextProp) => ({
      ...nextState,
      [nextProp]: slices[nextProp](prevState[nextProp], action),
    }),
    prevState
  );

export const update = <T>(state: T, payload: any): T => {
  return {
    ...state,
    ...payload,
  };
};
