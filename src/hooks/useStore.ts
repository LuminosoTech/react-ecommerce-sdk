import { StoreService } from "@luminoso/ecommerce-sdk";
import { useContext, useEffect, useState } from "react";
import { context } from "../store";

export const useStore = () => {
  const { state } = useContext(context);

  const { ecommerceInstance } = state.core;

  const [store, setStore] = useState<StoreService>();

  useEffect(() => {
    const storeService = ecommerceInstance?.store;

    if (storeService) {
      setStore(storeService);
    }
  }, [ecommerceInstance]);

  return store;
};
