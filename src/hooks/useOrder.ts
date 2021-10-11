import { useContext, useEffect, useState } from "react";
import { OrderService } from "@luminoso/ecommerce-sdk";

import { context } from "../store";

export const useOrder = () => {
  const { state } = useContext(context);

  const { ecommerceInstance } = state.core;

  const [orderService, setOrderService] = useState<OrderService>();

  useEffect(() => {
    const sdkOrderService = ecommerceInstance?.order;

    if (sdkOrderService) {
      setOrderService(sdkOrderService);
    }
  }, [ecommerceInstance]);

  return orderService;
};
