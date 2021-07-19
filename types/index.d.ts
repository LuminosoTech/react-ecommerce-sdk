import React from 'react';
import * as _luminoso_ecommerce_sdk from '@luminoso/ecommerce-sdk';

interface InitializeProps {
}
declare const initialize: (sdkKey: string) => (props: React.PropsWithChildren<InitializeProps>) => JSX.Element;

declare const useEcommerceStore: () => void;

declare const useUser: () => void;

declare const useLuminoso: () => (_luminoso_ecommerce_sdk.EcommerceInstance | undefined)[];

export { initialize, useEcommerceStore, useLuminoso, useUser };
