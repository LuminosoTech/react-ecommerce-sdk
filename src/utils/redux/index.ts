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

export const update = <T>(state: T, payload: any): T => {
  return {
    ...state,
    ...payload,
  };
};
