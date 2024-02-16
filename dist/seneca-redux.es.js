import nr, { createContext as rr, useContext as or } from "react";
function Y(e) {
  return `Minified Redux error #${e}; visit https://redux.js.org/Errors?code=${e} for the full message or use the non-minified dev environment for full errors. `;
}
var ir = typeof Symbol == "function" && Symbol.observable || "@@observable", tn = ir, pt = () => Math.random().toString(36).substring(7).split("").join("."), sr = {
  INIT: `@@redux/INIT${/* @__PURE__ */ pt()}`,
  REPLACE: `@@redux/REPLACE${/* @__PURE__ */ pt()}`,
  PROBE_UNKNOWN_ACTION: () => `@@redux/PROBE_UNKNOWN_ACTION${pt()}`
}, _e = sr;
function Ue(e) {
  if (typeof e != "object" || e === null)
    return !1;
  let t = e;
  for (; Object.getPrototypeOf(t) !== null; )
    t = Object.getPrototypeOf(t);
  return Object.getPrototypeOf(e) === t || Object.getPrototypeOf(e) === null;
}
function ar(e) {
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
  if (lr(e))
    return "date";
  if (cr(e))
    return "error";
  const n = ur(e);
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
function ur(e) {
  return typeof e.constructor == "function" ? e.constructor.name : null;
}
function cr(e) {
  return e instanceof Error || typeof e.message == "string" && e.constructor && typeof e.constructor.stackTraceLimit == "number";
}
function lr(e) {
  return e instanceof Date ? !0 : typeof e.toDateString == "function" && typeof e.getDate == "function" && typeof e.setDate == "function";
}
function ve(e) {
  let t = typeof e;
  return process.env.NODE_ENV !== "production" && (t = ar(e)), t;
}
function gn(e, t, n) {
  if (typeof e != "function")
    throw new Error(process.env.NODE_ENV === "production" ? Y(2) : `Expected the root reducer to be a function. Instead, received: '${ve(e)}'`);
  if (typeof t == "function" && typeof n == "function" || typeof n == "function" && typeof arguments[3] == "function")
    throw new Error(process.env.NODE_ENV === "production" ? Y(0) : "It looks like you are passing several store enhancers to createStore(). This is not supported. Instead, compose them together to a single function. See https://redux.js.org/tutorials/fundamentals/part-4-store#creating-a-store-with-enhancers for an example.");
  if (typeof t == "function" && typeof n > "u" && (n = t, t = void 0), typeof n < "u") {
    if (typeof n != "function")
      throw new Error(process.env.NODE_ENV === "production" ? Y(1) : `Expected the enhancer to be a function. Instead, received: '${ve(n)}'`);
    return n(gn)(e, t);
  }
  let o = e, a = t, u = /* @__PURE__ */ new Map(), l = u, f = 0, g = !1;
  function v() {
    l === u && (l = /* @__PURE__ */ new Map(), u.forEach((b, x) => {
      l.set(x, b);
    }));
  }
  function m() {
    if (g)
      throw new Error(process.env.NODE_ENV === "production" ? Y(3) : "You may not call store.getState() while the reducer is executing. The reducer has already received the state as an argument. Pass it down from the top reducer instead of reading it from the store.");
    return a;
  }
  function k(b) {
    if (typeof b != "function")
      throw new Error(process.env.NODE_ENV === "production" ? Y(4) : `Expected the listener to be a function. Instead, received: '${ve(b)}'`);
    if (g)
      throw new Error(process.env.NODE_ENV === "production" ? Y(5) : "You may not call store.subscribe() while the reducer is executing. If you would like to be notified after the store has been updated, subscribe from a component and invoke store.getState() in the callback to access the latest state. See https://redux.js.org/api/store#subscribelistener for more details.");
    let x = !0;
    v();
    const $ = f++;
    return l.set($, b), function() {
      if (x) {
        if (g)
          throw new Error(process.env.NODE_ENV === "production" ? Y(6) : "You may not unsubscribe from a store listener while the reducer is executing. See https://redux.js.org/api/store#subscribelistener for more details.");
        x = !1, v(), l.delete($), u = null;
      }
    };
  }
  function O(b) {
    if (!Ue(b))
      throw new Error(process.env.NODE_ENV === "production" ? Y(7) : `Actions must be plain objects. Instead, the actual type was: '${ve(b)}'. You may need to add middleware to your store setup to handle dispatching other values, such as 'redux-thunk' to handle dispatching functions. See https://redux.js.org/tutorials/fundamentals/part-4-store#middleware and https://redux.js.org/tutorials/fundamentals/part-6-async-logic#using-the-redux-thunk-middleware for examples.`);
    if (typeof b.type > "u")
      throw new Error(process.env.NODE_ENV === "production" ? Y(8) : 'Actions may not have an undefined "type" property. You may have misspelled an action type string constant.');
    if (typeof b.type != "string")
      throw new Error(process.env.NODE_ENV === "production" ? Y(17) : `Action "type" property must be a string. Instead, the actual type was: '${ve(b.type)}'. Value was: '${b.type}' (stringified)`);
    if (g)
      throw new Error(process.env.NODE_ENV === "production" ? Y(9) : "Reducers may not dispatch actions.");
    try {
      g = !0, a = o(a, b);
    } finally {
      g = !1;
    }
    return (u = l).forEach(($) => {
      $();
    }), b;
  }
  function C(b) {
    if (typeof b != "function")
      throw new Error(process.env.NODE_ENV === "production" ? Y(10) : `Expected the nextReducer to be a function. Instead, received: '${ve(b)}`);
    o = b, O({
      type: _e.REPLACE
    });
  }
  function T() {
    const b = k;
    return {
      /**
       * The minimal observable subscription method.
       * @param observer Any object that can be used as an observer.
       * The observer object should have a `next` method.
       * @returns An object with an `unsubscribe` method that can
       * be used to unsubscribe the observable from the store, and prevent further
       * emission of values from the observable.
       */
      subscribe(x) {
        if (typeof x != "object" || x === null)
          throw new Error(process.env.NODE_ENV === "production" ? Y(11) : `Expected the observer to be an object. Instead, received: '${ve(x)}'`);
        function $() {
          const I = x;
          I.next && I.next(m());
        }
        return $(), {
          unsubscribe: b($)
        };
      },
      [tn]() {
        return this;
      }
    };
  }
  return O({
    type: _e.INIT
  }), {
    dispatch: O,
    subscribe: k,
    getState: m,
    replaceReducer: C,
    [tn]: T
  };
}
function nn(e) {
  typeof console < "u" && typeof console.error == "function" && console.error(e);
  try {
    throw new Error(e);
  } catch {
  }
}
function fr(e, t, n, o) {
  const a = Object.keys(t), u = n && n.type === _e.INIT ? "preloadedState argument passed to createStore" : "previous state received by the reducer";
  if (a.length === 0)
    return "Store does not have a valid reducer. Make sure the argument passed to combineReducers is an object whose values are reducers.";
  if (!Ue(e))
    return `The ${u} has unexpected type of "${ve(e)}". Expected argument to be an object with the following keys: "${a.join('", "')}"`;
  const l = Object.keys(e).filter((f) => !t.hasOwnProperty(f) && !o[f]);
  if (l.forEach((f) => {
    o[f] = !0;
  }), !(n && n.type === _e.REPLACE) && l.length > 0)
    return `Unexpected ${l.length > 1 ? "keys" : "key"} "${l.join('", "')}" found in ${u}. Expected to find one of the known reducer keys instead: "${a.join('", "')}". Unexpected keys will be ignored.`;
}
function dr(e) {
  Object.keys(e).forEach((t) => {
    const n = e[t];
    if (typeof n(void 0, {
      type: _e.INIT
    }) > "u")
      throw new Error(process.env.NODE_ENV === "production" ? Y(12) : `The slice reducer for key "${t}" returned undefined during initialization. If the state passed to the reducer is undefined, you must explicitly return the initial state. The initial state may not be undefined. If you don't want to set a value for this reducer, you can use null instead of undefined.`);
    if (typeof n(void 0, {
      type: _e.PROBE_UNKNOWN_ACTION()
    }) > "u")
      throw new Error(process.env.NODE_ENV === "production" ? Y(13) : `The slice reducer for key "${t}" returned undefined when probed with a random type. Don't try to handle '${_e.INIT}' or other actions in "redux/*" namespace. They are considered private. Instead, you must return the current state for any unknown actions, unless it is undefined, in which case you must return the initial state, regardless of the action type. The initial state may not be undefined, but can be null.`);
  });
}
function pr(e) {
  const t = Object.keys(e), n = {};
  for (let l = 0; l < t.length; l++) {
    const f = t[l];
    process.env.NODE_ENV !== "production" && typeof e[f] > "u" && nn(`No reducer provided for key "${f}"`), typeof e[f] == "function" && (n[f] = e[f]);
  }
  const o = Object.keys(n);
  let a;
  process.env.NODE_ENV !== "production" && (a = {});
  let u;
  try {
    dr(n);
  } catch (l) {
    u = l;
  }
  return function(f = {}, g) {
    if (u)
      throw u;
    if (process.env.NODE_ENV !== "production") {
      const k = fr(f, n, g, a);
      k && nn(k);
    }
    let v = !1;
    const m = {};
    for (let k = 0; k < o.length; k++) {
      const O = o[k], C = n[O], T = f[O], z = C(T, g);
      if (typeof z > "u") {
        const b = g && g.type;
        throw new Error(process.env.NODE_ENV === "production" ? Y(14) : `When called with an action of type ${b ? `"${String(b)}"` : "(unknown type)"}, the slice reducer for key "${O}" returned undefined. To ignore an action, you must explicitly return the previous state. If you want this reducer to hold no value, you can return null instead of undefined.`);
      }
      m[O] = z, v = v || z !== T;
    }
    return v = v || o.length !== Object.keys(f).length, v ? m : f;
  };
}
function Qe(...e) {
  return e.length === 0 ? (t) => t : e.length === 1 ? e[0] : e.reduce((t, n) => (...o) => t(n(...o)));
}
function hr(...e) {
  return (t) => (n, o) => {
    const a = t(n, o);
    let u = () => {
      throw new Error(process.env.NODE_ENV === "production" ? Y(15) : "Dispatching while constructing your middleware is not allowed. Other middleware would not be applied to this dispatch.");
    };
    const l = {
      getState: a.getState,
      dispatch: (g, ...v) => u(g, ...v)
    }, f = e.map((g) => g(l));
    return u = Qe(...f)(a.dispatch), {
      ...a,
      dispatch: u
    };
  };
}
function vn(e) {
  return Ue(e) && "type" in e && typeof e.type == "string";
}
var bn = Symbol.for("immer-nothing"), rn = Symbol.for("immer-draftable"), re = Symbol.for("immer-state"), yr = process.env.NODE_ENV !== "production" ? [
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
function te(e, ...t) {
  if (process.env.NODE_ENV !== "production") {
    const n = yr[e], o = typeof n == "function" ? n.apply(null, t) : n;
    throw new Error(`[Immer] ${o}`);
  }
  throw new Error(
    `[Immer] minified error nr: ${e}. Full error at: https://bit.ly/3cXEKWf`
  );
}
var je = Object.getPrototypeOf;
function be(e) {
  return !!e && !!e[re];
}
function ye(e) {
  var t;
  return e ? wn(e) || Array.isArray(e) || !!e[rn] || !!((t = e.constructor) != null && t[rn]) || nt(e) || rt(e) : !1;
}
var mr = Object.prototype.constructor.toString();
function wn(e) {
  if (!e || typeof e != "object")
    return !1;
  const t = je(e);
  if (t === null)
    return !0;
  const n = Object.hasOwnProperty.call(t, "constructor") && t.constructor;
  return n === Object ? !0 : typeof n == "function" && Function.toString.call(n) === mr;
}
function Be(e, t) {
  tt(e) === 0 ? Object.entries(e).forEach(([n, o]) => {
    t(n, o, e);
  }) : e.forEach((n, o) => t(o, n, e));
}
function tt(e) {
  const t = e[re];
  return t ? t.type_ : Array.isArray(e) ? 1 : nt(e) ? 2 : rt(e) ? 3 : 0;
}
function gt(e, t) {
  return tt(e) === 2 ? e.has(t) : Object.prototype.hasOwnProperty.call(e, t);
}
function En(e, t, n) {
  const o = tt(e);
  o === 2 ? e.set(t, n) : o === 3 ? e.add(n) : e[t] = n;
}
function gr(e, t) {
  return e === t ? e !== 0 || 1 / e === 1 / t : e !== e && t !== t;
}
function nt(e) {
  return e instanceof Map;
}
function rt(e) {
  return e instanceof Set;
}
function Ne(e) {
  return e.copy_ || e.base_;
}
function vt(e, t) {
  if (nt(e))
    return new Map(e);
  if (rt(e))
    return new Set(e);
  if (Array.isArray(e))
    return Array.prototype.slice.call(e);
  if (!t && wn(e))
    return je(e) ? { ...e } : Object.assign(/* @__PURE__ */ Object.create(null), e);
  const n = Object.getOwnPropertyDescriptors(e);
  delete n[re];
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
  return Object.create(je(e), n);
}
function kt(e, t = !1) {
  return ot(e) || be(e) || !ye(e) || (tt(e) > 1 && (e.set = e.add = e.clear = e.delete = vr), Object.freeze(e), t && Be(e, (n, o) => kt(o, !0))), e;
}
function vr() {
  te(2);
}
function ot(e) {
  return Object.isFrozen(e);
}
var br = {};
function Oe(e) {
  const t = br[e];
  return t || te(0, e), t;
}
var Le;
function Nn() {
  return Le;
}
function wr(e, t) {
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
function on(e, t) {
  t && (Oe("Patches"), e.patches_ = [], e.inversePatches_ = [], e.patchListener_ = t);
}
function bt(e) {
  wt(e), e.drafts_.forEach(Er), e.drafts_ = null;
}
function wt(e) {
  e === Le && (Le = e.parent_);
}
function sn(e) {
  return Le = wr(Le, e);
}
function Er(e) {
  const t = e[re];
  t.type_ === 0 || t.type_ === 1 ? t.revoke_() : t.revoked_ = !0;
}
function an(e, t) {
  t.unfinalizedDrafts_ = t.drafts_.length;
  const n = t.drafts_[0];
  return e !== void 0 && e !== n ? (n[re].modified_ && (bt(t), te(4)), ye(e) && (e = Ze(t, e), t.parent_ || et(t, e)), t.patches_ && Oe("Patches").generateReplacementPatches_(
    n[re].base_,
    e,
    t.patches_,
    t.inversePatches_
  )) : e = Ze(t, n, []), bt(t), t.patches_ && t.patchListener_(t.patches_, t.inversePatches_), e !== bn ? e : void 0;
}
function Ze(e, t, n) {
  if (ot(t))
    return t;
  const o = t[re];
  if (!o)
    return Be(
      t,
      (a, u) => un(e, o, t, a, u, n)
    ), t;
  if (o.scope_ !== e)
    return t;
  if (!o.modified_)
    return et(e, o.base_, !0), o.base_;
  if (!o.finalized_) {
    o.finalized_ = !0, o.scope_.unfinalizedDrafts_--;
    const a = o.copy_;
    let u = a, l = !1;
    o.type_ === 3 && (u = new Set(a), a.clear(), l = !0), Be(
      u,
      (f, g) => un(e, o, a, f, g, n, l)
    ), et(e, a, !1), n && e.patches_ && Oe("Patches").generatePatches_(
      o,
      n,
      e.patches_,
      e.inversePatches_
    );
  }
  return o.copy_;
}
function un(e, t, n, o, a, u, l) {
  if (process.env.NODE_ENV !== "production" && a === n && te(5), be(a)) {
    const f = u && t && t.type_ !== 3 && // Set objects are atomic since they have no keys.
    !gt(t.assigned_, o) ? u.concat(o) : void 0, g = Ze(e, a, f);
    if (En(n, o, g), be(g))
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
function Nr(e, t) {
  const n = Array.isArray(e), o = {
    type_: n ? 1 : 0,
    // Track which produce call this is associated with.
    scope_: t ? t.scope_ : Nn(),
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
    if (t === re)
      return e;
    const n = Ne(e);
    if (!gt(n, t))
      return _r(e, n, t);
    const o = n[t];
    return e.finalized_ || !ye(o) ? o : o === ht(e.base_, t) ? (yt(e), e.copy_[t] = Nt(o, e)) : o;
  },
  has(e, t) {
    return t in Ne(e);
  },
  ownKeys(e) {
    return Reflect.ownKeys(Ne(e));
  },
  set(e, t, n) {
    const o = _n(Ne(e), t);
    if (o != null && o.set)
      return o.set.call(e.draft_, n), !0;
    if (!e.modified_) {
      const a = ht(Ne(e), t), u = a == null ? void 0 : a[re];
      if (u && u.base_ === n)
        return e.copy_[t] = n, e.assigned_[t] = !1, !0;
      if (gr(n, a) && (n !== void 0 || gt(e.base_, t)))
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
    const n = Ne(e), o = Reflect.getOwnPropertyDescriptor(n, t);
    return o && {
      writable: !0,
      configurable: e.type_ !== 1 || t !== "length",
      enumerable: o.enumerable,
      value: n[t]
    };
  },
  defineProperty() {
    te(11);
  },
  getPrototypeOf(e) {
    return je(e.base_);
  },
  setPrototypeOf() {
    te(12);
  }
}, We = {};
Be(xt, (e, t) => {
  We[e] = function() {
    return arguments[0] = arguments[0][0], t.apply(this, arguments);
  };
});
We.deleteProperty = function(e, t) {
  return process.env.NODE_ENV !== "production" && isNaN(parseInt(t)) && te(13), We.set.call(this, e, t, void 0);
};
We.set = function(e, t, n) {
  return process.env.NODE_ENV !== "production" && t !== "length" && isNaN(parseInt(t)) && te(14), xt.set.call(this, e[0], t, n, e[0]);
};
function ht(e, t) {
  const n = e[re];
  return (n ? Ne(n) : e)[t];
}
function _r(e, t, n) {
  var a;
  const o = _n(t, n);
  return o ? "value" in o ? o.value : (
    // This is a very special case, if the prop is a getter defined by the
    // prototype, we should invoke it with the draft as context!
    (a = o.get) == null ? void 0 : a.call(e.draft_)
  ) : void 0;
}
function _n(e, t) {
  if (!(t in e))
    return;
  let n = je(e);
  for (; n; ) {
    const o = Object.getOwnPropertyDescriptor(n, t);
    if (o)
      return o;
    n = je(n);
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
var Or = class {
  constructor(e) {
    this.autoFreeze_ = !0, this.useStrictShallowCopy_ = !1, this.produce = (t, n, o) => {
      if (typeof t == "function" && typeof n != "function") {
        const u = n;
        n = t;
        const l = this;
        return function(g = u, ...v) {
          return l.produce(g, (m) => n.call(this, m, ...v));
        };
      }
      typeof n != "function" && te(6), o !== void 0 && typeof o != "function" && te(7);
      let a;
      if (ye(t)) {
        const u = sn(this), l = Nt(t, void 0);
        let f = !0;
        try {
          a = n(l), f = !1;
        } finally {
          f ? bt(u) : wt(u);
        }
        return on(u, o), an(a, u);
      } else if (!t || typeof t != "object") {
        if (a = n(t), a === void 0 && (a = t), a === bn && (a = void 0), this.autoFreeze_ && kt(a, !0), o) {
          const u = [], l = [];
          Oe("Patches").generateReplacementPatches_(t, a, u, l), o(u, l);
        }
        return a;
      } else
        te(1, t);
    }, this.produceWithPatches = (t, n) => {
      if (typeof t == "function")
        return (l, ...f) => this.produceWithPatches(l, (g) => t(g, ...f));
      let o, a;
      return [this.produce(t, n, (l, f) => {
        o = l, a = f;
      }), o, a];
    }, typeof (e == null ? void 0 : e.autoFreeze) == "boolean" && this.setAutoFreeze(e.autoFreeze), typeof (e == null ? void 0 : e.useStrictShallowCopy) == "boolean" && this.setUseStrictShallowCopy(e.useStrictShallowCopy);
  }
  createDraft(e) {
    ye(e) || te(8), be(e) && (e = On(e));
    const t = sn(this), n = Nt(e, void 0);
    return n[re].isManual_ = !0, wt(t), n;
  }
  finishDraft(e, t) {
    const n = e && e[re];
    (!n || !n.isManual_) && te(9);
    const { scope_: o } = n;
    return on(o, t), an(void 0, o);
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
    const o = Oe("Patches").applyPatches_;
    return be(e) ? o(e, t) : this.produce(
      e,
      (a) => o(a, t)
    );
  }
};
function Nt(e, t) {
  const n = nt(e) ? Oe("MapSet").proxyMap_(e, t) : rt(e) ? Oe("MapSet").proxySet_(e, t) : Nr(e, t);
  return (t ? t.scope_ : Nn()).drafts_.push(n), n;
}
function On(e) {
  return be(e) || te(10, e), kn(e);
}
function kn(e) {
  if (!ye(e) || ot(e))
    return e;
  const t = e[re];
  let n;
  if (t) {
    if (!t.modified_)
      return t.base_;
    t.finalized_ = !0, n = vt(e, t.scope_.immer_.useStrictShallowCopy_);
  } else
    n = vt(e, !0);
  return Be(n, (o, a) => {
    En(n, o, kn(a));
  }), t && (t.finalized_ = !1), n;
}
var oe = new Or(), xn = oe.produce;
oe.produceWithPatches.bind(
  oe
);
oe.setAutoFreeze.bind(oe);
oe.setUseStrictShallowCopy.bind(oe);
oe.applyPatches.bind(oe);
oe.createDraft.bind(oe);
oe.finishDraft.bind(oe);
var kr = (e, t, n) => {
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
}, xr = (e, t, n) => {
  const { memoize: o, memoizeOptions: a } = t, { inputSelectorResults: u, inputSelectorResultsCopy: l } = e, f = o(() => ({}), ...a);
  if (!(f.apply(null, u) === f.apply(null, l))) {
    let v;
    try {
      throw new Error();
    } catch (m) {
      ({ stack: v } = m);
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
}, Sr = {
  inputStabilityCheck: "once",
  identityFunctionCheck: "once"
};
function $r(e, t = `expected a function, instead received ${typeof e}`) {
  if (typeof e != "function")
    throw new TypeError(t);
}
function Dr(e, t = `expected an object, instead received ${typeof e}`) {
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
var cn = (e) => Array.isArray(e) ? e : [e];
function jr(e) {
  const t = Array.isArray(e[0]) ? e[0] : e;
  return Ir(
    t,
    "createSelector expects all input-selectors to be functions, but received the following types: "
  ), t;
}
function ln(e, t) {
  const n = [], { length: o } = e;
  for (let a = 0; a < o; a++)
    n.push(e[a].apply(null, t));
  return n;
}
var Cr = (e, t) => {
  const { identityFunctionCheck: n, inputStabilityCheck: o } = {
    ...Sr,
    ...t
  };
  return {
    identityFunctionCheck: {
      shouldRun: n === "always" || n === "once" && e,
      run: kr
    },
    inputStabilityCheck: {
      shouldRun: o === "always" || o === "once" && e,
      run: xr
    }
  };
}, Rr = class {
  constructor(e) {
    this.value = e;
  }
  deref() {
    return this.value;
  }
}, Tr = typeof WeakRef < "u" ? WeakRef : Rr, Ar = 0, fn = 1;
function He() {
  return {
    s: Ar,
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
    var k;
    let f = n;
    const { length: g } = arguments;
    for (let O = 0, C = g; O < C; O++) {
      const T = arguments[O];
      if (typeof T == "function" || typeof T == "object" && T !== null) {
        let z = f.o;
        z === null && (f.o = z = /* @__PURE__ */ new WeakMap());
        const b = z.get(T);
        b === void 0 ? (f = He(), z.set(T, f)) : f = b;
      } else {
        let z = f.p;
        z === null && (f.p = z = /* @__PURE__ */ new Map());
        const b = z.get(T);
        b === void 0 ? (f = He(), z.set(T, f)) : f = b;
      }
    }
    const v = f;
    let m;
    if (f.s === fn ? m = f.v : (m = e.apply(null, arguments), u++), v.s = fn, o) {
      const O = ((k = a == null ? void 0 : a.deref) == null ? void 0 : k.call(a)) ?? a;
      O != null && o(O, m) && (m = O, u !== 0 && u--), a = typeof m == "object" && m !== null || typeof m == "function" ? new Tr(m) : m;
    }
    return v.v = m, m;
  }
  return l.clearCache = () => {
    n = He(), l.resetResultsCount();
  }, l.resultsCount = () => u, l.resetResultsCount = () => {
    u = 0;
  }, l;
}
function Sn(e, ...t) {
  const n = typeof e == "function" ? {
    memoize: e,
    memoizeOptions: t
  } : e, o = (...a) => {
    let u = 0, l = 0, f, g = {}, v = a.pop();
    typeof v == "object" && (g = v, v = a.pop()), $r(
      v,
      `createSelector expects an output function after the inputs, but received: [${typeof v}]`
    );
    const m = {
      ...n,
      ...g
    }, {
      memoize: k,
      memoizeOptions: O = [],
      argsMemoize: C = St,
      argsMemoizeOptions: T = [],
      devModeChecks: z = {}
    } = m, b = cn(O), x = cn(T), $ = jr(a), S = k(function() {
      return u++, v.apply(
        null,
        arguments
      );
    }, ...b);
    let I = !0;
    const A = C(function() {
      l++;
      const F = ln(
        $,
        arguments
      );
      if (f = S.apply(null, F), process.env.NODE_ENV !== "production") {
        const { identityFunctionCheck: V, inputStabilityCheck: L } = Cr(I, z);
        if (V.shouldRun && V.run(
          v,
          F,
          f
        ), L.shouldRun) {
          const W = ln(
            $,
            arguments
          );
          L.run(
            { inputSelectorResults: F, inputSelectorResultsCopy: W },
            { memoize: k, memoizeOptions: b },
            arguments
          );
        }
        I && (I = !1);
      }
      return f;
    }, ...x);
    return Object.assign(A, {
      resultFunc: v,
      memoizedResultFunc: S,
      dependencies: $,
      dependencyRecomputations: () => l,
      resetDependencyRecomputations: () => {
        l = 0;
      },
      lastResult: () => f,
      recomputations: () => u,
      resetRecomputations: () => {
        u = 0;
      },
      memoize: k,
      argsMemoize: C
    });
  };
  return Object.assign(o, {
    withTypes: () => o
  }), o;
}
var Vr = /* @__PURE__ */ Sn(St), Mr = Object.assign(
  (e, t = Vr) => {
    Dr(
      e,
      `createStructuredSelector expects first argument to be an object where each property is a selector, instead received a ${typeof e}`
    );
    const n = Object.keys(e), o = n.map(
      (u) => e[u]
    );
    return t(
      o,
      (...u) => u.reduce((l, f, g) => (l[n[g]] = f, l), {})
    );
  },
  { withTypes: () => Mr }
);
function $n(e) {
  return ({ dispatch: n, getState: o }) => (a) => (u) => typeof u == "function" ? u(n, o, e) : a(u);
}
var Pr = $n(), zr = $n, Fr = (...e) => {
  const t = Sn(...e), n = Object.assign((...o) => {
    const a = t(...o), u = (l, ...f) => a(be(l) ? On(l) : l, ...f);
    return Object.assign(u, a), u;
  }, {
    withTypes: () => n
  });
  return n;
};
Fr(St);
var qr = typeof window < "u" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : function() {
  if (arguments.length !== 0)
    return typeof arguments[0] == "object" ? Qe : Qe.apply(null, arguments);
}, Br = (e) => e && typeof e.match == "function";
function Ce(e, t) {
  function n(...o) {
    if (t) {
      let a = t(...o);
      if (!a)
        throw new Error(process.env.NODE_ENV === "production" ? q(0) : "prepareAction did not return an object");
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
  return n.toString = () => `${e}`, n.type = e, n.match = (o) => vn(o) && o.type === e, n;
}
function Lr(e) {
  return typeof e == "function" && "type" in e && // hasMatchFunction only wants Matchers but I don't see the point in rewriting it
  Br(e);
}
function Wr(e) {
  const t = e ? `${e}`.split("/") : [], n = t[t.length - 1] || "actionCreator";
  return `Detected an action creator with type "${e || "unknown"}" being dispatched. 
Make sure you're calling the action creator before dispatching, i.e. \`dispatch(${n}())\` instead of \`dispatch(${n})\`. This is necessary even if the action has no payload.`;
}
function Ur(e = {}) {
  if (process.env.NODE_ENV === "production")
    return () => (n) => (o) => n(o);
  const {
    isActionCreator: t = Lr
  } = e;
  return () => (n) => (o) => (t(o) && console.warn(Wr(o.type)), n(o));
}
function Dn(e, t) {
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
var In = class Fe extends Array {
  constructor(...t) {
    super(...t), Object.setPrototypeOf(this, Fe.prototype);
  }
  static get [Symbol.species]() {
    return Fe;
  }
  concat(...t) {
    return super.concat.apply(this, t);
  }
  prepend(...t) {
    return t.length === 1 && Array.isArray(t[0]) ? new Fe(...t[0].concat(this)) : new Fe(...t.concat(this));
  }
};
function dn(e) {
  return ye(e) ? xn(e, () => {
  }) : e;
}
function pn(e, t, n) {
  if (e.has(t)) {
    let a = e.get(t);
    return n.update && (a = n.update(a, t, e), e.set(t, a)), a;
  }
  if (!n.insert)
    throw new Error(process.env.NODE_ENV === "production" ? q(10) : "No insert provided for key not already in map");
  const o = n.insert(t, e);
  return e.set(t, o), o;
}
function Gr(e) {
  return typeof e != "object" || e == null || Object.isFrozen(e);
}
function Kr(e, t, n) {
  const o = jn(e, t, n);
  return {
    detectMutations() {
      return Cn(e, t, o, n);
    }
  };
}
function jn(e, t = [], n, o = "", a = /* @__PURE__ */ new Set()) {
  const u = {
    value: n
  };
  if (!e(n) && !a.has(n)) {
    a.add(n), u.children = {};
    for (const l in n) {
      const f = o ? o + "." + l : l;
      t.length && t.indexOf(f) !== -1 || (u.children[l] = jn(e, t, n[l], f));
    }
  }
  return u;
}
function Cn(e, t = [], n, o, a = !1, u = "") {
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
  const g = {};
  for (let m in n.children)
    g[m] = !0;
  for (let m in o)
    g[m] = !0;
  const v = t.length > 0;
  for (let m in g) {
    const k = u ? u + "." + m : m;
    if (v && t.some((T) => T instanceof RegExp ? T.test(k) : k === T))
      continue;
    const O = Cn(e, t, n.children[m], o[m], f, k);
    if (O.wasMutated)
      return O;
  }
  return {
    wasMutated: !1
  };
}
function Yr(e = {}) {
  if (process.env.NODE_ENV === "production")
    return () => (t) => (n) => t(n);
  {
    let t = function(f, g, v, m) {
      return JSON.stringify(f, n(g, m), v);
    }, n = function(f, g) {
      let v = [], m = [];
      return g || (g = function(k, O) {
        return v[0] === O ? "[Circular ~]" : "[Circular ~." + m.slice(0, v.indexOf(O)).join(".") + "]";
      }), function(k, O) {
        if (v.length > 0) {
          var C = v.indexOf(this);
          ~C ? v.splice(C + 1) : v.push(this), ~C ? m.splice(C, 1 / 0, k) : m.push(k), ~v.indexOf(O) && (O = g.call(this, k, O));
        } else
          v.push(O);
        return f == null ? O : f.call(this, k, O);
      };
    }, {
      isImmutable: o = Gr,
      ignoredPaths: a,
      warnAfter: u = 32
    } = e;
    const l = Kr.bind(null, o, a);
    return ({
      getState: f
    }) => {
      let g = f(), v = l(g), m;
      return (k) => (O) => {
        const C = Dn(u, "ImmutableStateInvariantMiddleware");
        C.measureTime(() => {
          if (g = f(), m = v.detectMutations(), v = l(g), m.wasMutated)
            throw new Error(process.env.NODE_ENV === "production" ? q(19) : `A state mutation was detected between dispatches, in the path '${m.path || ""}'.  This may cause incorrect behavior. (https://redux.js.org/style-guide/style-guide#do-not-mutate-state)`);
        });
        const T = k(O);
        return C.measureTime(() => {
          if (g = f(), m = v.detectMutations(), v = l(g), m.wasMutated)
            throw new Error(process.env.NODE_ENV === "production" ? q(20) : `A state mutation was detected inside a dispatch, in the path: ${m.path || ""}. Take a look at the reducer(s) handling the action ${t(O)}. (https://redux.js.org/style-guide/style-guide#do-not-mutate-state)`);
        }), C.warnIfExceeded(), T;
      };
    };
  }
}
function Rn(e) {
  const t = typeof e;
  return e == null || t === "string" || t === "boolean" || t === "number" || Array.isArray(e) || Ue(e);
}
function _t(e, t = "", n = Rn, o, a = [], u) {
  let l;
  if (!n(e))
    return {
      keyPath: t || "<root>",
      value: e
    };
  if (typeof e != "object" || e === null || u != null && u.has(e))
    return !1;
  const f = o != null ? o(e) : Object.entries(e), g = a.length > 0;
  for (const [v, m] of f) {
    const k = t ? t + "." + v : v;
    if (!(g && a.some((C) => C instanceof RegExp ? C.test(k) : k === C))) {
      if (!n(m))
        return {
          keyPath: k,
          value: m
        };
      if (typeof m == "object" && (l = _t(m, k, n, o, a, u), l))
        return l;
    }
  }
  return u && Tn(e) && u.add(e), !1;
}
function Tn(e) {
  if (!Object.isFrozen(e))
    return !1;
  for (const t of Object.values(e))
    if (!(typeof t != "object" || t === null) && !Tn(t))
      return !1;
  return !0;
}
function Hr(e = {}) {
  if (process.env.NODE_ENV === "production")
    return () => (t) => (n) => t(n);
  {
    const {
      isSerializable: t = Rn,
      getEntries: n,
      ignoredActions: o = [],
      ignoredActionPaths: a = ["meta.arg", "meta.baseQueryMeta"],
      ignoredPaths: u = [],
      warnAfter: l = 32,
      ignoreState: f = !1,
      ignoreActions: g = !1,
      disableCache: v = !1
    } = e, m = !v && WeakSet ? /* @__PURE__ */ new WeakSet() : void 0;
    return (k) => (O) => (C) => {
      if (!vn(C))
        return O(C);
      const T = O(C), z = Dn(l, "SerializableStateInvariantMiddleware");
      return !g && !(o.length && o.indexOf(C.type) !== -1) && z.measureTime(() => {
        const b = _t(C, "", t, n, a, m);
        if (b) {
          const {
            keyPath: x,
            value: $
          } = b;
          console.error(`A non-serializable value was detected in an action, in the path: \`${x}\`. Value:`, $, `
Take a look at the logic that dispatched this action: `, C, `
(See https://redux.js.org/faq/actions#why-should-type-be-a-string-or-at-least-serializable-why-should-my-action-types-be-constants)`, `
(To allow non-serializable values see: https://redux-toolkit.js.org/usage/usage-guide#working-with-non-serializable-data)`);
        }
      }), f || (z.measureTime(() => {
        const b = k.getState(), x = _t(b, "", t, n, u, m);
        if (x) {
          const {
            keyPath: $,
            value: S
          } = x;
          console.error(`A non-serializable value was detected in the state, in the path: \`${$}\`. Value:`, S, `
Take a look at the reducer(s) handling this action type: ${C.type}.
(See https://redux.js.org/faq/organizing-state#can-i-put-functions-promises-or-other-non-serializable-items-in-my-store-state)`);
        }
      }), z.warnIfExceeded()), T;
    };
  }
}
function Je(e) {
  return typeof e == "boolean";
}
var Jr = () => function(t) {
  const {
    thunk: n = !0,
    immutableCheck: o = !0,
    serializableCheck: a = !0,
    actionCreatorCheck: u = !0
  } = t ?? {};
  let l = new In();
  if (n && (Je(n) ? l.push(Pr) : l.push(zr(n.extraArgument))), process.env.NODE_ENV !== "production") {
    if (o) {
      let f = {};
      Je(o) || (f = o), l.unshift(Yr(f));
    }
    if (a) {
      let f = {};
      Je(a) || (f = a), l.push(Hr(f));
    }
    if (u) {
      let f = {};
      Je(u) || (f = u), l.unshift(Ur(f));
    }
  }
  return l;
}, Xr = "RTK_autoBatch", An = (e) => (t) => {
  setTimeout(t, e);
}, Qr = typeof window < "u" && window.requestAnimationFrame ? window.requestAnimationFrame : An(10), Zr = (e = {
  type: "raf"
}) => (t) => (...n) => {
  const o = t(...n);
  let a = !0, u = !1, l = !1;
  const f = /* @__PURE__ */ new Set(), g = e.type === "tick" ? queueMicrotask : e.type === "raf" ? Qr : e.type === "callback" ? e.queueNotification : An(e.timeout), v = () => {
    l = !1, u && (u = !1, f.forEach((m) => m()));
  };
  return Object.assign({}, o, {
    // Override the base `store.subscribe` method to keep original listeners
    // from running if we're delaying notifications
    subscribe(m) {
      const k = () => a && m(), O = o.subscribe(k);
      return f.add(m), () => {
        O(), f.delete(m);
      };
    },
    // Override the base `store.dispatch` method so that we can check actions
    // for the `shouldAutoBatch` flag and determine if batching is active
    dispatch(m) {
      var k;
      try {
        return a = !((k = m == null ? void 0 : m.meta) != null && k[Xr]), u = !a, u && (l || (l = !0, g(v))), o.dispatch(m);
      } finally {
        a = !0;
      }
    }
  });
}, eo = (e) => function(n) {
  const {
    autoBatch: o = !0
  } = n ?? {};
  let a = new In(e);
  return o && a.push(Zr(typeof o == "object" ? o : void 0)), a;
}, ge = process.env.NODE_ENV === "production";
function to(e) {
  const t = Jr(), {
    reducer: n = void 0,
    middleware: o,
    devTools: a = !0,
    preloadedState: u = void 0,
    enhancers: l = void 0
  } = e || {};
  let f;
  if (typeof n == "function")
    f = n;
  else if (Ue(n))
    f = pr(n);
  else
    throw new Error(process.env.NODE_ENV === "production" ? q(1) : "`reducer` is a required argument, and must be a function or an object of functions that can be passed to combineReducers");
  if (!ge && o && typeof o != "function")
    throw new Error(process.env.NODE_ENV === "production" ? q(2) : "`middleware` field must be a callback");
  let g;
  if (typeof o == "function") {
    if (g = o(t), !ge && !Array.isArray(g))
      throw new Error(process.env.NODE_ENV === "production" ? q(3) : "when using a middleware builder function, an array of middleware must be returned");
  } else
    g = t();
  if (!ge && g.some((T) => typeof T != "function"))
    throw new Error(process.env.NODE_ENV === "production" ? q(4) : "each middleware provided to configureStore must be a function");
  let v = Qe;
  a && (v = qr({
    // Enable capture of stack traces for dispatched Redux actions
    trace: !ge,
    ...typeof a == "object" && a
  }));
  const m = hr(...g), k = eo(m);
  if (!ge && l && typeof l != "function")
    throw new Error(process.env.NODE_ENV === "production" ? q(5) : "`enhancers` field must be a callback");
  let O = typeof l == "function" ? l(k) : k();
  if (!ge && !Array.isArray(O))
    throw new Error(process.env.NODE_ENV === "production" ? q(6) : "`enhancers` callback must return an array");
  if (!ge && O.some((T) => typeof T != "function"))
    throw new Error(process.env.NODE_ENV === "production" ? q(7) : "each enhancer provided to configureStore must be a function");
  !ge && g.length && !O.includes(m) && console.error("middlewares were provided, but middleware enhancer was not included in final enhancers - make sure to call `getDefaultEnhancers`");
  const C = v(...O);
  return gn(f, u, C);
}
function Vn(e) {
  const t = {}, n = [];
  let o;
  const a = {
    addCase(u, l) {
      if (process.env.NODE_ENV !== "production") {
        if (n.length > 0)
          throw new Error(process.env.NODE_ENV === "production" ? q(26) : "`builder.addCase` should only be called before calling `builder.addMatcher`");
        if (o)
          throw new Error(process.env.NODE_ENV === "production" ? q(27) : "`builder.addCase` should only be called before calling `builder.addDefaultCase`");
      }
      const f = typeof u == "string" ? u : u.type;
      if (!f)
        throw new Error(process.env.NODE_ENV === "production" ? q(28) : "`builder.addCase` cannot be called with an empty action type");
      if (f in t)
        throw new Error(process.env.NODE_ENV === "production" ? q(29) : `\`builder.addCase\` cannot be called with two reducers for the same action type '${f}'`);
      return t[f] = l, a;
    },
    addMatcher(u, l) {
      if (process.env.NODE_ENV !== "production" && o)
        throw new Error(process.env.NODE_ENV === "production" ? q(30) : "`builder.addMatcher` should only be called before calling `builder.addDefaultCase`");
      return n.push({
        matcher: u,
        reducer: l
      }), a;
    },
    addDefaultCase(u) {
      if (process.env.NODE_ENV !== "production" && o)
        throw new Error(process.env.NODE_ENV === "production" ? q(31) : "`builder.addDefaultCase` can only be called once");
      return o = u, a;
    }
  };
  return e(a), [t, n, o];
}
function no(e) {
  return typeof e == "function";
}
function ro(e, t) {
  if (process.env.NODE_ENV !== "production" && typeof t == "object")
    throw new Error(process.env.NODE_ENV === "production" ? q(8) : "The object notation for `createReducer` has been removed. Please use the 'builder callback' notation instead: https://redux-toolkit.js.org/api/createReducer");
  let [n, o, a] = Vn(t), u;
  if (no(e))
    u = () => dn(e());
  else {
    const f = dn(e);
    u = () => f;
  }
  function l(f = u(), g) {
    let v = [n[g.type], ...o.filter(({
      matcher: m
    }) => m(g)).map(({
      reducer: m
    }) => m)];
    return v.filter((m) => !!m).length === 0 && (v = [a]), v.reduce((m, k) => {
      if (k)
        if (be(m)) {
          const C = k(m, g);
          return C === void 0 ? m : C;
        } else {
          if (ye(m))
            return xn(m, (O) => k(O, g));
          {
            const O = k(m, g);
            if (O === void 0) {
              if (m === null)
                return m;
              throw new Error(process.env.NODE_ENV === "production" ? q(9) : "A case reducer on a non-draftable value must not return undefined");
            }
            return O;
          }
        }
      return m;
    }, f);
  }
  return l.getInitialState = u, l;
}
var oo = "ModuleSymbhasOwnPr-0123456789ABCDEFGHNRVfgctiUvz_KqYTJkLxpZXIjQW", io = (e = 21) => {
  let t = "", n = e;
  for (; n--; )
    t += oo[Math.random() * 64 | 0];
  return t;
}, so = /* @__PURE__ */ Symbol.for("rtk-slice-createasyncthunk");
function ao(e, t) {
  return `${e}/${t}`;
}
function uo({
  creators: e
} = {}) {
  var n;
  const t = (n = e == null ? void 0 : e.asyncThunk) == null ? void 0 : n[so];
  return function(a) {
    const {
      name: u,
      reducerPath: l = u
    } = a;
    if (!u)
      throw new Error(process.env.NODE_ENV === "production" ? q(11) : "`name` is a required option for createSlice");
    typeof process < "u" && process.env.NODE_ENV === "development" && a.initialState === void 0 && console.error("You must provide an `initialState` value that is not `undefined`. You may have misspelled `initialState`");
    const f = (typeof a.reducers == "function" ? a.reducers(fo()) : a.reducers) || {}, g = Object.keys(f), v = {
      sliceCaseReducersByName: {},
      sliceCaseReducersByType: {},
      actionCreators: {},
      sliceMatchers: []
    }, m = {
      addCase(S, I) {
        const A = typeof S == "string" ? S : S.type;
        if (!A)
          throw new Error(process.env.NODE_ENV === "production" ? q(12) : "`context.addCase` cannot be called with an empty action type");
        if (A in v.sliceCaseReducersByType)
          throw new Error(process.env.NODE_ENV === "production" ? q(13) : "`context.addCase` cannot be called with two reducers for the same action type: " + A);
        return v.sliceCaseReducersByType[A] = I, m;
      },
      addMatcher(S, I) {
        return v.sliceMatchers.push({
          matcher: S,
          reducer: I
        }), m;
      },
      exposeAction(S, I) {
        return v.actionCreators[S] = I, m;
      },
      exposeCaseReducer(S, I) {
        return v.sliceCaseReducersByName[S] = I, m;
      }
    };
    g.forEach((S) => {
      const I = f[S], A = {
        reducerName: S,
        type: ao(u, S),
        createNotation: typeof a.reducers == "function"
      };
      ho(I) ? mo(A, I, m, t) : po(A, I, m);
    });
    function k() {
      if (process.env.NODE_ENV !== "production" && typeof a.extraReducers == "object")
        throw new Error(process.env.NODE_ENV === "production" ? q(14) : "The object notation for `createSlice.extraReducers` has been removed. Please use the 'builder callback' notation instead: https://redux-toolkit.js.org/api/createSlice");
      const [S = {}, I = [], A = void 0] = typeof a.extraReducers == "function" ? Vn(a.extraReducers) : [a.extraReducers], U = {
        ...S,
        ...v.sliceCaseReducersByType
      };
      return ro(a.initialState, (F) => {
        for (let V in U)
          F.addCase(V, U[V]);
        for (let V of v.sliceMatchers)
          F.addMatcher(V.matcher, V.reducer);
        for (let V of I)
          F.addMatcher(V.matcher, V.reducer);
        A && F.addDefaultCase(A);
      });
    }
    const O = (S) => S, C = /* @__PURE__ */ new Map();
    let T;
    function z(S, I) {
      return T || (T = k()), T(S, I);
    }
    function b() {
      return T || (T = k()), T.getInitialState();
    }
    function x(S, I = !1) {
      function A(F) {
        let V = F[S];
        if (typeof V > "u") {
          if (I)
            V = b();
          else if (process.env.NODE_ENV !== "production")
            throw new Error(process.env.NODE_ENV === "production" ? q(15) : "selectSlice returned undefined for an uninjected slice reducer");
        }
        return V;
      }
      function U(F = O) {
        const V = pn(C, I, {
          insert: () => /* @__PURE__ */ new WeakMap()
        });
        return pn(V, F, {
          insert: () => {
            const L = {};
            for (const [W, se] of Object.entries(a.selectors ?? {}))
              L[W] = co(se, F, b, I);
            return L;
          }
        });
      }
      return {
        reducerPath: S,
        getSelectors: U,
        get selectors() {
          return U(A);
        },
        selectSlice: A
      };
    }
    const $ = {
      name: u,
      reducer: z,
      actions: v.actionCreators,
      caseReducers: v.sliceCaseReducersByName,
      getInitialState: b,
      ...x(l),
      injectInto(S, {
        reducerPath: I,
        ...A
      } = {}) {
        const U = I ?? l;
        return S.inject({
          reducerPath: U,
          reducer: z
        }, A), {
          ...$,
          ...x(U, !0)
        };
      }
    };
    return $;
  };
}
function co(e, t, n, o) {
  function a(u, ...l) {
    let f = t(u);
    if (typeof f > "u") {
      if (o)
        f = n();
      else if (process.env.NODE_ENV !== "production")
        throw new Error(process.env.NODE_ENV === "production" ? q(16) : "selectState returned undefined for an uninjected slice reducer");
    }
    return e(f, ...l);
  }
  return a.unwrapped = e, a;
}
var lo = /* @__PURE__ */ uo();
function fo() {
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
function po({
  type: e,
  reducerName: t,
  createNotation: n
}, o, a) {
  let u, l;
  if ("reducer" in o) {
    if (n && !yo(o))
      throw new Error(process.env.NODE_ENV === "production" ? q(17) : "Please use the `create.preparedReducer` notation for prepared action creators with the `create` notation.");
    u = o.reducer, l = o.prepare;
  } else
    u = o;
  a.addCase(e, u).exposeCaseReducer(t, u).exposeAction(t, l ? Ce(e, l) : Ce(e));
}
function ho(e) {
  return e._reducerDefinitionType === "asyncThunk";
}
function yo(e) {
  return e._reducerDefinitionType === "reducerWithPrepare";
}
function mo({
  type: e,
  reducerName: t
}, n, o, a) {
  if (!a)
    throw new Error(process.env.NODE_ENV === "production" ? q(18) : "Cannot use `create.asyncThunk` in the built-in `createSlice`. Use `buildCreateSlice({ creators: { asyncThunk: asyncThunkCreator } })` to create a customised version of `createSlice`.");
  const {
    payloadCreator: u,
    fulfilled: l,
    pending: f,
    rejected: g,
    settled: v,
    options: m
  } = n, k = a(e, u, m);
  o.exposeAction(t, k), l && o.addCase(k.fulfilled, l), f && o.addCase(k.pending, f), g && o.addCase(k.rejected, g), v && o.addMatcher(k.settled, v), o.exposeCaseReducer(t, {
    fulfilled: l || Xe,
    pending: f || Xe,
    rejected: g || Xe,
    settled: v || Xe
  });
}
function Xe() {
}
var go = (e, t) => {
  if (typeof e != "function")
    throw new Error(process.env.NODE_ENV === "production" ? q(32) : `${t} is not a function`);
}, $t = "listenerMiddleware", vo = (e) => {
  let {
    type: t,
    actionCreator: n,
    matcher: o,
    predicate: a,
    effect: u
  } = e;
  if (t)
    a = Ce(t).match;
  else if (n)
    t = n.type, a = n.match;
  else if (o)
    a = o;
  else if (!a)
    throw new Error(process.env.NODE_ENV === "production" ? q(21) : "Creating or removing a listener requires one of the known fields for matching an action");
  return go(u, "options.listener"), {
    predicate: a,
    type: t,
    effect: u
  };
}, bo = Object.assign((e) => {
  const {
    type: t,
    predicate: n,
    effect: o
  } = vo(e);
  return {
    id: io(),
    effect: o,
    type: t,
    predicate: n,
    pending: /* @__PURE__ */ new Set(),
    unsubscribe: () => {
      throw new Error(process.env.NODE_ENV === "production" ? q(22) : "Unsubscribe not initialized");
    }
  };
}, {
  withTypes: () => bo
}), wo = Object.assign(Ce(`${$t}/add`), {
  withTypes: () => wo
});
Ce(`${$t}/removeAll`);
var Eo = Object.assign(Ce(`${$t}/remove`), {
  withTypes: () => Eo
});
function q(e) {
  return `Minified Redux Toolkit error #${e}; visit https://redux-toolkit.js.org/Errors?code=${e} for the full message or use the non-minified dev environment for full errors. `;
}
var Mn = { exports: {} };
(function(e, t) {
  (function(n) {
    e.exports = n();
  })(function() {
    var n = {}, o = {};
    Object.defineProperty(o, "__esModule", { value: !0 }), o.Gubu = void 0;
    const a = Symbol.for("gubu$"), u = { gubu$: a, v$: "7.0.0" }, l = Symbol.for("gubu$nil"), f = /^[A-Z]/, { toString: g } = Object.prototype, v = "gubu", m = "name", k = "nan", O = "never", C = "number", T = "required", z = "array", b = "function", x = "object", $ = "string", S = "boolean", I = "undefined", A = "any", U = "list", F = "instance", V = "null", L = "type", W = "closed", se = "shape", le = "check", me = "regexp", Re = "Object", Ge = "Array", fe = "Function", Z = "Value", Ke = "Above", Te = "All", zn = "Below", Fn = "Max", qn = "Min", Bn = "Len", Ln = "One", Wn = "Some", de = " for property ", pe = '"$PATH"', he = '"$VALUE"', ke = (r) => Object.keys(r), xe = (r, s, c) => Object.defineProperty(r, s, c), ae = (r) => Array.isArray(r), st = (r) => JSON.parse(r), at = (r, s) => JSON.stringify(r, s);
    class Un {
      constructor(s, c, y, h) {
        this.match = !1, this.dI = 0, this.nI = 2, this.cI = -1, this.pI = 0, this.sI = -1, this.valType = O, this.isRoot = !1, this.key = "", this.type = O, this.stop = !0, this.nextSibling = !0, this.fromDflt = !1, this.ignoreVal = void 0, this.curerr = [], this.err = [], this.parents = [], this.keys = [], this.path = [], this.root = s, this.vals = [s, -1], this.node = c, this.nodes = [c, -1], this.ctx = y || {}, this.match = !!h;
      }
      next() {
        this.stop = !1, this.fromDflt = !1, this.ignoreVal = void 0, this.isRoot = this.pI === 0, this.check = void 0;
        let s = this.nodes[this.pI];
        for (; +s; )
          this.dI--, this.ctx.log && -1 < this.dI && this.ctx.log("e" + (ae(this.parents[this.pI]) ? "a" : "o"), this), this.pI = +s, s = this.nodes[this.pI];
        s ? (this.node = s, this.updateVal(this.vals[this.pI]), this.key = this.keys[this.pI], this.cI = this.pI, this.sI = this.pI + 1, this.parent = this.parents[this.pI], this.nextSibling = !0, this.type = this.node.t, this.path[this.dI] = this.key, this.oval = this.val, this.curerr.length = 0) : this.stop = !0;
      }
      updateVal(s) {
        this.val = s, this.valType = typeof this.val, C === this.valType && isNaN(this.val) && (this.valType = k), this.isRoot && !this.match && (this.root = this.val);
      }
    }
    class Gn extends TypeError {
      constructor(s, c, y, h) {
        var E;
        super((c = c == null ? "" : c + ": ") + y.map((p) => p.t).join(`
`)), this.gubu = !0, this.name = "GubuError", this.code = s, this.prefix = c, this.desc = () => ({ name: "GubuError", code: s, err: y, ctx: h }), this.stack = (E = this.stack) === null || E === void 0 ? void 0 : E.replace(/.*\/gubu\/gubu\.[tj]s.*\n/g, ""), this.props = y.map((p) => {
          var d;
          return { path: p.p, what: p.w, type: (d = p.n) === null || d === void 0 ? void 0 : d.t, value: p.v };
        });
      }
      toJSON() {
        return Object.assign(Object.assign({}, this), { err: this.desc().err, name: this.name, message: this.message });
      }
    }
    const ut = { String: !0, Number: !0, Boolean: !0, Object: !0, Array: !0, Function: !0, Symbol: !0, BigInt: !0 }, ct = { string: "", number: 0, boolean: !1, object: {}, array: [], symbol: Symbol(""), bigint: BigInt(0), null: null, regexp: /.*/ };
    function ie(r, s, c) {
      var y, h, E, p;
      if (Se === r)
        r = void 0;
      else if (r != null && (!((y = r.$) === null || y === void 0) && y.gubu$)) {
        if (a === r.$.gubu$)
          return r.d = s ?? r.d, r;
        if (r.$.gubu$ === !0) {
          let R = Object.assign({}, r);
          return R.$ = Object.assign(Object.assign({ v$: "7.0.0" }, R.$), { gubu$: a }), R.v = R.v != null && x === typeof R.v ? Object.assign({}, R.v) : R.v, R.t = R.t || typeof R.v, b === R.t && ut[R.v.name] && (R.t = R.v.name.toLowerCase(), R.v = lt(ct[R.t]), R.f = R.v), R.r = !!R.r, R.p = !!R.p, R.d = s ?? (R.d == null ? -1 : R.d), R.b = R.b || [], R.a = R.a || [], R.u = R.u || {}, R.m = R.m || c || {}, R;
        }
      }
      let d = r === null ? V : typeof r;
      d = I === d ? A : d;
      let w = r, D = w, j = l, _ = !1, i = {}, N = [], M = [];
      if (x === d)
        D = void 0, ae(w) ? (d = z, w.length === 1 && (j = w[0], w = [])) : w != null && Function !== w.constructor && Object !== w.constructor && w.constructor != null ? (g.call(w) === "[object RegExp]" ? (d = me, _ = !0) : (d = F, i.n = w.constructor.name, i.i = w.constructor), D = w) : ke(w).length === 0 && (j = we());
      else if (b === d)
        if (ut[r.name])
          d = r.name.toLowerCase(), _ = !0, w = lt(ct[d]), D = w, Re === r.name && (j = we());
        else if (w.gubu === u || ((h = w.$) === null || h === void 0 ? void 0 : h.gubu) === !0) {
          let R = w.node ? w.node() : w;
          d = R.t, w = R.v, D = w, _ = R.r, i = Object.assign({}, R.u), N = [...R.a], M = [...R.b];
        } else
          fe === w.constructor.name && f.test(w.name) && (d = F, _ = !0, i.n = (p = (E = w.prototype) === null || E === void 0 ? void 0 : E.constructor) === null || p === void 0 ? void 0 : p.name, i.i = w);
      else
        C === d && isNaN(w) ? d = k : $ === d && w === "" && (i.empty = !0);
      let K = w == null || x !== d && z !== d ? w : Object.assign({}, w);
      return { $: u, t: d, v: K, f: D, n: K != null && x === typeof K ? ke(K).length : 0, c: j, r: _, p: !1, d: s ?? -1, k: [], e: !0, u: i, a: N, b: M, m: c || {} };
    }
    function Se(r, s) {
      const c = s ?? {};
      c.name = c.name == null ? "G" + ("" + Math.random()).substring(2, 8) : "" + c.name, c.prefix = c.prefix == null ? void 0 : c.prefix;
      let y = c.meta = c.meta || {};
      y.active = y.active === !0 || !1, y.suffix = $ == typeof y.suffix ? y.suffix : "$$";
      let h = c.keyexpr = c.keyexpr || {};
      h.active = h.active !== !1;
      let E = ie(r, 0);
      function p(D, j, _) {
        let i = new Un(D, E, j, _);
        for (; i.next(), !i.stop; ) {
          let N = i.node, M = !1, K = !1;
          if (0 < N.b.length)
            for (let H = 0; H < N.b.length; H++) {
              let B = Dt(N.b[H], i);
              N = i.node, B.done !== void 0 && (M = B.done), K = K || !!B.fatal;
            }
          if (!M) {
            let H = !0, B = i.val === void 0;
            if (O === i.type)
              i.curerr.push(ee(O, i, 1070));
            else if (x === i.type) {
              let G;
              if (N.r && B ? (i.ignoreVal = !0, i.curerr.push(ee(T, i, 1010))) : B || i.val !== null && x === i.valType && !ae(i.val) ? !N.p && B && N.f !== void 0 ? (i.updateVal(N.f), i.fromDflt = !0, G = i.val, H = !1) : N.p && B || (i.updateVal(i.val || (i.fromDflt = !0, {})), G = i.val) : (i.curerr.push(ee(L, i, 1020)), G = ae(i.val) ? i.val : {}), H && (G = G == null && i.ctx.err === !1 ? {} : G, G != null)) {
                i.ctx.log && i.ctx.log("so", i);
                let De = !1, ce = ke(N.v), ze = i.nI;
                if (0 < ce.length) {
                  De = !0, i.pI = ze;
                  for (let X = 0; X < ce.length; X++) {
                    let Ee, ne = ce[X];
                    if (y.active && ne.endsWith(y.suffix)) {
                      if (Ee = { short: "" }, $ === typeof N.v[ne] ? Ee.short = N.v[ne] : Ee = Object.assign(Object.assign({}, Ee), N.v[ne]), delete N.v[ne], X++, ce.length <= X)
                        break;
                      if (ce[X] !== ne.substring(0, ne.length - y.suffix.length))
                        throw new Error("Invalid meta key: " + ne);
                      ne = ce[X];
                    }
                    let Ie = ne, ft = N.v[ne];
                    if (h.active) {
                      let dt = /^\s*("(\\.|[^"\\])*"|[^\s]+):\s*(.*?)\s*$/.exec(ne);
                      dt && (Ie = dt[1], ft = Ae({ src: dt[3], val: ft }), delete N.v[ne]);
                    }
                    let en = ie(ft, 1 + i.dI, Ee);
                    N.v[Ie] = en, N.k.includes(Ie) || N.k.push(Ie), i.nodes[i.nI] = en, i.vals[i.nI] = G[Ie], i.parents[i.nI] = G, i.keys[i.nI] = Ie, i.nI++;
                  }
                }
                let J = ke(G).filter((X) => N.v[X] === void 0);
                if (0 < J.length)
                  if (l === N.c)
                    i.ignoreVal = !0, i.curerr.push(ee(W, i, 1100, void 0, { k: J }));
                  else {
                    De = !0, i.pI = ze;
                    for (let X of J) {
                      let Ee = N.c = ie(N.c, 1 + i.dI);
                      i.nodes[i.nI] = Ee, i.vals[i.nI] = G[X], i.parents[i.nI] = G, i.keys[i.nI] = X, i.nI++;
                    }
                  }
                De ? (i.dI++, i.nodes[i.nI] = i.sI, i.parents[i.nI] = G, i.nextSibling = !1, i.nI++) : i.ctx.log && i.ctx.log("eo", i);
              }
            } else if (z === i.type)
              if (N.r && B)
                i.ignoreVal = !0, i.curerr.push(ee(T, i, 1030));
              else if (B || ae(i.val)) {
                if (!N.p && B && N.f !== void 0)
                  i.updateVal(N.f), i.fromDflt = !0;
                else if (!N.p || i.val != null) {
                  i.updateVal(i.val || (i.fromDflt = !0, []));
                  let G = l !== N.c, De = 0 < i.val.length, ce = ke(N.v).filter((J) => !isNaN(+J)), ze = 0 < ce.length;
                  if (i.ctx.log && i.ctx.log("sa", i), De || ze) {
                    i.pI = i.nI;
                    let J = 0;
                    if (ze)
                      if (ce.length < i.val.length && !G)
                        i.ignoreVal = !0, i.curerr.push(ee(W, i, 1090, void 0, { k: ce.length }));
                      else
                        for (; J < ce.length; J++) {
                          let X = N.v[J] = ie(N.v[J], 1 + i.dI);
                          i.nodes[i.nI] = X, i.vals[i.nI] = i.val[J], i.parents[i.nI] = i.val, i.keys[i.nI] = "" + J, i.nI++;
                        }
                    if (G && De) {
                      let X = N.c = ie(N.c, 1 + i.dI);
                      for (; J < i.val.length; J++)
                        i.nodes[i.nI] = X, i.vals[i.nI] = i.val[J], i.parents[i.nI] = i.val, i.keys[i.nI] = "" + J, i.nI++;
                    }
                    i.ignoreVal || (i.dI++, i.nodes[i.nI] = i.sI, i.parents[i.nI] = i.val, i.nextSibling = !1, i.nI++);
                  } else
                    i.ctx.log && G && D == null && i.ctx.log("kv", Object.assign(Object.assign({}, i), { key: 0, val: N.c })), i.ctx.log && i.ctx.log("ea", i);
                }
              } else
                i.curerr.push(ee(L, i, 1040));
            else if (me === i.type)
              B && !N.r ? i.ignoreVal = !0 : $ !== i.valType ? (i.ignoreVal = !0, i.curerr.push(ee(L, i, 1045))) : i.val.match(N.v) || (i.ignoreVal = !0, i.curerr.push(ee(me, i, 1045)));
            else if (A === i.type || U === i.type || i.val === void 0 || i.type === i.valType || F === i.type && N.u.i && i.val instanceof N.u.i || V === i.type && i.val === null)
              if (i.val === void 0) {
                let G = i.path[i.dI];
                !N.r || I === i.type && i.parent.hasOwnProperty(G) ? N.f !== void 0 && !N.p || I === i.type ? (i.updateVal(N.f), i.fromDflt = !0) : A === i.type && (i.ignoreVal = i.ignoreVal === void 0 || i.ignoreVal) : (i.ignoreVal = !0, i.curerr.push(ee(T, i, 1060))), i.ctx.log && i.ctx.log("kv", i);
              } else
                $ !== i.type || i.val !== "" || N.u.empty || i.curerr.push(ee(T, i, 1080)), i.ctx.log && i.ctx.log("kv", i);
            else
              i.curerr.push(ee(L, i, 1050));
          }
          if (0 < N.a.length)
            for (let H = 0; H < N.a.length; H++) {
              let B = Dt(N.a[H], i);
              N = i.node, B.done !== void 0 && (M = B.done), K = K || !!B.fatal;
            }
          let R = i.node.p ? i.ignoreVal !== !1 : !!i.ignoreVal;
          !i.match && i.parent != null && !M && !R && (i.parent[i.key] = i.val), i.nextSibling && (i.pI = i.sI), (i.node.e || K) && i.err.push(...i.curerr);
        }
        if (0 < i.err.length) {
          if (ae(i.ctx.err))
            i.ctx.err.push(...i.err);
          else if (!i.match && i.ctx.err !== !1)
            throw new Gn(se, c.prefix, i.err, i.ctx);
        }
        return i.match ? i.err.length === 0 : i.root;
      }
      function d(D, j) {
        return p(D, j, !1);
      }
      d.valid = function(D, j) {
        let _ = j || {};
        return _.err = _.err || [], p(D, _, !1), _.err.length === 0;
      }, d.match = (D, j) => p(D, j = j || {}, !0), d.error = (D, j) => {
        let _ = j || {};
        return _.err = _.err || [], p(D, _, !1), _.err;
      }, d.spec = () => (d(void 0, { err: !1 }), st(Q(E, (D, j) => a === j || j, !1, !0))), d.node = () => (d.spec(), E), d.stringify = (D) => {
        let j = D == null ? E : D.node && D.node();
        return j = j == null || !j.$ || a !== j.$.gubu$ && j.$.gubu$ !== !0 ? j : j.v, $e.stringify(j);
      };
      let w = "";
      return d.toString = () => (w = Me(w === "" ? Q(E == null || !E.$ || a !== E.$.gubu$ && E.$.gubu$ !== !0 ? E : E.v) : w), `[Gubu ${c.name} ${w}]`), n.inspect && n.inspect.custom && (d[n.inspect.custom] = d.toString), d.gubu = u, d.spec(), d;
    }
    function Ae(r) {
      let s = !1;
      if (r.tokens == null) {
        s = !0, r.tokens = [];
        let d = /\s*,?\s*([)(\.]|"(\\.|[^"\\])*"|\/(\\.|[^\/\\])*\/[a-z]?|[^)(,\s]+)\s*/g, w = null;
        for (; w = d.exec(r.src); )
          r.tokens.push(w[1]);
      }
      r.i = r.i || 0;
      let c = r.tokens[r.i], y = Pe[c];
      if (r.tokens[r.i] === ")")
        return r.i++, r.val;
      r.i++;
      let h = { Number, String, Boolean };
      if (y == null)
        try {
          return h[c] || (I === c ? void 0 : c === "NaN" ? NaN : c.match(/^\/.+\/$/) ? new RegExp(c.substring(1, c.length - 1)) : st(c));
        } catch {
          throw new SyntaxError(`Gubu: unexpected token ${c} in builder expression ${r.src}`);
        }
      r.tokens[r.i] === "(" && r.i++;
      let E = [], p = null;
      for (; (p = r.tokens[r.i]) != null && p !== ")"; ) {
        let d = Ae(r);
        E.push(d);
      }
      return r.i++, r.val = y.call(r.val, ...E), r.tokens[r.i] === "." ? (r.i++, Ae(r)) : s && r.i < r.tokens.length ? Ae(r) : r.val;
    }
    function Dt(r, s) {
      var c;
      let y, h = {}, E = !1;
      try {
        E = !(s.val !== void 0 || !(!((c = r.gubu$) === null || c === void 0) && c.Check)) || (s.check = r, r(s.val, h, s));
      } catch (d) {
        y = d;
      }
      let p = ae(h.err) ? 0 < h.err.length : h.err != null;
      if (!E || p) {
        if (s.val === void 0 && (s.node.p || !s.node.r) && h.done !== !0)
          return delete h.err, h;
        let d = h.why || le, w = It(s);
        if ($ === typeof h.err)
          s.curerr.push(ue(s, h.err));
        else if (x === typeof h.err)
          s.curerr.push(...[h.err].flat().filter((D) => D != null).map((D) => (D.p = D.p == null ? w : D.p, D.m = D.m == null ? 2010 : D.m, D)));
        else {
          let D = r.name;
          D != null && D != "" || (D = Me(r.toString().replace(/[ \t\r\n]+/g, " "))), s.curerr.push(ee(d, s, 1045, void 0, { thrown: y }, D));
        }
        h.done = h.done == null || h.done;
      }
      return h.hasOwnProperty("uval") ? (s.updateVal(h.uval), s.ignoreVal = !1) : h.val === void 0 || Number.isNaN(h.val) || (s.updateVal(h.val), s.ignoreVal = !1), h.node !== void 0 && (s.node = h.node), h.type !== void 0 && (s.type = h.type), h;
    }
    function It(r) {
      return r.path.slice(1, r.dI + 1).filter((s) => s != null).join(".");
    }
    function Ve(r) {
      return C === typeof r ? r : C === typeof (r == null ? void 0 : r.length) ? r.length : r != null && x === typeof r ? ke(r).length : NaN;
    }
    function Me(r, s) {
      let c = String(r), y = s == null || isNaN(s) ? 30 : s < 0 ? 0 : ~~s, h = r == null ? 0 : c.length, E = r == null ? "" : c.substring(0, h);
      return E = y < h ? E.substring(0, y - 3) + "..." : E, E.substring(0, y);
    }
    const jt = function(r) {
      let s = P(this, r);
      return s.r = !0, s.p = !1, r === void 0 && arguments.length === 1 && (s.t = I, s.v = void 0), s;
    }, Ct = function(r) {
      let s = P(this, r);
      return s.c = we(), s;
    }, Kn = function(r) {
      let s = P(this, r);
      return s.r = !1, r === void 0 && arguments.length === 1 && (s.t = I, s.v = void 0), s;
    }, we = function(r) {
      let s = P(this, r);
      return s.t = A, r !== void 0 && (s.v = r, s.f = r), s;
    }, Rt = function(r, s) {
      let c = P(this, s);
      return c.z = r, c;
    }, Tt = function(r) {
      let s = P(this, r);
      return s.r = !1, s.p = !0, s;
    }, At = function(r) {
      let s = P(this, r);
      return s.r = !1, s.p = !0, s.e = !1, s.a.push(function(c, y, h) {
        return 0 < h.curerr.length && (y.uval = void 0, y.done = !1), !0;
      }), s;
    }, Yn = function(r) {
      let s = P(this);
      return s.t = b, s.v = r, s.f = r, s;
    }, Vt = function(r, s) {
      let c = P(this, s === void 0 ? r : s);
      return c.r = !1, c.f = r, b === typeof r && ut[r.name] && (c.t = r.name.toLowerCase(), c.f = lt(ct[c.t])), c.p = !1, c;
    }, Mt = function(r) {
      let s = P(this, r);
      return s.u.empty = !0, s;
    }, Pt = function(r) {
      let s = P(this, r);
      return s.t = O, s;
    }, Hn = function(r, s) {
      let c = P(this), y = C === typeof r;
      c.t = $, y && s == null && (c = ie([]));
      let h = null;
      return b === typeof r && (h = r, c = we()), c.b.push(function(E, p, d) {
        if (h)
          p.val = h(d.path, d);
        else if (y) {
          let w = r;
          p.val = d.path.slice(d.path.length - 1 - (0 <= w ? w : 0), d.path.length - 1 + (0 <= w ? 0 : 1)), $ === typeof s && (p.val = p.val.join(s));
        } else
          r == null && (p.val = d.path[d.path.length - 2]);
        return !0;
      }), c;
    }, Jn = function(...r) {
      let s = P();
      s.t = U, s.r = !0;
      let c = r.map((y) => $e(y));
      return s.u.list = r, s.b.push(function(y, h, E) {
        let p = !0;
        for (let d of c) {
          let w = Object.assign(Object.assign({}, E.ctx), { err: [] });
          d(y, w), 0 < w.err.length && (p = !1);
        }
        return p || (h.why = Te, h.err = [ue(E, Z + " " + he + de + pe + " does not satisfy all of: " + r.map((d) => Q(d, null, !0)).join(", "))]), p;
      }), s;
    }, Xn = function(...r) {
      let s = P();
      s.t = U, s.r = !0;
      let c = r.map((y) => $e(y));
      return s.u.list = r, s.b.push(function(y, h, E) {
        let p = !1;
        for (let d of c) {
          let w = Object.assign(Object.assign({}, E.ctx), { err: [] }), D = d.match(y, w);
          D && (h.val = d(y, w)), p || (p = D);
        }
        return p || (h.why = Wn, h.err = [ue(E, Z + " " + he + de + pe + " does not satisfy any of: " + r.map((d) => Q(d, null, !0)).join(", "))]), p;
      }), s;
    }, Qn = function(...r) {
      let s = P();
      s.t = U, s.r = !0;
      let c = r.map((y) => $e(y));
      return s.u.list = r, s.b.push(function(y, h, E) {
        let p = 0;
        for (let d of c) {
          let w = Object.assign(Object.assign({}, E.ctx), { err: [] });
          if (d.match(y, w)) {
            p++, h.val = d(y, w);
            break;
          }
        }
        return p !== 1 && (h.why = Ln, h.err = [ue(E, Z + " " + he + de + pe + " does not satisfy one of: " + r.map((d) => Q(d, null, !0)).join(", "))]), !0;
      }), s;
    }, zt = function(...r) {
      let s = P();
      return s.b.push(function(c, y, h) {
        for (let E = 0; E < r.length; E++)
          if (c === r[E])
            return !0;
        if (h.node.hasOwnProperty("f") && c === void 0) {
          const E = h.node.f;
          for (let p = 0; p < r.length; p++)
            if (E === r[p])
              return !0;
        }
        return y.err = ue(h, Z + " " + he + de + pe + " must be exactly one of: " + h.node.s + "."), y.done = !0, !1;
      }), s.s = r.map((c) => Q(c, null, !0)).join(", "), s;
    }, Ft = function(r, s) {
      let c = P(this, s);
      return c.b.push(r), c;
    }, Ye = function(r, s) {
      let c = P(this, s);
      return c.a.push(r), c;
    }, qt = function(r, s) {
      let c = P(this, s);
      if (b === typeof r) {
        let y = r;
        y.gubu$ = y.gubu$ || {}, y.gubu$.Check = !0, c.b.push(r), c.s = (c.s == null ? "" : c.s + ";") + Q(r, null, !0), c.r = !0;
      } else if (x === typeof r) {
        if (Object.prototype.toString.call(r).includes("RegExp")) {
          let y = (h) => h != null && !Number.isNaN(h) && !!String(h).match(r);
          xe(y, m, { value: String(r) }), xe(y, "gubu$", { value: { Check: !0 } }), c.b.push(y), c.s = Q(r), c.r = !0;
        }
      } else
        $ === typeof r && (c.t = r, c.r = !0);
      return c;
    }, Bt = function(r) {
      let s = P(this, r);
      return z === s.t && l !== s.c && s.n === 0 && (s.v = [s.c]), s.c = l, s;
    }, Lt = function(r, s) {
      let c = P(this, s), y = $ === typeof r ? r : (x === typeof r && r || {}).name;
      return y != null && y != "" && c.b.push(function(h, E, p) {
        return (p.ctx.ref = p.ctx.ref || {})[y] = p.node, !0;
      }), c;
    }, Wt = function(r, s) {
      let c = P(this, s), y = x === typeof r && r || {}, h = $ === typeof r ? r : y.name, E = !!y.fill;
      return h != null && h != "" && c.b.push(function(p, d, w) {
        if (p !== void 0 || E) {
          let D = w.ctx.ref = w.ctx.ref || {};
          if (D[h] !== void 0) {
            let j = Object.assign({}, D[h]);
            j.t = j.t || O, d.node = j, d.type = j.t;
          }
        }
        return !0;
      }), c;
    }, Ut = function(r, s) {
      let c = P(this, s), y = x === typeof r && r || {}, h = $ === typeof r ? r : y.name, E = S === typeof y.keep ? y.keep : void 0, p = ae(y.claim) ? y.claim : [];
      if (h != null && h != "") {
        let d = (D, j, _) => {
          if (D === void 0 && 0 < p.length) {
            _.ctx.Rename = _.ctx.Rename || {}, _.ctx.Rename.fromDflt = _.ctx.Rename.fromDflt || {};
            for (let i of p) {
              let N = _.ctx.Rename.fromDflt[i] || {};
              if (_.parent[i] !== void 0 && !N.yes) {
                j.val = _.parent[i], _.match || (_.parent[h] = j.val), j.node = N.node;
                for (let M = 0; M < _.err.length; M++)
                  _.err[M].k === N.key && (_.err.splice(M, 1), M--);
                if (E) {
                  let M = _.cI + 1;
                  _.nodes.splice(M, 0, ie(N.dval)), _.vals.splice(M, 0, void 0), _.parents.splice(M, 0, _.parent), _.keys.splice(M, 0, i), _.nI++, _.pI++;
                } else
                  delete _.parent[i];
                break;
              }
            }
            j.val === void 0 && (j.val = _.node.v);
          }
          return !0;
        };
        xe(d, m, { value: "Rename:" + h }), c.b.push(d);
        let w = (D, j, _) => (_.parent[h] = D, _.match || E || _.key === h || ae(_.parent) && E !== !1 || (delete _.parent[_.key], j.done = !0), _.ctx.Rename = _.ctx.Rename || {}, _.ctx.Rename.fromDflt = _.ctx.Rename.fromDflt || {}, _.ctx.Rename.fromDflt[h] = { yes: _.fromDflt, key: _.key, dval: _.node.v, node: _.node }, !0);
        xe(w, m, { value: "Rename:" + h }), c.a.push(w);
      }
      return c;
    }, Gt = function(r, s) {
      let c = P(this, s);
      return c.b.push(function(y, h, E) {
        let p = Ve(y);
        if (r <= p)
          return !0;
        E.checkargs = { min: 1 };
        let d = C === typeof y ? "" : "length ";
        return h.err = ue(E, Z + " " + he + de + pe + ` must be a minimum ${d}of ${r} (was ${p}).`), !1;
      }), c.s = qn + "(" + r + (s == null ? "" : "," + Q(s)) + ")", c;
    }, Kt = function(r, s) {
      let c = P(this, s);
      return c.b.push(function(y, h, E) {
        let p = Ve(y);
        if (p <= r)
          return !0;
        let d = C === typeof y ? "" : "length ";
        return h.err = ue(E, Z + " " + he + de + pe + ` must be a maximum ${d}of ${r} (was ${p}).`), !1;
      }), c.s = Fn + "(" + r + (s == null ? "" : "," + Q(s)) + ")", c;
    }, Yt = function(r, s) {
      let c = P(this, s);
      return c.b.push(function(y, h, E) {
        let p = Ve(y);
        if (r < p)
          return !0;
        let d = C === typeof y ? "be" : "have length";
        return h.err = ue(E, Z + " " + he + de + pe + ` must ${d} above ${r} (was ${p}).`), !1;
      }), c.s = Ke + "(" + r + (s == null ? "" : "," + Q(s)) + ")", c;
    }, Ht = function(r, s) {
      let c = P(this, s);
      return c.b.push(function(y, h, E) {
        let p = Ve(y);
        if (p < r)
          return !0;
        let d = C === typeof y ? "be" : "have length";
        return h.err = ue(E, Z + " " + he + de + pe + ` must ${d} below ${r} (was ${p}).`), !1;
      }), c.s = zn + "(" + r + (s == null ? "" : "," + Q(s)) + ")", c;
    }, Jt = function(r, s) {
      let c = P(this, s || we());
      return c.b.push(function(y, h, E) {
        let p = Ve(y);
        if (r === p)
          return !0;
        let d = C === typeof y ? "" : " in length";
        return h.err = ue(E, Z + " " + he + de + pe + ` must be exactly ${r}${d} (was ${p}).`), !1;
      }), c.s = Bn + "(" + r + (s == null ? "" : "," + Q(s)) + ")", c;
    }, Xt = function(r, s) {
      let c = P(this, s || {});
      return c.c = ie(r), c;
    }, Qt = function(r, s) {
      let c = P(this, s || []);
      return c.t = "array", c.c = ie(r), c.m = c.m || {}, c.m.rest = !0, c;
    };
    function P(r, s) {
      let c = ie(r == null || r.window === r || r.global === r ? s : r);
      return Object.assign(c, { Above: Yt, After: Ye, Any: we, Before: Ft, Below: Ht, Check: qt, Child: Xt, Closed: Bt, Default: Vt, Define: Lt, Empty: Mt, Exact: zt, Fault: Rt, Ignore: At, Len: Jt, Max: Kt, Min: Gt, Never: Pt, Open: Ct, Refer: Wt, Rename: Ut, Required: jt, Rest: Qt, Skip: Tt });
    }
    function ue(r, s, c, y) {
      return ee(c || le, r, 4e3, s, y);
    }
    function ee(r, s, c, y, h, E) {
      var p;
      let d = { k: s.key, n: s.node, v: s.val, p: It(s), w: r, c: ((p = s.check) === null || p === void 0 ? void 0 : p.name) || "none", a: s.checkargs || {}, m: c, t: "", u: h || {} }, w = Me((s.val === void 0 ? I : Q(s.val)).replace(/"/g, ""));
      if ((y = y || s.node.z) == null || y === "") {
        let D = w.startsWith("[") ? z : w.startsWith("{") ? x : s.val == null || C === typeof s.val && isNaN(s.val) ? "value" : typeof s.val, j = w.startsWith("[") || ae(s.parents[s.pI]) ? "index" : "property", _ = "is", i = h == null ? void 0 : h.k;
        i = ae(i) ? (j = 1 < i.length ? (_ = "are", "properties") : j, i.join(", ")) : i, d.t = "Validation failed for " + (0 < d.p.length ? `${j} "${d.p}" with ` : "") + `${D} "${w}" because ` + (L === r ? F === s.node.t ? `the ${D} is not an instance of ${s.node.u.n}` : `the ${D} is not of type ${me === s.node.t ? $ : s.node.t}` : T === r ? s.val === "" ? "an empty string is not allowed" : `the ${D} is required` : r === "closed" ? `the ${j} "${i}" ${_} not allowed` : me === r ? "the string did not match " + s.node.v : O === r ? "no value is allowed" : `check "${E ?? r}" failed`) + (d.u.thrown ? " (threw: " + d.u.thrown.message + ")" : ".");
      } else
        d.t = y.replace(/\$VALUE/g, w).replace(/\$PATH/g, d.p);
      return d;
    }
    function Zt(r) {
      return r.s != null && r.s !== "" ? r.s : r.r || r.v === void 0 ? r.t : typeof r.v.constructor == "function" ? r.v : r.v.toString();
    }
    function Q(r, s, c, y) {
      let h;
      y || !r || !r.$ || a !== r.$.gubu$ && r.$.gubu$ !== !0 || (r = Zt(r));
      try {
        h = at(r, (E, p) => {
          var d, w;
          if (s && (p = s(E, p)), p != null && x === typeof p && p.constructor && Re !== p.constructor.name && Ge !== p.constructor.name)
            p = g.call(p) === "[object RegExp]" || b === typeof p.toString ? p.toString() : p.constructor.name;
          else if (b === typeof p)
            p = b === typeof Se[p.name] && isNaN(+E) ? void 0 : p.name != null && p.name !== "" ? p.name : Me(p.toString().replace(/[ \t\r\n]+/g, " "));
          else if (typeof p == "bigint")
            p = String(p.toString());
          else {
            if (Number.isNaN(p))
              return "NaN";
            y === !0 || ((d = p == null ? void 0 : p.$) === null || d === void 0 ? void 0 : d.gubu$) !== !0 && a !== ((w = p == null ? void 0 : p.$) === null || w === void 0 ? void 0 : w.gubu$) || (p = Zt(p));
          }
          return p;
        }), h = String(h);
      } catch {
        h = at(String(r));
      }
      return c === !0 && (h = h.replace(/^"/, "").replace(/"$/, "")), h;
    }
    function lt(r) {
      return r == null || x !== typeof r ? r : st(at(r));
    }
    const Zn = (r) => ie(Object.assign(Object.assign({}, r), { $: { gubu$: !0 } })), Pe = { Above: Yt, After: Ye, All: Jn, Any: we, Before: Ft, Below: Ht, Check: qt, Child: Xt, Closed: Bt, Default: Vt, Define: Lt, Empty: Mt, Exact: zt, Fault: Rt, Func: Yn, Ignore: At, Key: Hn, Len: Jt, Max: Kt, Min: Gt, Never: Pt, One: Qn, Open: Ct, Optional: Kn, Refer: Wt, Rename: Ut, Required: jt, Skip: Tt, Some: Xn, Rest: Qt };
    if (I !== typeof window)
      for (let r in Pe)
        xe(Pe[r], m, { value: r });
    Object.assign(Se, Object.assign(Object.assign(Object.assign({ Gubu: Se }, Pe), Object.entries(Pe).reduce((r, s) => (r["G" + s[0]] = s[1], r), {})), { isShape: (r) => r && u === r.gubu, G$: Zn, buildize: P, makeErr: ue, stringify: Q, truncate: Me, nodize: ie, expr: Ae, MakeArgu: er })), xe(Se, m, { value: v });
    const $e = Se;
    o.Gubu = $e;
    function er(r) {
      return function(s, c, y) {
        let h = !1;
        $ === typeof s && (h = !0, y = c, c = s);
        const E = $e(y = y || c, { prefix: r + (c = $ === typeof c ? " (" + c + ")" : "") }), p = E.node(), d = p.k;
        let w = s, D = {}, j = 0, _ = 0;
        for (; j < d.length; j++) {
          let N = p.v[d[j]];
          N.p && (N = p.v[d[j]] = ((M) => Ye(function(K, R, H) {
            if (0 < H.curerr.length) {
              _++;
              for (let B = d.length - 1; B > M; B--)
                p.v[d[B]].m.rest ? D[d[B]].splice(p.v[d[B]].m.rest_pos + M - B, 0, D[d[B - 1]]) : (H.vals[H.pI + B - M] = H.vals[H.pI + B - M - 1], D[d[B]] = D[d[B - 1]]);
              R.uval = void 0, R.done = !1;
            }
            return !0;
          }, N))(j), N.e = !1), j !== d.length - 1 || p.v[d[j]].m.rest || (p.v[d[j]] = Ye(function(M, K, R) {
            return !(d.length - _ < w.length && (R.curerr.length === 0 && (K.err = `Too many arguments for type signature (was ${w.length}, expected ${d.length - _})`), K.fatal = !0, 1));
          }, p.v[d[j]]));
        }
        function i(N) {
          for (let M = 0; M < d.length; M++) {
            let K = p.v[d[M]];
            K.m.rest ? (D[d[M]] = [...N].slice(M), K.m.rest_pos = D[d[M]].length) : D[d[M]] = N[M];
          }
          return D;
        }
        return h ? function(N) {
          return w = N, D = {}, j = 0, _ = 0, E(i(N));
        } : E(i(s));
      };
    }
    const { Gubu: tr } = o;
    return tr;
  });
})(Mn);
var No = Mn.exports;
const _o = "@seneca/redux", Oo = "0.0.3", ko = "Seneca browser library for redux", xo = "MIT", So = "dist/seneca-redux.cjs.js", $o = "dist/seneca-redux.es.js", Do = "dist/seneca-redux.d.ts", Io = "src/seneca-redux.ts", jo = {
  ".": {
    import: "./dist/seneca-redux.es.js",
    require: "./dist/seneca-redux.umd.js"
  }
}, Co = [
  "dist",
  "src",
  "LICENSE"
], Ro = {
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
}, To = {
  "@reduxjs/toolkit": "^2.2.1",
  "@seneca/gateway": "^1.2.0",
  "@seneca/gateway-express": "^0.11.0",
  "@seneca/repl": "^8.1.1",
  "@types/react": "^18.2.55",
  "@types/react-dom": "^18.2.19",
  "@typescript-eslint/eslint-plugin": "^7.0.1",
  "@typescript-eslint/parser": "^7.0.1",
  "@vitejs/plugin-react": "^4.2.1",
  "cookie-parser": "^1.4.6",
  "dts-bundle-generator": "^9.3.1",
  eslint: "^8.56.0",
  "eslint-config-prettier": "^9.1.0",
  "eslint-plugin-prettier": "^5.1.3",
  express: "^4.18.2",
  prettier: "^3.2.5",
  react: "^18.2.0",
  seneca: "^3.34.1",
  "seneca-entity": "^25.1.3",
  "seneca-promisify": "^3.7.1",
  "ts-node": "^10.9.2",
  tslib: "^2.6.2",
  typescript: "^5.3.3",
  vite: "^5.1.3",
  "vite-plugin-dts": "^3.7.2"
}, Ao = {
  name: _o,
  version: Oo,
  description: ko,
  license: xo,
  main: So,
  module: $o,
  types: Do,
  source: Io,
  exports: jo,
  files: Co,
  scripts: Ro,
  devDependencies: To
}, { One: Lo, Default: Vo, Any: Wo, Min: Uo, Skip: mt, Required: Mo, Open: Po } = No.Gubu, zo = {
  name: "seneca",
  debug: !1,
  log: {
    err: !0,
    msg: !1
  },
  state: Vo({}, Po({})),
  store: {},
  slot: {}
}, hn = "@seneca/redux";
function it(e) {
  const t = this, n = t.util.deep;
  e.debug && console.warn(hn, Ao.version, e);
  const o = e.name, a = e.store, u = [], l = [];
  function f(b, x, $) {
    e.log.err && mn($) && ($.when$ = Date.now(), $.kind$ = b, u.push($)), e.log.msg && l.push({
      msg: x,
      res: $,
      when$: Date.now(),
      kind$: b
    });
  }
  const g = e.state;
  for (let b in e.slot)
    yn(g, b);
  const v = lo({
    name: o,
    initialState: g,
    reducers: {
      response: (b, x) => {
        let $ = x.payload, S = $.msg, I = $.res;
        f("response", S, I);
        let A = { ...S, aim: "res" };
        t.find(A) && (A.direct$ = !0, A.res = () => ({
          state: b,
          res: I,
          req: S
        }), t.act(A));
      },
      entityResponse: (b, x) => {
        var me, Re, Ge;
        let $ = x.payload, S = $.msg, I = $.res, A = S.cmd, U = A === "list" ? "list" : "item";
        f("entity", S, I);
        let F = S.slot$ || ((me = S.q) == null ? void 0 : me.slot$) || ((Re = S.ent) == null ? void 0 : Re.slot$);
        if (F == null || F === !1)
          return;
        F === !0 && (F = "");
        let { space: V, slot: L } = Ot(F), W = qe(b, V, !0);
        if (W == null)
          throw new Error("Entity space not prepared: " + V.join("."));
        let se = W.meta && W.meta[L];
        if (se == null)
          throw new Error("Entity slot not prepared: " + F);
        let le = se[U];
        if (le.error = null, le.when = Date.now(), mn(I)) {
          e.debug && console.warn(hn, "entity-error", S, I), le.state = "error", le.error = { ...I };
          return;
        } else if (I != null)
          if (A === "load" || A === "save") {
            let fe = W.item[L] = { ...I.data$() }, Z = W.list[L], Ke = !1;
            W.list[L] = Z.map(
              (Te) => Te.id === fe.id ? (Ke = !0, { ...Te, ...fe }) : Te
            ), Ke || (W.list[L] = Z.concat({ ...fe })), le.state = A === "load" ? "loaded" : "saved";
          } else
            A === "list" && (W.list[L] = I.map((fe) => ({
              ...fe.data$()
            })), le.state = "listed");
        else if (A === "remove") {
          let fe = [(Ge = S.q) == null ? void 0 : Ge.id];
          W.list[L] = W.list[L].filter((Z) => !fe.includes(Z.id)), W.item[L] && fe.includes(W.item[L].id) && (W.item[L] = null, W.meta[L].item.state = "removed");
        } else
          le.state = "done";
      },
      update: (b, x) => {
        let S = x.payload.msg;
        f("update", S);
        let I = S.update || (S.section ? [{ section: S.section, content: S.content }] : []);
        for (let A of I) {
          let U = A.section, F = A.content;
          if (U) {
            let V = U.split("."), L = V[V.length - 1];
            V.length = V.length - 1;
            let W = b;
            for (let se = 0; se < V.length; se++)
              W = W[V[se]] = W[V[se]] || {};
            L != null && (W[L] = F);
          }
        }
      },
      modifier: (b, x) => {
        let S = x.payload.modifier;
        S(b);
      }
    }
  }), {
    response: m,
    entityResponse: k,
    update: O,
    modifier: C
  } = v.actions, T = to(n(a, {
    reducer: {
      [o]: v.reducer
    },
    middleware: (b) => b({
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
  return t.sub("aim:req,out$:true", function(b, x, $) {
    T.dispatch(m({ msg: b, res: x, meta: $ }));
  }).sub("sys:entity,out$:true", function(b, x, $) {
    T.dispatch(k({ msg: b, res: x, meta: $ }));
  }).add(
    "aim:store,set:state",
    {
      section: mt(String),
      content: mt(),
      update: mt([{
        section: String,
        content: Mo()
      }])
    },
    function(b, x, $) {
      T.dispatch(O({ msg: b, meta: $ })), x(b);
    }
  ), t.order.add.add({
    name: "redux_modifier",
    before: "prepare",
    exec: function(b) {
      const x = b.ctx.args, $ = x.pattern, S = x.action;
      if ($.redux$ === !0 && S != null) {
        let I = S;
        x.action = function(A, U, F) {
          T.dispatch(C(
            {
              modifier: (V) => {
                F.custom.state = () => V, I.call(this, A, U, F);
              }
            }
          ));
        }, Object.defineProperty(x.action, "name", {
          value: I.name + "_redux"
        });
      }
    }
  }), {
    name: "Redux",
    exports: {
      slice: v,
      store: T,
      slotSelectors: (b) => {
        let { space: x, slot: $ } = Ot(b);
        return {
          space: x,
          slot: $,
          selectItem: (S) => qe(S[o], x).item[$],
          selectList: (S) => qe(S[o], x).list[$],
          selectMeta: (S, I) => qe(S[o], x).meta[$][I]
        };
      },
      errlog: u,
      msglog: l,
      entityPrepare: yn
    }
  };
}
function yn(e, t) {
  let { space: n, slot: o } = Ot(t), a = qe(e, n, !0);
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
function qe(e, t, n = !1) {
  let o = e;
  for (let a = 0; a < t.length; a++) {
    let u = t[a];
    u == null || u == "" || (o[u] == null && n ? o = o[u] = {} : o = o[u]);
  }
  return o;
}
function mn(e) {
  return Object.prototype.toString.call(e) === "[object Error]";
}
const Pn = rr(null), Fo = (e) => nr.createElement(
  Pn.Provider,
  { value: e.seneca },
  e.children
), qo = () => or(Pn);
it.defaults = zo;
it.SenecaProvider = Fo;
it.useSeneca = qo;
Object.defineProperty(it, "name", { value: "Redux" });
export {
  it as Redux,
  Fo as SenecaProvider,
  it as default,
  qo as useSeneca
};
//# sourceMappingURL=seneca-redux.es.js.map
