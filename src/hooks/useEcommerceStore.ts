import { useContext, useEffect } from "react";
import { context } from "../store";

export const useEcommerceStore = () => {
  const { instance } = useContext(context);

  useEffect(() => {
    if (instance) {
      console.log(instance);
    }
  }, [instance]);
};
