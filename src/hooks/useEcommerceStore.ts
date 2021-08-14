import { useEffect } from "react";
import { useSelector } from "react-redux";

import { RootState } from "../store/reducers";
import { CoreState } from "../store/reducers/core/coreReducer";

export const useEcommerceStore = () => {
  const { ecommerceInstance } = useSelector<RootState, CoreState>((state) => state.core);

  useEffect(() => {
    if (ecommerceInstance) {
      console.log(ecommerceInstance);
    }
  }, [ecommerceInstance]);
};
