import { useContext, useEffect, useState } from "react";
import { ProductsService } from "@luminoso/ecommerce-sdk";

import { context } from "../store";

export const useProduct = () => {
  const { state } = useContext(context);

  const { ecommerceInstance } = state.core;

  const [productService, setProductService] = useState<ProductsService>();

  useEffect(() => {
    const sdkProductService = ecommerceInstance?.product;

    if (sdkProductService) {
      setProductService(sdkProductService);
    }
  }, [ecommerceInstance]);

  return productService;
};
