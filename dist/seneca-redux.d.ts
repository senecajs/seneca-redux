import { AnyAction } from 'redux';
import { Node as Node_2 } from 'gubu';
import { default as React_2 } from 'react';
import { Slice } from '@reduxjs/toolkit';
import { ThunkMiddleware } from '@reduxjs/toolkit';
import { ToolkitStore } from '@reduxjs/toolkit/dist/configureStore';

declare function redux(this: any, options: any): {
    name: string;
    exports: {
        slice: Slice<any, {
            response: (state: any, action: any) => void;
            entityResponse: (state: any, action: any) => void;
            update: (state: any, action: any) => void;
        }, any>;
        store: ToolkitStore<any, AnyAction, [ThunkMiddleware<any, AnyAction>]>;
    };
};

declare namespace redux {
    var defaults: {
        name: string;
        state: Node_2<{}>;
        store: {};
        entity: {
            root: string;
            space: Node_2<StringConstructor[]>;
            pin: Node_2<string>;
            canonMap: (state: any, msg: any, options: any) => any;
        };
    };
    var SenecaProvider: (spec: any) => React_2.FunctionComponentElement<React_2.ProviderProps<null>>;
    var useSeneca: () => null;
}
export default redux;

export declare const SenecaProvider: (spec: any) => React_2.FunctionComponentElement<React_2.ProviderProps<null>>;

export declare const useSeneca: () => null;

export { }
