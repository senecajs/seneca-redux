import { EnhancedStore } from '@reduxjs/toolkit';
import { default as React_2 } from 'react';
import { Slice } from '@reduxjs/toolkit';
import { SliceSelectors } from '@reduxjs/toolkit';
import { StoreEnhancer } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { Tuple } from '@reduxjs/toolkit';
import { UnknownAction } from 'redux';

declare function Redux(this: any, options: any): {
    name: string;
    exports: {
        slice: Slice<any, {
            response: (state: any, action: any) => void;
            entityResponse: (state: any, action: any) => void;
            update: (state: any, action: any) => void;
            modifier: (state: any, action: any) => void;
        }, any, any, SliceSelectors<any>>;
        store: EnhancedStore<any, UnknownAction, Tuple<[StoreEnhancer<{
            dispatch: ThunkDispatch<any, undefined, UnknownAction>;
        }>, StoreEnhancer]>>;
        slotSelectors: (path?: string) => {
            space: string[];
            slot: string;
            selectItem: (state: any) => any;
            selectList: (state: any) => any;
            selectMeta: (state: any, kind: 'item' | 'list') => any;
        };
        errlog: any[];
        msglog: any[];
    };
};

declare namespace Redux {
    var defaults: SenecaReduxFullOptions;
    var SenecaProvider: (spec: any) => React_2.FunctionComponentElement<React_2.ProviderProps<null>>;
    var useSeneca: () => null;
}
export { Redux }
export default Redux;

export declare const SenecaProvider: (spec: any) => React_2.FunctionComponentElement<React_2.ProviderProps<null>>;

declare type SenecaReduxFullOptions = {
    name: string;
    debug: boolean;
    log: {
        err: boolean;
        msg: boolean;
    };
    state: any;
    store: any;
    slot: Record<string, any>;
};

export declare type SenecaReduxOptions = Partial<SenecaReduxFullOptions>;

export declare const useSeneca: () => null;

export { }
