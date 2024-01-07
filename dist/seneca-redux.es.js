import Qn, { createContext as Zn, useContext as er } from "react";
function K(e) {
  return `Minified Redux error #${e}; visit https://redux.js.org/Errors?code=${e} for the full message or use the non-minified dev environment for full errors. `;
}
var tr = typeof Symbol == "function" && Symbol.observable || "@@observable", Zt = tr, pt = () => Math.random().toString(36).substring(7).split("").join("."), nr = {
  INIT: `@@redux/INIT${/* @__PURE__ */ pt()}`,
  REPLACE: `@@redux/REPLACE${/* @__PURE__ */ pt()}`,
  PROBE_UNKNOWN_ACTION: () => `@@redux/PROBE_UNKNOWN_ACTION${pt()}`
}, Ne = nr;
function Le(e) {
  if (typeof e != "object" || e === null)
    return !1;
  let t = e;
  for (; Object.getPrototypeOf(t) !== null; )
    t = Object.getPrototypeOf(t);
  return Object.getPrototypeOf(e) === t || Object.getPrototypeOf(e) === null;
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
function ge(e) {
  let t = typeof e;
  return process.env.NODE_ENV !== "production" && (t = rr(e)), t;
}
function hn(e, t, n) {
  if (typeof e != "function")
    throw new Error(process.env.NODE_ENV === "production" ? K(2) : `Expected the root reducer to be a function. Instead, received: '${ge(e)}'`);
  if (typeof t == "function" && typeof n == "function" || typeof n == "function" && typeof arguments[3] == "function")
    throw new Error(process.env.NODE_ENV === "production" ? K(0) : "It looks like you are passing several store enhancers to createStore(). This is not supported. Instead, compose them together to a single function. See https://redux.js.org/tutorials/fundamentals/part-4-store#creating-a-store-with-enhancers for an example.");
  if (typeof t == "function" && typeof n > "u" && (n = t, t = void 0), typeof n < "u") {
    if (typeof n != "function")
      throw new Error(process.env.NODE_ENV === "production" ? K(1) : `Expected the enhancer to be a function. Instead, received: '${ge(n)}'`);
    return n(hn)(e, t);
  }
  let o = e, a = t, c = /* @__PURE__ */ new Map(), l = c, f = 0, w = !1;
  function v() {
    l === c && (l = /* @__PURE__ */ new Map(), c.forEach((m, b) => {
      l.set(b, m);
    }));
  }
  function g() {
    if (w)
      throw new Error(process.env.NODE_ENV === "production" ? K(3) : "You may not call store.getState() while the reducer is executing. The reducer has already received the state as an argument. Pass it down from the top reducer instead of reading it from the store.");
    return a;
  }
  function N(m) {
    if (typeof m != "function")
      throw new Error(process.env.NODE_ENV === "production" ? K(4) : `Expected the listener to be a function. Instead, received: '${ge(m)}'`);
    if (w)
      throw new Error(process.env.NODE_ENV === "production" ? K(5) : "You may not call store.subscribe() while the reducer is executing. If you would like to be notified after the store has been updated, subscribe from a component and invoke store.getState() in the callback to access the latest state. See https://redux.js.org/api/store#subscribelistener for more details.");
    let b = !0;
    v();
    const S = f++;
    return l.set(S, m), function() {
      if (b) {
        if (w)
          throw new Error(process.env.NODE_ENV === "production" ? K(6) : "You may not unsubscribe from a store listener while the reducer is executing. See https://redux.js.org/api/store#subscribelistener for more details.");
        b = !1, v(), l.delete(S), c = null;
      }
    };
  }
  function x(m) {
    if (!Le(m))
      throw new Error(process.env.NODE_ENV === "production" ? K(7) : `Actions must be plain objects. Instead, the actual type was: '${ge(m)}'. You may need to add middleware to your store setup to handle dispatching other values, such as 'redux-thunk' to handle dispatching functions. See https://redux.js.org/tutorials/fundamentals/part-4-store#middleware and https://redux.js.org/tutorials/fundamentals/part-6-async-logic#using-the-redux-thunk-middleware for examples.`);
    if (typeof m.type > "u")
      throw new Error(process.env.NODE_ENV === "production" ? K(8) : 'Actions may not have an undefined "type" property. You may have misspelled an action type string constant.');
    if (typeof m.type != "string")
      throw new Error(process.env.NODE_ENV === "production" ? K(17) : `Action "type" property must be a string. Instead, the actual type was: '${ge(m.type)}'. Value was: '${m.type}' (stringified)`);
    if (w)
      throw new Error(process.env.NODE_ENV === "production" ? K(9) : "Reducers may not dispatch actions.");
    try {
      w = !0, a = o(a, m);
    } finally {
      w = !1;
    }
    return (c = l).forEach((S) => {
      S();
    }), m;
  }
  function $(m) {
    if (typeof m != "function")
      throw new Error(process.env.NODE_ENV === "production" ? K(10) : `Expected the nextReducer to be a function. Instead, received: '${ge(m)}`);
    o = m, x({
      type: Ne.REPLACE
    });
  }
  function j() {
    const m = N;
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
          const A = b;
          A.next && A.next(g());
        }
        return S(), {
          unsubscribe: m(S)
        };
      },
      [Zt]() {
        return this;
      }
    };
  }
  return x({
    type: Ne.INIT
  }), {
    dispatch: x,
    subscribe: N,
    getState: g,
    replaceReducer: $,
    [Zt]: j
  };
}
function en(e) {
  typeof console < "u" && typeof console.error == "function" && console.error(e);
  try {
    throw new Error(e);
  } catch {
  }
}
function ar(e, t, n, o) {
  const a = Object.keys(t), c = n && n.type === Ne.INIT ? "preloadedState argument passed to createStore" : "previous state received by the reducer";
  if (a.length === 0)
    return "Store does not have a valid reducer. Make sure the argument passed to combineReducers is an object whose values are reducers.";
  if (!Le(e))
    return `The ${c} has unexpected type of "${ge(e)}". Expected argument to be an object with the following keys: "${a.join('", "')}"`;
  const l = Object.keys(e).filter((f) => !t.hasOwnProperty(f) && !o[f]);
  if (l.forEach((f) => {
    o[f] = !0;
  }), !(n && n.type === Ne.REPLACE) && l.length > 0)
    return `Unexpected ${l.length > 1 ? "keys" : "key"} "${l.join('", "')}" found in ${c}. Expected to find one of the known reducer keys instead: "${a.join('", "')}". Unexpected keys will be ignored.`;
}
function ur(e) {
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
function cr(e) {
  const t = Object.keys(e), n = {};
  for (let l = 0; l < t.length; l++) {
    const f = t[l];
    process.env.NODE_ENV !== "production" && typeof e[f] > "u" && en(`No reducer provided for key "${f}"`), typeof e[f] == "function" && (n[f] = e[f]);
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
      N && en(N);
    }
    let v = !1;
    const g = {};
    for (let N = 0; N < o.length; N++) {
      const x = o[N], $ = n[x], j = f[x], V = $(j, w);
      if (typeof V > "u") {
        const m = w && w.type;
        throw new Error(process.env.NODE_ENV === "production" ? K(14) : `When called with an action of type ${m ? `"${String(m)}"` : "(unknown type)"}, the slice reducer for key "${x}" returned undefined. To ignore an action, you must explicitly return the previous state. If you want this reducer to hold no value, you can return null instead of undefined.`);
      }
      g[x] = V, v = v || V !== j;
    }
    return v = v || o.length !== Object.keys(f).length, v ? g : f;
  };
}
function Qe(...e) {
  return e.length === 0 ? (t) => t : e.length === 1 ? e[0] : e.reduce((t, n) => (...o) => t(n(...o)));
}
function lr(...e) {
  return (t) => (n, o) => {
    const a = t(n, o);
    let c = () => {
      throw new Error(process.env.NODE_ENV === "production" ? K(15) : "Dispatching while constructing your middleware is not allowed. Other middleware would not be applied to this dispatch.");
    };
    const l = {
      getState: a.getState,
      dispatch: (w, ...v) => c(w, ...v)
    }, f = e.map((w) => w(l));
    return c = Qe(...f)(a.dispatch), {
      ...a,
      dispatch: c
    };
  };
}
function yn(e) {
  return Le(e) && "type" in e && typeof e.type == "string";
}
var mn = Symbol.for("immer-nothing"), tn = Symbol.for("immer-draftable"), te = Symbol.for("immer-state"), fr = process.env.NODE_ENV !== "production" ? [
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
function Q(e, ...t) {
  if (process.env.NODE_ENV !== "production") {
    const n = fr[e], o = typeof n == "function" ? n.apply(null, t) : n;
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
  return e ? gn(e) || Array.isArray(e) || !!e[tn] || !!((t = e.constructor) != null && t[tn]) || nt(e) || rt(e) : !1;
}
var dr = Object.prototype.constructor.toString();
function gn(e) {
  if (!e || typeof e != "object")
    return !1;
  const t = $e(e);
  if (t === null)
    return !0;
  const n = Object.hasOwnProperty.call(t, "constructor") && t.constructor;
  return n === Object ? !0 : typeof n == "function" && Function.toString.call(n) === dr;
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
function vn(e, t, n) {
  const o = tt(e);
  o === 2 ? e.set(t, n) : o === 3 ? e.add(n) : e[t] = n;
}
function pr(e, t) {
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
  if (!t && gn(e))
    return $e(e) ? { ...e } : Object.assign(/* @__PURE__ */ Object.create(null), e);
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
  return Object.create($e(e), n);
}
function kt(e, t = !1) {
  return ot(e) || ve(e) || !ye(e) || (tt(e) > 1 && (e.set = e.add = e.clear = e.delete = hr), Object.freeze(e), t && Fe(e, (n, o) => kt(o, !0))), e;
}
function hr() {
  Q(2);
}
function ot(e) {
  return Object.isFrozen(e);
}
var yr = {};
function _e(e) {
  const t = yr[e];
  return t || Q(0, e), t;
}
var Be;
function bn() {
  return Be;
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
function nn(e, t) {
  t && (_e("Patches"), e.patches_ = [], e.inversePatches_ = [], e.patchListener_ = t);
}
function bt(e) {
  wt(e), e.drafts_.forEach(gr), e.drafts_ = null;
}
function wt(e) {
  e === Be && (Be = e.parent_);
}
function rn(e) {
  return Be = mr(Be, e);
}
function gr(e) {
  const t = e[te];
  t.type_ === 0 || t.type_ === 1 ? t.revoke_() : t.revoked_ = !0;
}
function on(e, t) {
  t.unfinalizedDrafts_ = t.drafts_.length;
  const n = t.drafts_[0];
  return e !== void 0 && e !== n ? (n[te].modified_ && (bt(t), Q(4)), ye(e) && (e = Ze(t, e), t.parent_ || et(t, e)), t.patches_ && _e("Patches").generateReplacementPatches_(
    n[te].base_,
    e,
    t.patches_,
    t.inversePatches_
  )) : e = Ze(t, n, []), bt(t), t.patches_ && t.patchListener_(t.patches_, t.inversePatches_), e !== mn ? e : void 0;
}
function Ze(e, t, n) {
  if (ot(t))
    return t;
  const o = t[te];
  if (!o)
    return Fe(
      t,
      (a, c) => sn(e, o, t, a, c, n)
    ), t;
  if (o.scope_ !== e)
    return t;
  if (!o.modified_)
    return et(e, o.base_, !0), o.base_;
  if (!o.finalized_) {
    o.finalized_ = !0, o.scope_.unfinalizedDrafts_--;
    const a = o.copy_;
    let c = a, l = !1;
    o.type_ === 3 && (c = new Set(a), a.clear(), l = !0), Fe(
      c,
      (f, w) => sn(e, o, a, f, w, n, l)
    ), et(e, a, !1), n && e.patches_ && _e("Patches").generatePatches_(
      o,
      n,
      e.patches_,
      e.inversePatches_
    );
  }
  return o.copy_;
}
function sn(e, t, n, o, a, c, l) {
  if (process.env.NODE_ENV !== "production" && a === n && Q(5), ve(a)) {
    const f = c && t && t.type_ !== 3 && // Set objects are atomic since they have no keys.
    !gt(t.assigned_, o) ? c.concat(o) : void 0, w = Ze(e, a, f);
    if (vn(n, o, w), ve(w))
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
function vr(e, t) {
  const n = Array.isArray(e), o = {
    type_: n ? 1 : 0,
    // Track which produce call this is associated with.
    scope_: t ? t.scope_ : bn(),
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
  let a = o, c = xt;
  n && (a = [o], c = We);
  const { revoke: l, proxy: f } = Proxy.revocable(a, c);
  return o.draft_ = f, o.revoke_ = l, f;
}
var xt = {
  get(e, t) {
    if (t === te)
      return e;
    const n = Ee(e);
    if (!gt(n, t))
      return br(e, n, t);
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
    const o = wn(Ee(e), t);
    if (o != null && o.set)
      return o.set.call(e.draft_, n), !0;
    if (!e.modified_) {
      const a = ht(Ee(e), t), c = a == null ? void 0 : a[te];
      if (c && c.base_ === n)
        return e.copy_[t] = n, e.assigned_[t] = !1, !0;
      if (pr(n, a) && (n !== void 0 || gt(e.base_, t)))
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
    Q(11);
  },
  getPrototypeOf(e) {
    return $e(e.base_);
  },
  setPrototypeOf() {
    Q(12);
  }
}, We = {};
Fe(xt, (e, t) => {
  We[e] = function() {
    return arguments[0] = arguments[0][0], t.apply(this, arguments);
  };
});
We.deleteProperty = function(e, t) {
  return process.env.NODE_ENV !== "production" && isNaN(parseInt(t)) && Q(13), We.set.call(this, e, t, void 0);
};
We.set = function(e, t, n) {
  return process.env.NODE_ENV !== "production" && t !== "length" && isNaN(parseInt(t)) && Q(14), xt.set.call(this, e[0], t, n, e[0]);
};
function ht(e, t) {
  const n = e[te];
  return (n ? Ee(n) : e)[t];
}
function br(e, t, n) {
  var a;
  const o = wn(t, n);
  return o ? "value" in o ? o.value : (
    // This is a very special case, if the prop is a getter defined by the
    // prototype, we should invoke it with the draft as context!
    (a = o.get) == null ? void 0 : a.call(e.draft_)
  ) : void 0;
}
function wn(e, t) {
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
var wr = class {
  constructor(e) {
    this.autoFreeze_ = !0, this.useStrictShallowCopy_ = !1, this.produce = (t, n, o) => {
      if (typeof t == "function" && typeof n != "function") {
        const c = n;
        n = t;
        const l = this;
        return function(w = c, ...v) {
          return l.produce(w, (g) => n.call(this, g, ...v));
        };
      }
      typeof n != "function" && Q(6), o !== void 0 && typeof o != "function" && Q(7);
      let a;
      if (ye(t)) {
        const c = rn(this), l = Nt(t, void 0);
        let f = !0;
        try {
          a = n(l), f = !1;
        } finally {
          f ? bt(c) : wt(c);
        }
        return nn(c, o), on(a, c);
      } else if (!t || typeof t != "object") {
        if (a = n(t), a === void 0 && (a = t), a === mn && (a = void 0), this.autoFreeze_ && kt(a, !0), o) {
          const c = [], l = [];
          _e("Patches").generateReplacementPatches_(t, a, c, l), o(c, l);
        }
        return a;
      } else
        Q(1, t);
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
    ye(e) || Q(8), ve(e) && (e = En(e));
    const t = rn(this), n = Nt(e, void 0);
    return n[te].isManual_ = !0, wt(t), n;
  }
  finishDraft(e, t) {
    const n = e && e[te];
    (!n || !n.isManual_) && Q(9);
    const { scope_: o } = n;
    return nn(o, t), on(void 0, o);
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
  const n = nt(e) ? _e("MapSet").proxyMap_(e, t) : rt(e) ? _e("MapSet").proxySet_(e, t) : vr(e, t);
  return (t ? t.scope_ : bn()).drafts_.push(n), n;
}
function En(e) {
  return ve(e) || Q(10, e), Nn(e);
}
function Nn(e) {
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
    vn(n, o, Nn(a));
  }), t && (t.finalized_ = !1), n;
}
var ne = new wr(), _n = ne.produce;
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
var an = (e) => Array.isArray(e) ? e : [e];
function xr(e) {
  const t = Array.isArray(e[0]) ? e[0] : e;
  return kr(
    t,
    "createSelector expects all input-selectors to be functions, but received the following types: "
  ), t;
}
function un(e, t) {
  const n = [], { length: o } = e;
  for (let a = 0; a < o; a++)
    n.push(e[a].apply(null, t));
  return n;
}
var Sr = (e, t) => {
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
}, Dr = typeof WeakRef < "u" ? WeakRef : Ir, $r = 0, cn = 1;
function He() {
  return {
    s: $r,
    v: void 0,
    o: null,
    p: null
  };
}
function On(e, t = {}) {
  let n = He();
  const { resultEqualityCheck: o } = t;
  let a, c = 0;
  function l() {
    let f = n;
    const { length: w } = arguments;
    for (let N = 0, x = w; N < x; N++) {
      const $ = arguments[N];
      if (typeof $ == "function" || typeof $ == "object" && $ !== null) {
        let j = f.o;
        j === null && (f.o = j = /* @__PURE__ */ new WeakMap());
        const V = j.get($);
        V === void 0 ? (f = He(), j.set($, f)) : f = V;
      } else {
        let j = f.p;
        j === null && (f.p = j = /* @__PURE__ */ new Map());
        const V = j.get($);
        V === void 0 ? (f = He(), j.set($, f)) : f = V;
      }
    }
    const v = f;
    let g;
    if (f.s === cn ? g = f.v : (g = e.apply(null, arguments), c++), v.s = cn, o) {
      const N = (a == null ? void 0 : a.deref()) ?? a;
      N != null && o(N, g) && (g = N, c !== 0 && c--), a = typeof g == "object" && g !== null || typeof g == "function" ? new Dr(g) : g;
    }
    return v.v = g, g;
  }
  return l.clearCache = () => {
    n = He(), l.resetResultsCount();
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
    const g = {
      ...n,
      ...w
    }, {
      memoize: N,
      memoizeOptions: x = [],
      argsMemoize: $ = On,
      argsMemoizeOptions: j = [],
      devModeChecks: V = {}
    } = g, m = an(x), b = an(j), S = xr(a), D = N(function() {
      return c++, v.apply(
        null,
        arguments
      );
    }, ...m);
    let A = !0;
    const T = $(function() {
      l++;
      const U = un(
        S,
        arguments
      );
      if (process.env.NODE_ENV !== "production") {
        const { identityFunctionCheck: q, inputStabilityCheck: W } = Sr(A, V);
        if (q.shouldRun && q.run(
          v
        ), W.shouldRun) {
          const B = un(
            S,
            arguments
          );
          W.run(
            { inputSelectorResults: U, inputSelectorResultsCopy: B },
            { memoize: N, memoizeOptions: m },
            arguments
          );
        }
        A && (A = !1);
      }
      return f = D.apply(null, U), f;
    }, ...b);
    return Object.assign(T, {
      resultFunc: v,
      memoizedResultFunc: D,
      dependencies: S,
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
      argsMemoize: $
    });
  };
}
function kn(e) {
  return ({ dispatch: n, getState: o }) => (a) => (c) => typeof c == "function" ? c(n, o, e) : a(c);
}
var jr = kn(), Rr = kn, Ar = (...e) => {
  const t = Cr(...e);
  return (...n) => {
    const o = t(...n), a = (c, ...l) => o(ve(c) ? En(c) : c, ...l);
    return Object.assign(a, o), a;
  };
};
Ar(On);
var Tr = typeof window < "u" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : function() {
  if (arguments.length !== 0)
    return typeof arguments[0] == "object" ? Qe : Qe.apply(null, arguments);
}, Mr = (e) => e && typeof e.match == "function";
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
  return n.toString = () => `${e}`, n.type = e, n.match = (o) => yn(o) && o.type === e, n;
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
function xn(e, t) {
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
var Sn = class Pe extends Array {
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
function ln(e) {
  return ye(e) ? _n(e, () => {
  }) : e;
}
function fn(e, t, n) {
  if (e.has(t)) {
    let a = e.get(t);
    return n.update && (a = n.update(a, t, e), e.set(t, a)), a;
  }
  if (!n.insert)
    throw new Error(process.env.NODE_ENV === "production" ? F(10) : "No insert provided for key not already in map");
  const o = n.insert(t, e);
  return e.set(t, o), o;
}
function Fr(e) {
  return typeof e != "object" || e == null || Object.isFrozen(e);
}
function Br(e, t, n) {
  const o = In(e, t, n);
  return {
    detectMutations() {
      return Dn(e, t, o, n);
    }
  };
}
function In(e, t = [], n, o = "", a = /* @__PURE__ */ new Set()) {
  const c = {
    value: n
  };
  if (!e(n) && !a.has(n)) {
    a.add(n), c.children = {};
    for (const l in n) {
      const f = o ? o + "." + l : l;
      t.length && t.indexOf(f) !== -1 || (c.children[l] = In(e, t, n[l], f));
    }
  }
  return c;
}
function Dn(e, t = [], n, o, a = !1, c = "") {
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
  for (let g in n.children)
    w[g] = !0;
  for (let g in o)
    w[g] = !0;
  const v = t.length > 0;
  for (let g in w) {
    const N = c ? c + "." + g : g;
    if (v && t.some((j) => j instanceof RegExp ? j.test(N) : N === j))
      continue;
    const x = Dn(e, t, n.children[g], o[g], f, N);
    if (x.wasMutated)
      return x;
  }
  return {
    wasMutated: !1
  };
}
function Wr(e = {}) {
  if (process.env.NODE_ENV === "production")
    return () => (t) => (n) => t(n);
  {
    let t = function(f, w, v, g) {
      return JSON.stringify(f, n(w, g), v);
    }, n = function(f, w) {
      let v = [], g = [];
      return w || (w = function(N, x) {
        return v[0] === x ? "[Circular ~]" : "[Circular ~." + g.slice(0, v.indexOf(x)).join(".") + "]";
      }), function(N, x) {
        if (v.length > 0) {
          var $ = v.indexOf(this);
          ~$ ? v.splice($ + 1) : v.push(this), ~$ ? g.splice($, 1 / 0, N) : g.push(N), ~v.indexOf(x) && (x = w.call(this, N, x));
        } else
          v.push(x);
        return f == null ? x : f.call(this, N, x);
      };
    }, {
      isImmutable: o = Fr,
      ignoredPaths: a,
      warnAfter: c = 32
    } = e;
    const l = Br.bind(null, o, a);
    return ({
      getState: f
    }) => {
      let w = f(), v = l(w), g;
      return (N) => (x) => {
        const $ = xn(c, "ImmutableStateInvariantMiddleware");
        $.measureTime(() => {
          if (w = f(), g = v.detectMutations(), v = l(w), g.wasMutated)
            throw new Error(process.env.NODE_ENV === "production" ? F(19) : `A state mutation was detected between dispatches, in the path '${g.path || ""}'.  This may cause incorrect behavior. (https://redux.js.org/style-guide/style-guide#do-not-mutate-state)`);
        });
        const j = N(x);
        return $.measureTime(() => {
          if (w = f(), g = v.detectMutations(), v = l(w), g.wasMutated)
            throw new Error(process.env.NODE_ENV === "production" ? F(20) : `A state mutation was detected inside a dispatch, in the path: ${g.path || ""}. Take a look at the reducer(s) handling the action ${t(x)}. (https://redux.js.org/style-guide/style-guide#do-not-mutate-state)`);
        }), $.warnIfExceeded(), j;
      };
    };
  }
}
function $n(e) {
  const t = typeof e;
  return e == null || t === "string" || t === "boolean" || t === "number" || Array.isArray(e) || Le(e);
}
function _t(e, t = "", n = $n, o, a = [], c) {
  let l;
  if (!n(e))
    return {
      keyPath: t || "<root>",
      value: e
    };
  if (typeof e != "object" || e === null || c != null && c.has(e))
    return !1;
  const f = o != null ? o(e) : Object.entries(e), w = a.length > 0;
  for (const [v, g] of f) {
    const N = t ? t + "." + v : v;
    if (!(w && a.some(($) => $ instanceof RegExp ? $.test(N) : N === $))) {
      if (!n(g))
        return {
          keyPath: N,
          value: g
        };
      if (typeof g == "object" && (l = _t(g, N, n, o, a, c), l))
        return l;
    }
  }
  return c && Cn(e) && c.add(e), !1;
}
function Cn(e) {
  if (!Object.isFrozen(e))
    return !1;
  for (const t of Object.values(e))
    if (!(typeof t != "object" || t === null) && !Cn(t))
      return !1;
  return !0;
}
function qr(e = {}) {
  if (process.env.NODE_ENV === "production")
    return () => (t) => (n) => t(n);
  {
    const {
      isSerializable: t = $n,
      getEntries: n,
      ignoredActions: o = [],
      ignoredActionPaths: a = ["meta.arg", "meta.baseQueryMeta"],
      ignoredPaths: c = [],
      warnAfter: l = 32,
      ignoreState: f = !1,
      ignoreActions: w = !1,
      disableCache: v = !1
    } = e, g = !v && WeakSet ? /* @__PURE__ */ new WeakSet() : void 0;
    return (N) => (x) => ($) => {
      if (!yn($))
        return x($);
      const j = x($), V = xn(l, "SerializableStateInvariantMiddleware");
      return !w && !(o.length && o.indexOf($.type) !== -1) && V.measureTime(() => {
        const m = _t($, "", t, n, a, g);
        if (m) {
          const {
            keyPath: b,
            value: S
          } = m;
          console.error(`A non-serializable value was detected in an action, in the path: \`${b}\`. Value:`, S, `
Take a look at the logic that dispatched this action: `, $, `
(See https://redux.js.org/faq/actions#why-should-type-be-a-string-or-at-least-serializable-why-should-my-action-types-be-constants)`, `
(To allow non-serializable values see: https://redux-toolkit.js.org/usage/usage-guide#working-with-non-serializable-data)`);
        }
      }), f || (V.measureTime(() => {
        const m = N.getState(), b = _t(m, "", t, n, c, g);
        if (b) {
          const {
            keyPath: S,
            value: D
          } = b;
          console.error(`A non-serializable value was detected in the state, in the path: \`${S}\`. Value:`, D, `
Take a look at the reducer(s) handling this action type: ${$.type}.
(See https://redux.js.org/faq/organizing-state#can-i-put-functions-promises-or-other-non-serializable-items-in-my-store-state)`);
        }
      }), V.warnIfExceeded()), j;
    };
  }
}
function Xe(e) {
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
  if (n && (Xe(n) ? l.push(jr) : l.push(Rr(n.extraArgument))), process.env.NODE_ENV !== "production") {
    if (o) {
      let f = {};
      Xe(o) || (f = o), l.unshift(Wr(f));
    }
    if (a) {
      let f = {};
      Xe(a) || (f = a), l.push(qr(f));
    }
    if (c) {
      let f = {};
      Xe(c) || (f = c), l.unshift(zr(f));
    }
  }
  return l;
}, Ur = "RTK_autoBatch", jn = (e) => (t) => {
  setTimeout(t, e);
}, Gr = typeof window < "u" && window.requestAnimationFrame ? window.requestAnimationFrame : jn(10), Kr = (e = {
  type: "raf"
}) => (t) => (...n) => {
  const o = t(...n);
  let a = !0, c = !1, l = !1;
  const f = /* @__PURE__ */ new Set(), w = e.type === "tick" ? queueMicrotask : e.type === "raf" ? Gr : e.type === "callback" ? e.queueNotification : jn(e.timeout), v = () => {
    l = !1, c && (c = !1, f.forEach((g) => g()));
  };
  return Object.assign({}, o, {
    // Override the base `store.subscribe` method to keep original listeners
    // from running if we're delaying notifications
    subscribe(g) {
      const N = () => a && g(), x = o.subscribe(N);
      return f.add(g), () => {
        x(), f.delete(g);
      };
    },
    // Override the base `store.dispatch` method so that we can check actions
    // for the `shouldAutoBatch` flag and determine if batching is active
    dispatch(g) {
      var N;
      try {
        return a = !((N = g == null ? void 0 : g.meta) != null && N[Ur]), c = !a, c && (l || (l = !0, w(v))), o.dispatch(g);
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
}, me = process.env.NODE_ENV === "production";
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
  else if (Le(n))
    f = cr(n);
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
  if (!me && w.some((j) => typeof j != "function"))
    throw new Error(process.env.NODE_ENV === "production" ? F(4) : "each middleware provided to configureStore must be a function");
  let v = Qe;
  a && (v = Tr({
    // Enable capture of stack traces for dispatched Redux actions
    trace: !me,
    ...typeof a == "object" && a
  }));
  const g = lr(...w), N = Yr(g);
  if (!me && l && typeof l != "function")
    throw new Error(process.env.NODE_ENV === "production" ? F(5) : "`enhancers` field must be a callback");
  let x = typeof l == "function" ? l(N) : N();
  if (!me && !Array.isArray(x))
    throw new Error(process.env.NODE_ENV === "production" ? F(6) : "`enhancers` callback must return an array");
  if (!me && x.some((j) => typeof j != "function"))
    throw new Error(process.env.NODE_ENV === "production" ? F(7) : "each enhancer provided to configureStore must be a function");
  !me && w.length && !x.includes(g) && console.error("middlewares were provided, but middleware enhancer was not included in final enhancers - make sure to call `getDefaultEnhancers`");
  const $ = v(...x);
  return hn(f, c, $);
}
function Rn(e) {
  const t = {}, n = [];
  let o;
  const a = {
    addCase(c, l) {
      if (process.env.NODE_ENV !== "production") {
        if (n.length > 0)
          throw new Error(process.env.NODE_ENV === "production" ? F(26) : "`builder.addCase` should only be called before calling `builder.addMatcher`");
        if (o)
          throw new Error(process.env.NODE_ENV === "production" ? F(27) : "`builder.addCase` should only be called before calling `builder.addDefaultCase`");
      }
      const f = typeof c == "string" ? c : c.type;
      if (!f)
        throw new Error(process.env.NODE_ENV === "production" ? F(28) : "`builder.addCase` cannot be called with an empty action type");
      if (f in t)
        throw new Error(process.env.NODE_ENV === "production" ? F(29) : `\`builder.addCase\` cannot be called with two reducers for the same action type '${f}'`);
      return t[f] = l, a;
    },
    addMatcher(c, l) {
      if (process.env.NODE_ENV !== "production" && o)
        throw new Error(process.env.NODE_ENV === "production" ? F(30) : "`builder.addMatcher` should only be called before calling `builder.addDefaultCase`");
      return n.push({
        matcher: c,
        reducer: l
      }), a;
    },
    addDefaultCase(c) {
      if (process.env.NODE_ENV !== "production" && o)
        throw new Error(process.env.NODE_ENV === "production" ? F(31) : "`builder.addDefaultCase` can only be called once");
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
    throw new Error(process.env.NODE_ENV === "production" ? F(8) : "The object notation for `createReducer` has been removed. Please use the 'builder callback' notation instead: https://redux-toolkit.js.org/api/createReducer");
  let [n, o, a] = Rn(t), c;
  if (Xr(e))
    c = () => ln(e());
  else {
    const f = ln(e);
    c = () => f;
  }
  function l(f = c(), w) {
    let v = [n[w.type], ...o.filter(({
      matcher: g
    }) => g(w)).map(({
      reducer: g
    }) => g)];
    return v.filter((g) => !!g).length === 0 && (v = [a]), v.reduce((g, N) => {
      if (N)
        if (ve(g)) {
          const $ = N(g, w);
          return $ === void 0 ? g : $;
        } else {
          if (ye(g))
            return _n(g, (x) => N(x, w));
          {
            const x = N(g, w);
            if (x === void 0) {
              if (g === null)
                return g;
              throw new Error(process.env.NODE_ENV === "production" ? F(9) : "A case reducer on a non-draftable value must not return undefined");
            }
            return x;
          }
        }
      return g;
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
      throw new Error(process.env.NODE_ENV === "production" ? F(11) : "`name` is a required option for createSlice");
    typeof process < "u" && process.env.NODE_ENV === "development" && a.initialState === void 0 && console.error("You must provide an `initialState` value that is not `undefined`. You may have misspelled `initialState`");
    const f = (typeof a.reducers == "function" ? a.reducers(ro()) : a.reducers) || {}, w = Object.keys(f), v = {
      sliceCaseReducersByName: {},
      sliceCaseReducersByType: {},
      actionCreators: {},
      sliceMatchers: []
    }, g = {
      addCase(m, b) {
        const S = typeof m == "string" ? m : m.type;
        if (!S)
          throw new Error(process.env.NODE_ENV === "production" ? F(12) : "`context.addCase` cannot be called with an empty action type");
        if (S in v.sliceCaseReducersByType)
          throw new Error(process.env.NODE_ENV === "production" ? F(13) : "`context.addCase` cannot be called with two reducers for the same action type: " + S);
        return v.sliceCaseReducersByType[S] = b, g;
      },
      addMatcher(m, b) {
        return v.sliceMatchers.push({
          matcher: m,
          reducer: b
        }), g;
      },
      exposeAction(m, b) {
        return v.actionCreators[m] = b, g;
      },
      exposeCaseReducer(m, b) {
        return v.sliceCaseReducersByName[m] = b, g;
      }
    };
    w.forEach((m) => {
      const b = f[m], S = {
        reducerName: m,
        type: Zr(c, m),
        createNotation: typeof a.reducers == "function"
      };
      io(b) ? ao(S, b, g, t) : oo(S, b, g);
    });
    function N() {
      if (process.env.NODE_ENV !== "production" && typeof a.extraReducers == "object")
        throw new Error(process.env.NODE_ENV === "production" ? F(14) : "The object notation for `createSlice.extraReducers` has been removed. Please use the 'builder callback' notation instead: https://redux-toolkit.js.org/api/createSlice");
      const [m = {}, b = [], S = void 0] = typeof a.extraReducers == "function" ? Rn(a.extraReducers) : [a.extraReducers], D = {
        ...m,
        ...v.sliceCaseReducersByType
      };
      return Jr(a.initialState, (A) => {
        for (let T in D)
          A.addCase(T, D[T]);
        for (let T of v.sliceMatchers)
          A.addMatcher(T.matcher, T.reducer);
        for (let T of b)
          A.addMatcher(T.matcher, T.reducer);
        S && A.addDefaultCase(S);
      });
    }
    const x = (m) => m, $ = /* @__PURE__ */ new WeakMap();
    let j;
    const V = {
      name: c,
      reducerPath: l,
      reducer(m, b) {
        return j || (j = N()), j(m, b);
      },
      actions: v.actionCreators,
      caseReducers: v.sliceCaseReducersByName,
      getInitialState() {
        return j || (j = N()), j.getInitialState();
      },
      getSelectors(m = x) {
        const b = fn($, this, {
          insert: () => /* @__PURE__ */ new WeakMap()
        });
        return fn(b, m, {
          insert: () => {
            const S = {};
            for (const [D, A] of Object.entries(a.selectors ?? {}))
              S[D] = to(this, A, m, this !== V);
            return S;
          }
        });
      },
      selectSlice(m) {
        let b = m[this.reducerPath];
        if (typeof b > "u") {
          if (this !== V)
            b = this.getInitialState();
          else if (process.env.NODE_ENV !== "production")
            throw new Error(process.env.NODE_ENV === "production" ? F(15) : "selectSlice returned undefined for an uninjected slice reducer");
        }
        return b;
      },
      get selectors() {
        return this.getSelectors(this.selectSlice);
      },
      injectInto(m, {
        reducerPath: b,
        ...S
      } = {}) {
        const D = b ?? this.reducerPath;
        return m.inject({
          reducerPath: D,
          reducer: this.reducer
        }, S), {
          ...this,
          reducerPath: D
        };
      }
    };
    return V;
  };
}
function to(e, t, n, o) {
  function a(c, ...l) {
    let f = n.call(e, c);
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
      throw new Error(process.env.NODE_ENV === "production" ? F(17) : "Please use the `create.preparedReducer` notation for prepared action creators with the `create` notation.");
    c = o.reducer, l = o.prepare;
  } else
    c = o;
  a.addCase(e, c).exposeCaseReducer(t, c).exposeAction(t, l ? qe(e, l) : qe(e));
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
    throw new Error(process.env.NODE_ENV === "production" ? F(18) : "Cannot use `create.asyncThunk` in the built-in `createSlice`. Use `buildCreateSlice({ creators: { asyncThunk: asyncThunkCreator } })` to create a customised version of `createSlice`.");
  const {
    payloadCreator: c,
    fulfilled: l,
    pending: f,
    rejected: w,
    settled: v,
    options: g
  } = n, N = a(e, c, g);
  o.exposeAction(t, N), l && o.addCase(N.fulfilled, l), f && o.addCase(N.pending, f), w && o.addCase(N.rejected, w), v && o.addMatcher(N.settled, v), o.exposeCaseReducer(t, {
    fulfilled: l || Je,
    pending: f || Je,
    rejected: w || Je,
    settled: v || Je
  });
}
function Je() {
}
var St = "listenerMiddleware";
qe(`${St}/add`);
qe(`${St}/removeAll`);
qe(`${St}/remove`);
function F(e) {
  return `Minified Redux Toolkit error #${e}; visit https://redux-toolkit.js.org/Errors?code=${e} for the full message or use the non-minified dev environment for full errors. `;
}
var An = { exports: {} };
(function(e, t) {
  (function(n) {
    e.exports = n();
  })(function() {
    var n = {}, o = {};
    Object.defineProperty(o, "__esModule", { value: !0 }), o.Gubu = void 0;
    const a = Symbol.for("gubu$"), c = { gubu$: a, v$: "6.0.1" }, l = Symbol.for("gubu$nil"), f = /^[A-Z]/, w = "gubu", v = "name", g = "nan", N = "never", x = "number", $ = "required", j = "array", V = "function", m = "object", b = "string", S = "boolean", D = "undefined", A = "any", T = "list", Z = "instance", U = "null", q = "type", W = "closed", B = "shape", ce = "check", le = "Object", Ue = "Array", Ge = "Function", re = "Value", fe = "Above", Oe = "All", Ke = "Below", Ce = "Max", Mn = "Min", Vn = "Len", Pn = "One", zn = "Some", de = " for property ", pe = '"$PATH"', he = '"$VALUE"', ke = (r) => Object.keys(r), xe = (r, s, u) => Object.defineProperty(r, s, u), se = (r) => Array.isArray(r), st = (r) => JSON.parse(r), at = (r, s) => JSON.stringify(r, s);
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
        this.val = s, this.valType = typeof this.val, x === this.valType && isNaN(this.val) && (this.valType = g), this.isRoot && !this.match && (this.root = this.val);
      }
    }
    class Bn extends TypeError {
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
    const ut = { String: !0, Number: !0, Boolean: !0, Object: !0, Array: !0, Function: !0, Symbol: !0, BigInt: !0 }, ct = { string: "", number: 0, boolean: !1, object: {}, array: [], symbol: Symbol(""), bigint: BigInt(0), null: null };
    function oe(r, s, u) {
      var y, p, _, h;
      if (Se === r)
        r = void 0;
      else if (r != null && (!((y = r.$) === null || y === void 0) && y.gubu$)) {
        if (a === r.$.gubu$)
          return r.d = s ?? r.d, r;
        if (r.$.gubu$ === !0) {
          let C = Object.assign({}, r);
          return C.$ = Object.assign(Object.assign({ v$: "6.0.1" }, C.$), { gubu$: a }), C.v = C.v != null && m === typeof C.v ? Object.assign({}, C.v) : C.v, C.t = C.t || typeof C.v, V === C.t && ut[C.v.name] && (C.t = C.v.name.toLowerCase(), C.v = lt(ct[C.t]), C.f = C.v), C.r = !!C.r, C.p = !!C.p, C.d = s ?? (C.d == null ? -1 : C.d), C.b = C.b || [], C.a = C.a || [], C.u = C.u || {}, C.m = C.m || u || {}, C;
        }
      }
      let d = r === null ? U : typeof r;
      d = D === d ? A : d;
      let E = r, I = E, R = l, k = !1, i = {}, O = [], M = [];
      if (m === d)
        I = void 0, se(E) ? (d = j, E.length === 1 && (R = E[0], E = [])) : E != null && Function !== E.constructor && Object !== E.constructor && E.constructor != null ? (d = Z, i.n = E.constructor.name, i.i = E.constructor, I = E) : ke(E).length === 0 && (R = be());
      else if (V === d)
        if (ut[r.name])
          d = r.name.toLowerCase(), k = !0, E = lt(ct[d]), I = E, le === r.name && (R = be());
        else if (E.gubu === c || ((p = E.$) === null || p === void 0 ? void 0 : p.gubu) === !0) {
          let C = E.node ? E.node() : E;
          d = C.t, E = C.v, I = E, k = C.r, i = Object.assign({}, C.u), O = [...C.a], M = [...C.b];
        } else
          Ge === E.constructor.name && f.test(E.name) && (d = Z, k = !0, i.n = (h = (_ = E.prototype) === null || _ === void 0 ? void 0 : _.constructor) === null || h === void 0 ? void 0 : h.name, i.i = E);
      else
        x === d && isNaN(E) ? d = g : b === d && E === "" && (i.empty = !0);
      let G = E == null || m !== d && j !== d ? E : Object.assign({}, E);
      return { $: c, t: d, v: G, f: I, n: G != null && m === typeof G ? ke(G).length : 0, c: R, r: k, p: !1, d: s ?? -1, k: [], e: !0, u: i, a: O, b: M, m: u || {} };
    }
    function Se(r, s) {
      const u = s ?? {};
      u.name = u.name == null ? "G" + ("" + Math.random()).substring(2, 8) : "" + u.name, u.prefix = u.prefix == null ? void 0 : u.prefix;
      let y = u.meta = u.meta || {};
      y.active = y.active === !0 || !1, y.suffix = b == typeof y.suffix ? y.suffix : "$$";
      let p = u.keyexpr = u.keyexpr || {};
      p.active = p.active !== !1;
      let _ = oe(r, 0);
      function h(I, R, k) {
        let i = new Fn(I, _, R, k);
        for (; i.next(), !i.stop; ) {
          let O = i.node, M = !1, G = !1;
          if (0 < O.b.length)
            for (let Y = 0; Y < O.b.length; Y++) {
              let z = It(O.b[Y], i);
              O = i.node, z.done !== void 0 && (M = z.done), G = G || !!z.fatal;
            }
          if (!M) {
            let Y = !0, z = i.val === void 0;
            if (N === i.type)
              i.curerr.push(ie(N, i, 1070));
            else if (m === i.type) {
              let L;
              if (O.r && z ? (i.ignoreVal = !0, i.curerr.push(ie($, i, 1010))) : z || i.val !== null && m === i.valType && !se(i.val) ? !O.p && z && O.f !== void 0 ? (i.updateVal(O.f), i.fromDefault = !0, L = i.val, Y = !1) : O.p && z || (i.updateVal(i.val || (i.fromDefault = !0, {})), L = i.val) : (i.curerr.push(ie(q, i, 1020)), L = se(i.val) ? i.val : {}), Y && (L = L == null && i.ctx.err === !1 ? {} : L, L != null)) {
                i.ctx.log && i.ctx.log("so", i);
                let Ie = !1, ue = ke(O.v), Ve = i.nI;
                if (0 < ue.length) {
                  Ie = !0, i.pI = Ve;
                  for (let X = 0; X < ue.length; X++) {
                    let we, ee = ue[X];
                    if (y.active && ee.endsWith(y.suffix)) {
                      if (we = { short: "" }, b === typeof O.v[ee] ? we.short = O.v[ee] : we = Object.assign(Object.assign({}, we), O.v[ee]), delete O.v[ee], X++, ue.length <= X)
                        break;
                      if (ue[X] !== ee.substring(0, ee.length - y.suffix.length))
                        throw new Error("Invalid meta key: " + ee);
                      ee = ue[X];
                    }
                    let De = ee, ft = O.v[ee];
                    if (p.active) {
                      let dt = /^\s*("(\\.|[^"\\])*"|[^\s]+):\s*(.*?)\s*$/.exec(ee);
                      dt && (De = dt[1], ft = je({ src: dt[3], val: ft }), delete O.v[ee]);
                    }
                    let Qt = oe(ft, 1 + i.dI, we);
                    O.v[De] = Qt, O.k.includes(De) || O.k.push(De), i.nodes[i.nI] = Qt, i.vals[i.nI] = L[De], i.parents[i.nI] = L, i.keys[i.nI] = De, i.nI++;
                  }
                }
                let H = ke(L).filter((X) => O.v[X] === void 0);
                if (0 < H.length)
                  if (l === O.c)
                    i.ignoreVal = !0, i.curerr.push(ie(W, i, 1100, void 0, { k: H }));
                  else {
                    Ie = !0, i.pI = Ve;
                    for (let X of H) {
                      let we = O.c = oe(O.c, 1 + i.dI);
                      i.nodes[i.nI] = we, i.vals[i.nI] = L[X], i.parents[i.nI] = L, i.keys[i.nI] = X, i.nI++;
                    }
                  }
                Ie ? (i.dI++, i.nodes[i.nI] = i.sI, i.parents[i.nI] = L, i.nextSibling = !1, i.nI++) : i.ctx.log && i.ctx.log("eo", i);
              }
            } else if (j === i.type)
              if (O.r && z)
                i.ignoreVal = !0, i.curerr.push(ie($, i, 1030));
              else if (z || se(i.val)) {
                if (!O.p && z && O.f !== void 0)
                  i.updateVal(O.f), i.fromDefault = !0;
                else if (!O.p || i.val != null) {
                  i.updateVal(i.val || (i.fromDefault = !0, []));
                  let L = l !== O.c, Ie = 0 < i.val.length, ue = ke(O.v).filter((H) => !isNaN(+H)), Ve = 0 < ue.length;
                  if (i.ctx.log && i.ctx.log("sa", i), Ie || Ve) {
                    i.pI = i.nI;
                    let H = 0;
                    if (Ve)
                      if (ue.length < i.val.length && !L)
                        i.ignoreVal = !0, i.curerr.push(ie(W, i, 1090, void 0, { k: ue.length }));
                      else
                        for (; H < ue.length; H++) {
                          let X = O.v[H] = oe(O.v[H], 1 + i.dI);
                          i.nodes[i.nI] = X, i.vals[i.nI] = i.val[H], i.parents[i.nI] = i.val, i.keys[i.nI] = "" + H, i.nI++;
                        }
                    if (L && Ie) {
                      let X = O.c = oe(O.c, 1 + i.dI);
                      for (; H < i.val.length; H++)
                        i.nodes[i.nI] = X, i.vals[i.nI] = i.val[H], i.parents[i.nI] = i.val, i.keys[i.nI] = "" + H, i.nI++;
                    }
                    i.ignoreVal || (i.dI++, i.nodes[i.nI] = i.sI, i.parents[i.nI] = i.val, i.nextSibling = !1, i.nI++);
                  } else
                    i.ctx.log && L && I == null && i.ctx.log("kv", Object.assign(Object.assign({}, i), { key: 0, val: O.c })), i.ctx.log && i.ctx.log("ea", i);
                }
              } else
                i.curerr.push(ie(q, i, 1040));
            else if (A === i.type || T === i.type || i.val === void 0 || i.type === i.valType || Z === i.type && O.u.i && i.val instanceof O.u.i || U === i.type && i.val === null)
              if (i.val === void 0) {
                let L = i.path[i.dI];
                !O.r || D === i.type && i.parent.hasOwnProperty(L) ? O.f !== void 0 && !O.p || D === i.type ? (i.updateVal(O.f), i.fromDefault = !0) : A === i.type && (i.ignoreVal = i.ignoreVal === void 0 || i.ignoreVal) : (i.ignoreVal = !0, i.curerr.push(ie($, i, 1060))), i.ctx.log && i.ctx.log("kv", i);
              } else
                b !== i.type || i.val !== "" || O.u.empty || i.curerr.push(ie($, i, 1080)), i.ctx.log && i.ctx.log("kv", i);
            else
              i.curerr.push(ie(q, i, 1050));
          }
          if (0 < O.a.length)
            for (let Y = 0; Y < O.a.length; Y++) {
              let z = It(O.a[Y], i);
              O = i.node, z.done !== void 0 && (M = z.done), G = G || !!z.fatal;
            }
          let C = i.node.p ? i.ignoreVal !== !1 : !!i.ignoreVal;
          !i.match && i.parent != null && !M && !C && (i.parent[i.key] = i.val), i.nextSibling && (i.pI = i.sI), (i.node.e || G) && i.err.push(...i.curerr);
        }
        if (0 < i.err.length) {
          if (se(i.ctx.err))
            i.ctx.err.push(...i.err);
          else if (!i.match && i.ctx.err !== !1)
            throw new Bn(B, u.prefix, i.err, i.ctx);
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
      }, d.spec = () => (d(void 0, { err: !1 }), st(J(_, (I, R) => a === R || R, !1, !0))), d.node = () => (d.spec(), _);
      let E = "";
      return d.toString = () => (E = Ae(E === "" ? J(_ && _.$ && (a === _.$.gubu$ || _.$.gubu$ === !0) ? _.v : _) : E), `[Gubu ${u.name} ${E}]`), n.inspect && n.inspect.custom && (d[n.inspect.custom] = d.toString), d.gubu = c, d.spec(), d;
    }
    function je(r) {
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
          return p[u] || (D === u ? void 0 : u === "NaN" ? NaN : u.match(/^\/.+\/$/) ? new RegExp(u.substring(1, u.length - 1)) : st(u));
        } catch {
          throw new SyntaxError(`Gubu: unexpected token ${u} in builder expression ${r.src}`);
        }
      r.tokens[r.i] === "(" && r.i++;
      let _ = [], h = null;
      for (; (h = r.tokens[r.i]) != null && h !== ")"; ) {
        let d = je(r);
        _.push(d);
      }
      return r.i++, r.val = y.call(r.val, ..._), r.tokens[r.i] === "." ? (r.i++, je(r)) : s && r.i < r.tokens.length ? je(r) : r.val;
    }
    function It(r, s) {
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
        let d = p.why || ce, E = Dt(s);
        if (b === typeof p.err)
          s.curerr.push(ae(s, p.err));
        else if (m === typeof p.err)
          s.curerr.push(...[p.err].flat().filter((I) => I != null).map((I) => (I.p = I.p == null ? E : I.p, I.m = I.m == null ? 2010 : I.m, I)));
        else {
          let I = r.name;
          I != null && I != "" || (I = Ae(r.toString().replace(/[ \t\r\n]+/g, " "))), s.curerr.push(ie(d, s, 1045, void 0, { thrown: y }, I));
        }
        p.done = p.done == null || p.done;
      }
      return p.hasOwnProperty("uval") ? (s.updateVal(p.uval), s.ignoreVal = !1) : p.val === void 0 || Number.isNaN(p.val) || (s.updateVal(p.val), s.ignoreVal = !1), p.node !== void 0 && (s.node = p.node), p.type !== void 0 && (s.type = p.type), p;
    }
    function Dt(r) {
      return r.path.slice(1, r.dI + 1).filter((s) => s != null).join(".");
    }
    function Re(r) {
      return x === typeof r ? r : x === typeof (r == null ? void 0 : r.length) ? r.length : r != null && m === typeof r ? ke(r).length : NaN;
    }
    function Ae(r, s) {
      let u = String(r), y = s == null || isNaN(s) ? 30 : s < 0 ? 0 : ~~s, p = r == null ? 0 : u.length, _ = r == null ? "" : u.substring(0, p);
      return _ = y < p ? _.substring(0, y - 3) + "..." : _, _.substring(0, y);
    }
    const $t = function(r) {
      let s = P(this, r);
      return s.r = !0, s.p = !1, r === void 0 && arguments.length === 1 && (s.t = D, s.v = void 0), s;
    }, Ct = function(r) {
      let s = P(this, r);
      return s.c = be(), s;
    }, Wn = function(r) {
      let s = P(this, r);
      return s.r = !1, r === void 0 && arguments.length === 1 && (s.t = D, s.v = void 0), s;
    }, be = function(r) {
      let s = P(this, r);
      return s.t = A, r !== void 0 && (s.v = r, s.f = r), s;
    }, jt = function(r, s) {
      let u = P(this, s);
      return u.z = r, u;
    }, Rt = function(r) {
      let s = P(this, r);
      return s.r = !1, s.p = !0, s;
    }, At = function(r) {
      let s = P(this, r);
      return s.r = !1, s.p = !0, s.e = !1, s.a.push(function(u, y, p) {
        return 0 < p.curerr.length && (y.uval = void 0, y.done = !1), !0;
      }), s;
    }, qn = function(r) {
      let s = P(this);
      return s.t = V, s.v = r, s.f = r, s;
    }, Ln = function(r, s) {
      let u = P(this, s === void 0 ? r : s);
      return u.r = !1, u.f = r, V === typeof r && ut[r.name] && (u.t = r.name.toLowerCase(), u.f = lt(ct[u.t])), u.p = !1, u;
    }, Tt = function(r) {
      let s = P(this, r);
      return s.u.empty = !0, s;
    }, Mt = function(r) {
      let s = P(this, r);
      return s.t = N, s;
    }, Un = function(r, s) {
      let u = P(this), y = x === typeof r;
      u.t = b, y && s == null && (u = oe([]));
      let p = null;
      return V === typeof r && (p = r, u = be()), u.b.push(function(_, h, d) {
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
      let s = P();
      s.t = T, s.r = !0;
      let u = r.map((y) => Me(y));
      return s.u.list = r, s.b.push(function(y, p, _) {
        let h = !0;
        for (let d of u) {
          let E = Object.assign(Object.assign({}, _.ctx), { err: [] });
          d(y, E), 0 < E.err.length && (h = !1);
        }
        return h || (p.why = Oe, p.err = [ae(_, re + " " + he + de + pe + " does not satisfy all of: " + r.map((d) => J(d, null, !0)).join(", "))]), h;
      }), s;
    }, Kn = function(...r) {
      let s = P();
      s.t = T, s.r = !0;
      let u = r.map((y) => Me(y));
      return s.u.list = r, s.b.push(function(y, p, _) {
        let h = !1;
        for (let d of u) {
          let E = Object.assign(Object.assign({}, _.ctx), { err: [] }), I = d.match(y, E);
          I && (p.val = d(y, E)), h || (h = I);
        }
        return h || (p.why = zn, p.err = [ae(_, re + " " + he + de + pe + " does not satisfy any of: " + r.map((d) => J(d, null, !0)).join(", "))]), h;
      }), s;
    }, Yn = function(...r) {
      let s = P();
      s.t = T, s.r = !0;
      let u = r.map((y) => Me(y));
      return s.u.list = r, s.b.push(function(y, p, _) {
        let h = 0;
        for (let d of u) {
          let E = Object.assign(Object.assign({}, _.ctx), { err: [] });
          if (d.match(y, E)) {
            h++, p.val = d(y, E);
            break;
          }
        }
        return h !== 1 && (p.why = Pn, p.err = [ae(_, re + " " + he + de + pe + " does not satisfy one of: " + r.map((d) => J(d, null, !0)).join(", "))]), !0;
      }), s;
    }, Vt = function(...r) {
      let s = P();
      return s.b.push(function(u, y, p) {
        for (let _ = 0; _ < r.length; _++)
          if (u === r[_])
            return !0;
        return y.err = ae(p, re + " " + he + de + pe + " must be exactly one of: " + p.node.s + "."), y.done = !0, !1;
      }), s.s = r.map((u) => J(u, null, !0)).join(", "), s;
    }, Pt = function(r, s) {
      let u = P(this, s);
      return u.b.push(r), u;
    }, Ye = function(r, s) {
      let u = P(this, s);
      return u.a.push(r), u;
    }, zt = function(r, s) {
      let u = P(this, s);
      if (V === typeof r) {
        let y = r;
        y.gubu$ = y.gubu$ || {}, y.gubu$.Check = !0, u.b.push(r), u.s = (u.s == null ? "" : u.s + ";") + J(r, null, !0), u.r = !0;
      } else if (m === typeof r) {
        if (Object.prototype.toString.call(r).includes("RegExp")) {
          let y = (p) => p != null && !Number.isNaN(p) && !!String(p).match(r);
          xe(y, v, { value: String(r) }), xe(y, "gubu$", { value: { Check: !0 } }), u.b.push(y), u.s = J(r), u.r = !0;
        }
      } else
        b === typeof r && (u.t = r, u.r = !0);
      return u;
    }, Ft = function(r) {
      let s = P(this, r);
      return j === s.t && l !== s.c && s.n === 0 && (s.v = [s.c]), s.c = l, s;
    }, Bt = function(r, s) {
      let u = P(this, s), y = b === typeof r ? r : (m === typeof r && r || {}).name;
      return y != null && y != "" && u.b.push(function(p, _, h) {
        return (h.ctx.ref = h.ctx.ref || {})[y] = h.node, !0;
      }), u;
    }, Wt = function(r, s) {
      let u = P(this, s), y = m === typeof r && r || {}, p = b === typeof r ? r : y.name, _ = !!y.fill;
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
    }, qt = function(r, s) {
      let u = P(this, s), y = m === typeof r && r || {}, p = b === typeof r ? r : y.name, _ = S === typeof y.keep ? y.keep : void 0, h = se(y.claim) ? y.claim : [];
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
                  k.nodes.splice(M, 0, oe(O.dval)), k.vals.splice(M, 0, void 0), k.parents.splice(M, 0, k.parent), k.keys.splice(M, 0, i), k.nI++, k.pI++;
                } else
                  delete k.parent[i];
                break;
              }
            }
            R.val === void 0 && (R.val = k.node.v);
          }
          return !0;
        };
        xe(d, v, { value: "Rename:" + p }), u.b.push(d);
        let E = (I, R, k) => (k.parent[p] = I, k.match || _ || k.key === p || se(k.parent) && _ !== !1 || (delete k.parent[k.key], R.done = !0), k.ctx.Rename = k.ctx.Rename || {}, k.ctx.Rename.fromDefault = k.ctx.Rename.fromDefault || {}, k.ctx.Rename.fromDefault[p] = { yes: k.fromDefault, key: k.key, dval: k.node.v, node: k.node }, !0);
        xe(E, v, { value: "Rename:" + p }), u.a.push(E);
      }
      return u;
    }, Lt = function(r, s) {
      let u = P(this, s);
      return u.b.push(function(y, p, _) {
        let h = Re(y);
        if (r <= h)
          return !0;
        _.checkargs = { min: 1 };
        let d = x === typeof y ? "" : "length ";
        return p.err = ae(_, re + " " + he + de + pe + ` must be a minimum ${d}of ${r} (was ${h}).`), !1;
      }), u.s = Mn + "(" + r + (s == null ? "" : "," + J(s)) + ")", u;
    }, Ut = function(r, s) {
      let u = P(this, s);
      return u.b.push(function(y, p, _) {
        let h = Re(y);
        if (h <= r)
          return !0;
        let d = x === typeof y ? "" : "length ";
        return p.err = ae(_, re + " " + he + de + pe + ` must be a maximum ${d}of ${r} (was ${h}).`), !1;
      }), u.s = Ce + "(" + r + (s == null ? "" : "," + J(s)) + ")", u;
    }, Gt = function(r, s) {
      let u = P(this, s);
      return u.b.push(function(y, p, _) {
        let h = Re(y);
        if (r < h)
          return !0;
        let d = x === typeof y ? "be" : "have length";
        return p.err = ae(_, re + " " + he + de + pe + ` must ${d} above ${r} (was ${h}).`), !1;
      }), u.s = fe + "(" + r + (s == null ? "" : "," + J(s)) + ")", u;
    }, Kt = function(r, s) {
      let u = P(this, s);
      return u.b.push(function(y, p, _) {
        let h = Re(y);
        if (h < r)
          return !0;
        let d = x === typeof y ? "be" : "have length";
        return p.err = ae(_, re + " " + he + de + pe + ` must ${d} below ${r} (was ${h}).`), !1;
      }), u.s = Ke + "(" + r + (s == null ? "" : "," + J(s)) + ")", u;
    }, Yt = function(r, s) {
      let u = P(this, s || be());
      return u.b.push(function(y, p, _) {
        let h = Re(y);
        if (r === h)
          return !0;
        let d = x === typeof y ? "" : " in length";
        return p.err = ae(_, re + " " + he + de + pe + ` must be exactly ${r}${d} (was ${h}).`), !1;
      }), u.s = Vn + "(" + r + (s == null ? "" : "," + J(s)) + ")", u;
    }, Ht = function(r, s) {
      let u = P(this, s || {});
      return u.c = oe(r), u;
    }, Xt = function(r, s) {
      let u = P(this, s || []);
      return u.t = "array", u.c = oe(r), u.m = u.m || {}, u.m.rest = !0, u;
    };
    function P(r, s) {
      let u = oe(r == null || r.window === r || r.global === r ? s : r);
      return Object.assign(u, { Above: Gt, After: Ye, Any: be, Before: Pt, Below: Kt, Check: zt, Child: Ht, Closed: Ft, Define: Bt, Empty: Tt, Exact: Vt, Fault: jt, Ignore: At, Len: Yt, Max: Ut, Min: Lt, Never: Mt, Open: Ct, Refer: Wt, Rename: qt, Required: $t, Skip: Rt, Rest: Xt });
    }
    function ae(r, s, u, y) {
      return ie(u || ce, r, 4e3, s, y);
    }
    function ie(r, s, u, y, p, _) {
      var h;
      let d = { k: s.key, n: s.node, v: s.val, p: Dt(s), w: r, c: ((h = s.check) === null || h === void 0 ? void 0 : h.name) || "none", a: s.checkargs || {}, m: u, t: "", u: p || {} }, E = Ae((s.val === void 0 ? D : J(s.val)).replace(/"/g, ""));
      if ((y = y || s.node.z) == null || y === "") {
        let I = E.startsWith("[") ? j : E.startsWith("{") ? m : s.val == null || x === typeof s.val && isNaN(s.val) ? "value" : typeof s.val, R = E.startsWith("[") || se(s.parents[s.pI]) ? "index" : "property", k = "is", i = p == null ? void 0 : p.k;
        i = se(i) ? (R = 1 < i.length ? (k = "are", "properties") : R, i.join(", ")) : i, d.t = "Validation failed for " + (0 < d.p.length ? `${R} "${d.p}" with ` : "") + `${I} "${E}" because ` + (q === r ? Z === s.node.t ? `the ${I} is not an instance of ${s.node.u.n}` : `the ${I} is not of type ${s.node.t}` : $ === r ? s.val === "" ? "an empty string is not allowed" : `the ${I} is required` : r === "closed" ? `the ${R} "${i}" ${k} not allowed` : N === r ? "no value is allowed" : `check "${_ ?? r}" failed`) + (d.u.thrown ? " (threw: " + d.u.thrown.message + ")" : ".");
      } else
        d.t = y.replace(/\$VALUE/g, E).replace(/\$PATH/g, d.p);
      return d;
    }
    function Jt(r) {
      return r.s != null && r.s !== "" ? r.s : r.r || r.v === void 0 ? r.t : r.v;
    }
    function J(r, s, u, y) {
      let p;
      y || !r || !r.$ || a !== r.$.gubu$ && r.$.gubu$ !== !0 || (r = Jt(r));
      try {
        p = at(r, (_, h) => {
          var d, E;
          if (s && (h = s(_, h)), h != null && m === typeof h && h.constructor && le !== h.constructor.name && Ue !== h.constructor.name)
            h = V === typeof h.toString ? h.toString() : h.constructor.name;
          else if (V === typeof h)
            h = V === typeof Se[h.name] && isNaN(+_) ? void 0 : h.name != null && h.name !== "" ? h.name : Ae(h.toString().replace(/[ \t\r\n]+/g, " "));
          else if (typeof h == "bigint")
            h = String(h.toString());
          else {
            if (Number.isNaN(h))
              return "NaN";
            y === !0 || ((d = h == null ? void 0 : h.$) === null || d === void 0 ? void 0 : d.gubu$) !== !0 && a !== ((E = h == null ? void 0 : h.$) === null || E === void 0 ? void 0 : E.gubu$) || (h = Jt(h));
          }
          return h;
        }), p = String(p);
      } catch {
        p = at(String(r));
      }
      return u === !0 && (p = p.replace(/^"/, "").replace(/"$/, "")), p;
    }
    function lt(r) {
      return r == null || m !== typeof r ? r : st(at(r));
    }
    const Hn = (r) => oe(Object.assign(Object.assign({}, r), { $: { gubu$: !0 } })), Te = { Above: Gt, After: Ye, All: Gn, Any: be, Before: Pt, Below: Kt, Check: zt, Child: Ht, Closed: Ft, Default: Ln, Define: Bt, Empty: Tt, Exact: Vt, Fault: jt, Func: qn, Ignore: At, Key: Un, Len: Yt, Max: Ut, Min: Lt, Never: Mt, One: Yn, Open: Ct, Optional: Wn, Refer: Wt, Rename: qt, Required: $t, Skip: Rt, Some: Kn, Rest: Xt };
    if (D !== typeof window)
      for (let r in Te)
        xe(Te[r], v, { value: r });
    Object.assign(Se, Object.assign(Object.assign(Object.assign({ Gubu: Se }, Te), Object.entries(Te).reduce((r, s) => (r["G" + s[0]] = s[1], r), {})), { isShape: (r) => r && c === r.gubu, G$: Hn, buildize: P, makeErr: ae, stringify: J, truncate: Ae, nodize: oe, expr: je, MakeArgu: Xn })), xe(Se, v, { value: w });
    const Me = Se;
    o.Gubu = Me;
    function Xn(r) {
      return function(s, u, y) {
        let p = !1;
        b === typeof s && (p = !0, y = u, u = s);
        const _ = Me(y = y || u, { prefix: r + (u = b === typeof u ? " (" + u + ")" : "") }), h = _.node(), d = h.k;
        let E = s, I = {}, R = 0, k = 0;
        for (; R < d.length; R++) {
          let O = h.v[d[R]];
          O.p && (O = h.v[d[R]] = ((M) => Ye(function(G, C, Y) {
            if (0 < Y.curerr.length) {
              k++;
              for (let z = d.length - 1; z > M; z--)
                h.v[d[z]].m.rest ? I[d[z]].splice(h.v[d[z]].m.rest_pos + M - z, 0, I[d[z - 1]]) : (Y.vals[Y.pI + z - M] = Y.vals[Y.pI + z - M - 1], I[d[z]] = I[d[z - 1]]);
              C.uval = void 0, C.done = !1;
            }
            return !0;
          }, O))(R), O.e = !1), R !== d.length - 1 || h.v[d[R]].m.rest || (h.v[d[R]] = Ye(function(M, G, C) {
            return !(d.length - k < E.length && (C.curerr.length === 0 && (G.err = `Too many arguments for type signature (was ${E.length}, expected ${d.length - k})`), G.fatal = !0, 1));
          }, h.v[d[R]]));
        }
        function i(O) {
          for (let M = 0; M < d.length; M++) {
            let G = h.v[d[M]];
            G.m.rest ? (I[d[M]] = [...O].slice(M), G.m.rest_pos = I[d[M]].length) : I[d[M]] = O[M];
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
})(An);
var uo = An.exports;
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
  "repo-tag": "REPO_VERSION=`node -e \"console.log(require('./package').version)\"` && echo TAG: v$REPO_VERSION && git commit -a -m v$REPO_VERSION && git push && git tag v$REPO_VERSION && git push --tags",
  "repo-publish": "npm run clean && npm i && npm run repo-publish-quick",
  "repo-publish-quick": "npm run build && npm run test && npm run repo-tag && npm publish --access public --registry https://registry.npmjs.org "
}, Eo = {
  "@reduxjs/toolkit": "^2.0.1",
  "@seneca/gateway": "^1.0.0",
  "@seneca/gateway-express": "^0.10.0",
  "@seneca/repl": "^7.0.1",
  "@types/react": "^18.2.46",
  "@types/react-dom": "^18.2.18",
  "@typescript-eslint/eslint-plugin": "^6.16.0",
  "@typescript-eslint/parser": "^6.16.0",
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
  stylelint: "15",
  "stylelint-config-recommended": "13",
  "stylelint-config-sass-guidelines": "^10.0.0",
  "ts-node": "^10.9.2",
  tslib: "^2.6.2",
  typescript: "^5.3.3",
  vite: "^5.0.10",
  "vite-plugin-dts": "^3.7.0"
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
}, { One: Co, Default: _o, Any: jo, Min: Ro, Skip: mt, Required: Oo, Open: ko } = uo.Gubu, xo = {
  name: "seneca",
  debug: !1,
  log: {
    err: !0,
    msg: !1
  },
  state: _o({}, ko({})),
  store: {},
  slot: {}
}, dn = "@seneca/redux";
function it(e) {
  const t = this, n = t.util.deep;
  e.debug && console.warn(dn, No.version, e);
  const o = e.name, a = e.store, c = [], l = [];
  function f(m, b, S) {
    e.log.err && pn(S) && (S.when$ = Date.now(), S.kind$ = m, c.push(S)), e.log.msg && l.push({
      msg: b,
      res: S,
      when$: Date.now(),
      kind$: m
    });
  }
  const w = e.state;
  for (let m in e.slot)
    So(w, m);
  const v = no({
    name: o,
    initialState: w,
    reducers: {
      response: (m, b) => {
        let S = b.payload, D = S.msg, A = S.res;
        f("response", D, A);
        let T = { ...D, aim: "res" };
        t.find(T) && (T.direct$ = !0, T.res = () => ({
          state: m,
          res: A,
          req: D
        }), t.act(T));
      },
      entityResponse: (m, b) => {
        var Ue, Ge, re;
        let S = b.payload, D = S.msg, A = S.res, T = D.cmd, Z = T === "list" ? "list" : "item";
        f("entity", D, A);
        let U = D.slot$ || ((Ue = D.q) == null ? void 0 : Ue.slot$) || ((Ge = D.ent) == null ? void 0 : Ge.slot$);
        if (U == null || U === !1)
          return;
        U === !0 && (U = "");
        let { space: q, slot: W } = Ot(U), B = ze(m, q, !0);
        if (B == null)
          throw new Error("Entity space not prepared: " + q.join("."));
        let ce = B.meta && B.meta[W];
        if (ce == null)
          throw new Error("Entity slot not prepared: " + U);
        let le = ce[Z];
        if (le.error = null, le.when = Date.now(), pn(A)) {
          e.debug && console.warn(dn, "entity-error", D, A), le.state = "error", le.error = { ...A };
          return;
        } else if (A != null)
          if (T === "load" || T === "save") {
            let fe = B.item[W] = { ...A }, Oe = B.list[W], Ke = !1;
            B.list[W] = Oe.map(
              (Ce) => Ce.id === fe.id ? (Ke = !0, { ...Ce, ...fe }) : Ce
            ), Ke || (B.list[W] = Oe.concat({ ...fe })), le.state = T === "load" ? "loaded" : "saved";
          } else
            T === "list" && (B.list[W] = A.map((fe) => ({
              ...fe
            })), le.state = "listed");
        else if (T === "remove") {
          let fe = [(re = D.q) == null ? void 0 : re.id];
          B.list[W] = B.list[W].filter((Oe) => !fe.includes(Oe.id)), B.item[W] && fe.includes(B.item[W].id) && (B.item[W] = null, B.meta[W].item.state = "removed");
        } else
          le.state = "done";
      },
      update: (m, b) => {
        let D = b.payload.msg;
        f("update", D);
        let A = D.update || (D.section ? [{ section: D.section, content: D.content }] : []);
        for (let T of A) {
          let Z = T.section, U = T.content;
          if (Z) {
            let q = Z.split("."), W = q[q.length - 1];
            q.length = q.length - 1;
            let B = m;
            for (let ce = 0; ce < q.length; ce++)
              B = B[q[ce]] = B[q[ce]] || {};
            W != null && (B[W] = U);
          }
        }
      },
      modifier: (m, b) => {
        let D = b.payload.modifier;
        D(m);
      }
    }
  }), {
    response: g,
    entityResponse: N,
    update: x,
    modifier: $
  } = v.actions, j = Hr(n(a, {
    reducer: {
      [o]: v.reducer
    },
    middleware: (m) => m({
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
  return t.sub("aim:req,out$:true", function(m, b, S) {
    j.dispatch(g({ msg: m, res: b, meta: S }));
  }).sub("sys:entity,out$:true", function(m, b, S) {
    j.dispatch(N({ msg: m, res: b, meta: S }));
  }).add(
    "aim:app,set:state",
    {
      section: mt(String),
      content: mt(),
      update: mt([{
        section: String,
        content: Oo()
      }])
    },
    function(m, b, S) {
      j.dispatch(x({ msg: m, meta: S })), b(m);
    }
  ), t.order.add.add({
    name: "redux_modifier",
    before: "prepare",
    exec: function(m) {
      const b = m.ctx.args, S = b.pattern, D = b.action;
      if (S.redux$ === !0 && D != null) {
        let A = D;
        b.action = function(T, Z, U) {
          j.dispatch($(
            {
              modifier: (q) => {
                U.custom.state = () => q, A.call(this, T, Z, U);
              }
            }
          ));
        }, Object.defineProperty(b.action, "name", {
          value: A.name + "_redux"
        });
      }
    }
  }), {
    name: "Redux",
    exports: {
      slice: v,
      store: j,
      slotSelectors: (m) => {
        let { space: b, slot: S } = Ot(m);
        return {
          space: b,
          slot: S,
          selectItem: (D) => ze(D.seneca, b).item[S],
          selectList: (D) => ze(D.seneca, b).list[S],
          selectMeta: (D, A) => ze(D.seneca, b).meta[S][A]
        };
      },
      errlog: c,
      msglog: l
    }
  };
}
function So(e, t) {
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
    let c = t[a];
    c == null || c == "" || (o[c] == null && n ? o = o[c] = {} : o = o[c]);
  }
  return o;
}
function pn(e) {
  return Object.prototype.toString.call(e) === "[object Error]";
}
const Tn = Zn(null), Io = (e) => Qn.createElement(
  Tn.Provider,
  { value: e.seneca },
  e.children
), Do = () => er(Tn);
it.defaults = xo;
it.SenecaProvider = Io;
it.useSeneca = Do;
Object.defineProperty(it, "name", { value: "Redux" });
export {
  it as Redux,
  Io as SenecaProvider,
  it as default,
  Do as useSeneca
};
//# sourceMappingURL=seneca-redux.es.js.map
