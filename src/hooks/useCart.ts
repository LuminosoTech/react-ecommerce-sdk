import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { CartService } from "@luminoso/ecommerce-sdk";

import { RootState } from "../store/reducers";
import { CoreState } from "../store/reducers/core/coreReducer";

export const useCart = () => {
  const { ecommerceInstance } = useSelector<RootState, CoreState>((state) => state.core);

  const [cartService, setCartService] = useState<CartService>();

  useEffect(() => {
    const sdkCartService = ecommerceInstance?.cartService();

    if (sdkCartService) {
      setCartService(sdkCartService);
    }
  }, [ecommerceInstance]);

  return cartService;
};
