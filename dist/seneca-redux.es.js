import er, { createContext as tr, useContext as nr } from "react";
function K(e) {
  return `Minified Redux error #${e}; visit https://redux.js.org/Errors?code=${e} for the full message or use the non-minified dev environment for full errors. `;
}
var rr = typeof Symbol == "function" && Symbol.observable || "@@observable", en = rr, pt = () => Math.random().toString(36).substring(7).split("").join("."), or = {
  INIT: `@@redux/INIT${/* @__PURE__ */ pt()}`,
  REPLACE: `@@redux/REPLACE${/* @__PURE__ */ pt()}`,
  PROBE_UNKNOWN_ACTION: () => `@@redux/PROBE_UNKNOWN_ACTION${pt()}`
}, Ne = or;
function Le(e) {
  if (typeof e != "object" || e === null)
    return !1;
  let t = e;
  for (; Object.getPrototypeOf(t) !== null; )
    t = Object.getPrototypeOf(t);
  return Object.getPrototypeOf(e) === t || Object.getPrototypeOf(e) === null;
}
function ir(e) {
  if (e === void 0)
    return "undefined";
  if (e === null)
    return "null";
  const t = typeof e;
  switch (t) {
    case "boolean":
    case "string":
    case "number":
    case "symbol":
    case "function":
      return t;
  }
  if (Array.isArray(e))
    return "array";
  if (ur(e))
    return "date";
  if (ar(e))
    return "error";
  const n = sr(e);
  switch (n) {
    case "Symbol":
    case "Promise":
    case "WeakMap":
    case "WeakSet":
    case "Map":
    case "Set":
      return n;
  }
  return Object.prototype.toString.call(e).slice(8, -1).toLowerCase().replace(/\s/g, "");
}
function sr(e) {
  return typeof e.constructor == "function" ? e.constructor.name : null;
}
function ar(e) {
  return e instanceof Error || typeof e.message == "string" && e.constructor && typeof e.constructor.stackTraceLimit == "number";
}
function ur(e) {
  return e instanceof Date ? !0 : typeof e.toDateString == "function" && typeof e.getDate == "function" && typeof e.setDate == "function";
}
function ge(e) {
  let t = typeof e;
  return process.env.NODE_ENV !== "production" && (t = ir(e)), t;
}
function mn(e, t, n) {
  if (typeof e != "function")
    throw new Error(process.env.NODE_ENV === "production" ? K(2) : `Expected the root reducer to be a function. Instead, received: '${ge(e)}'`);
  if (typeof t == "function" && typeof n == "function" || typeof n == "function" && typeof arguments[3] == "function")
    throw new Error(process.env.NODE_ENV === "production" ? K(0) : "It looks like you are passing several store enhancers to createStore(). This is not supported. Instead, compose them together to a single function. See https://redux.js.org/tutorials/fundamentals/part-4-store#creating-a-store-with-enhancers for an example.");
  if (typeof t == "function" && typeof n > "u" && (n = t, t = void 0), typeof n < "u") {
    if (typeof n != "function")
      throw new Error(process.env.NODE_ENV === "production" ? K(1) : `Expected the enhancer to be a function. Instead, received: '${ge(n)}'`);
    return n(mn)(e, t);
  }
  let o = e, a = t, u = /* @__PURE__ */ new Map(), l = u, f = 0, w = !1;
  function v() {
    l === u && (l = /* @__PURE__ */ new Map(), u.forEach((p, b) => {
      l.set(b, p);
    }));
  }
  function g() {
    if (w)
      throw new Error(process.env.NODE_ENV === "production" ? K(3) : "You may not call store.getState() while the reducer is executing. The reducer has already received the state as an argument. Pass it down from the top reducer instead of reading it from the store.");
    return a;
  }
  function _(p) {
    if (typeof p != "function")
      throw new Error(process.env.NODE_ENV === "production" ? K(4) : `Expected the listener to be a function. Instead, received: '${ge(p)}'`);
    if (w)
      throw new Error(process.env.NODE_ENV === "production" ? K(5) : "You may not call store.subscribe() while the reducer is executing. If you would like to be notified after the store has been updated, subscribe from a component and invoke store.getState() in the callback to access the latest state. See https://redux.js.org/api/store#subscribelistener for more details.");
    let b = !0;
    v();
    const S = f++;
    return l.set(S, p), function() {
      if (b) {
        if (w)
          throw new Error(process.env.NODE_ENV === "production" ? K(6) : "You may not unsubscribe from a store listener while the reducer is executing. See https://redux.js.org/api/store#subscribelistener for more details.");
        b = !1, v(), l.delete(S), u = null;
      }
    };
  }
  function O(p) {
    if (!Le(p))
      throw new Error(process.env.NODE_ENV === "production" ? K(7) : `Actions must be plain objects. Instead, the actual type was: '${ge(p)}'. You may need to add middleware to your store setup to handle dispatching other values, such as 'redux-thunk' to handle dispatching functions. See https://redux.js.org/tutorials/fundamentals/part-4-store#middleware and https://redux.js.org/tutorials/fundamentals/part-6-async-logic#using-the-redux-thunk-middleware for examples.`);
    if (typeof p.type > "u")
      throw new Error(process.env.NODE_ENV === "production" ? K(8) : 'Actions may not have an undefined "type" property. You may have misspelled an action type string constant.');
    if (typeof p.type != "string")
      throw new Error(process.env.NODE_ENV === "production" ? K(17) : `Action "type" property must be a string. Instead, the actual type was: '${ge(p.type)}'. Value was: '${p.type}' (stringified)`);
    if (w)
      throw new Error(process.env.NODE_ENV === "production" ? K(9) : "Reducers may not dispatch actions.");
    try {
      w = !0, a = o(a, p);
    } finally {
      w = !1;
    }
    return (u = l).forEach((S) => {
      S();
    }), p;
  }
  function C(p) {
    if (typeof p != "function")
      throw new Error(process.env.NODE_ENV === "production" ? K(10) : `Expected the nextReducer to be a function. Instead, received: '${ge(p)}`);
    o = p, O({
      type: Ne.REPLACE
    });
  }
  function R() {
    const p = _;
    return {
      /**
       * The minimal observable subscription method.
       * @param observer Any object that can be used as an observer.
       * The observer object should have a `next` method.
       * @returns An object with an `unsubscribe` method that can
       * be used to unsubscribe the observable from the store, and prevent further
       * emission of values from the observable.
       */
      subscribe(b) {
        if (typeof b != "object" || b === null)
          throw new Error(process.env.NODE_ENV === "production" ? K(11) : `Expected the observer to be an object. Instead, received: '${ge(b)}'`);
        function S() {
          const T = b;
          T.next && T.next(g());
        }
        return S(), {
          unsubscribe: p(S)
        };
      },
      [en]() {
        return this;
      }
    };
  }
  return O({
    type: Ne.INIT
  }), {
    dispatch: O,
    subscribe: _,
    getState: g,
    replaceReducer: C,
    [en]: R
  };
}
function tn(e) {
  typeof console < "u" && typeof console.error == "function" && console.error(e);
  try {
    throw new Error(e);
  } catch {
  }
}
function cr(e, t, n, o) {
  const a = Object.keys(t), u = n && n.type === Ne.INIT ? "preloadedState argument passed to createStore" : "previous state received by the reducer";
  if (a.length === 0)
    return "Store does not have a valid reducer. Make sure the argument passed to combineReducers is an object whose values are reducers.";
  if (!Le(e))
    return `The ${u} has unexpected type of "${ge(e)}". Expected argument to be an object with the following keys: "${a.join('", "')}"`;
  const l = Object.keys(e).filter((f) => !t.hasOwnProperty(f) && !o[f]);
  if (l.forEach((f) => {
    o[f] = !0;
  }), !(n && n.type === Ne.REPLACE) && l.length > 0)
    return `Unexpected ${l.length > 1 ? "keys" : "key"} "${l.join('", "')}" found in ${u}. Expected to find one of the known reducer keys instead: "${a.join('", "')}". Unexpected keys will be ignored.`;
}
function lr(e) {
  Object.keys(e).forEach((t) => {
    const n = e[t];
    if (typeof n(void 0, {
      type: Ne.INIT
    }) > "u")
      throw new Error(process.env.NODE_ENV === "production" ? K(12) : `The slice reducer for key "${t}" returned undefined during initialization. If the state passed to the reducer is undefined, you must explicitly return the initial state. The initial state may not be undefined. If you don't want to set a value for this reducer, you can use null instead of undefined.`);
    if (typeof n(void 0, {
      type: Ne.PROBE_UNKNOWN_ACTION()
    }) > "u")
      throw new Error(process.env.NODE_ENV === "production" ? K(13) : `The slice reducer for key "${t}" returned undefined when probed with a random type. Don't try to handle '${Ne.INIT}' or other actions in "redux/*" namespace. They are considered private. Instead, you must return the current state for any unknown actions, unless it is undefined, in which case you must return the initial state, regardless of the action type. The initial state may not be undefined, but can be null.`);
  });
}
function fr(e) {
  const t = Object.keys(e), n = {};
  for (let l = 0; l < t.length; l++) {
    const f = t[l];
    process.env.NODE_ENV !== "production" && typeof e[f] > "u" && tn(`No reducer provided for key "${f}"`), typeof e[f] == "function" && (n[f] = e[f]);
  }
  const o = Object.keys(n);
  let a;
  process.env.NODE_ENV !== "production" && (a = {});
  let u;
  try {
    lr(n);
  } catch (l) {
    u = l;
  }
  return function(f = {}, w) {
    if (u)
      throw u;
    if (process.env.NODE_ENV !== "production") {
      const _ = cr(f, n, w, a);
      _ && tn(_);
    }
    let v = !1;
    const g = {};
    for (let _ = 0; _ < o.length; _++) {
      const O = o[_], C = n[O], R = f[O], A = C(R, w);
      if (typeof A > "u") {
        const p = w && w.type;
        throw new Error(process.env.NODE_ENV === "production" ? K(14) : `When called with an action of type ${p ? `"${String(p)}"` : "(unknown type)"}, the slice reducer for key "${O}" returned undefined. To ignore an action, you must explicitly return the previous state. If you want this reducer to hold no value, you can return null instead of undefined.`);
      }
      g[O] = A, v = v || A !== R;
    }
    return v = v || o.length !== Object.keys(f).length, v ? g : f;
  };
}
function Qe(...e) {
  return e.length === 0 ? (t) => t : e.length === 1 ? e[0] : e.reduce((t, n) => (...o) => t(n(...o)));
}
function dr(...e) {
  return (t) => (n, o) => {
    const a = t(n, o);
    let u = () => {
      throw new Error(process.env.NODE_ENV === "production" ? K(15) : "Dispatching while constructing your middleware is not allowed. Other middleware would not be applied to this dispatch.");
    };
    const l = {
      getState: a.getState,
      dispatch: (w, ...v) => u(w, ...v)
    }, f = e.map((w) => w(l));
    return u = Qe(...f)(a.dispatch), {
      ...a,
      dispatch: u
    };
  };
}
function gn(e) {
  return Le(e) && "type" in e && typeof e.type == "string";
}
var vn = Symbol.for("immer-nothing"), nn = Symbol.for("immer-draftable"), te = Symbol.for("immer-state"), pr = process.env.NODE_ENV !== "production" ? [
  // All error codes, starting by 0:
  function(e) {
    return `The plugin for '${e}' has not been loaded into Immer. To enable the plugin, import and call \`enable${e}()\` when initializing your application.`;
  },
  function(e) {
    return `produce can only be called on things that are draftable: plain objects, arrays, Map, Set or classes that are marked with '[immerable]: true'. Got '${e}'`;
  },
  "This object has been frozen and should not be mutated",
  function(e) {
    return "Cannot use a proxy that has been revoked. Did you pass an object from inside an immer function to an async process? " + e;
  },
  "An immer producer returned a new value *and* modified its draft. Either return a new value *or* modify the draft.",
  "Immer forbids circular references",
  "The first or second argument to `produce` must be a function",
  "The third argument to `produce` must be a function or undefined",
  "First argument to `createDraft` must be a plain object, an array, or an immerable object",
  "First argument to `finishDraft` must be a draft returned by `createDraft`",
  function(e) {
    return `'current' expects a draft, got: ${e}`;
  },
  "Object.defineProperty() cannot be used on an Immer draft",
  "Object.setPrototypeOf() cannot be used on an Immer draft",
  "Immer only supports deleting array indices",
  "Immer only supports setting array indices and the 'length' property",
  function(e) {
    return `'original' expects a draft, got: ${e}`;
  }
  // Note: if more errors are added, the errorOffset in Patches.ts should be increased
  // See Patches.ts for additional errors
] : [];
function Z(e, ...t) {
  if (process.env.NODE_ENV !== "production") {
    const n = pr[e], o = typeof n == "function" ? n.apply(null, t) : n;
    throw new Error(`[Immer] ${o}`);
  }
  throw new Error(
    `[Immer] minified error nr: ${e}. Full error at: https://bit.ly/3cXEKWf`
  );
}
var $e = Object.getPrototypeOf;
function ve(e) {
  return !!e && !!e[te];
}
function ye(e) {
  var t;
  return e ? bn(e) || Array.isArray(e) || !!e[nn] || !!((t = e.constructor) != null && t[nn]) || nt(e) || rt(e) : !1;
}
var hr = Object.prototype.constructor.toString();
function bn(e) {
  if (!e || typeof e != "object")
    return !1;
  const t = $e(e);
  if (t === null)
    return !0;
  const n = Object.hasOwnProperty.call(t, "constructor") && t.constructor;
  return n === Object ? !0 : typeof n == "function" && Function.toString.call(n) === hr;
}
function Fe(e, t) {
  tt(e) === 0 ? Object.entries(e).forEach(([n, o]) => {
    t(n, o, e);
  }) : e.forEach((n, o) => t(o, n, e));
}
function tt(e) {
  const t = e[te];
  return t ? t.type_ : Array.isArray(e) ? 1 : nt(e) ? 2 : rt(e) ? 3 : 0;
}
function gt(e, t) {
  return tt(e) === 2 ? e.has(t) : Object.prototype.hasOwnProperty.call(e, t);
}
function wn(e, t, n) {
  const o = tt(e);
  o === 2 ? e.set(t, n) : o === 3 ? e.add(n) : e[t] = n;
}
function yr(e, t) {
  return e === t ? e !== 0 || 1 / e === 1 / t : e !== e && t !== t;
}
function nt(e) {
  return e instanceof Map;
}
function rt(e) {
  return e instanceof Set;
}
function Ee(e) {
  return e.copy_ || e.base_;
}
function vt(e, t) {
  if (nt(e))
    return new Map(e);
  if (rt(e))
    return new Set(e);
  if (Array.isArray(e))
    return Array.prototype.slice.call(e);
  if (!t && bn(e))
    return $e(e) ? { ...e } : Object.assign(/* @__PURE__ */ Object.create(null), e);
  const n = Object.getOwnPropertyDescriptors(e);
  delete n[te];
  let o = Reflect.ownKeys(n);
  for (let a = 0; a < o.length; a++) {
    const u = o[a], l = n[u];
    l.writable === !1 && (l.writable = !0, l.configurable = !0), (l.get || l.set) && (n[u] = {
      configurable: !0,
      writable: !0,
      // could live with !!desc.set as well here...
      enumerable: l.enumerable,
      value: e[u]
    });
  }
  return Object.create($e(e), n);
}
function kt(e, t = !1) {
  return ot(e) || ve(e) || !ye(e) || (tt(e) > 1 && (e.set = e.add = e.clear = e.delete = mr), Object.freeze(e), t && Fe(e, (n, o) => kt(o, !0))), e;
}
function mr() {
  Z(2);
}
function ot(e) {
  return Object.isFrozen(e);
}
var gr = {};
function _e(e) {
  const t = gr[e];
  return t || Z(0, e), t;
}
var Be;
function En() {
  return Be;
}
function vr(e, t) {
  return {
    drafts_: [],
    parent_: e,
    immer_: t,
    // Whenever the modified draft contains a draft from another scope, we
    // need to prevent auto-freezing so the unowned draft can be finalized.
    canAutoFreeze_: !0,
    unfinalizedDrafts_: 0
  };
}
function rn(e, t) {
  t && (_e("Patches"), e.patches_ = [], e.inversePatches_ = [], e.patchListener_ = t);
}
function bt(e) {
  wt(e), e.drafts_.forEach(br), e.drafts_ = null;
}
function wt(e) {
  e === Be && (Be = e.parent_);
}
function on(e) {
  return Be = vr(Be, e);
}
function br(e) {
  const t = e[te];
  t.type_ === 0 || t.type_ === 1 ? t.revoke_() : t.revoked_ = !0;
}
function sn(e, t) {
  t.unfinalizedDrafts_ = t.drafts_.length;
  const n = t.drafts_[0];
  return e !== void 0 && e !== n ? (n[te].modified_ && (bt(t), Z(4)), ye(e) && (e = Ze(t, e), t.parent_ || et(t, e)), t.patches_ && _e("Patches").generateReplacementPatches_(
    n[te].base_,
    e,
    t.patches_,
    t.inversePatches_
  )) : e = Ze(t, n, []), bt(t), t.patches_ && t.patchListener_(t.patches_, t.inversePatches_), e !== vn ? e : void 0;
}
function Ze(e, t, n) {
  if (ot(t))
    return t;
  const o = t[te];
  if (!o)
    return Fe(
      t,
      (a, u) => an(e, o, t, a, u, n)
    ), t;
  if (o.scope_ !== e)
    return t;
  if (!o.modified_)
    return et(e, o.base_, !0), o.base_;
  if (!o.finalized_) {
    o.finalized_ = !0, o.scope_.unfinalizedDrafts_--;
    const a = o.copy_;
    let u = a, l = !1;
    o.type_ === 3 && (u = new Set(a), a.clear(), l = !0), Fe(
      u,
      (f, w) => an(e, o, a, f, w, n, l)
    ), et(e, a, !1), n && e.patches_ && _e("Patches").generatePatches_(
      o,
      n,
      e.patches_,
      e.inversePatches_
    );
  }
  return o.copy_;
}
function an(e, t, n, o, a, u, l) {
  if (process.env.NODE_ENV !== "production" && a === n && Z(5), ve(a)) {
    const f = u && t && t.type_ !== 3 && // Set objects are atomic since they have no keys.
    !gt(t.assigned_, o) ? u.concat(o) : void 0, w = Ze(e, a, f);
    if (wn(n, o, w), ve(w))
      e.canAutoFreeze_ = !1;
    else
      return;
  } else
    l && n.add(a);
  if (ye(a) && !ot(a)) {
    if (!e.immer_.autoFreeze_ && e.unfinalizedDrafts_ < 1)
      return;
    Ze(e, a), (!t || !t.scope_.parent_) && et(e, a);
  }
}
function et(e, t, n = !1) {
  !e.parent_ && e.immer_.autoFreeze_ && e.canAutoFreeze_ && kt(t, n);
}
function wr(e, t) {
  const n = Array.isArray(e), o = {
    type_: n ? 1 : 0,
    // Track which produce call this is associated with.
    scope_: t ? t.scope_ : En(),
    // True for both shallow and deep changes.
    modified_: !1,
    // Used during finalization.
    finalized_: !1,
    // Track which properties have been assigned (true) or deleted (false).
    assigned_: {},
    // The parent draft state.
    parent_: t,
    // The base state.
    base_: e,
    // The base proxy.
    draft_: null,
    // set below
    // The base copy with any updated values.
    copy_: null,
    // Called by the `produce` function.
    revoke_: null,
    isManual_: !1
  };
  let a = o, u = xt;
  n && (a = [o], u = We);
  const { revoke: l, proxy: f } = Proxy.revocable(a, u);
  return o.draft_ = f, o.revoke_ = l, f;
}
var xt = {
  get(e, t) {
    if (t === te)
      return e;
    const n = Ee(e);
    if (!gt(n, t))
      return Er(e, n, t);
    const o = n[t];
    return e.finalized_ || !ye(o) ? o : o === ht(e.base_, t) ? (yt(e), e.copy_[t] = Nt(o, e)) : o;
  },
  has(e, t) {
    return t in Ee(e);
  },
  ownKeys(e) {
    return Reflect.ownKeys(Ee(e));
  },
  set(e, t, n) {
    const o = Nn(Ee(e), t);
    if (o != null && o.set)
      return o.set.call(e.draft_, n), !0;
    if (!e.modified_) {
      const a = ht(Ee(e), t), u = a == null ? void 0 : a[te];
      if (u && u.base_ === n)
        return e.copy_[t] = n, e.assigned_[t] = !1, !0;
      if (yr(n, a) && (n !== void 0 || gt(e.base_, t)))
        return !0;
      yt(e), Et(e);
    }
    return e.copy_[t] === n && // special case: handle new props with value 'undefined'
    (n !== void 0 || t in e.copy_) || // special case: NaN
    Number.isNaN(n) && Number.isNaN(e.copy_[t]) || (e.copy_[t] = n, e.assigned_[t] = !0), !0;
  },
  deleteProperty(e, t) {
    return ht(e.base_, t) !== void 0 || t in e.base_ ? (e.assigned_[t] = !1, yt(e), Et(e)) : delete e.assigned_[t], e.copy_ && delete e.copy_[t], !0;
  },
  // Note: We never coerce `desc.value` into an Immer draft, because we can't make
  // the same guarantee in ES5 mode.
  getOwnPropertyDescriptor(e, t) {
    const n = Ee(e), o = Reflect.getOwnPropertyDescriptor(n, t);
    return o && {
      writable: !0,
      configurable: e.type_ !== 1 || t !== "length",
      enumerable: o.enumerable,
      value: n[t]
    };
  },
  defineProperty() {
    Z(11);
  },
  getPrototypeOf(e) {
    return $e(e.base_);
  },
  setPrototypeOf() {
    Z(12);
  }
}, We = {};
Fe(xt, (e, t) => {
  We[e] = function() {
    return arguments[0] = arguments[0][0], t.apply(this, arguments);
  };
});
We.deleteProperty = function(e, t) {
  return process.env.NODE_ENV !== "production" && isNaN(parseInt(t)) && Z(13), We.set.call(this, e, t, void 0);
};
We.set = function(e, t, n) {
  return process.env.NODE_ENV !== "production" && t !== "length" && isNaN(parseInt(t)) && Z(14), xt.set.call(this, e[0], t, n, e[0]);
};
function ht(e, t) {
  const n = e[te];
  return (n ? Ee(n) : e)[t];
}
function Er(e, t, n) {
  var a;
  const o = Nn(t, n);
  return o ? "value" in o ? o.value : (
    // This is a very special case, if the prop is a getter defined by the
    // prototype, we should invoke it with the draft as context!
    (a = o.get) == null ? void 0 : a.call(e.draft_)
  ) : void 0;
}
function Nn(e, t) {
  if (!(t in e))
    return;
  let n = $e(e);
  for (; n; ) {
    const o = Object.getOwnPropertyDescriptor(n, t);
    if (o)
      return o;
    n = $e(n);
  }
}
function Et(e) {
  e.modified_ || (e.modified_ = !0, e.parent_ && Et(e.parent_));
}
function yt(e) {
  e.copy_ || (e.copy_ = vt(
    e.base_,
    e.scope_.immer_.useStrictShallowCopy_
  ));
}
var Nr = class {
  constructor(e) {
    this.autoFreeze_ = !0, this.useStrictShallowCopy_ = !1, this.produce = (t, n, o) => {
      if (typeof t == "function" && typeof n != "function") {
        const u = n;
        n = t;
        const l = this;
        return function(w = u, ...v) {
          return l.produce(w, (g) => n.call(this, g, ...v));
        };
      }
      typeof n != "function" && Z(6), o !== void 0 && typeof o != "function" && Z(7);
      let a;
      if (ye(t)) {
        const u = on(this), l = Nt(t, void 0);
        let f = !0;
        try {
          a = n(l), f = !1;
        } finally {
          f ? bt(u) : wt(u);
        }
        return rn(u, o), sn(a, u);
      } else if (!t || typeof t != "object") {
        if (a = n(t), a === void 0 && (a = t), a === vn && (a = void 0), this.autoFreeze_ && kt(a, !0), o) {
          const u = [], l = [];
          _e("Patches").generateReplacementPatches_(t, a, u, l), o(u, l);
        }
        return a;
      } else
        Z(1, t);
    }, this.produceWithPatches = (t, n) => {
      if (typeof t == "function")
        return (l, ...f) => this.produceWithPatches(l, (w) => t(w, ...f));
      let o, a;
      return [this.produce(t, n, (l, f) => {
        o = l, a = f;
      }), o, a];
    }, typeof (e == null ? void 0 : e.autoFreeze) == "boolean" && this.setAutoFreeze(e.autoFreeze), typeof (e == null ? void 0 : e.useStrictShallowCopy) == "boolean" && this.setUseStrictShallowCopy(e.useStrictShallowCopy);
  }
  createDraft(e) {
    ye(e) || Z(8), ve(e) && (e = _n(e));
    const t = on(this), n = Nt(e, void 0);
    return n[te].isManual_ = !0, wt(t), n;
  }
  finishDraft(e, t) {
    const n = e && e[te];
    (!n || !n.isManual_) && Z(9);
    const { scope_: o } = n;
    return rn(o, t), sn(void 0, o);
  }
  /**
   * Pass true to automatically freeze all copies created by Immer.
   *
   * By default, auto-freezing is enabled.
   */
  setAutoFreeze(e) {
    this.autoFreeze_ = e;
  }
  /**
   * Pass true to enable strict shallow copy.
   *
   * By default, immer does not copy the object descriptors such as getter, setter and non-enumrable properties.
   */
  setUseStrictShallowCopy(e) {
    this.useStrictShallowCopy_ = e;
  }
  applyPatches(e, t) {
    let n;
    for (n = t.length - 1; n >= 0; n--) {
      const a = t[n];
      if (a.path.length === 0 && a.op === "replace") {
        e = a.value;
        break;
      }
    }
    n > -1 && (t = t.slice(n + 1));
    const o = _e("Patches").applyPatches_;
    return ve(e) ? o(e, t) : this.produce(
      e,
      (a) => o(a, t)
    );
  }
};
function Nt(e, t) {
  const n = nt(e) ? _e("MapSet").proxyMap_(e, t) : rt(e) ? _e("MapSet").proxySet_(e, t) : wr(e, t);
  return (t ? t.scope_ : En()).drafts_.push(n), n;
}
function _n(e) {
  return ve(e) || Z(10, e), On(e);
}
function On(e) {
  if (!ye(e) || ot(e))
    return e;
  const t = e[te];
  let n;
  if (t) {
    if (!t.modified_)
      return t.base_;
    t.finalized_ = !0, n = vt(e, t.scope_.immer_.useStrictShallowCopy_);
  } else
    n = vt(e, !0);
  return Fe(n, (o, a) => {
    wn(n, o, On(a));
  }), t && (t.finalized_ = !1), n;
}
var ne = new Nr(), kn = ne.produce;
ne.produceWithPatches.bind(
  ne
);
ne.setAutoFreeze.bind(ne);
ne.setUseStrictShallowCopy.bind(ne);
ne.applyPatches.bind(ne);
ne.createDraft.bind(ne);
ne.finishDraft.bind(ne);
var _r = (e, t, n) => {
  if (t.length === 1 && t[0] === n) {
    let o = !1;
    try {
      const a = {};
      e(a) === a && (o = !0);
    } catch {
    }
    if (o) {
      let a;
      try {
        throw new Error();
      } catch (u) {
        ({ stack: a } = u);
      }
      console.warn(
        `The result function returned its own inputs without modification. e.g
\`createSelector([state => state.todos], todos => todos)\`
This could lead to inefficient memoization and unnecessary re-renders.
Ensure transformation logic is in the result function, and extraction logic is in the input selectors.`,
        { stack: a }
      );
    }
  }
}, Or = (e, t, n) => {
  const { memoize: o, memoizeOptions: a } = t, { inputSelectorResults: u, inputSelectorResultsCopy: l } = e, f = o(() => ({}), ...a);
  if (!(f.apply(null, u) === f.apply(null, l))) {
    let v;
    try {
      throw new Error();
    } catch (g) {
      ({ stack: v } = g);
    }
    console.warn(
      `An input selector returned a different result when passed same arguments.
This means your output selector will likely run more frequently than intended.
Avoid returning a new reference inside your input selector, e.g.
\`createSelector([state => state.todos.map(todo => todo.id)], todoIds => todoIds.length)\``,
      {
        arguments: n,
        firstInputs: u,
        secondInputs: l,
        stack: v
      }
    );
  }
}, kr = {
  inputStabilityCheck: "once",
  identityFunctionCheck: "once"
};
function xr(e, t = `expected a function, instead received ${typeof e}`) {
  if (typeof e != "function")
    throw new TypeError(t);
}
function Sr(e, t = `expected an object, instead received ${typeof e}`) {
  if (typeof e != "object")
    throw new TypeError(t);
}
function Ir(e, t = "expected all items to be functions, instead received the following types: ") {
  if (!e.every((n) => typeof n == "function")) {
    const n = e.map(
      (o) => typeof o == "function" ? `function ${o.name || "unnamed"}()` : typeof o
    ).join(", ");
    throw new TypeError(`${t}[${n}]`);
  }
}
var un = (e) => Array.isArray(e) ? e : [e];
function Dr(e) {
  const t = Array.isArray(e[0]) ? e[0] : e;
  return Ir(
    t,
    "createSelector expects all input-selectors to be functions, but received the following types: "
  ), t;
}
function cn(e, t) {
  const n = [], { length: o } = e;
  for (let a = 0; a < o; a++)
    n.push(e[a].apply(null, t));
  return n;
}
var $r = (e, t) => {
  const { identityFunctionCheck: n, inputStabilityCheck: o } = {
    ...kr,
    ...t
  };
  return {
    identityFunctionCheck: {
      shouldRun: n === "always" || n === "once" && e,
      run: _r
    },
    inputStabilityCheck: {
      shouldRun: o === "always" || o === "once" && e,
      run: Or
    }
  };
}, jr = class {
  constructor(e) {
    this.value = e;
  }
  deref() {
    return this.value;
  }
}, Cr = typeof WeakRef < "u" ? WeakRef : jr, Rr = 0, ln = 1;
function He() {
  return {
    s: Rr,
    v: void 0,
    o: null,
    p: null
  };
}
function St(e, t = {}) {
  let n = He();
  const { resultEqualityCheck: o } = t;
  let a, u = 0;
  function l() {
    var _;
    let f = n;
    const { length: w } = arguments;
    for (let O = 0, C = w; O < C; O++) {
      const R = arguments[O];
      if (typeof R == "function" || typeof R == "object" && R !== null) {
        let A = f.o;
        A === null && (f.o = A = /* @__PURE__ */ new WeakMap());
        const p = A.get(R);
        p === void 0 ? (f = He(), A.set(R, f)) : f = p;
      } else {
        let A = f.p;
        A === null && (f.p = A = /* @__PURE__ */ new Map());
        const p = A.get(R);
        p === void 0 ? (f = He(), A.set(R, f)) : f = p;
      }
    }
    const v = f;
    let g;
    if (f.s === ln ? g = f.v : (g = e.apply(null, arguments), u++), v.s = ln, o) {
      const O = ((_ = a == null ? void 0 : a.deref) == null ? void 0 : _.call(a)) ?? a;
      O != null && o(O, g) && (g = O, u !== 0 && u--), a = typeof g == "object" && g !== null || typeof g == "function" ? new Cr(g) : g;
    }
    return v.v = g, g;
  }
  return l.clearCache = () => {
    n = He(), l.resetResultsCount();
  }, l.resultsCount = () => u, l.resetResultsCount = () => {
    u = 0;
  }, l;
}
function xn(e, ...t) {
  const n = typeof e == "function" ? {
    memoize: e,
    memoizeOptions: t
  } : e, o = (...a) => {
    let u = 0, l = 0, f, w = {}, v = a.pop();
    typeof v == "object" && (w = v, v = a.pop()), xr(
      v,
      `createSelector expects an output function after the inputs, but received: [${typeof v}]`
    );
    const g = {
      ...n,
      ...w
    }, {
      memoize: _,
      memoizeOptions: O = [],
      argsMemoize: C = St,
      argsMemoizeOptions: R = [],
      devModeChecks: A = {}
    } = g, p = un(O), b = un(R), S = Dr(a), D = _(function() {
      return u++, v.apply(
        null,
        arguments
      );
    }, ...p);
    let T = !0;
    const M = C(function() {
      l++;
      const U = cn(
        S,
        arguments
      );
      if (f = D.apply(null, U), process.env.NODE_ENV !== "production") {
        const { identityFunctionCheck: q, inputStabilityCheck: W } = $r(T, A);
        if (q.shouldRun && q.run(
          v,
          U,
          f
        ), W.shouldRun) {
          const B = cn(
            S,
            arguments
          );
          W.run(
            { inputSelectorResults: U, inputSelectorResultsCopy: B },
            { memoize: _, memoizeOptions: p },
            arguments
          );
        }
        T && (T = !1);
      }
      return f;
    }, ...b);
    return Object.assign(M, {
      resultFunc: v,
      memoizedResultFunc: D,
      dependencies: S,
      dependencyRecomputations: () => l,
      resetDependencyRecomputations: () => {
        l = 0;
      },
      lastResult: () => f,
      recomputations: () => u,
      resetRecomputations: () => {
        u = 0;
      },
      memoize: _,
      argsMemoize: C
    });
  };
  return Object.assign(o, {
    withTypes: () => o
  }), o;
}
var Tr = /* @__PURE__ */ xn(St), Ar = Object.assign(
  (e, t = Tr) => {
    Sr(
      e,
      `createStructuredSelector expects first argument to be an object where each property is a selector, instead received a ${typeof e}`
    );
    const n = Object.keys(e), o = n.map(
      (u) => e[u]
    );
    return t(
      o,
      (...u) => u.reduce((l, f, w) => (l[n[w]] = f, l), {})
    );
  },
  { withTypes: () => Ar }
);
function Sn(e) {
  return ({ dispatch: n, getState: o }) => (a) => (u) => typeof u == "function" ? u(n, o, e) : a(u);
}
var Mr = Sn(), Vr = Sn, Pr = (...e) => {
  const t = xn(...e);
  return (...n) => {
    const o = t(...n), a = (u, ...l) => o(ve(u) ? _n(u) : u, ...l);
    return Object.assign(a, o), a;
  };
};
Pr(St);
var zr = typeof window < "u" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : function() {
  if (arguments.length !== 0)
    return typeof arguments[0] == "object" ? Qe : Qe.apply(null, arguments);
}, Fr = (e) => e && typeof e.match == "function";
function qe(e, t) {
  function n(...o) {
    if (t) {
      let a = t(...o);
      if (!a)
        throw new Error(process.env.NODE_ENV === "production" ? F(0) : "prepareAction did not return an object");
      return {
        type: e,
        payload: a.payload,
        ..."meta" in a && {
          meta: a.meta
        },
        ..."error" in a && {
          error: a.error
        }
      };
    }
    return {
      type: e,
      payload: o[0]
    };
  }
  return n.toString = () => `${e}`, n.type = e, n.match = (o) => gn(o) && o.type === e, n;
}
function Br(e) {
  return typeof e == "function" && "type" in e && // hasMatchFunction only wants Matchers but I don't see the point in rewriting it
  Fr(e);
}
function Wr(e) {
  const t = e ? `${e}`.split("/") : [], n = t[t.length - 1] || "actionCreator";
  return `Detected an action creator with type "${e || "unknown"}" being dispatched. 
Make sure you're calling the action creator before dispatching, i.e. \`dispatch(${n}())\` instead of \`dispatch(${n})\`. This is necessary even if the action has no payload.`;
}
function qr(e = {}) {
  if (process.env.NODE_ENV === "production")
    return () => (n) => (o) => n(o);
  const {
    isActionCreator: t = Br
  } = e;
  return () => (n) => (o) => (t(o) && console.warn(Wr(o.type)), n(o));
}
function In(e, t) {
  let n = 0;
  return {
    measureTime(o) {
      const a = Date.now();
      try {
        return o();
      } finally {
        const u = Date.now();
        n += u - a;
      }
    },
    warnIfExceeded() {
      n > e && console.warn(`${t} took ${n}ms, which is more than the warning threshold of ${e}ms. 
If your state or actions are very large, you may want to disable the middleware as it might cause too much of a slowdown in development mode. See https://redux-toolkit.js.org/api/getDefaultMiddleware for instructions.
It is disabled in production builds, so you don't need to worry about that.`);
    }
  };
}
var Dn = class Pe extends Array {
  constructor(...t) {
    super(...t), Object.setPrototypeOf(this, Pe.prototype);
  }
  static get [Symbol.species]() {
    return Pe;
  }
  concat(...t) {
    return super.concat.apply(this, t);
  }
  prepend(...t) {
    return t.length === 1 && Array.isArray(t[0]) ? new Pe(...t[0].concat(this)) : new Pe(...t.concat(this));
  }
};
function fn(e) {
  return ye(e) ? kn(e, () => {
  }) : e;
}
function dn(e, t, n) {
  if (e.has(t)) {
    let a = e.get(t);
    return n.update && (a = n.update(a, t, e), e.set(t, a)), a;
  }
  if (!n.insert)
    throw new Error(process.env.NODE_ENV === "production" ? F(10) : "No insert provided for key not already in map");
  const o = n.insert(t, e);
  return e.set(t, o), o;
}
function Lr(e) {
  return typeof e != "object" || e == null || Object.isFrozen(e);
}
function Ur(e, t, n) {
  const o = $n(e, t, n);
  return {
    detectMutations() {
      return jn(e, t, o, n);
    }
  };
}
function $n(e, t = [], n, o = "", a = /* @__PURE__ */ new Set()) {
  const u = {
    value: n
  };
  if (!e(n) && !a.has(n)) {
    a.add(n), u.children = {};
    for (const l in n) {
      const f = o ? o + "." + l : l;
      t.length && t.indexOf(f) !== -1 || (u.children[l] = $n(e, t, n[l], f));
    }
  }
  return u;
}
function jn(e, t = [], n, o, a = !1, u = "") {
  const l = n ? n.value : void 0, f = l === o;
  if (a && !f && !Number.isNaN(o))
    return {
      wasMutated: !0,
      path: u
    };
  if (e(l) || e(o))
    return {
      wasMutated: !1
    };
  const w = {};
  for (let g in n.children)
    w[g] = !0;
  for (let g in o)
    w[g] = !0;
  const v = t.length > 0;
  for (let g in w) {
    const _ = u ? u + "." + g : g;
    if (v && t.some((R) => R instanceof RegExp ? R.test(_) : _ === R))
      continue;
    const O = jn(e, t, n.children[g], o[g], f, _);
    if (O.wasMutated)
      return O;
  }
  return {
    wasMutated: !1
  };
}
function Gr(e = {}) {
  if (process.env.NODE_ENV === "production")
    return () => (t) => (n) => t(n);
  {
    let t = function(f, w, v, g) {
      return JSON.stringify(f, n(w, g), v);
    }, n = function(f, w) {
      let v = [], g = [];
      return w || (w = function(_, O) {
        return v[0] === O ? "[Circular ~]" : "[Circular ~." + g.slice(0, v.indexOf(O)).join(".") + "]";
      }), function(_, O) {
        if (v.length > 0) {
          var C = v.indexOf(this);
          ~C ? v.splice(C + 1) : v.push(this), ~C ? g.splice(C, 1 / 0, _) : g.push(_), ~v.indexOf(O) && (O = w.call(this, _, O));
        } else
          v.push(O);
        return f == null ? O : f.call(this, _, O);
      };
    }, {
      isImmutable: o = Lr,
      ignoredPaths: a,
      warnAfter: u = 32
    } = e;
    const l = Ur.bind(null, o, a);
    return ({
      getState: f
    }) => {
      let w = f(), v = l(w), g;
      return (_) => (O) => {
        const C = In(u, "ImmutableStateInvariantMiddleware");
        C.measureTime(() => {
          if (w = f(), g = v.detectMutations(), v = l(w), g.wasMutated)
            throw new Error(process.env.NODE_ENV === "production" ? F(19) : `A state mutation was detected between dispatches, in the path '${g.path || ""}'.  This may cause incorrect behavior. (https://redux.js.org/style-guide/style-guide#do-not-mutate-state)`);
        });
        const R = _(O);
        return C.measureTime(() => {
          if (w = f(), g = v.detectMutations(), v = l(w), g.wasMutated)
            throw new Error(process.env.NODE_ENV === "production" ? F(20) : `A state mutation was detected inside a dispatch, in the path: ${g.path || ""}. Take a look at the reducer(s) handling the action ${t(O)}. (https://redux.js.org/style-guide/style-guide#do-not-mutate-state)`);
        }), C.warnIfExceeded(), R;
      };
    };
  }
}
function Cn(e) {
  const t = typeof e;
  return e == null || t === "string" || t === "boolean" || t === "number" || Array.isArray(e) || Le(e);
}
function _t(e, t = "", n = Cn, o, a = [], u) {
  let l;
  if (!n(e))
    return {
      keyPath: t || "<root>",
      value: e
    };
  if (typeof e != "object" || e === null || u != null && u.has(e))
    return !1;
  const f = o != null ? o(e) : Object.entries(e), w = a.length > 0;
  for (const [v, g] of f) {
    const _ = t ? t + "." + v : v;
    if (!(w && a.some((C) => C instanceof RegExp ? C.test(_) : _ === C))) {
      if (!n(g))
        return {
          keyPath: _,
          value: g
        };
      if (typeof g == "object" && (l = _t(g, _, n, o, a, u), l))
        return l;
    }
  }
  return u && Rn(e) && u.add(e), !1;
}
function Rn(e) {
  if (!Object.isFrozen(e))
    return !1;
  for (const t of Object.values(e))
    if (!(typeof t != "object" || t === null) && !Rn(t))
      return !1;
  return !0;
}
function Kr(e = {}) {
  if (process.env.NODE_ENV === "production")
    return () => (t) => (n) => t(n);
  {
    const {
      isSerializable: t = Cn,
      getEntries: n,
      ignoredActions: o = [],
      ignoredActionPaths: a = ["meta.arg", "meta.baseQueryMeta"],
      ignoredPaths: u = [],
      warnAfter: l = 32,
      ignoreState: f = !1,
      ignoreActions: w = !1,
      disableCache: v = !1
    } = e, g = !v && WeakSet ? /* @__PURE__ */ new WeakSet() : void 0;
    return (_) => (O) => (C) => {
      if (!gn(C))
        return O(C);
      const R = O(C), A = In(l, "SerializableStateInvariantMiddleware");
      return !w && !(o.length && o.indexOf(C.type) !== -1) && A.measureTime(() => {
        const p = _t(C, "", t, n, a, g);
        if (p) {
          const {
            keyPath: b,
            value: S
          } = p;
          console.error(`A non-serializable value was detected in an action, in the path: \`${b}\`. Value:`, S, `
Take a look at the logic that dispatched this action: `, C, `
(See https://redux.js.org/faq/actions#why-should-type-be-a-string-or-at-least-serializable-why-should-my-action-types-be-constants)`, `
(To allow non-serializable values see: https://redux-toolkit.js.org/usage/usage-guide#working-with-non-serializable-data)`);
        }
      }), f || (A.measureTime(() => {
        const p = _.getState(), b = _t(p, "", t, n, u, g);
        if (b) {
          const {
            keyPath: S,
            value: D
          } = b;
          console.error(`A non-serializable value was detected in the state, in the path: \`${S}\`. Value:`, D, `
Take a look at the reducer(s) handling this action type: ${C.type}.
(See https://redux.js.org/faq/organizing-state#can-i-put-functions-promises-or-other-non-serializable-items-in-my-store-state)`);
        }
      }), A.warnIfExceeded()), R;
    };
  }
}
function Xe(e) {
  return typeof e == "boolean";
}
var Yr = () => function(t) {
  const {
    thunk: n = !0,
    immutableCheck: o = !0,
    serializableCheck: a = !0,
    actionCreatorCheck: u = !0
  } = t ?? {};
  let l = new Dn();
  if (n && (Xe(n) ? l.push(Mr) : l.push(Vr(n.extraArgument))), process.env.NODE_ENV !== "production") {
    if (o) {
      let f = {};
      Xe(o) || (f = o), l.unshift(Gr(f));
    }
    if (a) {
      let f = {};
      Xe(a) || (f = a), l.push(Kr(f));
    }
    if (u) {
      let f = {};
      Xe(u) || (f = u), l.unshift(qr(f));
    }
  }
  return l;
}, Hr = "RTK_autoBatch", Tn = (e) => (t) => {
  setTimeout(t, e);
}, Xr = typeof window < "u" && window.requestAnimationFrame ? window.requestAnimationFrame : Tn(10), Jr = (e = {
  type: "raf"
}) => (t) => (...n) => {
  const o = t(...n);
  let a = !0, u = !1, l = !1;
  const f = /* @__PURE__ */ new Set(), w = e.type === "tick" ? queueMicrotask : e.type === "raf" ? Xr : e.type === "callback" ? e.queueNotification : Tn(e.timeout), v = () => {
    l = !1, u && (u = !1, f.forEach((g) => g()));
  };
  return Object.assign({}, o, {
    // Override the base `store.subscribe` method to keep original listeners
    // from running if we're delaying notifications
    subscribe(g) {
      const _ = () => a && g(), O = o.subscribe(_);
      return f.add(g), () => {
        O(), f.delete(g);
      };
    },
    // Override the base `store.dispatch` method so that we can check actions
    // for the `shouldAutoBatch` flag and determine if batching is active
    dispatch(g) {
      var _;
      try {
        return a = !((_ = g == null ? void 0 : g.meta) != null && _[Hr]), u = !a, u && (l || (l = !0, w(v))), o.dispatch(g);
      } finally {
        a = !0;
      }
    }
  });
}, Qr = (e) => function(n) {
  const {
    autoBatch: o = !0
  } = n ?? {};
  let a = new Dn(e);
  return o && a.push(Jr(typeof o == "object" ? o : void 0)), a;
}, me = process.env.NODE_ENV === "production";
function Zr(e) {
  const t = Yr(), {
    reducer: n = void 0,
    middleware: o,
    devTools: a = !0,
    preloadedState: u = void 0,
    enhancers: l = void 0
  } = e || {};
  let f;
  if (typeof n == "function")
    f = n;
  else if (Le(n))
    f = fr(n);
  else
    throw new Error(process.env.NODE_ENV === "production" ? F(1) : "`reducer` is a required argument, and must be a function or an object of functions that can be passed to combineReducers");
  if (!me && o && typeof o != "function")
    throw new Error(process.env.NODE_ENV === "production" ? F(2) : "`middleware` field must be a callback");
  let w;
  if (typeof o == "function") {
    if (w = o(t), !me && !Array.isArray(w))
      throw new Error(process.env.NODE_ENV === "production" ? F(3) : "when using a middleware builder function, an array of middleware must be returned");
  } else
    w = t();
  if (!me && w.some((R) => typeof R != "function"))
    throw new Error(process.env.NODE_ENV === "production" ? F(4) : "each middleware provided to configureStore must be a function");
  let v = Qe;
  a && (v = zr({
    // Enable capture of stack traces for dispatched Redux actions
    trace: !me,
    ...typeof a == "object" && a
  }));
  const g = dr(...w), _ = Qr(g);
  if (!me && l && typeof l != "function")
    throw new Error(process.env.NODE_ENV === "production" ? F(5) : "`enhancers` field must be a callback");
  let O = typeof l == "function" ? l(_) : _();
  if (!me && !Array.isArray(O))
    throw new Error(process.env.NODE_ENV === "production" ? F(6) : "`enhancers` callback must return an array");
  if (!me && O.some((R) => typeof R != "function"))
    throw new Error(process.env.NODE_ENV === "production" ? F(7) : "each enhancer provided to configureStore must be a function");
  !me && w.length && !O.includes(g) && console.error("middlewares were provided, but middleware enhancer was not included in final enhancers - make sure to call `getDefaultEnhancers`");
  const C = v(...O);
  return mn(f, u, C);
}
function An(e) {
  const t = {}, n = [];
  let o;
  const a = {
    addCase(u, l) {
      if (process.env.NODE_ENV !== "production") {
        if (n.length > 0)
          throw new Error(process.env.NODE_ENV === "production" ? F(26) : "`builder.addCase` should only be called before calling `builder.addMatcher`");
        if (o)
          throw new Error(process.env.NODE_ENV === "production" ? F(27) : "`builder.addCase` should only be called before calling `builder.addDefaultCase`");
      }
      const f = typeof u == "string" ? u : u.type;
      if (!f)
        throw new Error(process.env.NODE_ENV === "production" ? F(28) : "`builder.addCase` cannot be called with an empty action type");
      if (f in t)
        throw new Error(process.env.NODE_ENV === "production" ? F(29) : `\`builder.addCase\` cannot be called with two reducers for the same action type '${f}'`);
      return t[f] = l, a;
    },
    addMatcher(u, l) {
      if (process.env.NODE_ENV !== "production" && o)
        throw new Error(process.env.NODE_ENV === "production" ? F(30) : "`builder.addMatcher` should only be called before calling `builder.addDefaultCase`");
      return n.push({
        matcher: u,
        reducer: l
      }), a;
    },
    addDefaultCase(u) {
      if (process.env.NODE_ENV !== "production" && o)
        throw new Error(process.env.NODE_ENV === "production" ? F(31) : "`builder.addDefaultCase` can only be called once");
      return o = u, a;
    }
  };
  return e(a), [t, n, o];
}
function eo(e) {
  return typeof e == "function";
}
function to(e, t) {
  if (process.env.NODE_ENV !== "production" && typeof t == "object")
    throw new Error(process.env.NODE_ENV === "production" ? F(8) : "The object notation for `createReducer` has been removed. Please use the 'builder callback' notation instead: https://redux-toolkit.js.org/api/createReducer");
  let [n, o, a] = An(t), u;
  if (eo(e))
    u = () => fn(e());
  else {
    const f = fn(e);
    u = () => f;
  }
  function l(f = u(), w) {
    let v = [n[w.type], ...o.filter(({
      matcher: g
    }) => g(w)).map(({
      reducer: g
    }) => g)];
    return v.filter((g) => !!g).length === 0 && (v = [a]), v.reduce((g, _) => {
      if (_)
        if (ve(g)) {
          const C = _(g, w);
          return C === void 0 ? g : C;
        } else {
          if (ye(g))
            return kn(g, (O) => _(O, w));
          {
            const O = _(g, w);
            if (O === void 0) {
              if (g === null)
                return g;
              throw new Error(process.env.NODE_ENV === "production" ? F(9) : "A case reducer on a non-draftable value must not return undefined");
            }
            return O;
          }
        }
      return g;
    }, f);
  }
  return l.getInitialState = u, l;
}
var no = Symbol.for("rtk-slice-createasyncthunk");
function ro(e, t) {
  return `${e}/${t}`;
}
function oo({
  creators: e
} = {}) {
  var n;
  const t = (n = e == null ? void 0 : e.asyncThunk) == null ? void 0 : n[no];
  return function(a) {
    const {
      name: u,
      reducerPath: l = u
    } = a;
    if (!u)
      throw new Error(process.env.NODE_ENV === "production" ? F(11) : "`name` is a required option for createSlice");
    typeof process < "u" && process.env.NODE_ENV === "development" && a.initialState === void 0 && console.error("You must provide an `initialState` value that is not `undefined`. You may have misspelled `initialState`");
    const f = (typeof a.reducers == "function" ? a.reducers(ao()) : a.reducers) || {}, w = Object.keys(f), v = {
      sliceCaseReducersByName: {},
      sliceCaseReducersByType: {},
      actionCreators: {},
      sliceMatchers: []
    }, g = {
      addCase(p, b) {
        const S = typeof p == "string" ? p : p.type;
        if (!S)
          throw new Error(process.env.NODE_ENV === "production" ? F(12) : "`context.addCase` cannot be called with an empty action type");
        if (S in v.sliceCaseReducersByType)
          throw new Error(process.env.NODE_ENV === "production" ? F(13) : "`context.addCase` cannot be called with two reducers for the same action type: " + S);
        return v.sliceCaseReducersByType[S] = b, g;
      },
      addMatcher(p, b) {
        return v.sliceMatchers.push({
          matcher: p,
          reducer: b
        }), g;
      },
      exposeAction(p, b) {
        return v.actionCreators[p] = b, g;
      },
      exposeCaseReducer(p, b) {
        return v.sliceCaseReducersByName[p] = b, g;
      }
    };
    w.forEach((p) => {
      const b = f[p], S = {
        reducerName: p,
        type: ro(u, p),
        createNotation: typeof a.reducers == "function"
      };
      co(b) ? fo(S, b, g, t) : uo(S, b, g);
    });
    function _() {
      if (process.env.NODE_ENV !== "production" && typeof a.extraReducers == "object")
        throw new Error(process.env.NODE_ENV === "production" ? F(14) : "The object notation for `createSlice.extraReducers` has been removed. Please use the 'builder callback' notation instead: https://redux-toolkit.js.org/api/createSlice");
      const [p = {}, b = [], S = void 0] = typeof a.extraReducers == "function" ? An(a.extraReducers) : [a.extraReducers], D = {
        ...p,
        ...v.sliceCaseReducersByType
      };
      return to(a.initialState, (T) => {
        for (let M in D)
          T.addCase(M, D[M]);
        for (let M of v.sliceMatchers)
          T.addMatcher(M.matcher, M.reducer);
        for (let M of b)
          T.addMatcher(M.matcher, M.reducer);
        S && T.addDefaultCase(S);
      });
    }
    const O = (p) => p, C = /* @__PURE__ */ new WeakMap();
    let R;
    const A = {
      name: u,
      reducerPath: l,
      reducer(p, b) {
        return R || (R = _()), R(p, b);
      },
      actions: v.actionCreators,
      caseReducers: v.sliceCaseReducersByName,
      getInitialState() {
        return R || (R = _()), R.getInitialState();
      },
      getSelectors(p = O) {
        const b = dn(C, this, {
          insert: () => /* @__PURE__ */ new WeakMap()
        });
        return dn(b, p, {
          insert: () => {
            const S = {};
            for (const [D, T] of Object.entries(a.selectors ?? {}))
              S[D] = io(this, T, p, this !== A);
            return S;
          }
        });
      },
      selectSlice(p) {
        let b = p[this.reducerPath];
        if (typeof b > "u") {
          if (this !== A)
            b = this.getInitialState();
          else if (process.env.NODE_ENV !== "production")
            throw new Error(process.env.NODE_ENV === "production" ? F(15) : "selectSlice returned undefined for an uninjected slice reducer");
        }
        return b;
      },
      get selectors() {
        return this.getSelectors(this.selectSlice);
      },
      injectInto(p, {
        reducerPath: b,
        ...S
      } = {}) {
        const D = b ?? this.reducerPath;
        return p.inject({
          reducerPath: D,
          reducer: this.reducer
        }, S), {
          ...this,
          reducerPath: D
        };
      }
    };
    return A;
  };
}
function io(e, t, n, o) {
  function a(u, ...l) {
    let f = n.call(e, u);
    if (typeof f > "u") {
      if (o)
        f = e.getInitialState();
      else if (process.env.NODE_ENV !== "production")
        throw new Error(process.env.NODE_ENV === "production" ? F(16) : "selectState returned undefined for an uninjected slice reducer");
    }
    return t(f, ...l);
  }
  return a.unwrapped = t, a;
}
var so = oo();
function ao() {
  function e(t, n) {
    return {
      _reducerDefinitionType: "asyncThunk",
      payloadCreator: t,
      ...n
    };
  }
  return e.withTypes = () => e, {
    reducer(t) {
      return Object.assign({
        // hack so the wrapping function has the same name as the original
        // we need to create a wrapper so the `reducerDefinitionType` is not assigned to the original
        [t.name](...n) {
          return t(...n);
        }
      }[t.name], {
        _reducerDefinitionType: "reducer"
        /* reducer */
      });
    },
    preparedReducer(t, n) {
      return {
        _reducerDefinitionType: "reducerWithPrepare",
        prepare: t,
        reducer: n
      };
    },
    asyncThunk: e
  };
}
function uo({
  type: e,
  reducerName: t,
  createNotation: n
}, o, a) {
  let u, l;
  if ("reducer" in o) {
    if (n && !lo(o))
      throw new Error(process.env.NODE_ENV === "production" ? F(17) : "Please use the `create.preparedReducer` notation for prepared action creators with the `create` notation.");
    u = o.reducer, l = o.prepare;
  } else
    u = o;
  a.addCase(e, u).exposeCaseReducer(t, u).exposeAction(t, l ? qe(e, l) : qe(e));
}
function co(e) {
  return e._reducerDefinitionType === "asyncThunk";
}
function lo(e) {
  return e._reducerDefinitionType === "reducerWithPrepare";
}
function fo({
  type: e,
  reducerName: t
}, n, o, a) {
  if (!a)
    throw new Error(process.env.NODE_ENV === "production" ? F(18) : "Cannot use `create.asyncThunk` in the built-in `createSlice`. Use `buildCreateSlice({ creators: { asyncThunk: asyncThunkCreator } })` to create a customised version of `createSlice`.");
  const {
    payloadCreator: u,
    fulfilled: l,
    pending: f,
    rejected: w,
    settled: v,
    options: g
  } = n, _ = a(e, u, g);
  o.exposeAction(t, _), l && o.addCase(_.fulfilled, l), f && o.addCase(_.pending, f), w && o.addCase(_.rejected, w), v && o.addMatcher(_.settled, v), o.exposeCaseReducer(t, {
    fulfilled: l || Je,
    pending: f || Je,
    rejected: w || Je,
    settled: v || Je
  });
}
function Je() {
}
var It = "listenerMiddleware";
qe(`${It}/add`);
qe(`${It}/removeAll`);
qe(`${It}/remove`);
function F(e) {
  return `Minified Redux Toolkit error #${e}; visit https://redux-toolkit.js.org/Errors?code=${e} for the full message or use the non-minified dev environment for full errors. `;
}
var Mn = { exports: {} };
(function(e, t) {
  (function(n) {
    e.exports = n();
  })(function() {
    var n = {}, o = {};
    Object.defineProperty(o, "__esModule", { value: !0 }), o.Gubu = void 0;
    const a = Symbol.for("gubu$"), u = { gubu$: a, v$: "6.0.1" }, l = Symbol.for("gubu$nil"), f = /^[A-Z]/, w = "gubu", v = "name", g = "nan", _ = "never", O = "number", C = "required", R = "array", A = "function", p = "object", b = "string", S = "boolean", D = "undefined", T = "any", M = "list", Q = "instance", U = "null", q = "type", W = "closed", B = "shape", ce = "check", le = "Object", Ue = "Array", Ge = "Function", re = "Value", fe = "Above", Oe = "All", Ke = "Below", je = "Max", Pn = "Min", zn = "Len", Fn = "One", Bn = "Some", de = " for property ", pe = '"$PATH"', he = '"$VALUE"', ke = (r) => Object.keys(r), xe = (r, s, c) => Object.defineProperty(r, s, c), se = (r) => Array.isArray(r), st = (r) => JSON.parse(r), at = (r, s) => JSON.stringify(r, s);
    class Wn {
      constructor(s, c, m, h) {
        this.match = !1, this.dI = 0, this.nI = 2, this.cI = -1, this.pI = 0, this.sI = -1, this.valType = _, this.isRoot = !1, this.key = "", this.type = _, this.stop = !0, this.nextSibling = !0, this.fromDefault = !1, this.ignoreVal = void 0, this.curerr = [], this.err = [], this.parents = [], this.keys = [], this.path = [], this.root = s, this.vals = [s, -1], this.node = c, this.nodes = [c, -1], this.ctx = m || {}, this.match = !!h;
      }
      next() {
        this.stop = !1, this.fromDefault = !1, this.ignoreVal = void 0, this.isRoot = this.pI === 0, this.check = void 0;
        let s = this.nodes[this.pI];
        for (; +s; )
          this.dI--, this.ctx.log && -1 < this.dI && this.ctx.log("e" + (se(this.parents[this.pI]) ? "a" : "o"), this), this.pI = +s, s = this.nodes[this.pI];
        s ? (this.node = s, this.updateVal(this.vals[this.pI]), this.key = this.keys[this.pI], this.cI = this.pI, this.sI = this.pI + 1, this.parent = this.parents[this.pI], this.nextSibling = !0, this.type = this.node.t, this.path[this.dI] = this.key, this.oval = this.val, this.curerr.length = 0) : this.stop = !0;
      }
      updateVal(s) {
        this.val = s, this.valType = typeof this.val, O === this.valType && isNaN(this.val) && (this.valType = g), this.isRoot && !this.match && (this.root = this.val);
      }
    }
    class qn extends TypeError {
      constructor(s, c, m, h) {
        var N;
        super((c = c == null ? "" : c + ": ") + m.map((y) => y.t).join(`
`)), this.gubu = !0, this.name = "GubuError", this.code = s, this.prefix = c, this.desc = () => ({ name: "GubuError", code: s, err: m, ctx: h }), this.stack = (N = this.stack) === null || N === void 0 ? void 0 : N.replace(/.*\/gubu\/gubu\.[tj]s.*\n/g, ""), this.props = m.map((y) => {
          var d;
          return { path: y.p, what: y.w, type: (d = y.n) === null || d === void 0 ? void 0 : d.t, value: y.v };
        });
      }
      toJSON() {
        return Object.assign(Object.assign({}, this), { err: this.desc().err, name: this.name, message: this.message });
      }
    }
    const ut = { String: !0, Number: !0, Boolean: !0, Object: !0, Array: !0, Function: !0, Symbol: !0, BigInt: !0 }, ct = { string: "", number: 0, boolean: !1, object: {}, array: [], symbol: Symbol(""), bigint: BigInt(0), null: null };
    function oe(r, s, c) {
      var m, h, N, y;
      if (Se === r)
        r = void 0;
      else if (r != null && (!((m = r.$) === null || m === void 0) && m.gubu$)) {
        if (a === r.$.gubu$)
          return r.d = s ?? r.d, r;
        if (r.$.gubu$ === !0) {
          let $ = Object.assign({}, r);
          return $.$ = Object.assign(Object.assign({ v$: "6.0.1" }, $.$), { gubu$: a }), $.v = $.v != null && p === typeof $.v ? Object.assign({}, $.v) : $.v, $.t = $.t || typeof $.v, A === $.t && ut[$.v.name] && ($.t = $.v.name.toLowerCase(), $.v = lt(ct[$.t]), $.f = $.v), $.r = !!$.r, $.p = !!$.p, $.d = s ?? ($.d == null ? -1 : $.d), $.b = $.b || [], $.a = $.a || [], $.u = $.u || {}, $.m = $.m || c || {}, $;
        }
      }
      let d = r === null ? U : typeof r;
      d = D === d ? T : d;
      let E = r, I = E, j = l, x = !1, i = {}, k = [], V = [];
      if (p === d)
        I = void 0, se(E) ? (d = R, E.length === 1 && (j = E[0], E = [])) : E != null && Function !== E.constructor && Object !== E.constructor && E.constructor != null ? (d = Q, i.n = E.constructor.name, i.i = E.constructor, I = E) : ke(E).length === 0 && (j = be());
      else if (A === d)
        if (ut[r.name])
          d = r.name.toLowerCase(), x = !0, E = lt(ct[d]), I = E, le === r.name && (j = be());
        else if (E.gubu === u || ((h = E.$) === null || h === void 0 ? void 0 : h.gubu) === !0) {
          let $ = E.node ? E.node() : E;
          d = $.t, E = $.v, I = E, x = $.r, i = Object.assign({}, $.u), k = [...$.a], V = [...$.b];
        } else
          Ge === E.constructor.name && f.test(E.name) && (d = Q, x = !0, i.n = (y = (N = E.prototype) === null || N === void 0 ? void 0 : N.constructor) === null || y === void 0 ? void 0 : y.name, i.i = E);
      else
        O === d && isNaN(E) ? d = g : b === d && E === "" && (i.empty = !0);
      let G = E == null || p !== d && R !== d ? E : Object.assign({}, E);
      return { $: u, t: d, v: G, f: I, n: G != null && p === typeof G ? ke(G).length : 0, c: j, r: x, p: !1, d: s ?? -1, k: [], e: !0, u: i, a: k, b: V, m: c || {} };
    }
    function Se(r, s) {
      const c = s ?? {};
      c.name = c.name == null ? "G" + ("" + Math.random()).substring(2, 8) : "" + c.name, c.prefix = c.prefix == null ? void 0 : c.prefix;
      let m = c.meta = c.meta || {};
      m.active = m.active === !0 || !1, m.suffix = b == typeof m.suffix ? m.suffix : "$$";
      let h = c.keyexpr = c.keyexpr || {};
      h.active = h.active !== !1;
      let N = oe(r, 0);
      function y(I, j, x) {
        let i = new Wn(I, N, j, x);
        for (; i.next(), !i.stop; ) {
          let k = i.node, V = !1, G = !1;
          if (0 < k.b.length)
            for (let Y = 0; Y < k.b.length; Y++) {
              let z = Dt(k.b[Y], i);
              k = i.node, z.done !== void 0 && (V = z.done), G = G || !!z.fatal;
            }
          if (!V) {
            let Y = !0, z = i.val === void 0;
            if (_ === i.type)
              i.curerr.push(ie(_, i, 1070));
            else if (p === i.type) {
              let L;
              if (k.r && z ? (i.ignoreVal = !0, i.curerr.push(ie(C, i, 1010))) : z || i.val !== null && p === i.valType && !se(i.val) ? !k.p && z && k.f !== void 0 ? (i.updateVal(k.f), i.fromDefault = !0, L = i.val, Y = !1) : k.p && z || (i.updateVal(i.val || (i.fromDefault = !0, {})), L = i.val) : (i.curerr.push(ie(q, i, 1020)), L = se(i.val) ? i.val : {}), Y && (L = L == null && i.ctx.err === !1 ? {} : L, L != null)) {
                i.ctx.log && i.ctx.log("so", i);
                let Ie = !1, ue = ke(k.v), Ve = i.nI;
                if (0 < ue.length) {
                  Ie = !0, i.pI = Ve;
                  for (let X = 0; X < ue.length; X++) {
                    let we, ee = ue[X];
                    if (m.active && ee.endsWith(m.suffix)) {
                      if (we = { short: "" }, b === typeof k.v[ee] ? we.short = k.v[ee] : we = Object.assign(Object.assign({}, we), k.v[ee]), delete k.v[ee], X++, ue.length <= X)
                        break;
                      if (ue[X] !== ee.substring(0, ee.length - m.suffix.length))
                        throw new Error("Invalid meta key: " + ee);
                      ee = ue[X];
                    }
                    let De = ee, ft = k.v[ee];
                    if (h.active) {
                      let dt = /^\s*("(\\.|[^"\\])*"|[^\s]+):\s*(.*?)\s*$/.exec(ee);
                      dt && (De = dt[1], ft = Ce({ src: dt[3], val: ft }), delete k.v[ee]);
                    }
                    let Zt = oe(ft, 1 + i.dI, we);
                    k.v[De] = Zt, k.k.includes(De) || k.k.push(De), i.nodes[i.nI] = Zt, i.vals[i.nI] = L[De], i.parents[i.nI] = L, i.keys[i.nI] = De, i.nI++;
                  }
                }
                let H = ke(L).filter((X) => k.v[X] === void 0);
                if (0 < H.length)
                  if (l === k.c)
                    i.ignoreVal = !0, i.curerr.push(ie(W, i, 1100, void 0, { k: H }));
                  else {
                    Ie = !0, i.pI = Ve;
                    for (let X of H) {
                      let we = k.c = oe(k.c, 1 + i.dI);
                      i.nodes[i.nI] = we, i.vals[i.nI] = L[X], i.parents[i.nI] = L, i.keys[i.nI] = X, i.nI++;
                    }
                  }
                Ie ? (i.dI++, i.nodes[i.nI] = i.sI, i.parents[i.nI] = L, i.nextSibling = !1, i.nI++) : i.ctx.log && i.ctx.log("eo", i);
              }
            } else if (R === i.type)
              if (k.r && z)
                i.ignoreVal = !0, i.curerr.push(ie(C, i, 1030));
              else if (z || se(i.val)) {
                if (!k.p && z && k.f !== void 0)
                  i.updateVal(k.f), i.fromDefault = !0;
                else if (!k.p || i.val != null) {
                  i.updateVal(i.val || (i.fromDefault = !0, []));
                  let L = l !== k.c, Ie = 0 < i.val.length, ue = ke(k.v).filter((H) => !isNaN(+H)), Ve = 0 < ue.length;
                  if (i.ctx.log && i.ctx.log("sa", i), Ie || Ve) {
                    i.pI = i.nI;
                    let H = 0;
                    if (Ve)
                      if (ue.length < i.val.length && !L)
                        i.ignoreVal = !0, i.curerr.push(ie(W, i, 1090, void 0, { k: ue.length }));
                      else
                        for (; H < ue.length; H++) {
                          let X = k.v[H] = oe(k.v[H], 1 + i.dI);
                          i.nodes[i.nI] = X, i.vals[i.nI] = i.val[H], i.parents[i.nI] = i.val, i.keys[i.nI] = "" + H, i.nI++;
                        }
                    if (L && Ie) {
                      let X = k.c = oe(k.c, 1 + i.dI);
                      for (; H < i.val.length; H++)
                        i.nodes[i.nI] = X, i.vals[i.nI] = i.val[H], i.parents[i.nI] = i.val, i.keys[i.nI] = "" + H, i.nI++;
                    }
                    i.ignoreVal || (i.dI++, i.nodes[i.nI] = i.sI, i.parents[i.nI] = i.val, i.nextSibling = !1, i.nI++);
                  } else
                    i.ctx.log && L && I == null && i.ctx.log("kv", Object.assign(Object.assign({}, i), { key: 0, val: k.c })), i.ctx.log && i.ctx.log("ea", i);
                }
              } else
                i.curerr.push(ie(q, i, 1040));
            else if (T === i.type || M === i.type || i.val === void 0 || i.type === i.valType || Q === i.type && k.u.i && i.val instanceof k.u.i || U === i.type && i.val === null)
              if (i.val === void 0) {
                let L = i.path[i.dI];
                !k.r || D === i.type && i.parent.hasOwnProperty(L) ? k.f !== void 0 && !k.p || D === i.type ? (i.updateVal(k.f), i.fromDefault = !0) : T === i.type && (i.ignoreVal = i.ignoreVal === void 0 || i.ignoreVal) : (i.ignoreVal = !0, i.curerr.push(ie(C, i, 1060))), i.ctx.log && i.ctx.log("kv", i);
              } else
                b !== i.type || i.val !== "" || k.u.empty || i.curerr.push(ie(C, i, 1080)), i.ctx.log && i.ctx.log("kv", i);
            else
              i.curerr.push(ie(q, i, 1050));
          }
          if (0 < k.a.length)
            for (let Y = 0; Y < k.a.length; Y++) {
              let z = Dt(k.a[Y], i);
              k = i.node, z.done !== void 0 && (V = z.done), G = G || !!z.fatal;
            }
          let $ = i.node.p ? i.ignoreVal !== !1 : !!i.ignoreVal;
          !i.match && i.parent != null && !V && !$ && (i.parent[i.key] = i.val), i.nextSibling && (i.pI = i.sI), (i.node.e || G) && i.err.push(...i.curerr);
        }
        if (0 < i.err.length) {
          if (se(i.ctx.err))
            i.ctx.err.push(...i.err);
          else if (!i.match && i.ctx.err !== !1)
            throw new qn(B, c.prefix, i.err, i.ctx);
        }
        return i.match ? i.err.length === 0 : i.root;
      }
      function d(I, j) {
        return y(I, j, !1);
      }
      d.valid = function(I, j) {
        let x = j || {};
        return x.err = x.err || [], y(I, x, !1), x.err.length === 0;
      }, d.match = (I, j) => y(I, j = j || {}, !0), d.error = (I, j) => {
        let x = j || {};
        return x.err = x.err || [], y(I, x, !1), x.err;
      }, d.spec = () => (d(void 0, { err: !1 }), st(J(N, (I, j) => a === j || j, !1, !0))), d.node = () => (d.spec(), N);
      let E = "";
      return d.toString = () => (E = Te(E === "" ? J(N && N.$ && (a === N.$.gubu$ || N.$.gubu$ === !0) ? N.v : N) : E), `[Gubu ${c.name} ${E}]`), n.inspect && n.inspect.custom && (d[n.inspect.custom] = d.toString), d.gubu = u, d.spec(), d;
    }
    function Ce(r) {
      let s = !1;
      if (r.tokens == null) {
        s = !0, r.tokens = [];
        let d = /\s*,?\s*([)(\.]|"(\\.|[^"\\])*"|\/(\\.|[^\/\\])*\/[a-z]?|[^)(,\s]+)\s*/g, E = null;
        for (; E = d.exec(r.src); )
          r.tokens.push(E[1]);
      }
      r.i = r.i || 0;
      let c = r.tokens[r.i], m = Ae[c];
      if (r.tokens[r.i] === ")")
        return r.i++, r.val;
      r.i++;
      let h = { Number, String, Boolean };
      if (m == null)
        try {
          return h[c] || (D === c ? void 0 : c === "NaN" ? NaN : c.match(/^\/.+\/$/) ? new RegExp(c.substring(1, c.length - 1)) : st(c));
        } catch {
          throw new SyntaxError(`Gubu: unexpected token ${c} in builder expression ${r.src}`);
        }
      r.tokens[r.i] === "(" && r.i++;
      let N = [], y = null;
      for (; (y = r.tokens[r.i]) != null && y !== ")"; ) {
        let d = Ce(r);
        N.push(d);
      }
      return r.i++, r.val = m.call(r.val, ...N), r.tokens[r.i] === "." ? (r.i++, Ce(r)) : s && r.i < r.tokens.length ? Ce(r) : r.val;
    }
    function Dt(r, s) {
      var c;
      let m, h = {}, N = !1;
      try {
        N = !(s.val !== void 0 || !(!((c = r.gubu$) === null || c === void 0) && c.Check)) || (s.check = r, r(s.val, h, s));
      } catch (d) {
        m = d;
      }
      let y = se(h.err) ? 0 < h.err.length : h.err != null;
      if (!N || y) {
        if (s.val === void 0 && (s.node.p || !s.node.r) && h.done !== !0)
          return delete h.err, h;
        let d = h.why || ce, E = $t(s);
        if (b === typeof h.err)
          s.curerr.push(ae(s, h.err));
        else if (p === typeof h.err)
          s.curerr.push(...[h.err].flat().filter((I) => I != null).map((I) => (I.p = I.p == null ? E : I.p, I.m = I.m == null ? 2010 : I.m, I)));
        else {
          let I = r.name;
          I != null && I != "" || (I = Te(r.toString().replace(/[ \t\r\n]+/g, " "))), s.curerr.push(ie(d, s, 1045, void 0, { thrown: m }, I));
        }
        h.done = h.done == null || h.done;
      }
      return h.hasOwnProperty("uval") ? (s.updateVal(h.uval), s.ignoreVal = !1) : h.val === void 0 || Number.isNaN(h.val) || (s.updateVal(h.val), s.ignoreVal = !1), h.node !== void 0 && (s.node = h.node), h.type !== void 0 && (s.type = h.type), h;
    }
    function $t(r) {
      return r.path.slice(1, r.dI + 1).filter((s) => s != null).join(".");
    }
    function Re(r) {
      return O === typeof r ? r : O === typeof (r == null ? void 0 : r.length) ? r.length : r != null && p === typeof r ? ke(r).length : NaN;
    }
    function Te(r, s) {
      let c = String(r), m = s == null || isNaN(s) ? 30 : s < 0 ? 0 : ~~s, h = r == null ? 0 : c.length, N = r == null ? "" : c.substring(0, h);
      return N = m < h ? N.substring(0, m - 3) + "..." : N, N.substring(0, m);
    }
    const jt = function(r) {
      let s = P(this, r);
      return s.r = !0, s.p = !1, r === void 0 && arguments.length === 1 && (s.t = D, s.v = void 0), s;
    }, Ct = function(r) {
      let s = P(this, r);
      return s.c = be(), s;
    }, Ln = function(r) {
      let s = P(this, r);
      return s.r = !1, r === void 0 && arguments.length === 1 && (s.t = D, s.v = void 0), s;
    }, be = function(r) {
      let s = P(this, r);
      return s.t = T, r !== void 0 && (s.v = r, s.f = r), s;
    }, Rt = function(r, s) {
      let c = P(this, s);
      return c.z = r, c;
    }, Tt = function(r) {
      let s = P(this, r);
      return s.r = !1, s.p = !0, s;
    }, At = function(r) {
      let s = P(this, r);
      return s.r = !1, s.p = !0, s.e = !1, s.a.push(function(c, m, h) {
        return 0 < h.curerr.length && (m.uval = void 0, m.done = !1), !0;
      }), s;
    }, Un = function(r) {
      let s = P(this);
      return s.t = A, s.v = r, s.f = r, s;
    }, Gn = function(r, s) {
      let c = P(this, s === void 0 ? r : s);
      return c.r = !1, c.f = r, A === typeof r && ut[r.name] && (c.t = r.name.toLowerCase(), c.f = lt(ct[c.t])), c.p = !1, c;
    }, Mt = function(r) {
      let s = P(this, r);
      return s.u.empty = !0, s;
    }, Vt = function(r) {
      let s = P(this, r);
      return s.t = _, s;
    }, Kn = function(r, s) {
      let c = P(this), m = O === typeof r;
      c.t = b, m && s == null && (c = oe([]));
      let h = null;
      return A === typeof r && (h = r, c = be()), c.b.push(function(N, y, d) {
        if (h)
          y.val = h(d.path, d);
        else if (m) {
          let E = r;
          y.val = d.path.slice(d.path.length - 1 - (0 <= E ? E : 0), d.path.length - 1 + (0 <= E ? 0 : 1)), b === typeof s && (y.val = y.val.join(s));
        } else
          r == null && (y.val = d.path[d.path.length - 2]);
        return !0;
      }), c;
    }, Yn = function(...r) {
      let s = P();
      s.t = M, s.r = !0;
      let c = r.map((m) => Me(m));
      return s.u.list = r, s.b.push(function(m, h, N) {
        let y = !0;
        for (let d of c) {
          let E = Object.assign(Object.assign({}, N.ctx), { err: [] });
          d(m, E), 0 < E.err.length && (y = !1);
        }
        return y || (h.why = Oe, h.err = [ae(N, re + " " + he + de + pe + " does not satisfy all of: " + r.map((d) => J(d, null, !0)).join(", "))]), y;
      }), s;
    }, Hn = function(...r) {
      let s = P();
      s.t = M, s.r = !0;
      let c = r.map((m) => Me(m));
      return s.u.list = r, s.b.push(function(m, h, N) {
        let y = !1;
        for (let d of c) {
          let E = Object.assign(Object.assign({}, N.ctx), { err: [] }), I = d.match(m, E);
          I && (h.val = d(m, E)), y || (y = I);
        }
        return y || (h.why = Bn, h.err = [ae(N, re + " " + he + de + pe + " does not satisfy any of: " + r.map((d) => J(d, null, !0)).join(", "))]), y;
      }), s;
    }, Xn = function(...r) {
      let s = P();
      s.t = M, s.r = !0;
      let c = r.map((m) => Me(m));
      return s.u.list = r, s.b.push(function(m, h, N) {
        let y = 0;
        for (let d of c) {
          let E = Object.assign(Object.assign({}, N.ctx), { err: [] });
          if (d.match(m, E)) {
            y++, h.val = d(m, E);
            break;
          }
        }
        return y !== 1 && (h.why = Fn, h.err = [ae(N, re + " " + he + de + pe + " does not satisfy one of: " + r.map((d) => J(d, null, !0)).join(", "))]), !0;
      }), s;
    }, Pt = function(...r) {
      let s = P();
      return s.b.push(function(c, m, h) {
        for (let N = 0; N < r.length; N++)
          if (c === r[N])
            return !0;
        return m.err = ae(h, re + " " + he + de + pe + " must be exactly one of: " + h.node.s + "."), m.done = !0, !1;
      }), s.s = r.map((c) => J(c, null, !0)).join(", "), s;
    }, zt = function(r, s) {
      let c = P(this, s);
      return c.b.push(r), c;
    }, Ye = function(r, s) {
      let c = P(this, s);
      return c.a.push(r), c;
    }, Ft = function(r, s) {
      let c = P(this, s);
      if (A === typeof r) {
        let m = r;
        m.gubu$ = m.gubu$ || {}, m.gubu$.Check = !0, c.b.push(r), c.s = (c.s == null ? "" : c.s + ";") + J(r, null, !0), c.r = !0;
      } else if (p === typeof r) {
        if (Object.prototype.toString.call(r).includes("RegExp")) {
          let m = (h) => h != null && !Number.isNaN(h) && !!String(h).match(r);
          xe(m, v, { value: String(r) }), xe(m, "gubu$", { value: { Check: !0 } }), c.b.push(m), c.s = J(r), c.r = !0;
        }
      } else
        b === typeof r && (c.t = r, c.r = !0);
      return c;
    }, Bt = function(r) {
      let s = P(this, r);
      return R === s.t && l !== s.c && s.n === 0 && (s.v = [s.c]), s.c = l, s;
    }, Wt = function(r, s) {
      let c = P(this, s), m = b === typeof r ? r : (p === typeof r && r || {}).name;
      return m != null && m != "" && c.b.push(function(h, N, y) {
        return (y.ctx.ref = y.ctx.ref || {})[m] = y.node, !0;
      }), c;
    }, qt = function(r, s) {
      let c = P(this, s), m = p === typeof r && r || {}, h = b === typeof r ? r : m.name, N = !!m.fill;
      return h != null && h != "" && c.b.push(function(y, d, E) {
        if (y !== void 0 || N) {
          let I = E.ctx.ref = E.ctx.ref || {};
          if (I[h] !== void 0) {
            let j = Object.assign({}, I[h]);
            j.t = j.t || _, d.node = j, d.type = j.t;
          }
        }
        return !0;
      }), c;
    }, Lt = function(r, s) {
      let c = P(this, s), m = p === typeof r && r || {}, h = b === typeof r ? r : m.name, N = S === typeof m.keep ? m.keep : void 0, y = se(m.claim) ? m.claim : [];
      if (h != null && h != "") {
        let d = (I, j, x) => {
          if (I === void 0 && 0 < y.length) {
            x.ctx.Rename = x.ctx.Rename || {}, x.ctx.Rename.fromDefault = x.ctx.Rename.fromDefault || {};
            for (let i of y) {
              let k = x.ctx.Rename.fromDefault[i] || {};
              if (x.parent[i] !== void 0 && !k.yes) {
                j.val = x.parent[i], x.match || (x.parent[h] = j.val), j.node = k.node;
                for (let V = 0; V < x.err.length; V++)
                  x.err[V].k === k.key && (x.err.splice(V, 1), V--);
                if (N) {
                  let V = x.cI + 1;
                  x.nodes.splice(V, 0, oe(k.dval)), x.vals.splice(V, 0, void 0), x.parents.splice(V, 0, x.parent), x.keys.splice(V, 0, i), x.nI++, x.pI++;
                } else
                  delete x.parent[i];
                break;
              }
            }
            j.val === void 0 && (j.val = x.node.v);
          }
          return !0;
        };
        xe(d, v, { value: "Rename:" + h }), c.b.push(d);
        let E = (I, j, x) => (x.parent[h] = I, x.match || N || x.key === h || se(x.parent) && N !== !1 || (delete x.parent[x.key], j.done = !0), x.ctx.Rename = x.ctx.Rename || {}, x.ctx.Rename.fromDefault = x.ctx.Rename.fromDefault || {}, x.ctx.Rename.fromDefault[h] = { yes: x.fromDefault, key: x.key, dval: x.node.v, node: x.node }, !0);
        xe(E, v, { value: "Rename:" + h }), c.a.push(E);
      }
      return c;
    }, Ut = function(r, s) {
      let c = P(this, s);
      return c.b.push(function(m, h, N) {
        let y = Re(m);
        if (r <= y)
          return !0;
        N.checkargs = { min: 1 };
        let d = O === typeof m ? "" : "length ";
        return h.err = ae(N, re + " " + he + de + pe + ` must be a minimum ${d}of ${r} (was ${y}).`), !1;
      }), c.s = Pn + "(" + r + (s == null ? "" : "," + J(s)) + ")", c;
    }, Gt = function(r, s) {
      let c = P(this, s);
      return c.b.push(function(m, h, N) {
        let y = Re(m);
        if (y <= r)
          return !0;
        let d = O === typeof m ? "" : "length ";
        return h.err = ae(N, re + " " + he + de + pe + ` must be a maximum ${d}of ${r} (was ${y}).`), !1;
      }), c.s = je + "(" + r + (s == null ? "" : "," + J(s)) + ")", c;
    }, Kt = function(r, s) {
      let c = P(this, s);
      return c.b.push(function(m, h, N) {
        let y = Re(m);
        if (r < y)
          return !0;
        let d = O === typeof m ? "be" : "have length";
        return h.err = ae(N, re + " " + he + de + pe + ` must ${d} above ${r} (was ${y}).`), !1;
      }), c.s = fe + "(" + r + (s == null ? "" : "," + J(s)) + ")", c;
    }, Yt = function(r, s) {
      let c = P(this, s);
      return c.b.push(function(m, h, N) {
        let y = Re(m);
        if (y < r)
          return !0;
        let d = O === typeof m ? "be" : "have length";
        return h.err = ae(N, re + " " + he + de + pe + ` must ${d} below ${r} (was ${y}).`), !1;
      }), c.s = Ke + "(" + r + (s == null ? "" : "," + J(s)) + ")", c;
    }, Ht = function(r, s) {
      let c = P(this, s || be());
      return c.b.push(function(m, h, N) {
        let y = Re(m);
        if (r === y)
          return !0;
        let d = O === typeof m ? "" : " in length";
        return h.err = ae(N, re + " " + he + de + pe + ` must be exactly ${r}${d} (was ${y}).`), !1;
      }), c.s = zn + "(" + r + (s == null ? "" : "," + J(s)) + ")", c;
    }, Xt = function(r, s) {
      let c = P(this, s || {});
      return c.c = oe(r), c;
    }, Jt = function(r, s) {
      let c = P(this, s || []);
      return c.t = "array", c.c = oe(r), c.m = c.m || {}, c.m.rest = !0, c;
    };
    function P(r, s) {
      let c = oe(r == null || r.window === r || r.global === r ? s : r);
      return Object.assign(c, { Above: Kt, After: Ye, Any: be, Before: zt, Below: Yt, Check: Ft, Child: Xt, Closed: Bt, Define: Wt, Empty: Mt, Exact: Pt, Fault: Rt, Ignore: At, Len: Ht, Max: Gt, Min: Ut, Never: Vt, Open: Ct, Refer: qt, Rename: Lt, Required: jt, Skip: Tt, Rest: Jt });
    }
    function ae(r, s, c, m) {
      return ie(c || ce, r, 4e3, s, m);
    }
    function ie(r, s, c, m, h, N) {
      var y;
      let d = { k: s.key, n: s.node, v: s.val, p: $t(s), w: r, c: ((y = s.check) === null || y === void 0 ? void 0 : y.name) || "none", a: s.checkargs || {}, m: c, t: "", u: h || {} }, E = Te((s.val === void 0 ? D : J(s.val)).replace(/"/g, ""));
      if ((m = m || s.node.z) == null || m === "") {
        let I = E.startsWith("[") ? R : E.startsWith("{") ? p : s.val == null || O === typeof s.val && isNaN(s.val) ? "value" : typeof s.val, j = E.startsWith("[") || se(s.parents[s.pI]) ? "index" : "property", x = "is", i = h == null ? void 0 : h.k;
        i = se(i) ? (j = 1 < i.length ? (x = "are", "properties") : j, i.join(", ")) : i, d.t = "Validation failed for " + (0 < d.p.length ? `${j} "${d.p}" with ` : "") + `${I} "${E}" because ` + (q === r ? Q === s.node.t ? `the ${I} is not an instance of ${s.node.u.n}` : `the ${I} is not of type ${s.node.t}` : C === r ? s.val === "" ? "an empty string is not allowed" : `the ${I} is required` : r === "closed" ? `the ${j} "${i}" ${x} not allowed` : _ === r ? "no value is allowed" : `check "${N ?? r}" failed`) + (d.u.thrown ? " (threw: " + d.u.thrown.message + ")" : ".");
      } else
        d.t = m.replace(/\$VALUE/g, E).replace(/\$PATH/g, d.p);
      return d;
    }
    function Qt(r) {
      return r.s != null && r.s !== "" ? r.s : r.r || r.v === void 0 ? r.t : r.v;
    }
    function J(r, s, c, m) {
      let h;
      m || !r || !r.$ || a !== r.$.gubu$ && r.$.gubu$ !== !0 || (r = Qt(r));
      try {
        h = at(r, (N, y) => {
          var d, E;
          if (s && (y = s(N, y)), y != null && p === typeof y && y.constructor && le !== y.constructor.name && Ue !== y.constructor.name)
            y = A === typeof y.toString ? y.toString() : y.constructor.name;
          else if (A === typeof y)
            y = A === typeof Se[y.name] && isNaN(+N) ? void 0 : y.name != null && y.name !== "" ? y.name : Te(y.toString().replace(/[ \t\r\n]+/g, " "));
          else if (typeof y == "bigint")
            y = String(y.toString());
          else {
            if (Number.isNaN(y))
              return "NaN";
            m === !0 || ((d = y == null ? void 0 : y.$) === null || d === void 0 ? void 0 : d.gubu$) !== !0 && a !== ((E = y == null ? void 0 : y.$) === null || E === void 0 ? void 0 : E.gubu$) || (y = Qt(y));
          }
          return y;
        }), h = String(h);
      } catch {
        h = at(String(r));
      }
      return c === !0 && (h = h.replace(/^"/, "").replace(/"$/, "")), h;
    }
    function lt(r) {
      return r == null || p !== typeof r ? r : st(at(r));
    }
    const Jn = (r) => oe(Object.assign(Object.assign({}, r), { $: { gubu$: !0 } })), Ae = { Above: Kt, After: Ye, All: Yn, Any: be, Before: zt, Below: Yt, Check: Ft, Child: Xt, Closed: Bt, Default: Gn, Define: Wt, Empty: Mt, Exact: Pt, Fault: Rt, Func: Un, Ignore: At, Key: Kn, Len: Ht, Max: Gt, Min: Ut, Never: Vt, One: Xn, Open: Ct, Optional: Ln, Refer: qt, Rename: Lt, Required: jt, Skip: Tt, Some: Hn, Rest: Jt };
    if (D !== typeof window)
      for (let r in Ae)
        xe(Ae[r], v, { value: r });
    Object.assign(Se, Object.assign(Object.assign(Object.assign({ Gubu: Se }, Ae), Object.entries(Ae).reduce((r, s) => (r["G" + s[0]] = s[1], r), {})), { isShape: (r) => r && u === r.gubu, G$: Jn, buildize: P, makeErr: ae, stringify: J, truncate: Te, nodize: oe, expr: Ce, MakeArgu: Qn })), xe(Se, v, { value: w });
    const Me = Se;
    o.Gubu = Me;
    function Qn(r) {
      return function(s, c, m) {
        let h = !1;
        b === typeof s && (h = !0, m = c, c = s);
        const N = Me(m = m || c, { prefix: r + (c = b === typeof c ? " (" + c + ")" : "") }), y = N.node(), d = y.k;
        let E = s, I = {}, j = 0, x = 0;
        for (; j < d.length; j++) {
          let k = y.v[d[j]];
          k.p && (k = y.v[d[j]] = ((V) => Ye(function(G, $, Y) {
            if (0 < Y.curerr.length) {
              x++;
              for (let z = d.length - 1; z > V; z--)
                y.v[d[z]].m.rest ? I[d[z]].splice(y.v[d[z]].m.rest_pos + V - z, 0, I[d[z - 1]]) : (Y.vals[Y.pI + z - V] = Y.vals[Y.pI + z - V - 1], I[d[z]] = I[d[z - 1]]);
              $.uval = void 0, $.done = !1;
            }
            return !0;
          }, k))(j), k.e = !1), j !== d.length - 1 || y.v[d[j]].m.rest || (y.v[d[j]] = Ye(function(V, G, $) {
            return !(d.length - x < E.length && ($.curerr.length === 0 && (G.err = `Too many arguments for type signature (was ${E.length}, expected ${d.length - x})`), G.fatal = !0, 1));
          }, y.v[d[j]]));
        }
        function i(k) {
          for (let V = 0; V < d.length; V++) {
            let G = y.v[d[V]];
            G.m.rest ? (I[d[V]] = [...k].slice(V), G.m.rest_pos = I[d[V]].length) : I[d[V]] = k[V];
          }
          return I;
        }
        return h ? function(k) {
          return E = k, I = {}, j = 0, x = 0, N(i(k));
        } : N(i(s));
      };
    }
    const { Gubu: Zn } = o;
    return Zn;
  });
})(Mn);
var po = Mn.exports;
const ho = "@seneca/redux", yo = "0.0.2", mo = "Seneca browser library for redux", go = "MIT", vo = "dist/seneca-redux.cjs.js", bo = "dist/seneca-redux.es.js", wo = "dist/seneca-redux.d.ts", Eo = "src/seneca-redux.ts", No = {
  ".": {
    import: "./dist/seneca-redux.es.js",
    require: "./dist/seneca-redux.umd.js"
  }
}, _o = [
  "dist",
  "src",
  "LICENSE"
], Oo = {
  dev: "tsc && vite build --watch",
  start: "vite --host --open",
  build: "tsc && vite build",
  "build:types": "dts-bundle-generator --config ./dts-bundle-generator.config.ts",
  test: "echo test",
  clean: "rm -rf dist node_modules yarn.lock package-lock.json",
  reset: "npm run clean && npm install && npm run build && npm test",
  "repo-tag": "REPO_VERSION=`node -e \"console.log(require('./package').version)\"` && echo TAG: v$REPO_VERSION && git commit -a -m v$REPO_VERSION && git push && git tag v$REPO_VERSION && git push --tags",
  "repo-publish": "npm run clean && npm i && npm run repo-publish-quick",
  "repo-publish-quick": "npm run build && npm run test && npm run repo-tag && npm publish --access public --registry https://registry.npmjs.org "
}, ko = {
  "@reduxjs/toolkit": "^2.0.1",
  "@seneca/gateway": "^1.0.0",
  "@seneca/gateway-express": "^0.10.0",
  "@seneca/repl": "^7.0.1",
  "@types/react": "^18.2.47",
  "@types/react-dom": "^18.2.18",
  "@typescript-eslint/eslint-plugin": "^6.18.0",
  "@typescript-eslint/parser": "^6.18.0",
  "@vitejs/plugin-react": "^4.2.1",
  "cookie-parser": "^1.4.6",
  "dts-bundle-generator": "^9.2.1",
  eslint: "^8.56.0",
  "eslint-config-prettier": "^9.1.0",
  "eslint-plugin-prettier": "^5.1.2",
  express: "^4.18.2",
  prettier: "^3.1.1",
  react: "^18.2.0",
  seneca: "^3.33.0",
  "seneca-entity": "^25.1.1",
  "seneca-promisify": "^3.7.1",
  "ts-node": "^10.9.2",
  tslib: "^2.6.2",
  typescript: "^5.3.3",
  vite: "^5.0.11",
  "vite-plugin-dts": "^3.7.0"
}, xo = {
  name: ho,
  version: yo,
  description: mo,
  license: go,
  main: vo,
  module: bo,
  types: wo,
  source: Eo,
  exports: No,
  files: _o,
  scripts: Oo,
  devDependencies: ko
}, { One: To, Default: So, Any: Ao, Min: Mo, Skip: mt, Required: Io, Open: Do } = po.Gubu, $o = {
  name: "seneca",
  debug: !1,
  log: {
    err: !0,
    msg: !1
  },
  state: So({}, Do({})),
  store: {},
  slot: {}
}, pn = "@seneca/redux";
console.log("SR 1");
function it(e) {
  const t = this, n = t.util.deep;
  e.debug && console.warn(pn, xo.version, e);
  const o = e.name, a = e.store, u = [], l = [];
  function f(p, b, S) {
    e.log.err && yn(S) && (S.when$ = Date.now(), S.kind$ = p, u.push(S)), e.log.msg && l.push({
      msg: b,
      res: S,
      when$: Date.now(),
      kind$: p
    });
  }
  const w = e.state;
  for (let p in e.slot)
    hn(w, p);
  const v = so({
    name: o,
    initialState: w,
    reducers: {
      response: (p, b) => {
        let S = b.payload, D = S.msg, T = S.res;
        f("response", D, T);
        let M = { ...D, aim: "res" };
        t.find(M) && (M.direct$ = !0, M.res = () => ({
          state: p,
          res: T,
          req: D
        }), t.act(M));
      },
      entityResponse: (p, b) => {
        var Ue, Ge, re;
        let S = b.payload, D = S.msg, T = S.res, M = D.cmd, Q = M === "list" ? "list" : "item";
        f("entity", D, T);
        let U = D.slot$ || ((Ue = D.q) == null ? void 0 : Ue.slot$) || ((Ge = D.ent) == null ? void 0 : Ge.slot$);
        if (U == null || U === !1)
          return;
        U === !0 && (U = "");
        let { space: q, slot: W } = Ot(U), B = ze(p, q, !0);
        if (B == null)
          throw new Error("Entity space not prepared: " + q.join("."));
        let ce = B.meta && B.meta[W];
        if (ce == null)
          throw new Error("Entity slot not prepared: " + U);
        let le = ce[Q];
        if (le.error = null, le.when = Date.now(), console.log("SRER", M, Q, q, W, T), yn(T)) {
          e.debug && console.warn(pn, "entity-error", D, T), le.state = "error", le.error = { ...T };
          return;
        } else if (T != null)
          if (M === "load" || M === "save") {
            let fe = B.item[W] = { ...T }, Oe = B.list[W], Ke = !1;
            B.list[W] = Oe.map(
              (je) => je.id === fe.id ? (Ke = !0, { ...je, ...fe }) : je
            ), Ke || (B.list[W] = Oe.concat({ ...fe })), le.state = M === "load" ? "loaded" : "saved";
          } else
            M === "list" && (B.list[W] = T.map((fe) => ({
              ...fe
            })), le.state = "listed");
        else if (M === "remove") {
          let fe = [(re = D.q) == null ? void 0 : re.id];
          B.list[W] = B.list[W].filter((Oe) => !fe.includes(Oe.id)), B.item[W] && fe.includes(B.item[W].id) && (B.item[W] = null, B.meta[W].item.state = "removed");
        } else
          le.state = "done";
      },
      update: (p, b) => {
        let D = b.payload.msg;
        f("update", D);
        let T = D.update || (D.section ? [{ section: D.section, content: D.content }] : []);
        for (let M of T) {
          let Q = M.section, U = M.content;
          if (Q) {
            let q = Q.split("."), W = q[q.length - 1];
            q.length = q.length - 1;
            let B = p;
            for (let ce = 0; ce < q.length; ce++)
              B = B[q[ce]] = B[q[ce]] || {};
            W != null && (B[W] = U);
          }
        }
      },
      modifier: (p, b) => {
        let D = b.payload.modifier;
        D(p);
      }
    }
  }), {
    response: g,
    entityResponse: _,
    update: O,
    modifier: C
  } = v.actions, R = Zr(n(a, {
    reducer: {
      [o]: v.reducer
    },
    middleware: (p) => p({
      serializableCheck: {
        ignoredActions: [
          o + "/response",
          o + "/entityResponse",
          o + "/update",
          o + "/modifier"
        ]
      }
    })
  }));
  return t.sub("aim:req,out$:true", function(p, b, S) {
    R.dispatch(g({ msg: p, res: b, meta: S }));
  }).sub("sys:entity,out$:true", function(p, b, S) {
    R.dispatch(_({ msg: p, res: b, meta: S }));
  }).add(
    "aim:store,set:state",
    {
      section: mt(String),
      content: mt(),
      update: mt([{
        section: String,
        content: Io()
      }])
    },
    function(p, b, S) {
      R.dispatch(O({ msg: p, meta: S })), b(p);
    }
  ), t.order.add.add({
    name: "redux_modifier",
    before: "prepare",
    exec: function(p) {
      const b = p.ctx.args, S = b.pattern, D = b.action;
      if (S.redux$ === !0 && D != null) {
        let T = D;
        b.action = function(M, Q, U) {
          R.dispatch(C(
            {
              modifier: (q) => {
                U.custom.state = () => q, T.call(this, M, Q, U);
              }
            }
          ));
        }, Object.defineProperty(b.action, "name", {
          value: T.name + "_redux"
        });
      }
    }
  }), {
    name: "Redux",
    exports: {
      slice: v,
      store: R,
      slotSelectors: (p) => {
        let { space: b, slot: S } = Ot(p);
        return {
          space: b,
          slot: S,
          selectItem: (D) => ze(D[o], b).item[S],
          selectList: (D) => ze(D[o], b).list[S],
          selectMeta: (D, T) => ze(D[o], b).meta[S][T]
        };
      },
      errlog: u,
      msglog: l,
      entityPrepare: hn
    }
  };
}
function hn(e, t) {
  let { space: n, slot: o } = Ot(t), a = ze(e, n, !0);
  a.meta == null && (a.meta = {}, a.item = {}, a.list = {}), a.meta[o] == null && (a.meta[o] = {
    item: {
      state: "initial",
      when: 0,
      error: null
    },
    list: {
      state: "initial",
      when: 0,
      error: null
    }
  }, a.list[o] = [], a.item[o] = null);
}
function Ot(e) {
  let [t, n] = typeof e == "string" ? e.split("/") : "", o = n != null && n != "", a = t != null && t != "";
  return n = o ? n : a ? t : "main", t = o && a ? t : ".entity", t.endsWith(".entity") || (t += ".entity"), { space: t.split(".").filter((l) => l != null && l != ""), slot: n };
}
function ze(e, t, n = !1) {
  let o = e;
  for (let a = 0; a < t.length; a++) {
    let u = t[a];
    u == null || u == "" || (o[u] == null && n ? o = o[u] = {} : o = o[u]);
  }
  return o;
}
function yn(e) {
  return Object.prototype.toString.call(e) === "[object Error]";
}
const Vn = tr(null), jo = (e) => er.createElement(
  Vn.Provider,
  { value: e.seneca },
  e.children
), Co = () => nr(Vn);
it.defaults = $o;
it.SenecaProvider = jo;
it.useSeneca = Co;
Object.defineProperty(it, "name", { value: "Redux" });
export {
  it as Redux,
  jo as SenecaProvider,
  it as default,
  Co as useSeneca
};
//# sourceMappingURL=seneca-redux.es.js.map
