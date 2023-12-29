import Qn, { createContext as Zn, useContext as er } from "react";
function G(e) {
  return `Minified Redux error #${e}; visit https://redux.js.org/Errors?code=${e} for the full message or use the non-minified dev environment for full errors. `;
}
var tr = typeof Symbol == "function" && Symbol.observable || "@@observable", Qt = tr, dt = () => Math.random().toString(36).substring(7).split("").join("."), nr = {
  INIT: `@@redux/INIT${/* @__PURE__ */ dt()}`,
  REPLACE: `@@redux/REPLACE${/* @__PURE__ */ dt()}`,
  PROBE_UNKNOWN_ACTION: () => `@@redux/PROBE_UNKNOWN_ACTION${dt()}`
}, we = nr;
function We(e) {
  if (typeof e != "object" || e === null)
    return !1;
  let t = e;
  for (; Object.getPrototypeOf(t) !== null; )
    t = Object.getPrototypeOf(t);
  return Object.getPrototypeOf(e) === t;
}
function rr(e) {
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
  if (sr(e))
    return "date";
  if (ir(e))
    return "error";
  const n = or(e);
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
function or(e) {
  return typeof e.constructor == "function" ? e.constructor.name : null;
}
function ir(e) {
  return e instanceof Error || typeof e.message == "string" && e.constructor && typeof e.constructor.stackTraceLimit == "number";
}
function sr(e) {
  return e instanceof Date ? !0 : typeof e.toDateString == "function" && typeof e.getDate == "function" && typeof e.setDate == "function";
}
function ye(e) {
  let t = typeof e;
  return process.env.NODE_ENV !== "production" && (t = rr(e)), t;
}
function pn(e, t, n) {
  if (typeof e != "function")
    throw new Error(process.env.NODE_ENV === "production" ? G(2) : `Expected the root reducer to be a function. Instead, received: '${ye(e)}'`);
  if (typeof t == "function" && typeof n == "function" || typeof n == "function" && typeof arguments[3] == "function")
    throw new Error(process.env.NODE_ENV === "production" ? G(0) : "It looks like you are passing several store enhancers to createStore(). This is not supported. Instead, compose them together to a single function. See https://redux.js.org/tutorials/fundamentals/part-4-store#creating-a-store-with-enhancers for an example.");
  if (typeof t == "function" && typeof n > "u" && (n = t, t = void 0), typeof n < "u") {
    if (typeof n != "function")
      throw new Error(process.env.NODE_ENV === "production" ? G(1) : `Expected the enhancer to be a function. Instead, received: '${ye(n)}'`);
    return n(pn)(e, t);
  }
  let o = e, a = t, c = /* @__PURE__ */ new Map(), l = c, f = 0, w = !1;
  function v() {
    l === c && (l = /* @__PURE__ */ new Map(), c.forEach((g, b) => {
      l.set(b, g);
    }));
  }
  function m() {
    if (w)
      throw new Error(process.env.NODE_ENV === "production" ? G(3) : "You may not call store.getState() while the reducer is executing. The reducer has already received the state as an argument. Pass it down from the top reducer instead of reading it from the store.");
    return a;
  }
  function N(g) {
    if (typeof g != "function")
      throw new Error(process.env.NODE_ENV === "production" ? G(4) : `Expected the listener to be a function. Instead, received: '${ye(g)}'`);
    if (w)
      throw new Error(process.env.NODE_ENV === "production" ? G(5) : "You may not call store.subscribe() while the reducer is executing. If you would like to be notified after the store has been updated, subscribe from a component and invoke store.getState() in the callback to access the latest state. See https://redux.js.org/api/store#subscribelistener for more details.");
    let b = !0;
    v();
    const x = f++;
    return l.set(x, g), function() {
      if (b) {
        if (w)
          throw new Error(process.env.NODE_ENV === "production" ? G(6) : "You may not unsubscribe from a store listener while the reducer is executing. See https://redux.js.org/api/store#subscribelistener for more details.");
        b = !1, v(), l.delete(x), c = null;
      }
    };
  }
  function S(g) {
    if (!We(g))
      throw new Error(process.env.NODE_ENV === "production" ? G(7) : `Actions must be plain objects. Instead, the actual type was: '${ye(g)}'. You may need to add middleware to your store setup to handle dispatching other values, such as 'redux-thunk' to handle dispatching functions. See https://redux.js.org/tutorials/fundamentals/part-4-store#middleware and https://redux.js.org/tutorials/fundamentals/part-6-async-logic#using-the-redux-thunk-middleware for examples.`);
    if (typeof g.type > "u")
      throw new Error(process.env.NODE_ENV === "production" ? G(8) : 'Actions may not have an undefined "type" property. You may have misspelled an action type string constant.');
    if (typeof g.type != "string")
      throw new Error(process.env.NODE_ENV === "production" ? G(17) : `Action "type" property must be a string. Instead, the actual type was: '${ye(g.type)}'. Value was: '${g.type}' (stringified)`);
    if (w)
      throw new Error(process.env.NODE_ENV === "production" ? G(9) : "Reducers may not dispatch actions.");
    try {
      w = !0, a = o(a, g);
    } finally {
      w = !1;
    }
    return (c = l).forEach((x) => {
      x();
    }), g;
  }
  function D(g) {
    if (typeof g != "function")
      throw new Error(process.env.NODE_ENV === "production" ? G(10) : `Expected the nextReducer to be a function. Instead, received: '${ye(g)}`);
    o = g, S({
      type: we.REPLACE
    });
  }
  function j() {
    const g = N;
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
          throw new Error(process.env.NODE_ENV === "production" ? G(11) : `Expected the observer to be an object. Instead, received: '${ye(b)}'`);
        function x() {
          const A = b;
          A.next && A.next(m());
        }
        return x(), {
          unsubscribe: g(x)
        };
      },
      [Qt]() {
        return this;
      }
    };
  }
  return S({
    type: we.INIT
  }), {
    dispatch: S,
    subscribe: N,
    getState: m,
    replaceReducer: D,
    [Qt]: j
  };
}
function Zt(e) {
  typeof console < "u" && typeof console.error == "function" && console.error(e);
  try {
    throw new Error(e);
  } catch {
  }
}
function ar(e, t, n, o) {
  const a = Object.keys(t), c = n && n.type === we.INIT ? "preloadedState argument passed to createStore" : "previous state received by the reducer";
  if (a.length === 0)
    return "Store does not have a valid reducer. Make sure the argument passed to combineReducers is an object whose values are reducers.";
  if (!We(e))
    return `The ${c} has unexpected type of "${ye(e)}". Expected argument to be an object with the following keys: "${a.join('", "')}"`;
  const l = Object.keys(e).filter((f) => !t.hasOwnProperty(f) && !o[f]);
  if (l.forEach((f) => {
    o[f] = !0;
  }), !(n && n.type === we.REPLACE) && l.length > 0)
    return `Unexpected ${l.length > 1 ? "keys" : "key"} "${l.join('", "')}" found in ${c}. Expected to find one of the known reducer keys instead: "${a.join('", "')}". Unexpected keys will be ignored.`;
}
function ur(e) {
  Object.keys(e).forEach((t) => {
    const n = e[t];
    if (typeof n(void 0, {
      type: we.INIT
    }) > "u")
      throw new Error(process.env.NODE_ENV === "production" ? G(12) : `The slice reducer for key "${t}" returned undefined during initialization. If the state passed to the reducer is undefined, you must explicitly return the initial state. The initial state may not be undefined. If you don't want to set a value for this reducer, you can use null instead of undefined.`);
    if (typeof n(void 0, {
      type: we.PROBE_UNKNOWN_ACTION()
    }) > "u")
      throw new Error(process.env.NODE_ENV === "production" ? G(13) : `The slice reducer for key "${t}" returned undefined when probed with a random type. Don't try to handle '${we.INIT}' or other actions in "redux/*" namespace. They are considered private. Instead, you must return the current state for any unknown actions, unless it is undefined, in which case you must return the initial state, regardless of the action type. The initial state may not be undefined, but can be null.`);
  });
}
function cr(e) {
  const t = Object.keys(e), n = {};
  for (let l = 0; l < t.length; l++) {
    const f = t[l];
    process.env.NODE_ENV !== "production" && typeof e[f] > "u" && Zt(`No reducer provided for key "${f}"`), typeof e[f] == "function" && (n[f] = e[f]);
  }
  const o = Object.keys(n);
  let a;
  process.env.NODE_ENV !== "production" && (a = {});
  let c;
  try {
    ur(n);
  } catch (l) {
    c = l;
  }
  return function(f = {}, w) {
    if (c)
      throw c;
    if (process.env.NODE_ENV !== "production") {
      const N = ar(f, n, w, a);
      N && Zt(N);
    }
    let v = !1;
    const m = {};
    for (let N = 0; N < o.length; N++) {
      const S = o[N], D = n[S], j = f[S], $ = D(j, w);
      if (typeof $ > "u") {
        const g = w && w.type;
        throw new Error(process.env.NODE_ENV === "production" ? G(14) : `When called with an action of type ${g ? `"${String(g)}"` : "(unknown type)"}, the slice reducer for key "${S}" returned undefined. To ignore an action, you must explicitly return the previous state. If you want this reducer to hold no value, you can return null instead of undefined.`);
      }
      m[S] = $, v = v || $ !== j;
    }
    return v = v || o.length !== Object.keys(f).length, v ? m : f;
  };
}
function Je(...e) {
  return e.length === 0 ? (t) => t : e.length === 1 ? e[0] : e.reduce((t, n) => (...o) => t(n(...o)));
}
function lr(...e) {
  return (t) => (n, o) => {
    const a = t(n, o);
    let c = () => {
      throw new Error(process.env.NODE_ENV === "production" ? G(15) : "Dispatching while constructing your middleware is not allowed. Other middleware would not be applied to this dispatch.");
    };
    const l = {
      getState: a.getState,
      dispatch: (w, ...v) => c(w, ...v)
    }, f = e.map((w) => w(l));
    return c = Je(...f)(a.dispatch), {
      ...a,
      dispatch: c
    };
  };
}
function hn(e) {
  return We(e) && "type" in e && typeof e.type == "string";
}
var yn = Symbol.for("immer-nothing"), en = Symbol.for("immer-draftable"), te = Symbol.for("immer-state"), fr = process.env.NODE_ENV !== "production" ? [
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
    const n = fr[e], o = typeof n == "function" ? n.apply(null, t) : n;
    throw new Error(`[Immer] ${o}`);
  }
  throw new Error(
    `[Immer] minified error nr: ${e}. Full error at: https://bit.ly/3cXEKWf`
  );
}
var Ie = Object.getPrototypeOf;
function me(e) {
  return !!e && !!e[te];
}
function pe(e) {
  var t;
  return e ? mn(e) || Array.isArray(e) || !!e[en] || !!((t = e.constructor) != null && t[en]) || tt(e) || nt(e) : !1;
}
var dr = Object.prototype.constructor.toString();
function mn(e) {
  if (!e || typeof e != "object")
    return !1;
  const t = Ie(e);
  if (t === null)
    return !0;
  const n = Object.hasOwnProperty.call(t, "constructor") && t.constructor;
  return n === Object ? !0 : typeof n == "function" && Function.toString.call(n) === dr;
}
function ze(e, t) {
  et(e) === 0 ? Object.entries(e).forEach(([n, o]) => {
    t(n, o, e);
  }) : e.forEach((n, o) => t(o, n, e));
}
function et(e) {
  const t = e[te];
  return t ? t.type_ : Array.isArray(e) ? 1 : tt(e) ? 2 : nt(e) ? 3 : 0;
}
function mt(e, t) {
  return et(e) === 2 ? e.has(t) : Object.prototype.hasOwnProperty.call(e, t);
}
function gn(e, t, n) {
  const o = et(e);
  o === 2 ? e.set(t, n) : o === 3 ? e.add(n) : e[t] = n;
}
function pr(e, t) {
  return e === t ? e !== 0 || 1 / e === 1 / t : e !== e && t !== t;
}
function tt(e) {
  return e instanceof Map;
}
function nt(e) {
  return e instanceof Set;
}
function be(e) {
  return e.copy_ || e.base_;
}
function gt(e, t) {
  if (tt(e))
    return new Map(e);
  if (nt(e))
    return new Set(e);
  if (Array.isArray(e))
    return Array.prototype.slice.call(e);
  if (!t && mn(e))
    return Ie(e) ? { ...e } : Object.assign(/* @__PURE__ */ Object.create(null), e);
  const n = Object.getOwnPropertyDescriptors(e);
  delete n[te];
  let o = Reflect.ownKeys(n);
  for (let a = 0; a < o.length; a++) {
    const c = o[a], l = n[c];
    l.writable === !1 && (l.writable = !0, l.configurable = !0), (l.get || l.set) && (n[c] = {
      configurable: !0,
      writable: !0,
      // could live with !!desc.set as well here...
      enumerable: l.enumerable,
      value: e[c]
    });
  }
  return Object.create(Ie(e), n);
}
function Ot(e, t = !1) {
  return rt(e) || me(e) || !pe(e) || (et(e) > 1 && (e.set = e.add = e.clear = e.delete = hr), Object.freeze(e), t && ze(e, (n, o) => Ot(o, !0))), e;
}
function hr() {
  Z(2);
}
function rt(e) {
  return Object.isFrozen(e);
}
var yr = {};
function Ee(e) {
  const t = yr[e];
  return t || Z(0, e), t;
}
var Fe;
function vn() {
  return Fe;
}
function mr(e, t) {
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
function tn(e, t) {
  t && (Ee("Patches"), e.patches_ = [], e.inversePatches_ = [], e.patchListener_ = t);
}
function vt(e) {
  bt(e), e.drafts_.forEach(gr), e.drafts_ = null;
}
function bt(e) {
  e === Fe && (Fe = e.parent_);
}
function nn(e) {
  return Fe = mr(Fe, e);
}
function gr(e) {
  const t = e[te];
  t.type_ === 0 || t.type_ === 1 ? t.revoke_() : t.revoked_ = !0;
}
function rn(e, t) {
  t.unfinalizedDrafts_ = t.drafts_.length;
  const n = t.drafts_[0];
  return e !== void 0 && e !== n ? (n[te].modified_ && (vt(t), Z(4)), pe(e) && (e = Qe(t, e), t.parent_ || Ze(t, e)), t.patches_ && Ee("Patches").generateReplacementPatches_(
    n[te].base_,
    e,
    t.patches_,
    t.inversePatches_
  )) : e = Qe(t, n, []), vt(t), t.patches_ && t.patchListener_(t.patches_, t.inversePatches_), e !== yn ? e : void 0;
}
function Qe(e, t, n) {
  if (rt(t))
    return t;
  const o = t[te];
  if (!o)
    return ze(
      t,
      (a, c) => on(e, o, t, a, c, n)
    ), t;
  if (o.scope_ !== e)
    return t;
  if (!o.modified_)
    return Ze(e, o.base_, !0), o.base_;
  if (!o.finalized_) {
    o.finalized_ = !0, o.scope_.unfinalizedDrafts_--;
    const a = o.copy_;
    let c = a, l = !1;
    o.type_ === 3 && (c = new Set(a), a.clear(), l = !0), ze(
      c,
      (f, w) => on(e, o, a, f, w, n, l)
    ), Ze(e, a, !1), n && e.patches_ && Ee("Patches").generatePatches_(
      o,
      n,
      e.patches_,
      e.inversePatches_
    );
  }
  return o.copy_;
}
function on(e, t, n, o, a, c, l) {
  if (process.env.NODE_ENV !== "production" && a === n && Z(5), me(a)) {
    const f = c && t && t.type_ !== 3 && // Set objects are atomic since they have no keys.
    !mt(t.assigned_, o) ? c.concat(o) : void 0, w = Qe(e, a, f);
    if (gn(n, o, w), me(w))
      e.canAutoFreeze_ = !1;
    else
      return;
  } else
    l && n.add(a);
  if (pe(a) && !rt(a)) {
    if (!e.immer_.autoFreeze_ && e.unfinalizedDrafts_ < 1)
      return;
    Qe(e, a), (!t || !t.scope_.parent_) && Ze(e, a);
  }
}
function Ze(e, t, n = !1) {
  !e.parent_ && e.immer_.autoFreeze_ && e.canAutoFreeze_ && Ot(t, n);
}
function vr(e, t) {
  const n = Array.isArray(e), o = {
    type_: n ? 1 : 0,
    // Track which produce call this is associated with.
    scope_: t ? t.scope_ : vn(),
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
  let a = o, c = kt;
  n && (a = [o], c = qe);
  const { revoke: l, proxy: f } = Proxy.revocable(a, c);
  return o.draft_ = f, o.revoke_ = l, f;
}
var kt = {
  get(e, t) {
    if (t === te)
      return e;
    const n = be(e);
    if (!mt(n, t))
      return br(e, n, t);
    const o = n[t];
    return e.finalized_ || !pe(o) ? o : o === pt(e.base_, t) ? (ht(e), e.copy_[t] = Et(o, e)) : o;
  },
  has(e, t) {
    return t in be(e);
  },
  ownKeys(e) {
    return Reflect.ownKeys(be(e));
  },
  set(e, t, n) {
    const o = bn(be(e), t);
    if (o != null && o.set)
      return o.set.call(e.draft_, n), !0;
    if (!e.modified_) {
      const a = pt(be(e), t), c = a == null ? void 0 : a[te];
      if (c && c.base_ === n)
        return e.copy_[t] = n, e.assigned_[t] = !1, !0;
      if (pr(n, a) && (n !== void 0 || mt(e.base_, t)))
        return !0;
      ht(e), wt(e);
    }
    return e.copy_[t] === n && // special case: handle new props with value 'undefined'
    (n !== void 0 || t in e.copy_) || // special case: NaN
    Number.isNaN(n) && Number.isNaN(e.copy_[t]) || (e.copy_[t] = n, e.assigned_[t] = !0), !0;
  },
  deleteProperty(e, t) {
    return pt(e.base_, t) !== void 0 || t in e.base_ ? (e.assigned_[t] = !1, ht(e), wt(e)) : delete e.assigned_[t], e.copy_ && delete e.copy_[t], !0;
  },
  // Note: We never coerce `desc.value` into an Immer draft, because we can't make
  // the same guarantee in ES5 mode.
  getOwnPropertyDescriptor(e, t) {
    const n = be(e), o = Reflect.getOwnPropertyDescriptor(n, t);
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
    return Ie(e.base_);
  },
  setPrototypeOf() {
    Z(12);
  }
}, qe = {};
ze(kt, (e, t) => {
  qe[e] = function() {
    return arguments[0] = arguments[0][0], t.apply(this, arguments);
  };
});
qe.deleteProperty = function(e, t) {
  return process.env.NODE_ENV !== "production" && isNaN(parseInt(t)) && Z(13), qe.set.call(this, e, t, void 0);
};
qe.set = function(e, t, n) {
  return process.env.NODE_ENV !== "production" && t !== "length" && isNaN(parseInt(t)) && Z(14), kt.set.call(this, e[0], t, n, e[0]);
};
function pt(e, t) {
  const n = e[te];
  return (n ? be(n) : e)[t];
}
function br(e, t, n) {
  var a;
  const o = bn(t, n);
  return o ? "value" in o ? o.value : (
    // This is a very special case, if the prop is a getter defined by the
    // prototype, we should invoke it with the draft as context!
    (a = o.get) == null ? void 0 : a.call(e.draft_)
  ) : void 0;
}
function bn(e, t) {
  if (!(t in e))
    return;
  let n = Ie(e);
  for (; n; ) {
    const o = Object.getOwnPropertyDescriptor(n, t);
    if (o)
      return o;
    n = Ie(n);
  }
}
function wt(e) {
  e.modified_ || (e.modified_ = !0, e.parent_ && wt(e.parent_));
}
function ht(e) {
  e.copy_ || (e.copy_ = gt(
    e.base_,
    e.scope_.immer_.useStrictShallowCopy_
  ));
}
var wr = class {
  constructor(e) {
    this.autoFreeze_ = !0, this.useStrictShallowCopy_ = !1, this.produce = (t, n, o) => {
      if (typeof t == "function" && typeof n != "function") {
        const c = n;
        n = t;
        const l = this;
        return function(w = c, ...v) {
          return l.produce(w, (m) => n.call(this, m, ...v));
        };
      }
      typeof n != "function" && Z(6), o !== void 0 && typeof o != "function" && Z(7);
      let a;
      if (pe(t)) {
        const c = nn(this), l = Et(t, void 0);
        let f = !0;
        try {
          a = n(l), f = !1;
        } finally {
          f ? vt(c) : bt(c);
        }
        return tn(c, o), rn(a, c);
      } else if (!t || typeof t != "object") {
        if (a = n(t), a === void 0 && (a = t), a === yn && (a = void 0), this.autoFreeze_ && Ot(a, !0), o) {
          const c = [], l = [];
          Ee("Patches").generateReplacementPatches_(t, a, c, l), o(c, l);
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
    pe(e) || Z(8), me(e) && (e = wn(e));
    const t = nn(this), n = Et(e, void 0);
    return n[te].isManual_ = !0, bt(t), n;
  }
  finishDraft(e, t) {
    const n = e && e[te];
    (!n || !n.isManual_) && Z(9);
    const { scope_: o } = n;
    return tn(o, t), rn(void 0, o);
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
    const o = Ee("Patches").applyPatches_;
    return me(e) ? o(e, t) : this.produce(
      e,
      (a) => o(a, t)
    );
  }
};
function Et(e, t) {
  const n = tt(e) ? Ee("MapSet").proxyMap_(e, t) : nt(e) ? Ee("MapSet").proxySet_(e, t) : vr(e, t);
  return (t ? t.scope_ : vn()).drafts_.push(n), n;
}
function wn(e) {
  return me(e) || Z(10, e), En(e);
}
function En(e) {
  if (!pe(e) || rt(e))
    return e;
  const t = e[te];
  let n;
  if (t) {
    if (!t.modified_)
      return t.base_;
    t.finalized_ = !0, n = gt(e, t.scope_.immer_.useStrictShallowCopy_);
  } else
    n = gt(e, !0);
  return ze(n, (o, a) => {
    gn(n, o, En(a));
  }), t && (t.finalized_ = !1), n;
}
var ne = new wr(), Nn = ne.produce;
ne.produceWithPatches.bind(
  ne
);
ne.setAutoFreeze.bind(ne);
ne.setUseStrictShallowCopy.bind(ne);
ne.applyPatches.bind(ne);
ne.createDraft.bind(ne);
ne.finishDraft.bind(ne);
var Er = (e) => {
  let t = !1;
  try {
    const n = {};
    e(n) === n && (t = !0);
  } catch {
  }
  if (t) {
    let n;
    try {
      throw new Error();
    } catch (o) {
      ({ stack: n } = o);
    }
    console.warn(
      `The result function returned its own inputs without modification. e.g
\`createSelector([state => state.todos], todos => todos)\`
This could lead to inefficient memoization and unnecessary re-renders.
Ensure transformation logic is in the result function, and extraction logic is in the input selectors.`,
      { stack: n }
    );
  }
}, Nr = (e, t, n) => {
  const { memoize: o, memoizeOptions: a } = t, { inputSelectorResults: c, inputSelectorResultsCopy: l } = e, f = o(() => ({}), ...a);
  if (!(f.apply(null, c) === f.apply(null, l))) {
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
        firstInputs: c,
        secondInputs: l,
        stack: v
      }
    );
  }
}, _r = {
  inputStabilityCheck: "once",
  identityFunctionCheck: "once"
};
function Or(e, t = `expected a function, instead received ${typeof e}`) {
  if (typeof e != "function")
    throw new TypeError(t);
}
function kr(e, t = "expected all items to be functions, instead received the following types: ") {
  if (!e.every((n) => typeof n == "function")) {
    const n = e.map(
      (o) => typeof o == "function" ? `function ${o.name || "unnamed"}()` : typeof o
    ).join(", ");
    throw new TypeError(`${t}[${n}]`);
  }
}
var sn = (e) => Array.isArray(e) ? e : [e];
function Sr(e) {
  const t = Array.isArray(e[0]) ? e[0] : e;
  return kr(
    t,
    "createSelector expects all input-selectors to be functions, but received the following types: "
  ), t;
}
function an(e, t) {
  const n = [], { length: o } = e;
  for (let a = 0; a < o; a++)
    n.push(e[a].apply(null, t));
  return n;
}
var xr = (e, t) => {
  const { identityFunctionCheck: n, inputStabilityCheck: o } = {
    ..._r,
    ...t
  };
  return {
    identityFunctionCheck: {
      shouldRun: n === "always" || n === "once" && e,
      run: Er
    },
    inputStabilityCheck: {
      shouldRun: o === "always" || o === "once" && e,
      run: Nr
    }
  };
}, Ir = class {
  constructor(e) {
    this.value = e;
  }
  deref() {
    return this.value;
  }
}, Dr = typeof WeakRef < "u" ? WeakRef : Ir, $r = 0, un = 1;
function Ye() {
  return {
    s: $r,
    v: void 0,
    o: null,
    p: null
  };
}
function _n(e, t = {}) {
  let n = Ye();
  const { resultEqualityCheck: o } = t;
  let a, c = 0;
  function l() {
    let f = n;
    const { length: w } = arguments;
    for (let N = 0, S = w; N < S; N++) {
      const D = arguments[N];
      if (typeof D == "function" || typeof D == "object" && D !== null) {
        let j = f.o;
        j === null && (f.o = j = /* @__PURE__ */ new WeakMap());
        const $ = j.get(D);
        $ === void 0 ? (f = Ye(), j.set(D, f)) : f = $;
      } else {
        let j = f.p;
        j === null && (f.p = j = /* @__PURE__ */ new Map());
        const $ = j.get(D);
        $ === void 0 ? (f = Ye(), j.set(D, f)) : f = $;
      }
    }
    const v = f;
    let m;
    if (f.s === un ? m = f.v : (m = e.apply(null, arguments), c++), v.s = un, o) {
      const N = (a == null ? void 0 : a.deref()) ?? a;
      N != null && o(N, m) && (m = N, c !== 0 && c--), a = typeof m == "object" && m !== null || typeof m == "function" ? new Dr(m) : m;
    }
    return v.v = m, m;
  }
  return l.clearCache = () => {
    n = Ye(), l.resetResultsCount();
  }, l.resultsCount = () => c, l.resetResultsCount = () => {
    c = 0;
  }, l;
}
function Cr(e, ...t) {
  const n = typeof e == "function" ? {
    memoize: e,
    memoizeOptions: t
  } : e;
  return (...a) => {
    let c = 0, l = 0, f, w = {}, v = a.pop();
    typeof v == "object" && (w = v, v = a.pop()), Or(
      v,
      `createSelector expects an output function after the inputs, but received: [${typeof v}]`
    );
    const m = {
      ...n,
      ...w
    }, {
      memoize: N,
      memoizeOptions: S = [],
      argsMemoize: D = _n,
      argsMemoizeOptions: j = [],
      devModeChecks: $ = {}
    } = m, g = sn(S), b = sn(j), x = Sr(a), T = N(function() {
      return c++, v.apply(
        null,
        arguments
      );
    }, ...g);
    let A = !0;
    const B = D(function() {
      l++;
      const K = an(
        x,
        arguments
      );
      if (process.env.NODE_ENV !== "production") {
        const { identityFunctionCheck: q, inputStabilityCheck: F } = xr(A, $);
        if (q.shouldRun && q.run(
          v
        ), F.shouldRun) {
          const ie = an(
            x,
            arguments
          );
          F.run(
            { inputSelectorResults: K, inputSelectorResultsCopy: ie },
            { memoize: N, memoizeOptions: g },
            arguments
          );
        }
        A && (A = !1);
      }
      return f = T.apply(null, K), f;
    }, ...b);
    return Object.assign(B, {
      resultFunc: v,
      memoizedResultFunc: T,
      dependencies: x,
      dependencyRecomputations: () => l,
      resetDependencyRecomputations: () => {
        l = 0;
      },
      lastResult: () => f,
      recomputations: () => c,
      resetRecomputations: () => {
        c = 0;
      },
      memoize: N,
      argsMemoize: D
    });
  };
}
function On(e) {
  return ({ dispatch: n, getState: o }) => (a) => (c) => typeof c == "function" ? c(n, o, e) : a(c);
}
var Rr = On(), jr = On, Tr = (...e) => {
  const t = Cr(...e);
  return (...n) => {
    const o = t(...n), a = (c, ...l) => o(me(c) ? wn(c) : c, ...l);
    return Object.assign(a, o), a;
  };
};
Tr(_n);
var Ar = typeof window < "u" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : function() {
  if (arguments.length !== 0)
    return typeof arguments[0] == "object" ? Je : Je.apply(null, arguments);
}, Mr = (e) => e && typeof e.match == "function";
function Be(e, t) {
  function n(...o) {
    if (t) {
      let a = t(...o);
      if (!a)
        throw new Error(process.env.NODE_ENV === "production" ? z(0) : "prepareAction did not return an object");
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
  return n.toString = () => `${e}`, n.type = e, n.match = (o) => hn(o) && o.type === e, n;
}
function Vr(e) {
  return typeof e == "function" && "type" in e && // hasMatchFunction only wants Matchers but I don't see the point in rewriting it
  Mr(e);
}
function Pr(e) {
  const t = e ? `${e}`.split("/") : [], n = t[t.length - 1] || "actionCreator";
  return `Detected an action creator with type "${e || "unknown"}" being dispatched. 
Make sure you're calling the action creator before dispatching, i.e. \`dispatch(${n}())\` instead of \`dispatch(${n})\`. This is necessary even if the action has no payload.`;
}
function zr(e = {}) {
  if (process.env.NODE_ENV === "production")
    return () => (n) => (o) => n(o);
  const {
    isActionCreator: t = Vr
  } = e;
  return () => (n) => (o) => (t(o) && console.warn(Pr(o.type)), n(o));
}
function kn(e, t) {
  let n = 0;
  return {
    measureTime(o) {
      const a = Date.now();
      try {
        return o();
      } finally {
        const c = Date.now();
        n += c - a;
      }
    },
    warnIfExceeded() {
      n > e && console.warn(`${t} took ${n}ms, which is more than the warning threshold of ${e}ms. 
If your state or actions are very large, you may want to disable the middleware as it might cause too much of a slowdown in development mode. See https://redux-toolkit.js.org/api/getDefaultMiddleware for instructions.
It is disabled in production builds, so you don't need to worry about that.`);
    }
  };
}
var Sn = class Ve extends Array {
  constructor(...t) {
    super(...t), Object.setPrototypeOf(this, Ve.prototype);
  }
  static get [Symbol.species]() {
    return Ve;
  }
  concat(...t) {
    return super.concat.apply(this, t);
  }
  prepend(...t) {
    return t.length === 1 && Array.isArray(t[0]) ? new Ve(...t[0].concat(this)) : new Ve(...t.concat(this));
  }
};
function cn(e) {
  return pe(e) ? Nn(e, () => {
  }) : e;
}
function ln(e, t, n) {
  if (e.has(t)) {
    let a = e.get(t);
    return n.update && (a = n.update(a, t, e), e.set(t, a)), a;
  }
  if (!n.insert)
    throw new Error(process.env.NODE_ENV === "production" ? z(10) : "No insert provided for key not already in map");
  const o = n.insert(t, e);
  return e.set(t, o), o;
}
function Fr(e) {
  return typeof e != "object" || e == null || Object.isFrozen(e);
}
function qr(e, t, n) {
  const o = xn(e, t, n);
  return {
    detectMutations() {
      return In(e, t, o, n);
    }
  };
}
function xn(e, t = [], n, o = "", a = /* @__PURE__ */ new Set()) {
  const c = {
    value: n
  };
  if (!e(n) && !a.has(n)) {
    a.add(n), c.children = {};
    for (const l in n) {
      const f = o ? o + "." + l : l;
      t.length && t.indexOf(f) !== -1 || (c.children[l] = xn(e, t, n[l], f));
    }
  }
  return c;
}
function In(e, t = [], n, o, a = !1, c = "") {
  const l = n ? n.value : void 0, f = l === o;
  if (a && !f && !Number.isNaN(o))
    return {
      wasMutated: !0,
      path: c
    };
  if (e(l) || e(o))
    return {
      wasMutated: !1
    };
  const w = {};
  for (let m in n.children)
    w[m] = !0;
  for (let m in o)
    w[m] = !0;
  const v = t.length > 0;
  for (let m in w) {
    const N = c ? c + "." + m : m;
    if (v && t.some((j) => j instanceof RegExp ? j.test(N) : N === j))
      continue;
    const S = In(e, t, n.children[m], o[m], f, N);
    if (S.wasMutated)
      return S;
  }
  return {
    wasMutated: !1
  };
}
function Br(e = {}) {
  if (process.env.NODE_ENV === "production")
    return () => (t) => (n) => t(n);
  {
    let t = function(f, w, v, m) {
      return JSON.stringify(f, n(w, m), v);
    }, n = function(f, w) {
      let v = [], m = [];
      return w || (w = function(N, S) {
        return v[0] === S ? "[Circular ~]" : "[Circular ~." + m.slice(0, v.indexOf(S)).join(".") + "]";
      }), function(N, S) {
        if (v.length > 0) {
          var D = v.indexOf(this);
          ~D ? v.splice(D + 1) : v.push(this), ~D ? m.splice(D, 1 / 0, N) : m.push(N), ~v.indexOf(S) && (S = w.call(this, N, S));
        } else
          v.push(S);
        return f == null ? S : f.call(this, N, S);
      };
    }, {
      isImmutable: o = Fr,
      ignoredPaths: a,
      warnAfter: c = 32
    } = e;
    const l = qr.bind(null, o, a);
    return ({
      getState: f
    }) => {
      let w = f(), v = l(w), m;
      return (N) => (S) => {
        const D = kn(c, "ImmutableStateInvariantMiddleware");
        D.measureTime(() => {
          if (w = f(), m = v.detectMutations(), v = l(w), m.wasMutated)
            throw new Error(process.env.NODE_ENV === "production" ? z(19) : `A state mutation was detected between dispatches, in the path '${m.path || ""}'.  This may cause incorrect behavior. (https://redux.js.org/style-guide/style-guide#do-not-mutate-state)`);
        });
        const j = N(S);
        return D.measureTime(() => {
          if (w = f(), m = v.detectMutations(), v = l(w), m.wasMutated)
            throw new Error(process.env.NODE_ENV === "production" ? z(20) : `A state mutation was detected inside a dispatch, in the path: ${m.path || ""}. Take a look at the reducer(s) handling the action ${t(S)}. (https://redux.js.org/style-guide/style-guide#do-not-mutate-state)`);
        }), D.warnIfExceeded(), j;
      };
    };
  }
}
function Dn(e) {
  const t = typeof e;
  return e == null || t === "string" || t === "boolean" || t === "number" || Array.isArray(e) || We(e);
}
function Nt(e, t = "", n = Dn, o, a = [], c) {
  let l;
  if (!n(e))
    return {
      keyPath: t || "<root>",
      value: e
    };
  if (typeof e != "object" || e === null || c != null && c.has(e))
    return !1;
  const f = o != null ? o(e) : Object.entries(e), w = a.length > 0;
  for (const [v, m] of f) {
    const N = t ? t + "." + v : v;
    if (!(w && a.some((D) => D instanceof RegExp ? D.test(N) : N === D))) {
      if (!n(m))
        return {
          keyPath: N,
          value: m
        };
      if (typeof m == "object" && (l = Nt(m, N, n, o, a, c), l))
        return l;
    }
  }
  return c && $n(e) && c.add(e), !1;
}
function $n(e) {
  if (!Object.isFrozen(e))
    return !1;
  for (const t of Object.values(e))
    if (!(typeof t != "object" || t === null) && !$n(t))
      return !1;
  return !0;
}
function Wr(e = {}) {
  if (process.env.NODE_ENV === "production")
    return () => (t) => (n) => t(n);
  {
    const {
      isSerializable: t = Dn,
      getEntries: n,
      ignoredActions: o = [],
      ignoredActionPaths: a = ["meta.arg", "meta.baseQueryMeta"],
      ignoredPaths: c = [],
      warnAfter: l = 32,
      ignoreState: f = !1,
      ignoreActions: w = !1,
      disableCache: v = !1
    } = e, m = !v && WeakSet ? /* @__PURE__ */ new WeakSet() : void 0;
    return (N) => (S) => (D) => {
      if (!hn(D))
        return S(D);
      const j = S(D), $ = kn(l, "SerializableStateInvariantMiddleware");
      return !w && !(o.length && o.indexOf(D.type) !== -1) && $.measureTime(() => {
        const g = Nt(D, "", t, n, a, m);
        if (g) {
          const {
            keyPath: b,
            value: x
          } = g;
          console.error(`A non-serializable value was detected in an action, in the path: \`${b}\`. Value:`, x, `
Take a look at the logic that dispatched this action: `, D, `
(See https://redux.js.org/faq/actions#why-should-type-be-a-string-or-at-least-serializable-why-should-my-action-types-be-constants)`, `
(To allow non-serializable values see: https://redux-toolkit.js.org/usage/usage-guide#working-with-non-serializable-data)`);
        }
      }), f || ($.measureTime(() => {
        const g = N.getState(), b = Nt(g, "", t, n, c, m);
        if (b) {
          const {
            keyPath: x,
            value: T
          } = b;
          console.error(`A non-serializable value was detected in the state, in the path: \`${x}\`. Value:`, T, `
Take a look at the reducer(s) handling this action type: ${D.type}.
(See https://redux.js.org/faq/organizing-state#can-i-put-functions-promises-or-other-non-serializable-items-in-my-store-state)`);
        }
      }), $.warnIfExceeded()), j;
    };
  }
}
function He(e) {
  return typeof e == "boolean";
}
var Lr = () => function(t) {
  const {
    thunk: n = !0,
    immutableCheck: o = !0,
    serializableCheck: a = !0,
    actionCreatorCheck: c = !0
  } = t ?? {};
  let l = new Sn();
  if (n && (He(n) ? l.push(Rr) : l.push(jr(n.extraArgument))), process.env.NODE_ENV !== "production") {
    if (o) {
      let f = {};
      He(o) || (f = o), l.unshift(Br(f));
    }
    if (a) {
      let f = {};
      He(a) || (f = a), l.push(Wr(f));
    }
    if (c) {
      let f = {};
      He(c) || (f = c), l.unshift(zr(f));
    }
  }
  return l;
}, Ur = "RTK_autoBatch", Cn = (e) => (t) => {
  setTimeout(t, e);
}, Gr = typeof window < "u" && window.requestAnimationFrame ? window.requestAnimationFrame : Cn(10), Kr = (e = {
  type: "raf"
}) => (t) => (...n) => {
  const o = t(...n);
  let a = !0, c = !1, l = !1;
  const f = /* @__PURE__ */ new Set(), w = e.type === "tick" ? queueMicrotask : e.type === "raf" ? Gr : e.type === "callback" ? e.queueNotification : Cn(e.timeout), v = () => {
    l = !1, c && (c = !1, f.forEach((m) => m()));
  };
  return Object.assign({}, o, {
    // Override the base `store.subscribe` method to keep original listeners
    // from running if we're delaying notifications
    subscribe(m) {
      const N = () => a && m(), S = o.subscribe(N);
      return f.add(m), () => {
        S(), f.delete(m);
      };
    },
    // Override the base `store.dispatch` method so that we can check actions
    // for the `shouldAutoBatch` flag and determine if batching is active
    dispatch(m) {
      var N;
      try {
        return a = !((N = m == null ? void 0 : m.meta) != null && N[Ur]), c = !a, c && (l || (l = !0, w(v))), o.dispatch(m);
      } finally {
        a = !0;
      }
    }
  });
}, Yr = (e) => function(n) {
  const {
    autoBatch: o = !0
  } = n ?? {};
  let a = new Sn(e);
  return o && a.push(Kr(typeof o == "object" ? o : void 0)), a;
}, he = process.env.NODE_ENV === "production";
function Hr(e) {
  const t = Lr(), {
    reducer: n = void 0,
    middleware: o,
    devTools: a = !0,
    preloadedState: c = void 0,
    enhancers: l = void 0
  } = e || {};
  let f;
  if (typeof n == "function")
    f = n;
  else if (We(n))
    f = cr(n);
  else
    throw new Error(process.env.NODE_ENV === "production" ? z(1) : "`reducer` is a required argument, and must be a function or an object of functions that can be passed to combineReducers");
  if (!he && o && typeof o != "function")
    throw new Error(process.env.NODE_ENV === "production" ? z(2) : "`middleware` field must be a callback");
  let w;
  if (typeof o == "function") {
    if (w = o(t), !he && !Array.isArray(w))
      throw new Error(process.env.NODE_ENV === "production" ? z(3) : "when using a middleware builder function, an array of middleware must be returned");
  } else
    w = t();
  if (!he && w.some((j) => typeof j != "function"))
    throw new Error(process.env.NODE_ENV === "production" ? z(4) : "each middleware provided to configureStore must be a function");
  let v = Je;
  a && (v = Ar({
    // Enable capture of stack traces for dispatched Redux actions
    trace: !he,
    ...typeof a == "object" && a
  }));
  const m = lr(...w), N = Yr(m);
  if (!he && l && typeof l != "function")
    throw new Error(process.env.NODE_ENV === "production" ? z(5) : "`enhancers` field must be a callback");
  let S = typeof l == "function" ? l(N) : N();
  if (!he && !Array.isArray(S))
    throw new Error(process.env.NODE_ENV === "production" ? z(6) : "`enhancers` callback must return an array");
  if (!he && S.some((j) => typeof j != "function"))
    throw new Error(process.env.NODE_ENV === "production" ? z(7) : "each enhancer provided to configureStore must be a function");
  !he && w.length && !S.includes(m) && console.error("middlewares were provided, but middleware enhancer was not included in final enhancers - make sure to call `getDefaultEnhancers`");
  const D = v(...S);
  return pn(f, c, D);
}
function Rn(e) {
  const t = {}, n = [];
  let o;
  const a = {
    addCase(c, l) {
      if (process.env.NODE_ENV !== "production") {
        if (n.length > 0)
          throw new Error(process.env.NODE_ENV === "production" ? z(26) : "`builder.addCase` should only be called before calling `builder.addMatcher`");
        if (o)
          throw new Error(process.env.NODE_ENV === "production" ? z(27) : "`builder.addCase` should only be called before calling `builder.addDefaultCase`");
      }
      const f = typeof c == "string" ? c : c.type;
      if (!f)
        throw new Error(process.env.NODE_ENV === "production" ? z(28) : "`builder.addCase` cannot be called with an empty action type");
      if (f in t)
        throw new Error(process.env.NODE_ENV === "production" ? z(29) : `\`builder.addCase\` cannot be called with two reducers for the same action type '${f}'`);
      return t[f] = l, a;
    },
    addMatcher(c, l) {
      if (process.env.NODE_ENV !== "production" && o)
        throw new Error(process.env.NODE_ENV === "production" ? z(30) : "`builder.addMatcher` should only be called before calling `builder.addDefaultCase`");
      return n.push({
        matcher: c,
        reducer: l
      }), a;
    },
    addDefaultCase(c) {
      if (process.env.NODE_ENV !== "production" && o)
        throw new Error(process.env.NODE_ENV === "production" ? z(31) : "`builder.addDefaultCase` can only be called once");
      return o = c, a;
    }
  };
  return e(a), [t, n, o];
}
function Xr(e) {
  return typeof e == "function";
}
function Jr(e, t) {
  if (process.env.NODE_ENV !== "production" && typeof t == "object")
    throw new Error(process.env.NODE_ENV === "production" ? z(8) : "The object notation for `createReducer` has been removed. Please use the 'builder callback' notation instead: https://redux-toolkit.js.org/api/createReducer");
  let [n, o, a] = Rn(t), c;
  if (Xr(e))
    c = () => cn(e());
  else {
    const f = cn(e);
    c = () => f;
  }
  function l(f = c(), w) {
    let v = [n[w.type], ...o.filter(({
      matcher: m
    }) => m(w)).map(({
      reducer: m
    }) => m)];
    return v.filter((m) => !!m).length === 0 && (v = [a]), v.reduce((m, N) => {
      if (N)
        if (me(m)) {
          const D = N(m, w);
          return D === void 0 ? m : D;
        } else {
          if (pe(m))
            return Nn(m, (S) => N(S, w));
          {
            const S = N(m, w);
            if (S === void 0) {
              if (m === null)
                return m;
              throw new Error(process.env.NODE_ENV === "production" ? z(9) : "A case reducer on a non-draftable value must not return undefined");
            }
            return S;
          }
        }
      return m;
    }, f);
  }
  return l.getInitialState = c, l;
}
var Qr = Symbol.for("rtk-slice-createasyncthunk");
function Zr(e, t) {
  return `${e}/${t}`;
}
function eo({
  creators: e
} = {}) {
  var n;
  const t = (n = e == null ? void 0 : e.asyncThunk) == null ? void 0 : n[Qr];
  return function(a) {
    const {
      name: c,
      reducerPath: l = c
    } = a;
    if (!c)
      throw new Error(process.env.NODE_ENV === "production" ? z(11) : "`name` is a required option for createSlice");
    typeof process < "u" && process.env.NODE_ENV === "development" && a.initialState === void 0 && console.error("You must provide an `initialState` value that is not `undefined`. You may have misspelled `initialState`");
    const f = (typeof a.reducers == "function" ? a.reducers(ro()) : a.reducers) || {}, w = Object.keys(f), v = {
      sliceCaseReducersByName: {},
      sliceCaseReducersByType: {},
      actionCreators: {},
      sliceMatchers: []
    }, m = {
      addCase(g, b) {
        const x = typeof g == "string" ? g : g.type;
        if (!x)
          throw new Error(process.env.NODE_ENV === "production" ? z(12) : "`context.addCase` cannot be called with an empty action type");
        if (x in v.sliceCaseReducersByType)
          throw new Error(process.env.NODE_ENV === "production" ? z(13) : "`context.addCase` cannot be called with two reducers for the same action type: " + x);
        return v.sliceCaseReducersByType[x] = b, m;
      },
      addMatcher(g, b) {
        return v.sliceMatchers.push({
          matcher: g,
          reducer: b
        }), m;
      },
      exposeAction(g, b) {
        return v.actionCreators[g] = b, m;
      },
      exposeCaseReducer(g, b) {
        return v.sliceCaseReducersByName[g] = b, m;
      }
    };
    w.forEach((g) => {
      const b = f[g], x = {
        reducerName: g,
        type: Zr(c, g),
        createNotation: typeof a.reducers == "function"
      };
      io(b) ? ao(x, b, m, t) : oo(x, b, m);
    });
    function N() {
      if (process.env.NODE_ENV !== "production" && typeof a.extraReducers == "object")
        throw new Error(process.env.NODE_ENV === "production" ? z(14) : "The object notation for `createSlice.extraReducers` has been removed. Please use the 'builder callback' notation instead: https://redux-toolkit.js.org/api/createSlice");
      const [g = {}, b = [], x = void 0] = typeof a.extraReducers == "function" ? Rn(a.extraReducers) : [a.extraReducers], T = {
        ...g,
        ...v.sliceCaseReducersByType
      };
      return Jr(a.initialState, (A) => {
        for (let B in T)
          A.addCase(B, T[B]);
        for (let B of v.sliceMatchers)
          A.addMatcher(B.matcher, B.reducer);
        for (let B of b)
          A.addMatcher(B.matcher, B.reducer);
        x && A.addDefaultCase(x);
      });
    }
    const S = (g) => g, D = /* @__PURE__ */ new WeakMap();
    let j;
    const $ = {
      name: c,
      reducerPath: l,
      reducer(g, b) {
        return j || (j = N()), j(g, b);
      },
      actions: v.actionCreators,
      caseReducers: v.sliceCaseReducersByName,
      getInitialState() {
        return j || (j = N()), j.getInitialState();
      },
      getSelectors(g = S) {
        const b = ln(D, this, {
          insert: () => /* @__PURE__ */ new WeakMap()
        });
        return ln(b, g, {
          insert: () => {
            const x = {};
            for (const [T, A] of Object.entries(a.selectors ?? {}))
              x[T] = to(this, A, g, this !== $);
            return x;
          }
        });
      },
      selectSlice(g) {
        let b = g[this.reducerPath];
        if (typeof b > "u") {
          if (this !== $)
            b = this.getInitialState();
          else if (process.env.NODE_ENV !== "production")
            throw new Error(process.env.NODE_ENV === "production" ? z(15) : "selectSlice returned undefined for an uninjected slice reducer");
        }
        return b;
      },
      get selectors() {
        return this.getSelectors(this.selectSlice);
      },
      injectInto(g, {
        reducerPath: b,
        ...x
      } = {}) {
        const T = b ?? this.reducerPath;
        return g.inject({
          reducerPath: T,
          reducer: this.reducer
        }, x), {
          ...this,
          reducerPath: T
        };
      }
    };
    return $;
  };
}
function to(e, t, n, o) {
  function a(c, ...l) {
    let f = n.call(e, c);
    if (typeof f > "u") {
      if (o)
        f = e.getInitialState();
      else if (process.env.NODE_ENV !== "production")
        throw new Error(process.env.NODE_ENV === "production" ? z(16) : "selectState returned undefined for an uninjected slice reducer");
    }
    return t(f, ...l);
  }
  return a.unwrapped = t, a;
}
var no = eo();
function ro() {
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
function oo({
  type: e,
  reducerName: t,
  createNotation: n
}, o, a) {
  let c, l;
  if ("reducer" in o) {
    if (n && !so(o))
      throw new Error(process.env.NODE_ENV === "production" ? z(17) : "Please use the `create.preparedReducer` notation for prepared action creators with the `create` notation.");
    c = o.reducer, l = o.prepare;
  } else
    c = o;
  a.addCase(e, c).exposeCaseReducer(t, c).exposeAction(t, l ? Be(e, l) : Be(e));
}
function io(e) {
  return e._reducerDefinitionType === "asyncThunk";
}
function so(e) {
  return e._reducerDefinitionType === "reducerWithPrepare";
}
function ao({
  type: e,
  reducerName: t
}, n, o, a) {
  if (!a)
    throw new Error(process.env.NODE_ENV === "production" ? z(18) : "Cannot use `create.asyncThunk` in the built-in `createSlice`. Use `buildCreateSlice({ creators: { asyncThunk: asyncThunkCreator } })` to create a customised version of `createSlice`.");
  const {
    payloadCreator: c,
    fulfilled: l,
    pending: f,
    rejected: w,
    settled: v,
    options: m
  } = n, N = a(e, c, m);
  o.exposeAction(t, N), l && o.addCase(N.fulfilled, l), f && o.addCase(N.pending, f), w && o.addCase(N.rejected, w), v && o.addMatcher(N.settled, v), o.exposeCaseReducer(t, {
    fulfilled: l || Xe,
    pending: f || Xe,
    rejected: w || Xe,
    settled: v || Xe
  });
}
function Xe() {
}
var St = "listenerMiddleware";
Be(`${St}/add`);
Be(`${St}/removeAll`);
Be(`${St}/remove`);
function z(e) {
  return `Minified Redux Toolkit error #${e}; visit https://redux-toolkit.js.org/Errors?code=${e} for the full message or use the non-minified dev environment for full errors. `;
}
var jn = { exports: {} };
(function(e, t) {
  (function(n) {
    e.exports = n();
  })(function() {
    var n = {}, o = {};
    Object.defineProperty(o, "__esModule", { value: !0 }), o.Gubu = void 0;
    const a = Symbol.for("gubu$"), c = { gubu$: a, v$: "6.0.1" }, l = Symbol.for("gubu$nil"), f = /^[A-Z]/, w = "gubu", v = "name", m = "nan", N = "never", S = "number", D = "required", j = "array", $ = "function", g = "object", b = "string", x = "boolean", T = "undefined", A = "any", B = "list", J = "instance", K = "null", q = "type", F = "closed", ie = "shape", ce = "check", De = "Object", Le = "Array", Ue = "Function", L = "Value", Ne = "Above", Ge = "All", $e = "Below", An = "Max", Mn = "Min", Vn = "Len", Pn = "One", zn = "Some", le = " for property ", fe = '"$PATH"', de = '"$VALUE"', _e = (r) => Object.keys(r), Oe = (r, s, u) => Object.defineProperty(r, s, u), se = (r) => Array.isArray(r), it = (r) => JSON.parse(r), st = (r, s) => JSON.stringify(r, s);
    class Fn {
      constructor(s, u, y, p) {
        this.match = !1, this.dI = 0, this.nI = 2, this.cI = -1, this.pI = 0, this.sI = -1, this.valType = N, this.isRoot = !1, this.key = "", this.type = N, this.stop = !0, this.nextSibling = !0, this.fromDefault = !1, this.ignoreVal = void 0, this.curerr = [], this.err = [], this.parents = [], this.keys = [], this.path = [], this.root = s, this.vals = [s, -1], this.node = u, this.nodes = [u, -1], this.ctx = y || {}, this.match = !!p;
      }
      next() {
        this.stop = !1, this.fromDefault = !1, this.ignoreVal = void 0, this.isRoot = this.pI === 0, this.check = void 0;
        let s = this.nodes[this.pI];
        for (; +s; )
          this.dI--, this.ctx.log && -1 < this.dI && this.ctx.log("e" + (se(this.parents[this.pI]) ? "a" : "o"), this), this.pI = +s, s = this.nodes[this.pI];
        s ? (this.node = s, this.updateVal(this.vals[this.pI]), this.key = this.keys[this.pI], this.cI = this.pI, this.sI = this.pI + 1, this.parent = this.parents[this.pI], this.nextSibling = !0, this.type = this.node.t, this.path[this.dI] = this.key, this.oval = this.val, this.curerr.length = 0) : this.stop = !0;
      }
      updateVal(s) {
        this.val = s, this.valType = typeof this.val, S === this.valType && isNaN(this.val) && (this.valType = m), this.isRoot && !this.match && (this.root = this.val);
      }
    }
    class qn extends TypeError {
      constructor(s, u, y, p) {
        var _;
        super((u = u == null ? "" : u + ": ") + y.map((h) => h.t).join(`
`)), this.gubu = !0, this.name = "GubuError", this.code = s, this.prefix = u, this.desc = () => ({ name: "GubuError", code: s, err: y, ctx: p }), this.stack = (_ = this.stack) === null || _ === void 0 ? void 0 : _.replace(/.*\/gubu\/gubu\.[tj]s.*\n/g, ""), this.props = y.map((h) => {
          var d;
          return { path: h.p, what: h.w, type: (d = h.n) === null || d === void 0 ? void 0 : d.t, value: h.v };
        });
      }
      toJSON() {
        return Object.assign(Object.assign({}, this), { err: this.desc().err, name: this.name, message: this.message });
      }
    }
    const at = { String: !0, Number: !0, Boolean: !0, Object: !0, Array: !0, Function: !0, Symbol: !0, BigInt: !0 }, ut = { string: "", number: 0, boolean: !1, object: {}, array: [], symbol: Symbol(""), bigint: BigInt(0), null: null };
    function re(r, s, u) {
      var y, p, _, h;
      if (ke === r)
        r = void 0;
      else if (r != null && (!((y = r.$) === null || y === void 0) && y.gubu$)) {
        if (a === r.$.gubu$)
          return r.d = s ?? r.d, r;
        if (r.$.gubu$ === !0) {
          let C = Object.assign({}, r);
          return C.$ = Object.assign(Object.assign({ v$: "6.0.1" }, C.$), { gubu$: a }), C.v = C.v != null && g === typeof C.v ? Object.assign({}, C.v) : C.v, C.t = C.t || typeof C.v, $ === C.t && at[C.v.name] && (C.t = C.v.name.toLowerCase(), C.v = ct(ut[C.t]), C.f = C.v), C.r = !!C.r, C.p = !!C.p, C.d = s ?? (C.d == null ? -1 : C.d), C.b = C.b || [], C.a = C.a || [], C.u = C.u || {}, C.m = C.m || u || {}, C;
        }
      }
      let d = r === null ? K : typeof r;
      d = T === d ? A : d;
      let E = r, I = E, R = l, k = !1, i = {}, O = [], M = [];
      if (g === d)
        I = void 0, se(E) ? (d = j, E.length === 1 && (R = E[0], E = [])) : E != null && Function !== E.constructor && Object !== E.constructor && E.constructor != null ? (d = J, i.n = E.constructor.name, i.i = E.constructor, I = E) : _e(E).length === 0 && (R = ge());
      else if ($ === d)
        if (at[r.name])
          d = r.name.toLowerCase(), k = !0, E = ct(ut[d]), I = E, De === r.name && (R = ge());
        else if (E.gubu === c || ((p = E.$) === null || p === void 0 ? void 0 : p.gubu) === !0) {
          let C = E.node ? E.node() : E;
          d = C.t, E = C.v, I = E, k = C.r, i = Object.assign({}, C.u), O = [...C.a], M = [...C.b];
        } else
          Ue === E.constructor.name && f.test(E.name) && (d = J, k = !0, i.n = (h = (_ = E.prototype) === null || _ === void 0 ? void 0 : _.constructor) === null || h === void 0 ? void 0 : h.name, i.i = E);
      else
        S === d && isNaN(E) ? d = m : b === d && E === "" && (i.empty = !0);
      let U = E == null || g !== d && j !== d ? E : Object.assign({}, E);
      return { $: c, t: d, v: U, f: I, n: U != null && g === typeof U ? _e(U).length : 0, c: R, r: k, p: !1, d: s ?? -1, k: [], e: !0, u: i, a: O, b: M, m: u || {} };
    }
    function ke(r, s) {
      const u = s ?? {};
      u.name = u.name == null ? "G" + ("" + Math.random()).substring(2, 8) : "" + u.name, u.prefix = u.prefix == null ? void 0 : u.prefix;
      let y = u.meta = u.meta || {};
      y.active = y.active === !0 || !1, y.suffix = b == typeof y.suffix ? y.suffix : "$$";
      let p = u.keyexpr = u.keyexpr || {};
      p.active = p.active !== !1;
      let _ = re(r, 0);
      function h(I, R, k) {
        let i = new Fn(I, _, R, k);
        for (; i.next(), !i.stop; ) {
          let O = i.node, M = !1, U = !1;
          if (0 < O.b.length)
            for (let Y = 0; Y < O.b.length; Y++) {
              let P = xt(O.b[Y], i);
              O = i.node, P.done !== void 0 && (M = P.done), U = U || !!P.fatal;
            }
          if (!M) {
            let Y = !0, P = i.val === void 0;
            if (N === i.type)
              i.curerr.push(oe(N, i, 1070));
            else if (g === i.type) {
              let W;
              if (O.r && P ? (i.ignoreVal = !0, i.curerr.push(oe(D, i, 1010))) : P || i.val !== null && g === i.valType && !se(i.val) ? !O.p && P && O.f !== void 0 ? (i.updateVal(O.f), i.fromDefault = !0, W = i.val, Y = !1) : O.p && P || (i.updateVal(i.val || (i.fromDefault = !0, {})), W = i.val) : (i.curerr.push(oe(q, i, 1020)), W = se(i.val) ? i.val : {}), Y && (W = W == null && i.ctx.err === !1 ? {} : W, W != null)) {
                i.ctx.log && i.ctx.log("so", i);
                let Se = !1, ue = _e(O.v), Me = i.nI;
                if (0 < ue.length) {
                  Se = !0, i.pI = Me;
                  for (let X = 0; X < ue.length; X++) {
                    let ve, ee = ue[X];
                    if (y.active && ee.endsWith(y.suffix)) {
                      if (ve = { short: "" }, b === typeof O.v[ee] ? ve.short = O.v[ee] : ve = Object.assign(Object.assign({}, ve), O.v[ee]), delete O.v[ee], X++, ue.length <= X)
                        break;
                      if (ue[X] !== ee.substring(0, ee.length - y.suffix.length))
                        throw new Error("Invalid meta key: " + ee);
                      ee = ue[X];
                    }
                    let xe = ee, lt = O.v[ee];
                    if (p.active) {
                      let ft = /^\s*("(\\.|[^"\\])*"|[^\s]+):\s*(.*?)\s*$/.exec(ee);
                      ft && (xe = ft[1], lt = Ce({ src: ft[3], val: lt }), delete O.v[ee]);
                    }
                    let Jt = re(lt, 1 + i.dI, ve);
                    O.v[xe] = Jt, O.k.includes(xe) || O.k.push(xe), i.nodes[i.nI] = Jt, i.vals[i.nI] = W[xe], i.parents[i.nI] = W, i.keys[i.nI] = xe, i.nI++;
                  }
                }
                let H = _e(W).filter((X) => O.v[X] === void 0);
                if (0 < H.length)
                  if (l === O.c)
                    i.ignoreVal = !0, i.curerr.push(oe(F, i, 1100, void 0, { k: H }));
                  else {
                    Se = !0, i.pI = Me;
                    for (let X of H) {
                      let ve = O.c = re(O.c, 1 + i.dI);
                      i.nodes[i.nI] = ve, i.vals[i.nI] = W[X], i.parents[i.nI] = W, i.keys[i.nI] = X, i.nI++;
                    }
                  }
                Se ? (i.dI++, i.nodes[i.nI] = i.sI, i.parents[i.nI] = W, i.nextSibling = !1, i.nI++) : i.ctx.log && i.ctx.log("eo", i);
              }
            } else if (j === i.type)
              if (O.r && P)
                i.ignoreVal = !0, i.curerr.push(oe(D, i, 1030));
              else if (P || se(i.val)) {
                if (!O.p && P && O.f !== void 0)
                  i.updateVal(O.f), i.fromDefault = !0;
                else if (!O.p || i.val != null) {
                  i.updateVal(i.val || (i.fromDefault = !0, []));
                  let W = l !== O.c, Se = 0 < i.val.length, ue = _e(O.v).filter((H) => !isNaN(+H)), Me = 0 < ue.length;
                  if (i.ctx.log && i.ctx.log("sa", i), Se || Me) {
                    i.pI = i.nI;
                    let H = 0;
                    if (Me)
                      if (ue.length < i.val.length && !W)
                        i.ignoreVal = !0, i.curerr.push(oe(F, i, 1090, void 0, { k: ue.length }));
                      else
                        for (; H < ue.length; H++) {
                          let X = O.v[H] = re(O.v[H], 1 + i.dI);
                          i.nodes[i.nI] = X, i.vals[i.nI] = i.val[H], i.parents[i.nI] = i.val, i.keys[i.nI] = "" + H, i.nI++;
                        }
                    if (W && Se) {
                      let X = O.c = re(O.c, 1 + i.dI);
                      for (; H < i.val.length; H++)
                        i.nodes[i.nI] = X, i.vals[i.nI] = i.val[H], i.parents[i.nI] = i.val, i.keys[i.nI] = "" + H, i.nI++;
                    }
                    i.ignoreVal || (i.dI++, i.nodes[i.nI] = i.sI, i.parents[i.nI] = i.val, i.nextSibling = !1, i.nI++);
                  } else
                    i.ctx.log && W && I == null && i.ctx.log("kv", Object.assign(Object.assign({}, i), { key: 0, val: O.c })), i.ctx.log && i.ctx.log("ea", i);
                }
              } else
                i.curerr.push(oe(q, i, 1040));
            else if (A === i.type || B === i.type || i.val === void 0 || i.type === i.valType || J === i.type && O.u.i && i.val instanceof O.u.i || K === i.type && i.val === null)
              if (i.val === void 0) {
                let W = i.path[i.dI];
                !O.r || T === i.type && i.parent.hasOwnProperty(W) ? O.f !== void 0 && !O.p || T === i.type ? (i.updateVal(O.f), i.fromDefault = !0) : A === i.type && (i.ignoreVal = i.ignoreVal === void 0 || i.ignoreVal) : (i.ignoreVal = !0, i.curerr.push(oe(D, i, 1060))), i.ctx.log && i.ctx.log("kv", i);
              } else
                b !== i.type || i.val !== "" || O.u.empty || i.curerr.push(oe(D, i, 1080)), i.ctx.log && i.ctx.log("kv", i);
            else
              i.curerr.push(oe(q, i, 1050));
          }
          if (0 < O.a.length)
            for (let Y = 0; Y < O.a.length; Y++) {
              let P = xt(O.a[Y], i);
              O = i.node, P.done !== void 0 && (M = P.done), U = U || !!P.fatal;
            }
          let C = i.node.p ? i.ignoreVal !== !1 : !!i.ignoreVal;
          !i.match && i.parent != null && !M && !C && (i.parent[i.key] = i.val), i.nextSibling && (i.pI = i.sI), (i.node.e || U) && i.err.push(...i.curerr);
        }
        if (0 < i.err.length) {
          if (se(i.ctx.err))
            i.ctx.err.push(...i.err);
          else if (!i.match && i.ctx.err !== !1)
            throw new qn(ie, u.prefix, i.err, i.ctx);
        }
        return i.match ? i.err.length === 0 : i.root;
      }
      function d(I, R) {
        return h(I, R, !1);
      }
      d.valid = function(I, R) {
        let k = R || {};
        return k.err = k.err || [], h(I, k, !1), k.err.length === 0;
      }, d.match = (I, R) => h(I, R = R || {}, !0), d.error = (I, R) => {
        let k = R || {};
        return k.err = k.err || [], h(I, k, !1), k.err;
      }, d.spec = () => (d(void 0, { err: !1 }), it(Q(_, (I, R) => a === R || R, !1, !0))), d.node = () => (d.spec(), _);
      let E = "";
      return d.toString = () => (E = je(E === "" ? Q(_ && _.$ && (a === _.$.gubu$ || _.$.gubu$ === !0) ? _.v : _) : E), `[Gubu ${u.name} ${E}]`), n.inspect && n.inspect.custom && (d[n.inspect.custom] = d.toString), d.gubu = c, d.spec(), d;
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
      let u = r.tokens[r.i], y = Te[u];
      if (r.tokens[r.i] === ")")
        return r.i++, r.val;
      r.i++;
      let p = { Number, String, Boolean };
      if (y == null)
        try {
          return p[u] || (T === u ? void 0 : u === "NaN" ? NaN : u.match(/^\/.+\/$/) ? new RegExp(u.substring(1, u.length - 1)) : it(u));
        } catch {
          throw new SyntaxError(`Gubu: unexpected token ${u} in builder expression ${r.src}`);
        }
      r.tokens[r.i] === "(" && r.i++;
      let _ = [], h = null;
      for (; (h = r.tokens[r.i]) != null && h !== ")"; ) {
        let d = Ce(r);
        _.push(d);
      }
      return r.i++, r.val = y.call(r.val, ..._), r.tokens[r.i] === "." ? (r.i++, Ce(r)) : s && r.i < r.tokens.length ? Ce(r) : r.val;
    }
    function xt(r, s) {
      var u;
      let y, p = {}, _ = !1;
      try {
        _ = !(s.val !== void 0 || !(!((u = r.gubu$) === null || u === void 0) && u.Check)) || (s.check = r, r(s.val, p, s));
      } catch (d) {
        y = d;
      }
      let h = se(p.err) ? 0 < p.err.length : p.err != null;
      if (!_ || h) {
        if (s.val === void 0 && (s.node.p || !s.node.r) && p.done !== !0)
          return delete p.err, p;
        let d = p.why || ce, E = It(s);
        if (b === typeof p.err)
          s.curerr.push(ae(s, p.err));
        else if (g === typeof p.err)
          s.curerr.push(...[p.err].flat().filter((I) => I != null).map((I) => (I.p = I.p == null ? E : I.p, I.m = I.m == null ? 2010 : I.m, I)));
        else {
          let I = r.name;
          I != null && I != "" || (I = je(r.toString().replace(/[ \t\r\n]+/g, " "))), s.curerr.push(oe(d, s, 1045, void 0, { thrown: y }, I));
        }
        p.done = p.done == null || p.done;
      }
      return p.hasOwnProperty("uval") ? (s.updateVal(p.uval), s.ignoreVal = !1) : p.val === void 0 || Number.isNaN(p.val) || (s.updateVal(p.val), s.ignoreVal = !1), p.node !== void 0 && (s.node = p.node), p.type !== void 0 && (s.type = p.type), p;
    }
    function It(r) {
      return r.path.slice(1, r.dI + 1).filter((s) => s != null).join(".");
    }
    function Re(r) {
      return S === typeof r ? r : S === typeof (r == null ? void 0 : r.length) ? r.length : r != null && g === typeof r ? _e(r).length : NaN;
    }
    function je(r, s) {
      let u = String(r), y = s == null || isNaN(s) ? 30 : s < 0 ? 0 : ~~s, p = r == null ? 0 : u.length, _ = r == null ? "" : u.substring(0, p);
      return _ = y < p ? _.substring(0, y - 3) + "..." : _, _.substring(0, y);
    }
    const Dt = function(r) {
      let s = V(this, r);
      return s.r = !0, s.p = !1, r === void 0 && arguments.length === 1 && (s.t = T, s.v = void 0), s;
    }, $t = function(r) {
      let s = V(this, r);
      return s.c = ge(), s;
    }, Bn = function(r) {
      let s = V(this, r);
      return s.r = !1, r === void 0 && arguments.length === 1 && (s.t = T, s.v = void 0), s;
    }, ge = function(r) {
      let s = V(this, r);
      return s.t = A, r !== void 0 && (s.v = r, s.f = r), s;
    }, Ct = function(r, s) {
      let u = V(this, s);
      return u.z = r, u;
    }, Rt = function(r) {
      let s = V(this, r);
      return s.r = !1, s.p = !0, s;
    }, jt = function(r) {
      let s = V(this, r);
      return s.r = !1, s.p = !0, s.e = !1, s.a.push(function(u, y, p) {
        return 0 < p.curerr.length && (y.uval = void 0, y.done = !1), !0;
      }), s;
    }, Wn = function(r) {
      let s = V(this);
      return s.t = $, s.v = r, s.f = r, s;
    }, Ln = function(r, s) {
      let u = V(this, s === void 0 ? r : s);
      return u.r = !1, u.f = r, $ === typeof r && at[r.name] && (u.t = r.name.toLowerCase(), u.f = ct(ut[u.t])), u.p = !1, u;
    }, Tt = function(r) {
      let s = V(this, r);
      return s.u.empty = !0, s;
    }, At = function(r) {
      let s = V(this, r);
      return s.t = N, s;
    }, Un = function(r, s) {
      let u = V(this), y = S === typeof r;
      u.t = b, y && s == null && (u = re([]));
      let p = null;
      return $ === typeof r && (p = r, u = ge()), u.b.push(function(_, h, d) {
        if (p)
          h.val = p(d.path, d);
        else if (y) {
          let E = r;
          h.val = d.path.slice(d.path.length - 1 - (0 <= E ? E : 0), d.path.length - 1 + (0 <= E ? 0 : 1)), b === typeof s && (h.val = h.val.join(s));
        } else
          r == null && (h.val = d.path[d.path.length - 2]);
        return !0;
      }), u;
    }, Gn = function(...r) {
      let s = V();
      s.t = B, s.r = !0;
      let u = r.map((y) => Ae(y));
      return s.u.list = r, s.b.push(function(y, p, _) {
        let h = !0;
        for (let d of u) {
          let E = Object.assign(Object.assign({}, _.ctx), { err: [] });
          d(y, E), 0 < E.err.length && (h = !1);
        }
        return h || (p.why = Ge, p.err = [ae(_, L + " " + de + le + fe + " does not satisfy all of: " + r.map((d) => Q(d, null, !0)).join(", "))]), h;
      }), s;
    }, Kn = function(...r) {
      let s = V();
      s.t = B, s.r = !0;
      let u = r.map((y) => Ae(y));
      return s.u.list = r, s.b.push(function(y, p, _) {
        let h = !1;
        for (let d of u) {
          let E = Object.assign(Object.assign({}, _.ctx), { err: [] }), I = d.match(y, E);
          I && (p.val = d(y, E)), h || (h = I);
        }
        return h || (p.why = zn, p.err = [ae(_, L + " " + de + le + fe + " does not satisfy any of: " + r.map((d) => Q(d, null, !0)).join(", "))]), h;
      }), s;
    }, Yn = function(...r) {
      let s = V();
      s.t = B, s.r = !0;
      let u = r.map((y) => Ae(y));
      return s.u.list = r, s.b.push(function(y, p, _) {
        let h = 0;
        for (let d of u) {
          let E = Object.assign(Object.assign({}, _.ctx), { err: [] });
          if (d.match(y, E)) {
            h++, p.val = d(y, E);
            break;
          }
        }
        return h !== 1 && (p.why = Pn, p.err = [ae(_, L + " " + de + le + fe + " does not satisfy one of: " + r.map((d) => Q(d, null, !0)).join(", "))]), !0;
      }), s;
    }, Mt = function(...r) {
      let s = V();
      return s.b.push(function(u, y, p) {
        for (let _ = 0; _ < r.length; _++)
          if (u === r[_])
            return !0;
        return y.err = ae(p, L + " " + de + le + fe + " must be exactly one of: " + p.node.s + "."), y.done = !0, !1;
      }), s.s = r.map((u) => Q(u, null, !0)).join(", "), s;
    }, Vt = function(r, s) {
      let u = V(this, s);
      return u.b.push(r), u;
    }, Ke = function(r, s) {
      let u = V(this, s);
      return u.a.push(r), u;
    }, Pt = function(r, s) {
      let u = V(this, s);
      if ($ === typeof r) {
        let y = r;
        y.gubu$ = y.gubu$ || {}, y.gubu$.Check = !0, u.b.push(r), u.s = (u.s == null ? "" : u.s + ";") + Q(r, null, !0), u.r = !0;
      } else if (g === typeof r) {
        if (Object.prototype.toString.call(r).includes("RegExp")) {
          let y = (p) => p != null && !Number.isNaN(p) && !!String(p).match(r);
          Oe(y, v, { value: String(r) }), Oe(y, "gubu$", { value: { Check: !0 } }), u.b.push(y), u.s = Q(r), u.r = !0;
        }
      } else
        b === typeof r && (u.t = r, u.r = !0);
      return u;
    }, zt = function(r) {
      let s = V(this, r);
      return j === s.t && l !== s.c && s.n === 0 && (s.v = [s.c]), s.c = l, s;
    }, Ft = function(r, s) {
      let u = V(this, s), y = b === typeof r ? r : (g === typeof r && r || {}).name;
      return y != null && y != "" && u.b.push(function(p, _, h) {
        return (h.ctx.ref = h.ctx.ref || {})[y] = h.node, !0;
      }), u;
    }, qt = function(r, s) {
      let u = V(this, s), y = g === typeof r && r || {}, p = b === typeof r ? r : y.name, _ = !!y.fill;
      return p != null && p != "" && u.b.push(function(h, d, E) {
        if (h !== void 0 || _) {
          let I = E.ctx.ref = E.ctx.ref || {};
          if (I[p] !== void 0) {
            let R = Object.assign({}, I[p]);
            R.t = R.t || N, d.node = R, d.type = R.t;
          }
        }
        return !0;
      }), u;
    }, Bt = function(r, s) {
      let u = V(this, s), y = g === typeof r && r || {}, p = b === typeof r ? r : y.name, _ = x === typeof y.keep ? y.keep : void 0, h = se(y.claim) ? y.claim : [];
      if (p != null && p != "") {
        let d = (I, R, k) => {
          if (I === void 0 && 0 < h.length) {
            k.ctx.Rename = k.ctx.Rename || {}, k.ctx.Rename.fromDefault = k.ctx.Rename.fromDefault || {};
            for (let i of h) {
              let O = k.ctx.Rename.fromDefault[i] || {};
              if (k.parent[i] !== void 0 && !O.yes) {
                R.val = k.parent[i], k.match || (k.parent[p] = R.val), R.node = O.node;
                for (let M = 0; M < k.err.length; M++)
                  k.err[M].k === O.key && (k.err.splice(M, 1), M--);
                if (_) {
                  let M = k.cI + 1;
                  k.nodes.splice(M, 0, re(O.dval)), k.vals.splice(M, 0, void 0), k.parents.splice(M, 0, k.parent), k.keys.splice(M, 0, i), k.nI++, k.pI++;
                } else
                  delete k.parent[i];
                break;
              }
            }
            R.val === void 0 && (R.val = k.node.v);
          }
          return !0;
        };
        Oe(d, v, { value: "Rename:" + p }), u.b.push(d);
        let E = (I, R, k) => (k.parent[p] = I, k.match || _ || k.key === p || se(k.parent) && _ !== !1 || (delete k.parent[k.key], R.done = !0), k.ctx.Rename = k.ctx.Rename || {}, k.ctx.Rename.fromDefault = k.ctx.Rename.fromDefault || {}, k.ctx.Rename.fromDefault[p] = { yes: k.fromDefault, key: k.key, dval: k.node.v, node: k.node }, !0);
        Oe(E, v, { value: "Rename:" + p }), u.a.push(E);
      }
      return u;
    }, Wt = function(r, s) {
      let u = V(this, s);
      return u.b.push(function(y, p, _) {
        let h = Re(y);
        if (r <= h)
          return !0;
        _.checkargs = { min: 1 };
        let d = S === typeof y ? "" : "length ";
        return p.err = ae(_, L + " " + de + le + fe + ` must be a minimum ${d}of ${r} (was ${h}).`), !1;
      }), u.s = Mn + "(" + r + (s == null ? "" : "," + Q(s)) + ")", u;
    }, Lt = function(r, s) {
      let u = V(this, s);
      return u.b.push(function(y, p, _) {
        let h = Re(y);
        if (h <= r)
          return !0;
        let d = S === typeof y ? "" : "length ";
        return p.err = ae(_, L + " " + de + le + fe + ` must be a maximum ${d}of ${r} (was ${h}).`), !1;
      }), u.s = An + "(" + r + (s == null ? "" : "," + Q(s)) + ")", u;
    }, Ut = function(r, s) {
      let u = V(this, s);
      return u.b.push(function(y, p, _) {
        let h = Re(y);
        if (r < h)
          return !0;
        let d = S === typeof y ? "be" : "have length";
        return p.err = ae(_, L + " " + de + le + fe + ` must ${d} above ${r} (was ${h}).`), !1;
      }), u.s = Ne + "(" + r + (s == null ? "" : "," + Q(s)) + ")", u;
    }, Gt = function(r, s) {
      let u = V(this, s);
      return u.b.push(function(y, p, _) {
        let h = Re(y);
        if (h < r)
          return !0;
        let d = S === typeof y ? "be" : "have length";
        return p.err = ae(_, L + " " + de + le + fe + ` must ${d} below ${r} (was ${h}).`), !1;
      }), u.s = $e + "(" + r + (s == null ? "" : "," + Q(s)) + ")", u;
    }, Kt = function(r, s) {
      let u = V(this, s || ge());
      return u.b.push(function(y, p, _) {
        let h = Re(y);
        if (r === h)
          return !0;
        let d = S === typeof y ? "" : " in length";
        return p.err = ae(_, L + " " + de + le + fe + ` must be exactly ${r}${d} (was ${h}).`), !1;
      }), u.s = Vn + "(" + r + (s == null ? "" : "," + Q(s)) + ")", u;
    }, Yt = function(r, s) {
      let u = V(this, s || {});
      return u.c = re(r), u;
    }, Ht = function(r, s) {
      let u = V(this, s || []);
      return u.t = "array", u.c = re(r), u.m = u.m || {}, u.m.rest = !0, u;
    };
    function V(r, s) {
      let u = re(r == null || r.window === r || r.global === r ? s : r);
      return Object.assign(u, { Above: Ut, After: Ke, Any: ge, Before: Vt, Below: Gt, Check: Pt, Child: Yt, Closed: zt, Define: Ft, Empty: Tt, Exact: Mt, Fault: Ct, Ignore: jt, Len: Kt, Max: Lt, Min: Wt, Never: At, Open: $t, Refer: qt, Rename: Bt, Required: Dt, Skip: Rt, Rest: Ht });
    }
    function ae(r, s, u, y) {
      return oe(u || ce, r, 4e3, s, y);
    }
    function oe(r, s, u, y, p, _) {
      var h;
      let d = { k: s.key, n: s.node, v: s.val, p: It(s), w: r, c: ((h = s.check) === null || h === void 0 ? void 0 : h.name) || "none", a: s.checkargs || {}, m: u, t: "", u: p || {} }, E = je((s.val === void 0 ? T : Q(s.val)).replace(/"/g, ""));
      if ((y = y || s.node.z) == null || y === "") {
        let I = E.startsWith("[") ? j : E.startsWith("{") ? g : s.val == null || S === typeof s.val && isNaN(s.val) ? "value" : typeof s.val, R = E.startsWith("[") || se(s.parents[s.pI]) ? "index" : "property", k = "is", i = p == null ? void 0 : p.k;
        i = se(i) ? (R = 1 < i.length ? (k = "are", "properties") : R, i.join(", ")) : i, d.t = "Validation failed for " + (0 < d.p.length ? `${R} "${d.p}" with ` : "") + `${I} "${E}" because ` + (q === r ? J === s.node.t ? `the ${I} is not an instance of ${s.node.u.n}` : `the ${I} is not of type ${s.node.t}` : D === r ? s.val === "" ? "an empty string is not allowed" : `the ${I} is required` : r === "closed" ? `the ${R} "${i}" ${k} not allowed` : N === r ? "no value is allowed" : `check "${_ ?? r}" failed`) + (d.u.thrown ? " (threw: " + d.u.thrown.message + ")" : ".");
      } else
        d.t = y.replace(/\$VALUE/g, E).replace(/\$PATH/g, d.p);
      return d;
    }
    function Xt(r) {
      return r.s != null && r.s !== "" ? r.s : r.r || r.v === void 0 ? r.t : r.v;
    }
    function Q(r, s, u, y) {
      let p;
      y || !r || !r.$ || a !== r.$.gubu$ && r.$.gubu$ !== !0 || (r = Xt(r));
      try {
        p = st(r, (_, h) => {
          var d, E;
          if (s && (h = s(_, h)), h != null && g === typeof h && h.constructor && De !== h.constructor.name && Le !== h.constructor.name)
            h = $ === typeof h.toString ? h.toString() : h.constructor.name;
          else if ($ === typeof h)
            h = $ === typeof ke[h.name] && isNaN(+_) ? void 0 : h.name != null && h.name !== "" ? h.name : je(h.toString().replace(/[ \t\r\n]+/g, " "));
          else if (typeof h == "bigint")
            h = String(h.toString());
          else {
            if (Number.isNaN(h))
              return "NaN";
            y === !0 || ((d = h == null ? void 0 : h.$) === null || d === void 0 ? void 0 : d.gubu$) !== !0 && a !== ((E = h == null ? void 0 : h.$) === null || E === void 0 ? void 0 : E.gubu$) || (h = Xt(h));
          }
          return h;
        }), p = String(p);
      } catch {
        p = st(String(r));
      }
      return u === !0 && (p = p.replace(/^"/, "").replace(/"$/, "")), p;
    }
    function ct(r) {
      return r == null || g !== typeof r ? r : it(st(r));
    }
    const Hn = (r) => re(Object.assign(Object.assign({}, r), { $: { gubu$: !0 } })), Te = { Above: Ut, After: Ke, All: Gn, Any: ge, Before: Vt, Below: Gt, Check: Pt, Child: Yt, Closed: zt, Default: Ln, Define: Ft, Empty: Tt, Exact: Mt, Fault: Ct, Func: Wn, Ignore: jt, Key: Un, Len: Kt, Max: Lt, Min: Wt, Never: At, One: Yn, Open: $t, Optional: Bn, Refer: qt, Rename: Bt, Required: Dt, Skip: Rt, Some: Kn, Rest: Ht };
    if (T !== typeof window)
      for (let r in Te)
        Oe(Te[r], v, { value: r });
    Object.assign(ke, Object.assign(Object.assign(Object.assign({ Gubu: ke }, Te), Object.entries(Te).reduce((r, s) => (r["G" + s[0]] = s[1], r), {})), { isShape: (r) => r && c === r.gubu, G$: Hn, buildize: V, makeErr: ae, stringify: Q, truncate: je, nodize: re, expr: Ce, MakeArgu: Xn })), Oe(ke, v, { value: w });
    const Ae = ke;
    o.Gubu = Ae;
    function Xn(r) {
      return function(s, u, y) {
        let p = !1;
        b === typeof s && (p = !0, y = u, u = s);
        const _ = Ae(y = y || u, { prefix: r + (u = b === typeof u ? " (" + u + ")" : "") }), h = _.node(), d = h.k;
        let E = s, I = {}, R = 0, k = 0;
        for (; R < d.length; R++) {
          let O = h.v[d[R]];
          O.p && (O = h.v[d[R]] = ((M) => Ke(function(U, C, Y) {
            if (0 < Y.curerr.length) {
              k++;
              for (let P = d.length - 1; P > M; P--)
                h.v[d[P]].m.rest ? I[d[P]].splice(h.v[d[P]].m.rest_pos + M - P, 0, I[d[P - 1]]) : (Y.vals[Y.pI + P - M] = Y.vals[Y.pI + P - M - 1], I[d[P]] = I[d[P - 1]]);
              C.uval = void 0, C.done = !1;
            }
            return !0;
          }, O))(R), O.e = !1), R !== d.length - 1 || h.v[d[R]].m.rest || (h.v[d[R]] = Ke(function(M, U, C) {
            return !(d.length - k < E.length && (C.curerr.length === 0 && (U.err = `Too many arguments for type signature (was ${E.length}, expected ${d.length - k})`), U.fatal = !0, 1));
          }, h.v[d[R]]));
        }
        function i(O) {
          for (let M = 0; M < d.length; M++) {
            let U = h.v[d[M]];
            U.m.rest ? (I[d[M]] = [...O].slice(M), U.m.rest_pos = I[d[M]].length) : I[d[M]] = O[M];
          }
          return I;
        }
        return p ? function(O) {
          return E = O, I = {}, R = 0, k = 0, _(i(O));
        } : _(i(s));
      };
    }
    const { Gubu: Jn } = o;
    return Jn;
  });
})(jn);
var uo = jn.exports;
const co = "@seneca/redux", lo = "0.0.1", fo = "Seneca browser library for redux", po = "MIT", ho = "dist/seneca-redux.cjs.js", yo = "dist/seneca-redux.es.js", mo = "dist/seneca-redux.d.ts", go = "src/seneca-redux.ts", vo = {
  ".": {
    import: "./dist/seneca-redux.es.js",
    require: "./dist/seneca-redux.umd.js"
  }
}, bo = [
  "dist",
  "src",
  "LICENSE"
], wo = {
  dev: "tsc && vite build --watch",
  start: "vite --host --open",
  build: "tsc && vite build",
  "build:types": "dts-bundle-generator --config ./dts-bundle-generator.config.ts",
  test: "echo test",
  clean: "rm -rf dist node_modules yarn.lock package-lock.json",
  reset: "npm run clean && npm install && npm run build && npm test",
  "prep-dev": "npm link @plantquest/assetmap",
  "repo-tag": "REPO_VERSION=`node -e \"console.log(require('./package').version)\"` && echo TAG: v$REPO_VERSION && git commit -a -m v$REPO_VERSION && git push && git tag v$REPO_VERSION && git push --tags",
  "repo-publish": "npm run clean && npm i && npm run repo-publish-quick",
  "repo-publish-quick": "npm run build && npm run test && npm run repo-tag && npm publish --access public --registry https://registry.npmjs.org "
}, Eo = {
  "@reduxjs/toolkit": "^2.0.1",
  "@seneca/gateway": "^0.9.0",
  "@seneca/gateway-express": "^0.10.0",
  "@seneca/repl": "^7.0.1",
  "@types/react": "^18.2.45",
  "@types/react-dom": "^18.2.18",
  "@typescript-eslint/eslint-plugin": "^6.15.0",
  "@typescript-eslint/parser": "^6.15.0",
  "@vitejs/plugin-react": "^4.2.1",
  "cookie-parser": "^1.4.6",
  "dts-bundle-generator": "^9.0.0",
  eslint: "^8.56.0",
  "eslint-config-prettier": "^9.1.0",
  "eslint-plugin-prettier": "^5.1.1",
  express: "^4.18.2",
  prettier: "^3.1.1",
  react: "^18.2.0",
  seneca: "^3.33.0",
  "seneca-entity": "^25.1.1",
  "seneca-promisify": "^3.7.1",
  stylelint: "15",
  "stylelint-config-recommended": "13",
  "stylelint-config-sass-guidelines": "^10.0.0",
  "ts-node": "^10.9.2",
  tslib: "^2.6.2",
  typescript: "^5.3.3",
  vite: "^5.0.10",
  "vite-plugin-dts": "^3.6.4"
}, No = {
  name: co,
  version: lo,
  description: fo,
  license: po,
  main: ho,
  module: yo,
  types: mo,
  source: go,
  exports: vo,
  files: bo,
  scripts: wo,
  devDependencies: Eo
}, { One: Co, Default: _o, Any: Ro, Min: jo, Skip: yt, Required: Oo, Open: ko } = uo.Gubu, So = {
  name: "seneca",
  debug: !1,
  log: {
    err: !0,
    msg: !1
  },
  state: _o({}, ko({})),
  store: {},
  slots: {}
}, fn = "@seneca/redux";
function ot(e) {
  const t = this, n = t.util.deep;
  e.debug && console.warn(fn, No.version, e);
  const o = e.name, a = e.store, c = [], l = [];
  function f($, g, b) {
    e.log.err && dn(b) && (b.when$ = Date.now(), b.kind$ = $, c.push(b)), e.log.msg && l.push({
      msg: g,
      res: b,
      when$: Date.now(),
      kind$: $
    });
  }
  const w = e.state;
  for (let $ in e.slots)
    xo(w, $);
  const v = no({
    name: o,
    initialState: w,
    reducers: {
      response: ($, g) => {
        let b = g.payload, x = b.msg, T = b.res;
        f("response", x, T);
        let A = { ...x, aim: "res" };
        t.find(A) && (A.direct$ = !0, A.res = () => ({
          state: $,
          res: T,
          req: x
        }), t.act(A));
      },
      entityResponse: ($, g) => {
        var De, Le, Ue;
        let b = g.payload, x = b.msg, T = b.res, A = x.cmd, B = A === "list" ? "list" : "item";
        f("entity", x, T);
        let J = x.slot$ || ((De = x.q) == null ? void 0 : De.slot$) || ((Le = x.ent) == null ? void 0 : Le.slot$);
        if (J == null || J === !1)
          return;
        J === !0 && (J = "");
        let { space: K, slot: q } = _t(J), F = Pe($, K, !0);
        if (F == null)
          throw new Error("Entity space not prepared: " + K.join("."));
        let ie = F.meta && F.meta[q];
        if (ie == null)
          throw new Error("Entity slot not prepared: " + J);
        let ce = ie[B];
        if (ce.error = null, ce.when = Date.now(), dn(T)) {
          e.debug && console.warn(fn, "entity-error", x, T), ce.state = "error", ce.error = { ...T };
          return;
        } else if (T != null)
          if (A === "load" || A === "save") {
            let L = F.item[q] = { ...T }, Ne = F.list[q], Ge = !1;
            F.list[q] = Ne.map(
              ($e) => $e.id === L.id ? (Ge = !0, { ...$e, ...L }) : $e
            ), Ge || (F.list[q] = Ne.concat({ ...L })), ce.state = A === "load" ? "loaded" : "saved";
          } else
            A === "list" && (F.list[q] = T.map((L) => ({
              ...L
            })), ce.state = "listed");
        else if (A === "remove") {
          let L = [(Ue = x.q) == null ? void 0 : Ue.id];
          F.list[q] = F.list[q].filter((Ne) => !L.includes(Ne.id)), F.item[q] && L.includes(F.item[q].id) && (F.item[q] = null, F.meta[q].item.state = "removed");
        } else
          ce.state = "done";
      },
      update: ($, g) => {
        let x = g.payload.msg;
        f("update", x);
        let T = x.update || (x.section ? [{ section: x.section, content: x.content }] : []);
        for (let A of T) {
          let B = A.section, J = A.content;
          if (B) {
            let K = B.split("."), q = K[K.length - 1];
            K.length = K.length - 1;
            let F = $;
            for (let ie = 0; ie < K.length; ie++)
              F = F[K[ie]] = F[K[ie]] || {};
            q != null && (F[q] = J);
          }
        }
      }
    }
  }), {
    response: m,
    // entityPrepare,
    entityResponse: N,
    update: S
  } = v.actions, D = Hr(n(a, {
    reducer: {
      [o]: v.reducer
    },
    middleware: ($) => $({
      serializableCheck: {
        ignoredActions: [
          o + "/response",
          o + "/entityResponse",
          o + "/update"
        ]
      }
    })
  }));
  return t.sub("aim:req,out$:true", function($, g, b) {
    D.dispatch(m({ msg: $, res: g, meta: b }));
  }).sub("sys:entity,out$:true", function($, g, b) {
    D.dispatch(N({ msg: $, res: g, meta: b }));
  }).add(
    "aim:app,set:state",
    {
      section: yt(String),
      content: yt(),
      update: yt([{
        section: String,
        content: Oo()
      }])
    },
    function($, g, b) {
      D.dispatch(S({ msg: $, meta: b })), g($);
    }
  ), {
    name: "Redux",
    exports: {
      slice: v,
      store: D,
      slotSelectors: ($) => {
        let { space: g, slot: b } = _t($);
        return {
          space: g,
          slot: b,
          selectItem: (x) => Pe(x.seneca, g).item[b],
          selectList: (x) => Pe(x.seneca, g).list[b],
          selectMeta: (x, T) => Pe(x.seneca, g).meta[b][T]
        };
      },
      errlog: c,
      msglog: l
    }
  };
}
function xo(e, t) {
  let { space: n, slot: o } = _t(t), a = Pe(e, n, !0);
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
function _t(e) {
  let [t, n] = typeof e == "string" ? e.split("/") : "", o = n != null && n != "", a = t != null && t != "";
  return n = o ? n : a ? t : "main", t = o && a ? t : ".entity", t.endsWith(".entity") || (t += ".entity"), { space: t.split(".").filter((l) => l != null && l != ""), slot: n };
}
function Pe(e, t, n = !1) {
  let o = e;
  for (let a = 0; a < t.length; a++) {
    let c = t[a];
    c == null || c == "" || (o[c] == null && n ? o = o[c] = {} : o = o[c]);
  }
  return o;
}
function dn(e) {
  return Object.prototype.toString.call(e) === "[object Error]";
}
const Tn = Zn(null), Io = (e) => Qn.createElement(
  Tn.Provider,
  { value: e.seneca },
  e.children
), Do = () => er(Tn);
ot.defaults = So;
ot.SenecaProvider = Io;
ot.useSeneca = Do;
Object.defineProperty(ot, "name", { value: "Redux" });
export {
  ot as Redux,
  Io as SenecaProvider,
  ot as default,
  Do as useSeneca
};
//# sourceMappingURL=seneca-redux.es.js.map
