import { useContext, useEffect, useState } from "react";
import { AnalyticsService } from "@luminoso/ecommerce-sdk";
import { context } from "../store";

export const useAnalytics = () => {
  const { state } = useContext(context);

  const { core } = state;

  const { ecommerceInstance } = core;

  const [analyticsService, setAnalyticsService] = useState<AnalyticsService>();

  useEffect(() => {
    const analyticsService = ecommerceInstance?.analytics;

    if (analyticsService) {
      setAnalyticsService(analyticsService);
    }
  }, [ecommerceInstance, analyticsService]);

  return analyticsService;
};
