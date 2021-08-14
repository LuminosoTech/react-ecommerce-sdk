import { useSelector } from "react-redux";

import { RootState } from "../store/reducers";
import { CoreState } from "../store/reducers/core/coreReducer";

export const useLuminoso = () => {
  const { ecommerceInstance } = useSelector<RootState, CoreState>((state) => state.core);

  return [ecommerceInstance];
};
