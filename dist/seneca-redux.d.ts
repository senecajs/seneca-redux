import { default as React_2 } from 'react';

declare function redux(this: any, options: any): {
    name: string;
    exports: {
        slice: any;
        store: any;
    };
};

declare namespace redux {
    var defaults: {
        state: {};
        name: string;
        createSlice: FunctionConstructor;
        configureStore: FunctionConstructor;
    };
    var SenecaProvider: (spec: any) => React_2.FunctionComponentElement<React_2.ProviderProps<null>>;
    var useSeneca: () => null;
}
export default redux;

export declare const SenecaProvider: (spec: any) => React_2.FunctionComponentElement<React_2.ProviderProps<null>>;

export declare const useSeneca: () => null;

export { }
