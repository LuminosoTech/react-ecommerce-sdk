import React from 'react';
import * as _luminoso_ecommerce_sdk from '@luminoso/ecommerce-sdk';
import { CartService, CheckoutService as CheckoutService$1, AccountBody, ShippingRate, CustomerAddress, ClientPaymentToken } from '@luminoso/ecommerce-sdk';

interface InitializeProps {
}
declare const initialize: (sdkKey: string) => (props: React.PropsWithChildren<InitializeProps>) => JSX.Element;

declare const useCart: () => CartService | undefined;

interface PaymentMethod {
    fullName: string;
    cardNumber: string;
    expiryDate: string;
    cvv: string;
    postalCode: string;
}

interface BillingClient {
    addPaymentMethod(data: PaymentMethod): Promise<string>;
}

declare class CheckoutService {
    private billingClient?;
    private sdkCheckoutService;
    constructor(sdkCheckoutService: CheckoutService$1, billingClient?: BillingClient);
    postAccountInfo: (body: Partial<AccountBody>) => void;
    getAddressAutocomplete: (address: string) => void;
    getShippingRates: () => Promise<ShippingRate[]>;
    postSelectedShippingRate: (rateId: string) => Promise<void>;
    postCustomerAddress: (body: Partial<CustomerAddress>) => void;
    getClientPaymentToken: () => Promise<ClientPaymentToken>;
    postPaymentMethod: (data: PaymentMethod) => Promise<string>;
}

declare const useCheckout: () => CheckoutService | undefined;

declare const useEcommerceStore: () => void;

declare const useUser: () => void;

declare const useLuminoso: () => (_luminoso_ecommerce_sdk.EcommerceInstance | undefined)[];

export { BillingClient, PaymentMethod, initialize, useCart, useCheckout, useEcommerceStore, useLuminoso, useUser };
