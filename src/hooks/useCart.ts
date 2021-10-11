import { useContext, useEffect, useState } from "react";
import { CartService } from "@luminoso/ecommerce-sdk";

import { context } from "../store";

export const useCart = () => {
  const { state } = useContext(context);

  const { ecommerceInstance } = state.core;

  const [cartService, setCartService] = useState<CartService>();

  useEffect(() => {
    const sdkCartService = ecommerceInstance?.cart;

    if (sdkCartService) {
      setCartService(sdkCartService);
    }
  }, [ecommerceInstance]);

  return cartService;
};
