import an, { createContext as un, useContext as sn } from "react";
function L(e) {
  for (var t = arguments.length, r = Array(t > 1 ? t - 1 : 0), n = 1; n < t; n++)
    r[n - 1] = arguments[n];
  if (process.env.NODE_ENV !== "production") {
    var a = gn[e], s = a ? typeof a == "function" ? a.apply(null, r) : a : "unknown error nr: " + e;
    throw Error("[Immer] " + s);
  }
  throw Error("[Immer] minified error nr: " + e + (r.length ? " " + r.map(function(l) {
    return "'" + l + "'";
  }).join(",") : "") + ". Find the full error at: https://bit.ly/3cXEKWf");
}
function be(e) {
  return !!e && !!e[W];
}
function pe(e) {
  var t;
  return !!e && (function(r) {
    if (!r || typeof r != "object")
      return !1;
    var n = Object.getPrototypeOf(r);
    if (n === null)
      return !0;
    var a = Object.hasOwnProperty.call(n, "constructor") && n.constructor;
    return a === Object || typeof a == "function" && Function.toString.call(a) === mn;
  }(e) || Array.isArray(e) || !!e[nr] || !!(!((t = e.constructor) === null || t === void 0) && t[nr]) || bt(e) || wt(e));
}
function xe(e, t, r) {
  r === void 0 && (r = !1), $e(e) === 0 ? (r ? Object.keys : De)(e).forEach(function(n) {
    r && typeof n == "symbol" || t(n, e[n], e);
  }) : e.forEach(function(n, a) {
    return t(a, n, e);
  });
}
function $e(e) {
  var t = e[W];
  return t ? t.i > 3 ? t.i - 4 : t.i : Array.isArray(e) ? 1 : bt(e) ? 2 : wt(e) ? 3 : 0;
}
function Ae(e, t) {
  return $e(e) === 2 ? e.has(t) : Object.prototype.hasOwnProperty.call(e, t);
}
function cn(e, t) {
  return $e(e) === 2 ? e.get(t) : e[t];
}
function mr(e, t, r) {
  var n = $e(e);
  n === 2 ? e.set(t, r) : n === 3 ? e.add(r) : e[t] = r;
}
function br(e, t) {
  return e === t ? e !== 0 || 1 / e == 1 / t : e != e && t != t;
}
function bt(e) {
  return vn && e instanceof Map;
}
function wt(e) {
  return yn && e instanceof Set;
}
function ve(e) {
  return e.o || e.t;
}
function Ot(e) {
  if (Array.isArray(e))
    return Array.prototype.slice.call(e);
  var t = Or(e);
  delete t[W];
  for (var r = De(t), n = 0; n < r.length; n++) {
    var a = r[n], s = t[a];
    s.writable === !1 && (s.writable = !0, s.configurable = !0), (s.get || s.set) && (t[a] = { configurable: !0, writable: !0, enumerable: s.enumerable, value: e[a] });
  }
  return Object.create(Object.getPrototypeOf(e), t);
}
function Et(e, t) {
  return t === void 0 && (t = !1), Nt(e) || be(e) || !pe(e) || ($e(e) > 1 && (e.set = e.add = e.clear = e.delete = ln), Object.freeze(e), t && xe(e, function(r, n) {
    return Et(n, !0);
  }, !0)), e;
}
function ln() {
  L(2);
}
function Nt(e) {
  return e == null || typeof e != "object" || Object.isFrozen(e);
}
function ue(e) {
  var t = yt[e];
  return t || L(18, e), t;
}
function fn(e, t) {
  yt[e] || (yt[e] = t);
}
function pt() {
  return process.env.NODE_ENV === "production" || _e || L(0), _e;
}
function ot(e, t) {
  t && (ue("Patches"), e.u = [], e.s = [], e.v = t);
}
function Ke(e) {
  ht(e), e.p.forEach(dn), e.p = null;
}
function ht(e) {
  e === _e && (_e = e.l);
}
function Ht(e) {
  return _e = { p: [], l: _e, h: e, m: !0, _: 0 };
}
function dn(e) {
  var t = e[W];
  t.i === 0 || t.i === 1 ? t.j() : t.g = !0;
}
function it(e, t) {
  t._ = t.p.length;
  var r = t.p[0], n = e !== void 0 && e !== r;
  return t.h.O || ue("ES5").S(t, e, n), n ? (r[W].P && (Ke(t), L(4)), pe(e) && (e = Be(t, e), t.l || Ye(t, e)), t.u && ue("Patches").M(r[W].t, e, t.u, t.s)) : e = Be(t, r, []), Ke(t), t.u && t.v(t.u, t.s), e !== wr ? e : void 0;
}
function Be(e, t, r) {
  if (Nt(t))
    return t;
  var n = t[W];
  if (!n)
    return xe(t, function(d, w) {
      return Qt(e, n, t, d, w, r);
    }, !0), t;
  if (n.A !== e)
    return t;
  if (!n.P)
    return Ye(e, n.t, !0), n.t;
  if (!n.I) {
    n.I = !0, n.A._--;
    var a = n.i === 4 || n.i === 5 ? n.o = Ot(n.k) : n.o, s = a, l = !1;
    n.i === 3 && (s = new Set(a), a.clear(), l = !0), xe(s, function(d, w) {
      return Qt(e, n, a, d, w, r, l);
    }), Ye(e, a, !1), r && e.u && ue("Patches").N(n, r, e.u, e.s);
  }
  return n.o;
}
function Qt(e, t, r, n, a, s, l) {
  if (process.env.NODE_ENV !== "production" && a === r && L(5), be(a)) {
    var d = Be(e, a, s && t && t.i !== 3 && !Ae(t.R, n) ? s.concat(n) : void 0);
    if (mr(r, n, d), !be(d))
      return;
    e.m = !1;
  } else
    l && r.add(a);
  if (pe(a) && !Nt(a)) {
    if (!e.h.D && e._ < 1)
      return;
    Be(e, a), t && t.A.l || Ye(e, a);
  }
}
function Ye(e, t, r) {
  r === void 0 && (r = !1), !e.l && e.h.D && e.m && Et(t, r);
}
function at(e, t) {
  var r = e[W];
  return (r ? ve(r) : e)[t];
}
function Zt(e, t) {
  if (t in e)
    for (var r = Object.getPrototypeOf(e); r; ) {
      var n = Object.getOwnPropertyDescriptor(r, t);
      if (n)
        return n;
      r = Object.getPrototypeOf(r);
    }
}
function ye(e) {
  e.P || (e.P = !0, e.l && ye(e.l));
}
function ut(e) {
  e.o || (e.o = Ot(e.t));
}
function vt(e, t, r) {
  var n = bt(t) ? ue("MapSet").F(t, r) : wt(t) ? ue("MapSet").T(t, r) : e.O ? function(a, s) {
    var l = Array.isArray(a), d = { i: l ? 1 : 0, A: s ? s.A : pt(), P: !1, I: !1, R: {}, l: s, t: a, k: null, o: null, j: null, C: !1 }, w = d, f = Fe;
    l && (w = [d], f = qe);
    var v = Proxy.revocable(w, f), O = v.revoke, h = v.proxy;
    return d.k = h, d.j = O, h;
  }(t, r) : ue("ES5").J(t, r);
  return (r ? r.A : pt()).p.push(n), n;
}
function pn(e) {
  return be(e) || L(22, e), function t(r) {
    if (!pe(r))
      return r;
    var n, a = r[W], s = $e(r);
    if (a) {
      if (!a.P && (a.i < 4 || !ue("ES5").K(a)))
        return a.t;
      a.I = !0, n = er(r, s), a.I = !1;
    } else
      n = er(r, s);
    return xe(n, function(l, d) {
      a && cn(a.t, l) === d || mr(n, l, t(d));
    }), s === 3 ? new Set(n) : n;
  }(e);
}
function er(e, t) {
  switch (t) {
    case 2:
      return new Map(e);
    case 3:
      return Array.from(e);
  }
  return Ot(e);
}
function hn() {
  function e(l, d) {
    var w = s[l];
    return w ? w.enumerable = d : s[l] = w = { configurable: !0, enumerable: d, get: function() {
      var f = this[W];
      return process.env.NODE_ENV !== "production" && a(f), Fe.get(f, l);
    }, set: function(f) {
      var v = this[W];
      process.env.NODE_ENV !== "production" && a(v), Fe.set(v, l, f);
    } }, w;
  }
  function t(l) {
    for (var d = l.length - 1; d >= 0; d--) {
      var w = l[d][W];
      if (!w.P)
        switch (w.i) {
          case 5:
            n(w) && ye(w);
            break;
          case 4:
            r(w) && ye(w);
        }
    }
  }
  function r(l) {
    for (var d = l.t, w = l.k, f = De(w), v = f.length - 1; v >= 0; v--) {
      var O = f[v];
      if (O !== W) {
        var h = d[O];
        if (h === void 0 && !Ae(d, O))
          return !0;
        var N = w[O], m = N && N[W];
        if (m ? m.t !== h : !br(N, h))
          return !0;
      }
    }
    var E = !!d[W];
    return f.length !== De(d).length + (E ? 0 : 1);
  }
  function n(l) {
    var d = l.k;
    if (d.length !== l.t.length)
      return !0;
    var w = Object.getOwnPropertyDescriptor(d, d.length - 1);
    if (w && !w.get)
      return !0;
    for (var f = 0; f < d.length; f++)
      if (!d.hasOwnProperty(f))
        return !0;
    return !1;
  }
  function a(l) {
    l.g && L(3, JSON.stringify(ve(l)));
  }
  var s = {};
  fn("ES5", { J: function(l, d) {
    var w = Array.isArray(l), f = function(O, h) {
      if (O) {
        for (var N = Array(h.length), m = 0; m < h.length; m++)
          Object.defineProperty(N, "" + m, e(m, !0));
        return N;
      }
      var E = Or(h);
      delete E[W];
      for (var S = De(E), I = 0; I < S.length; I++) {
        var _ = S[I];
        E[_] = e(_, O || !!E[_].enumerable);
      }
      return Object.create(Object.getPrototypeOf(h), E);
    }(w, l), v = { i: w ? 5 : 4, A: d ? d.A : pt(), P: !1, I: !1, R: {}, l: d, t: l, k: f, o: null, g: !1, C: !1 };
    return Object.defineProperty(f, W, { value: v, writable: !0 }), f;
  }, S: function(l, d, w) {
    w ? be(d) && d[W].A === l && t(l.p) : (l.u && function f(v) {
      if (v && typeof v == "object") {
        var O = v[W];
        if (O) {
          var h = O.t, N = O.k, m = O.R, E = O.i;
          if (E === 4)
            xe(N, function(C) {
              C !== W && (h[C] !== void 0 || Ae(h, C) ? m[C] || f(N[C]) : (m[C] = !0, ye(O)));
            }), xe(h, function(C) {
              N[C] !== void 0 || Ae(N, C) || (m[C] = !1, ye(O));
            });
          else if (E === 5) {
            if (n(O) && (ye(O), m.length = !0), N.length < h.length)
              for (var S = N.length; S < h.length; S++)
                m[S] = !1;
            else
              for (var I = h.length; I < N.length; I++)
                m[I] = !0;
            for (var _ = Math.min(N.length, h.length), D = 0; D < _; D++)
              N.hasOwnProperty(D) || (m[D] = !0), m[D] === void 0 && f(N[D]);
          }
        }
      }
    }(l.p[0]), t(l.p));
  }, K: function(l) {
    return l.i === 4 ? r(l) : n(l);
  } });
}
var tr, _e, xt = typeof Symbol < "u" && typeof Symbol("x") == "symbol", vn = typeof Map < "u", yn = typeof Set < "u", rr = typeof Proxy < "u" && Proxy.revocable !== void 0 && typeof Reflect < "u", wr = xt ? Symbol.for("immer-nothing") : ((tr = {})["immer-nothing"] = !0, tr), nr = xt ? Symbol.for("immer-draftable") : "__$immer_draftable", W = xt ? Symbol.for("immer-state") : "__$immer_state", gn = { 0: "Illegal state", 1: "Immer drafts cannot have computed properties", 2: "This object has been frozen and should not be mutated", 3: function(e) {
  return "Cannot use a proxy that has been revoked. Did you pass an object from inside an immer function to an async process? " + e;
}, 4: "An immer producer returned a new value *and* modified its draft. Either return a new value *or* modify the draft.", 5: "Immer forbids circular references", 6: "The first or second argument to `produce` must be a function", 7: "The third argument to `produce` must be a function or undefined", 8: "First argument to `createDraft` must be a plain object, an array, or an immerable object", 9: "First argument to `finishDraft` must be a draft returned by `createDraft`", 10: "The given draft is already finalized", 11: "Object.defineProperty() cannot be used on an Immer draft", 12: "Object.setPrototypeOf() cannot be used on an Immer draft", 13: "Immer only supports deleting array indices", 14: "Immer only supports setting array indices and the 'length' property", 15: function(e) {
  return "Cannot apply patch, path doesn't resolve: " + e;
}, 16: 'Sets cannot have "replace" patches.', 17: function(e) {
  return "Unsupported patch operation: " + e;
}, 18: function(e) {
  return "The plugin for '" + e + "' has not been loaded into Immer. To enable the plugin, import and call `enable" + e + "()` when initializing your application.";
}, 20: "Cannot use proxies if Proxy, Proxy.revocable or Reflect are not available", 21: function(e) {
  return "produce can only be called on things that are draftable: plain objects, arrays, Map, Set or classes that are marked with '[immerable]: true'. Got '" + e + "'";
}, 22: function(e) {
  return "'current' expects a draft, got: " + e;
}, 23: function(e) {
  return "'original' expects a draft, got: " + e;
}, 24: "Patching reserved attributes like __proto__, prototype and constructor is not allowed" }, mn = "" + Object.prototype.constructor, De = typeof Reflect < "u" && Reflect.ownKeys ? Reflect.ownKeys : Object.getOwnPropertySymbols !== void 0 ? function(e) {
  return Object.getOwnPropertyNames(e).concat(Object.getOwnPropertySymbols(e));
} : Object.getOwnPropertyNames, Or = Object.getOwnPropertyDescriptors || function(e) {
  var t = {};
  return De(e).forEach(function(r) {
    t[r] = Object.getOwnPropertyDescriptor(e, r);
  }), t;
}, yt = {}, Fe = { get: function(e, t) {
  if (t === W)
    return e;
  var r = ve(e);
  if (!Ae(r, t))
    return function(a, s, l) {
      var d, w = Zt(s, l);
      return w ? "value" in w ? w.value : (d = w.get) === null || d === void 0 ? void 0 : d.call(a.k) : void 0;
    }(e, r, t);
  var n = r[t];
  return e.I || !pe(n) ? n : n === at(e.t, t) ? (ut(e), e.o[t] = vt(e.A.h, n, e)) : n;
}, has: function(e, t) {
  return t in ve(e);
}, ownKeys: function(e) {
  return Reflect.ownKeys(ve(e));
}, set: function(e, t, r) {
  var n = Zt(ve(e), t);
  if (n != null && n.set)
    return n.set.call(e.k, r), !0;
  if (!e.P) {
    var a = at(ve(e), t), s = a == null ? void 0 : a[W];
    if (s && s.t === r)
      return e.o[t] = r, e.R[t] = !1, !0;
    if (br(r, a) && (r !== void 0 || Ae(e.t, t)))
      return !0;
    ut(e), ye(e);
  }
  return e.o[t] === r && (r !== void 0 || t in e.o) || Number.isNaN(r) && Number.isNaN(e.o[t]) || (e.o[t] = r, e.R[t] = !0), !0;
}, deleteProperty: function(e, t) {
  return at(e.t, t) !== void 0 || t in e.t ? (e.R[t] = !1, ut(e), ye(e)) : delete e.R[t], e.o && delete e.o[t], !0;
}, getOwnPropertyDescriptor: function(e, t) {
  var r = ve(e), n = Reflect.getOwnPropertyDescriptor(r, t);
  return n && { writable: !0, configurable: e.i !== 1 || t !== "length", enumerable: n.enumerable, value: r[t] };
}, defineProperty: function() {
  L(11);
}, getPrototypeOf: function(e) {
  return Object.getPrototypeOf(e.t);
}, setPrototypeOf: function() {
  L(12);
} }, qe = {};
xe(Fe, function(e, t) {
  qe[e] = function() {
    return arguments[0] = arguments[0][0], t.apply(this, arguments);
  };
}), qe.deleteProperty = function(e, t) {
  return process.env.NODE_ENV !== "production" && isNaN(parseInt(t)) && L(13), qe.set.call(this, e, t, void 0);
}, qe.set = function(e, t, r) {
  return process.env.NODE_ENV !== "production" && t !== "length" && isNaN(parseInt(t)) && L(14), Fe.set.call(this, e[0], t, r, e[0]);
};
var bn = function() {
  function e(r) {
    var n = this;
    this.O = rr, this.D = !0, this.produce = function(a, s, l) {
      if (typeof a == "function" && typeof s != "function") {
        var d = s;
        s = a;
        var w = n;
        return function(E) {
          var S = this;
          E === void 0 && (E = d);
          for (var I = arguments.length, _ = Array(I > 1 ? I - 1 : 0), D = 1; D < I; D++)
            _[D - 1] = arguments[D];
          return w.produce(E, function(C) {
            var M;
            return (M = s).call.apply(M, [S, C].concat(_));
          });
        };
      }
      var f;
      if (typeof s != "function" && L(6), l !== void 0 && typeof l != "function" && L(7), pe(a)) {
        var v = Ht(n), O = vt(n, a, void 0), h = !0;
        try {
          f = s(O), h = !1;
        } finally {
          h ? Ke(v) : ht(v);
        }
        return typeof Promise < "u" && f instanceof Promise ? f.then(function(E) {
          return ot(v, l), it(E, v);
        }, function(E) {
          throw Ke(v), E;
        }) : (ot(v, l), it(f, v));
      }
      if (!a || typeof a != "object") {
        if ((f = s(a)) === void 0 && (f = a), f === wr && (f = void 0), n.D && Et(f, !0), l) {
          var N = [], m = [];
          ue("Patches").M(a, f, N, m), l(N, m);
        }
        return f;
      }
      L(21, a);
    }, this.produceWithPatches = function(a, s) {
      if (typeof a == "function")
        return function(f) {
          for (var v = arguments.length, O = Array(v > 1 ? v - 1 : 0), h = 1; h < v; h++)
            O[h - 1] = arguments[h];
          return n.produceWithPatches(f, function(N) {
            return a.apply(void 0, [N].concat(O));
          });
        };
      var l, d, w = n.produce(a, s, function(f, v) {
        l = f, d = v;
      });
      return typeof Promise < "u" && w instanceof Promise ? w.then(function(f) {
        return [f, l, d];
      }) : [w, l, d];
    }, typeof (r == null ? void 0 : r.useProxies) == "boolean" && this.setUseProxies(r.useProxies), typeof (r == null ? void 0 : r.autoFreeze) == "boolean" && this.setAutoFreeze(r.autoFreeze);
  }
  var t = e.prototype;
  return t.createDraft = function(r) {
    pe(r) || L(8), be(r) && (r = pn(r));
    var n = Ht(this), a = vt(this, r, void 0);
    return a[W].C = !0, ht(n), a;
  }, t.finishDraft = function(r, n) {
    var a = r && r[W];
    process.env.NODE_ENV !== "production" && (a && a.C || L(9), a.I && L(10));
    var s = a.A;
    return ot(s, n), it(void 0, s);
  }, t.setAutoFreeze = function(r) {
    this.D = r;
  }, t.setUseProxies = function(r) {
    r && !rr && L(20), this.O = r;
  }, t.applyPatches = function(r, n) {
    var a;
    for (a = n.length - 1; a >= 0; a--) {
      var s = n[a];
      if (s.path.length === 0 && s.op === "replace") {
        r = s.value;
        break;
      }
    }
    a > -1 && (n = n.slice(a + 1));
    var l = ue("Patches").$;
    return be(r) ? l(r, n) : this.produce(r, function(d) {
      return l(d, n);
    });
  }, e;
}(), Z = new bn(), Er = Z.produce;
Z.produceWithPatches.bind(Z);
Z.setAutoFreeze.bind(Z);
Z.setUseProxies.bind(Z);
Z.applyPatches.bind(Z);
Z.createDraft.bind(Z);
Z.finishDraft.bind(Z);
function Le(e) {
  "@babel/helpers - typeof";
  return Le = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, Le(e);
}
function wn(e, t) {
  if (Le(e) !== "object" || e === null)
    return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t || "default");
    if (Le(n) !== "object")
      return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
function On(e) {
  var t = wn(e, "string");
  return Le(t) === "symbol" ? t : String(t);
}
function En(e, t, r) {
  return t = On(t), t in e ? Object.defineProperty(e, t, {
    value: r,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : e[t] = r, e;
}
function or(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(a) {
      return Object.getOwnPropertyDescriptor(e, a).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function ir(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? or(Object(r), !0).forEach(function(n) {
      En(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : or(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function X(e) {
  return "Minified Redux error #" + e + "; visit https://redux.js.org/Errors?code=" + e + " for the full message or use the non-minified dev environment for full errors. ";
}
var ar = function() {
  return typeof Symbol == "function" && Symbol.observable || "@@observable";
}(), st = function() {
  return Math.random().toString(36).substring(7).split("").join(".");
}, Ne = {
  INIT: "@@redux/INIT" + st(),
  REPLACE: "@@redux/REPLACE" + st(),
  PROBE_UNKNOWN_ACTION: function() {
    return "@@redux/PROBE_UNKNOWN_ACTION" + st();
  }
};
function Nr(e) {
  if (typeof e != "object" || e === null)
    return !1;
  for (var t = e; Object.getPrototypeOf(t) !== null; )
    t = Object.getPrototypeOf(t);
  return Object.getPrototypeOf(e) === t;
}
function Nn(e) {
  if (e === void 0)
    return "undefined";
  if (e === null)
    return "null";
  var t = typeof e;
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
  if (Sn(e))
    return "date";
  if (jn(e))
    return "error";
  var r = xn(e);
  switch (r) {
    case "Symbol":
    case "Promise":
    case "WeakMap":
    case "WeakSet":
    case "Map":
    case "Set":
      return r;
  }
  return t.slice(8, -1).toLowerCase().replace(/\s/g, "");
}
function xn(e) {
  return typeof e.constructor == "function" ? e.constructor.name : null;
}
function jn(e) {
  return e instanceof Error || typeof e.message == "string" && e.constructor && typeof e.constructor.stackTraceLimit == "number";
}
function Sn(e) {
  return e instanceof Date ? !0 : typeof e.toDateString == "function" && typeof e.getDate == "function" && typeof e.setDate == "function";
}
function Ee(e) {
  var t = typeof e;
  return process.env.NODE_ENV !== "production" && (t = Nn(e)), t;
}
function xr(e, t, r) {
  var n;
  if (typeof t == "function" && typeof r == "function" || typeof r == "function" && typeof arguments[3] == "function")
    throw new Error(process.env.NODE_ENV === "production" ? X(0) : "It looks like you are passing several store enhancers to createStore(). This is not supported. Instead, compose them together to a single function. See https://redux.js.org/tutorials/fundamentals/part-4-store#creating-a-store-with-enhancers for an example.");
  if (typeof t == "function" && typeof r > "u" && (r = t, t = void 0), typeof r < "u") {
    if (typeof r != "function")
      throw new Error(process.env.NODE_ENV === "production" ? X(1) : "Expected the enhancer to be a function. Instead, received: '" + Ee(r) + "'");
    return r(xr)(e, t);
  }
  if (typeof e != "function")
    throw new Error(process.env.NODE_ENV === "production" ? X(2) : "Expected the root reducer to be a function. Instead, received: '" + Ee(e) + "'");
  var a = e, s = t, l = [], d = l, w = !1;
  function f() {
    d === l && (d = l.slice());
  }
  function v() {
    if (w)
      throw new Error(process.env.NODE_ENV === "production" ? X(3) : "You may not call store.getState() while the reducer is executing. The reducer has already received the state as an argument. Pass it down from the top reducer instead of reading it from the store.");
    return s;
  }
  function O(E) {
    if (typeof E != "function")
      throw new Error(process.env.NODE_ENV === "production" ? X(4) : "Expected the listener to be a function. Instead, received: '" + Ee(E) + "'");
    if (w)
      throw new Error(process.env.NODE_ENV === "production" ? X(5) : "You may not call store.subscribe() while the reducer is executing. If you would like to be notified after the store has been updated, subscribe from a component and invoke store.getState() in the callback to access the latest state. See https://redux.js.org/api/store#subscribelistener for more details.");
    var S = !0;
    return f(), d.push(E), function() {
      if (S) {
        if (w)
          throw new Error(process.env.NODE_ENV === "production" ? X(6) : "You may not unsubscribe from a store listener while the reducer is executing. See https://redux.js.org/api/store#subscribelistener for more details.");
        S = !1, f();
        var _ = d.indexOf(E);
        d.splice(_, 1), l = null;
      }
    };
  }
  function h(E) {
    if (!Nr(E))
      throw new Error(process.env.NODE_ENV === "production" ? X(7) : "Actions must be plain objects. Instead, the actual type was: '" + Ee(E) + "'. You may need to add middleware to your store setup to handle dispatching other values, such as 'redux-thunk' to handle dispatching functions. See https://redux.js.org/tutorials/fundamentals/part-4-store#middleware and https://redux.js.org/tutorials/fundamentals/part-6-async-logic#using-the-redux-thunk-middleware for examples.");
    if (typeof E.type > "u")
      throw new Error(process.env.NODE_ENV === "production" ? X(8) : 'Actions may not have an undefined "type" property. You may have misspelled an action type string constant.');
    if (w)
      throw new Error(process.env.NODE_ENV === "production" ? X(9) : "Reducers may not dispatch actions.");
    try {
      w = !0, s = a(s, E);
    } finally {
      w = !1;
    }
    for (var S = l = d, I = 0; I < S.length; I++) {
      var _ = S[I];
      _();
    }
    return E;
  }
  function N(E) {
    if (typeof E != "function")
      throw new Error(process.env.NODE_ENV === "production" ? X(10) : "Expected the nextReducer to be a function. Instead, received: '" + Ee(E));
    a = E, h({
      type: Ne.REPLACE
    });
  }
  function m() {
    var E, S = O;
    return E = {
      /**
       * The minimal observable subscription method.
       * @param {Object} observer Any object that can be used as an observer.
       * The observer object should have a `next` method.
       * @returns {subscription} An object with an `unsubscribe` method that can
       * be used to unsubscribe the observable from the store, and prevent further
       * emission of values from the observable.
       */
      subscribe: function(_) {
        if (typeof _ != "object" || _ === null)
          throw new Error(process.env.NODE_ENV === "production" ? X(11) : "Expected the observer to be an object. Instead, received: '" + Ee(_) + "'");
        function D() {
          _.next && _.next(v());
        }
        D();
        var C = S(D);
        return {
          unsubscribe: C
        };
      }
    }, E[ar] = function() {
      return this;
    }, E;
  }
  return h({
    type: Ne.INIT
  }), n = {
    dispatch: h,
    subscribe: O,
    getState: v,
    replaceReducer: N
  }, n[ar] = m, n;
}
function ur(e) {
  typeof console < "u" && typeof console.error == "function" && console.error(e);
  try {
    throw new Error(e);
  } catch {
  }
}
function In(e, t, r, n) {
  var a = Object.keys(t), s = r && r.type === Ne.INIT ? "preloadedState argument passed to createStore" : "previous state received by the reducer";
  if (a.length === 0)
    return "Store does not have a valid reducer. Make sure the argument passed to combineReducers is an object whose values are reducers.";
  if (!Nr(e))
    return "The " + s + ' has unexpected type of "' + Ee(e) + '". Expected argument to be an object with the following ' + ('keys: "' + a.join('", "') + '"');
  var l = Object.keys(e).filter(function(d) {
    return !t.hasOwnProperty(d) && !n[d];
  });
  if (l.forEach(function(d) {
    n[d] = !0;
  }), !(r && r.type === Ne.REPLACE) && l.length > 0)
    return "Unexpected " + (l.length > 1 ? "keys" : "key") + " " + ('"' + l.join('", "') + '" found in ' + s + ". ") + "Expected to find one of the known reducer keys instead: " + ('"' + a.join('", "') + '". Unexpected keys will be ignored.');
}
function kn(e) {
  Object.keys(e).forEach(function(t) {
    var r = e[t], n = r(void 0, {
      type: Ne.INIT
    });
    if (typeof n > "u")
      throw new Error(process.env.NODE_ENV === "production" ? X(12) : 'The slice reducer for key "' + t + `" returned undefined during initialization. If the state passed to the reducer is undefined, you must explicitly return the initial state. The initial state may not be undefined. If you don't want to set a value for this reducer, you can use null instead of undefined.`);
    if (typeof r(void 0, {
      type: Ne.PROBE_UNKNOWN_ACTION()
    }) > "u")
      throw new Error(process.env.NODE_ENV === "production" ? X(13) : 'The slice reducer for key "' + t + '" returned undefined when probed with a random type. ' + ("Don't try to handle '" + Ne.INIT + `' or other actions in "redux/*" `) + "namespace. They are considered private. Instead, you must return the current state for any unknown actions, unless it is undefined, in which case you must return the initial state, regardless of the action type. The initial state may not be undefined, but can be null.");
  });
}
function Pn(e) {
  for (var t = Object.keys(e), r = {}, n = 0; n < t.length; n++) {
    var a = t[n];
    process.env.NODE_ENV !== "production" && typeof e[a] > "u" && ur('No reducer provided for key "' + a + '"'), typeof e[a] == "function" && (r[a] = e[a]);
  }
  var s = Object.keys(r), l;
  process.env.NODE_ENV !== "production" && (l = {});
  var d;
  try {
    kn(r);
  } catch (w) {
    d = w;
  }
  return function(f, v) {
    if (f === void 0 && (f = {}), d)
      throw d;
    if (process.env.NODE_ENV !== "production") {
      var O = In(f, r, v, l);
      O && ur(O);
    }
    for (var h = !1, N = {}, m = 0; m < s.length; m++) {
      var E = s[m], S = r[E], I = f[E], _ = S(I, v);
      if (typeof _ > "u") {
        var D = v && v.type;
        throw new Error(process.env.NODE_ENV === "production" ? X(14) : "When called with an action of type " + (D ? '"' + String(D) + '"' : "(unknown type)") + ', the slice reducer for key "' + E + '" returned undefined. To ignore an action, you must explicitly return the previous state. If you want this reducer to hold no value, you can return null instead of undefined.');
      }
      N[E] = _, h = h || _ !== I;
    }
    return h = h || s.length !== Object.keys(f).length, h ? N : f;
  };
}
function Je() {
  for (var e = arguments.length, t = new Array(e), r = 0; r < e; r++)
    t[r] = arguments[r];
  return t.length === 0 ? function(n) {
    return n;
  } : t.length === 1 ? t[0] : t.reduce(function(n, a) {
    return function() {
      return n(a.apply(void 0, arguments));
    };
  });
}
function An() {
  for (var e = arguments.length, t = new Array(e), r = 0; r < e; r++)
    t[r] = arguments[r];
  return function(n) {
    return function() {
      var a = n.apply(void 0, arguments), s = function() {
        throw new Error(process.env.NODE_ENV === "production" ? X(15) : "Dispatching while constructing your middleware is not allowed. Other middleware would not be applied to this dispatch.");
      }, l = {
        getState: a.getState,
        dispatch: function() {
          return s.apply(void 0, arguments);
        }
      }, d = t.map(function(w) {
        return w(l);
      });
      return s = Je.apply(void 0, d)(a.dispatch), ir(ir({}, a), {}, {
        dispatch: s
      });
    };
  };
}
function jr(e) {
  var t = function(n) {
    var a = n.dispatch, s = n.getState;
    return function(l) {
      return function(d) {
        return typeof d == "function" ? d(a, s, e) : l(d);
      };
    };
  };
  return t;
}
var Sr = jr();
Sr.withExtraArgument = jr;
const sr = Sr;
var Ir = /* @__PURE__ */ function() {
  var e = function(t, r) {
    return e = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(n, a) {
      n.__proto__ = a;
    } || function(n, a) {
      for (var s in a)
        Object.prototype.hasOwnProperty.call(a, s) && (n[s] = a[s]);
    }, e(t, r);
  };
  return function(t, r) {
    if (typeof r != "function" && r !== null)
      throw new TypeError("Class extends value " + String(r) + " is not a constructor or null");
    e(t, r);
    function n() {
      this.constructor = t;
    }
    t.prototype = r === null ? Object.create(r) : (n.prototype = r.prototype, new n());
  };
}(), Dn = function(e, t) {
  var r = { label: 0, sent: function() {
    if (s[0] & 1)
      throw s[1];
    return s[1];
  }, trys: [], ops: [] }, n, a, s, l;
  return l = { next: d(0), throw: d(1), return: d(2) }, typeof Symbol == "function" && (l[Symbol.iterator] = function() {
    return this;
  }), l;
  function d(f) {
    return function(v) {
      return w([f, v]);
    };
  }
  function w(f) {
    if (n)
      throw new TypeError("Generator is already executing.");
    for (; r; )
      try {
        if (n = 1, a && (s = f[0] & 2 ? a.return : f[0] ? a.throw || ((s = a.return) && s.call(a), 0) : a.next) && !(s = s.call(a, f[1])).done)
          return s;
        switch (a = 0, s && (f = [f[0] & 2, s.value]), f[0]) {
          case 0:
          case 1:
            s = f;
            break;
          case 4:
            return r.label++, { value: f[1], done: !1 };
          case 5:
            r.label++, a = f[1], f = [0];
            continue;
          case 7:
            f = r.ops.pop(), r.trys.pop();
            continue;
          default:
            if (s = r.trys, !(s = s.length > 0 && s[s.length - 1]) && (f[0] === 6 || f[0] === 2)) {
              r = 0;
              continue;
            }
            if (f[0] === 3 && (!s || f[1] > s[0] && f[1] < s[3])) {
              r.label = f[1];
              break;
            }
            if (f[0] === 6 && r.label < s[1]) {
              r.label = s[1], s = f;
              break;
            }
            if (s && r.label < s[2]) {
              r.label = s[2], r.ops.push(f);
              break;
            }
            s[2] && r.ops.pop(), r.trys.pop();
            continue;
        }
        f = t.call(e, r);
      } catch (v) {
        f = [6, v], a = 0;
      } finally {
        n = s = 0;
      }
    if (f[0] & 5)
      throw f[1];
    return { value: f[0] ? f[1] : void 0, done: !0 };
  }
}, Re = function(e, t) {
  for (var r = 0, n = t.length, a = e.length; r < n; r++, a++)
    e[a] = t[r];
  return e;
}, _n = Object.defineProperty, Rn = Object.defineProperties, $n = Object.getOwnPropertyDescriptors, cr = Object.getOwnPropertySymbols, Cn = Object.prototype.hasOwnProperty, Mn = Object.prototype.propertyIsEnumerable, lr = function(e, t, r) {
  return t in e ? _n(e, t, { enumerable: !0, configurable: !0, writable: !0, value: r }) : e[t] = r;
}, ge = function(e, t) {
  for (var r in t || (t = {}))
    Cn.call(t, r) && lr(e, r, t[r]);
  if (cr)
    for (var n = 0, a = cr(t); n < a.length; n++) {
      var r = a[n];
      Mn.call(t, r) && lr(e, r, t[r]);
    }
  return e;
}, ct = function(e, t) {
  return Rn(e, $n(t));
}, Vn = function(e, t, r) {
  return new Promise(function(n, a) {
    var s = function(w) {
      try {
        d(r.next(w));
      } catch (f) {
        a(f);
      }
    }, l = function(w) {
      try {
        d(r.throw(w));
      } catch (f) {
        a(f);
      }
    }, d = function(w) {
      return w.done ? n(w.value) : Promise.resolve(w.value).then(s, l);
    };
    d((r = r.apply(e, t)).next());
  });
}, Tn = typeof window < "u" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : function() {
  if (arguments.length !== 0)
    return typeof arguments[0] == "object" ? Je : Je.apply(null, arguments);
};
function kr(e) {
  if (typeof e != "object" || e === null)
    return !1;
  var t = Object.getPrototypeOf(e);
  if (t === null)
    return !0;
  for (var r = t; Object.getPrototypeOf(r) !== null; )
    r = Object.getPrototypeOf(r);
  return t === r;
}
var zn = function(e) {
  return e && typeof e.match == "function";
};
function me(e, t) {
  function r() {
    for (var n = [], a = 0; a < arguments.length; a++)
      n[a] = arguments[a];
    if (t) {
      var s = t.apply(void 0, n);
      if (!s)
        throw new Error("prepareAction did not return an object");
      return ge(ge({
        type: e,
        payload: s.payload
      }, "meta" in s && { meta: s.meta }), "error" in s && { error: s.error });
    }
    return { type: e, payload: n[0] };
  }
  return r.toString = function() {
    return "" + e;
  }, r.type = e, r.match = function(n) {
    return n.type === e;
  }, r;
}
function Wn(e) {
  return typeof e == "function" && "type" in e && zn(e);
}
function qn(e) {
  var t = e ? ("" + e).split("/") : [], r = t[t.length - 1] || "actionCreator";
  return 'Detected an action creator with type "' + (e || "unknown") + `" being dispatched. 
Make sure you're calling the action creator before dispatching, i.e. \`dispatch(` + r + "())` instead of `dispatch(" + r + ")`. This is necessary even if the action has no payload.";
}
function Fn(e) {
  if (e === void 0 && (e = {}), process.env.NODE_ENV === "production")
    return function() {
      return function(n) {
        return function(a) {
          return n(a);
        };
      };
    };
  var t = e.isActionCreator, r = t === void 0 ? Wn : t;
  return function() {
    return function(n) {
      return function(a) {
        return r(a) && console.warn(qn(a.type)), n(a);
      };
    };
  };
}
function Pr(e, t) {
  var r = 0;
  return {
    measureTime: function(n) {
      var a = Date.now();
      try {
        return n();
      } finally {
        var s = Date.now();
        r += s - a;
      }
    },
    warnIfExceeded: function() {
      r > e && console.warn(t + " took " + r + "ms, which is more than the warning threshold of " + e + `ms. 
If your state or actions are very large, you may want to disable the middleware as it might cause too much of a slowdown in development mode. See https://redux-toolkit.js.org/api/getDefaultMiddleware for instructions.
It is disabled in production builds, so you don't need to worry about that.`);
    }
  };
}
var Ln = (
  /** @class */
  function(e) {
    Ir(t, e);
    function t() {
      for (var r = [], n = 0; n < arguments.length; n++)
        r[n] = arguments[n];
      var a = e.apply(this, r) || this;
      return Object.setPrototypeOf(a, t.prototype), a;
    }
    return Object.defineProperty(t, Symbol.species, {
      get: function() {
        return t;
      },
      enumerable: !1,
      configurable: !0
    }), t.prototype.concat = function() {
      for (var r = [], n = 0; n < arguments.length; n++)
        r[n] = arguments[n];
      return e.prototype.concat.apply(this, r);
    }, t.prototype.prepend = function() {
      for (var r = [], n = 0; n < arguments.length; n++)
        r[n] = arguments[n];
      return r.length === 1 && Array.isArray(r[0]) ? new (t.bind.apply(t, Re([void 0], r[0].concat(this))))() : new (t.bind.apply(t, Re([void 0], r.concat(this))))();
    }, t;
  }(Array)
), Gn = (
  /** @class */
  function(e) {
    Ir(t, e);
    function t() {
      for (var r = [], n = 0; n < arguments.length; n++)
        r[n] = arguments[n];
      var a = e.apply(this, r) || this;
      return Object.setPrototypeOf(a, t.prototype), a;
    }
    return Object.defineProperty(t, Symbol.species, {
      get: function() {
        return t;
      },
      enumerable: !1,
      configurable: !0
    }), t.prototype.concat = function() {
      for (var r = [], n = 0; n < arguments.length; n++)
        r[n] = arguments[n];
      return e.prototype.concat.apply(this, r);
    }, t.prototype.prepend = function() {
      for (var r = [], n = 0; n < arguments.length; n++)
        r[n] = arguments[n];
      return r.length === 1 && Array.isArray(r[0]) ? new (t.bind.apply(t, Re([void 0], r[0].concat(this))))() : new (t.bind.apply(t, Re([void 0], r.concat(this))))();
    }, t;
  }(Array)
);
function gt(e) {
  return pe(e) ? Er(e, function() {
  }) : e;
}
var Un = process.env.NODE_ENV === "production", fr = "Invariant failed";
function dr(e, t) {
  if (!e)
    throw Un ? new Error(fr) : new Error(fr + ": " + (t || ""));
}
function Kn(e, t, r, n) {
  return JSON.stringify(e, Bn(t, n), r);
}
function Bn(e, t) {
  var r = [], n = [];
  return t || (t = function(a, s) {
    return r[0] === s ? "[Circular ~]" : "[Circular ~." + n.slice(0, r.indexOf(s)).join(".") + "]";
  }), function(a, s) {
    if (r.length > 0) {
      var l = r.indexOf(this);
      ~l ? r.splice(l + 1) : r.push(this), ~l ? n.splice(l, 1 / 0, a) : n.push(a), ~r.indexOf(s) && (s = t.call(this, a, s));
    } else
      r.push(s);
    return e == null ? s : e.call(this, a, s);
  };
}
function Yn(e) {
  return typeof e != "object" || e == null || Object.isFrozen(e);
}
function Jn(e, t, r) {
  var n = Ar(e, t, r);
  return {
    detectMutations: function() {
      return Dr(e, t, n, r);
    }
  };
}
function Ar(e, t, r, n, a) {
  t === void 0 && (t = []), n === void 0 && (n = ""), a === void 0 && (a = /* @__PURE__ */ new Set());
  var s = { value: r };
  if (!e(r) && !a.has(r)) {
    a.add(r), s.children = {};
    for (var l in r) {
      var d = n ? n + "." + l : l;
      t.length && t.indexOf(d) !== -1 || (s.children[l] = Ar(e, t, r[l], d));
    }
  }
  return s;
}
function Dr(e, t, r, n, a, s) {
  t === void 0 && (t = []), a === void 0 && (a = !1), s === void 0 && (s = "");
  var l = r ? r.value : void 0, d = l === n;
  if (a && !d && !Number.isNaN(n))
    return { wasMutated: !0, path: s };
  if (e(l) || e(n))
    return { wasMutated: !1 };
  var w = {};
  for (var f in r.children)
    w[f] = !0;
  for (var f in n)
    w[f] = !0;
  var v = t.length > 0, O = function(N) {
    var m = s ? s + "." + N : N;
    if (v) {
      var E = t.some(function(I) {
        return I instanceof RegExp ? I.test(m) : m === I;
      });
      if (E)
        return "continue";
    }
    var S = Dr(e, t, r.children[N], n[N], d, m);
    if (S.wasMutated)
      return { value: S };
  };
  for (var f in w) {
    var h = O(f);
    if (typeof h == "object")
      return h.value;
  }
  return { wasMutated: !1 };
}
function Xn(e) {
  if (e === void 0 && (e = {}), process.env.NODE_ENV === "production")
    return function() {
      return function(w) {
        return function(f) {
          return w(f);
        };
      };
    };
  var t = e.isImmutable, r = t === void 0 ? Yn : t, n = e.ignoredPaths, a = e.warnAfter, s = a === void 0 ? 32 : a, l = e.ignore;
  n = n || l;
  var d = Jn.bind(null, r, n);
  return function(w) {
    var f = w.getState, v = f(), O = d(v), h;
    return function(N) {
      return function(m) {
        var E = Pr(s, "ImmutableStateInvariantMiddleware");
        E.measureTime(function() {
          v = f(), h = O.detectMutations(), O = d(v), dr(!h.wasMutated, "A state mutation was detected between dispatches, in the path '" + (h.path || "") + "'.  This may cause incorrect behavior. (https://redux.js.org/style-guide/style-guide#do-not-mutate-state)");
        });
        var S = N(m);
        return E.measureTime(function() {
          v = f(), h = O.detectMutations(), O = d(v), h.wasMutated && dr(!h.wasMutated, "A state mutation was detected inside a dispatch, in the path: " + (h.path || "") + ". Take a look at the reducer(s) handling the action " + Kn(m) + ". (https://redux.js.org/style-guide/style-guide#do-not-mutate-state)");
        }), E.warnIfExceeded(), S;
      };
    };
  };
}
function _r(e) {
  var t = typeof e;
  return e == null || t === "string" || t === "boolean" || t === "number" || Array.isArray(e) || kr(e);
}
function mt(e, t, r, n, a, s) {
  t === void 0 && (t = ""), r === void 0 && (r = _r), a === void 0 && (a = []);
  var l;
  if (!r(e))
    return {
      keyPath: t || "<root>",
      value: e
    };
  if (typeof e != "object" || e === null || s != null && s.has(e))
    return !1;
  for (var d = n != null ? n(e) : Object.entries(e), w = a.length > 0, f = function(S, I) {
    var _ = t ? t + "." + S : S;
    if (w) {
      var D = a.some(function(C) {
        return C instanceof RegExp ? C.test(_) : _ === C;
      });
      if (D)
        return "continue";
    }
    if (!r(I))
      return { value: {
        keyPath: _,
        value: I
      } };
    if (typeof I == "object" && (l = mt(I, _, r, n, a, s), l))
      return { value: l };
  }, v = 0, O = d; v < O.length; v++) {
    var h = O[v], N = h[0], m = h[1], E = f(N, m);
    if (typeof E == "object")
      return E.value;
  }
  return s && Rr(e) && s.add(e), !1;
}
function Rr(e) {
  if (!Object.isFrozen(e))
    return !1;
  for (var t = 0, r = Object.values(e); t < r.length; t++) {
    var n = r[t];
    if (!(typeof n != "object" || n === null) && !Rr(n))
      return !1;
  }
  return !0;
}
function Hn(e) {
  if (e === void 0 && (e = {}), process.env.NODE_ENV === "production")
    return function() {
      return function(D) {
        return function(C) {
          return D(C);
        };
      };
    };
  var t = e.isSerializable, r = t === void 0 ? _r : t, n = e.getEntries, a = e.ignoredActions, s = a === void 0 ? [] : a, l = e.ignoredActionPaths, d = l === void 0 ? ["meta.arg", "meta.baseQueryMeta"] : l, w = e.ignoredPaths, f = w === void 0 ? [] : w, v = e.warnAfter, O = v === void 0 ? 32 : v, h = e.ignoreState, N = h === void 0 ? !1 : h, m = e.ignoreActions, E = m === void 0 ? !1 : m, S = e.disableCache, I = S === void 0 ? !1 : S, _ = !I && WeakSet ? /* @__PURE__ */ new WeakSet() : void 0;
  return function(D) {
    return function(C) {
      return function(M) {
        var q = C(M), se = Pr(O, "SerializableStateInvariantMiddleware");
        return !E && !(s.length && s.indexOf(M.type) !== -1) && se.measureTime(function() {
          var U = mt(M, "", r, n, d, _);
          if (U) {
            var ne = U.keyPath, ee = U.value;
            console.error("A non-serializable value was detected in an action, in the path: `" + ne + "`. Value:", ee, `
Take a look at the logic that dispatched this action: `, M, `
(See https://redux.js.org/faq/actions#why-should-type-be-a-string-or-at-least-serializable-why-should-my-action-types-be-constants)`, `
(To allow non-serializable values see: https://redux-toolkit.js.org/usage/usage-guide#working-with-non-serializable-data)`);
          }
        }), N || (se.measureTime(function() {
          var U = D.getState(), ne = mt(U, "", r, n, f, _);
          if (ne) {
            var ee = ne.keyPath, K = ne.value;
            console.error("A non-serializable value was detected in the state, in the path: `" + ee + "`. Value:", K, `
Take a look at the reducer(s) handling this action type: ` + M.type + `.
(See https://redux.js.org/faq/organizing-state#can-i-put-functions-promises-or-other-non-serializable-items-in-my-store-state)`);
          }
        }), se.warnIfExceeded()), q;
      };
    };
  };
}
function Ue(e) {
  return typeof e == "boolean";
}
function Qn() {
  return function(t) {
    return Zn(t);
  };
}
function Zn(e) {
  e === void 0 && (e = {});
  var t = e.thunk, r = t === void 0 ? !0 : t, n = e.immutableCheck, a = n === void 0 ? !0 : n, s = e.serializableCheck, l = s === void 0 ? !0 : s, d = e.actionCreatorCheck, w = d === void 0 ? !0 : d, f = new Ln();
  if (r && (Ue(r) ? f.push(sr) : f.push(sr.withExtraArgument(r.extraArgument))), process.env.NODE_ENV !== "production") {
    if (a) {
      var v = {};
      Ue(a) || (v = a), f.unshift(Xn(v));
    }
    if (l) {
      var O = {};
      Ue(l) || (O = l), f.push(Hn(O));
    }
    if (w) {
      var h = {};
      Ue(w) || (h = w), f.unshift(Fn(h));
    }
  }
  return f;
}
var lt = process.env.NODE_ENV === "production";
function eo(e) {
  var t = Qn(), r = e || {}, n = r.reducer, a = n === void 0 ? void 0 : n, s = r.middleware, l = s === void 0 ? t() : s, d = r.devTools, w = d === void 0 ? !0 : d, f = r.preloadedState, v = f === void 0 ? void 0 : f, O = r.enhancers, h = O === void 0 ? void 0 : O, N;
  if (typeof a == "function")
    N = a;
  else if (kr(a))
    N = Pn(a);
  else
    throw new Error('"reducer" is a required argument, and must be a function or an object of functions that can be passed to combineReducers');
  var m = l;
  if (typeof m == "function" && (m = m(t), !lt && !Array.isArray(m)))
    throw new Error("when using a middleware builder function, an array of middleware must be returned");
  if (!lt && m.some(function(C) {
    return typeof C != "function";
  }))
    throw new Error("each middleware provided to configureStore must be a function");
  var E = An.apply(void 0, m), S = Je;
  w && (S = Tn(ge({
    trace: !lt
  }, typeof w == "object" && w)));
  var I = new Gn(E), _ = I;
  Array.isArray(h) ? _ = Re([E], h) : typeof h == "function" && (_ = h(I));
  var D = S.apply(void 0, _);
  return xr(N, v, D);
}
function $r(e) {
  var t = {}, r = [], n, a = {
    addCase: function(s, l) {
      if (process.env.NODE_ENV !== "production") {
        if (r.length > 0)
          throw new Error("`builder.addCase` should only be called before calling `builder.addMatcher`");
        if (n)
          throw new Error("`builder.addCase` should only be called before calling `builder.addDefaultCase`");
      }
      var d = typeof s == "string" ? s : s.type;
      if (!d)
        throw new Error("`builder.addCase` cannot be called with an empty action type");
      if (d in t)
        throw new Error("`builder.addCase` cannot be called with two reducers for the same action type");
      return t[d] = l, a;
    },
    addMatcher: function(s, l) {
      if (process.env.NODE_ENV !== "production" && n)
        throw new Error("`builder.addMatcher` should only be called before calling `builder.addDefaultCase`");
      return r.push({ matcher: s, reducer: l }), a;
    },
    addDefaultCase: function(s) {
      if (process.env.NODE_ENV !== "production" && n)
        throw new Error("`builder.addDefaultCase` can only be called once");
      return n = s, a;
    }
  };
  return e(a), [t, r, n];
}
function to(e) {
  return typeof e == "function";
}
var pr = !1;
function ro(e, t, r, n) {
  r === void 0 && (r = []), process.env.NODE_ENV !== "production" && typeof t == "object" && (pr || (pr = !0, console.warn("The object notation for `createReducer` is deprecated, and will be removed in RTK 2.0. Please use the 'builder callback' notation instead: https://redux-toolkit.js.org/api/createReducer")));
  var a = typeof t == "function" ? $r(t) : [t, r, n], s = a[0], l = a[1], d = a[2], w;
  if (to(e))
    w = function() {
      return gt(e());
    };
  else {
    var f = gt(e);
    w = function() {
      return f;
    };
  }
  function v(O, h) {
    O === void 0 && (O = w());
    var N = Re([
      s[h.type]
    ], l.filter(function(m) {
      var E = m.matcher;
      return E(h);
    }).map(function(m) {
      var E = m.reducer;
      return E;
    }));
    return N.filter(function(m) {
      return !!m;
    }).length === 0 && (N = [d]), N.reduce(function(m, E) {
      if (E)
        if (be(m)) {
          var S = m, I = E(S, h);
          return I === void 0 ? m : I;
        } else {
          if (pe(m))
            return Er(m, function(_) {
              return E(_, h);
            });
          var I = E(m, h);
          if (I === void 0) {
            if (m === null)
              return m;
            throw Error("A case reducer on a non-draftable value must not return undefined");
          }
          return I;
        }
      return m;
    }, O);
  }
  return v.getInitialState = w, v;
}
var hr = !1;
function no(e, t) {
  return e + "/" + t;
}
function oo(e) {
  var t = e.name;
  if (!t)
    throw new Error("`name` is a required option for createSlice");
  typeof process < "u" && process.env.NODE_ENV === "development" && e.initialState === void 0 && console.error("You must provide an `initialState` value that is not `undefined`. You may have misspelled `initialState`");
  var r = typeof e.initialState == "function" ? e.initialState : gt(e.initialState), n = e.reducers || {}, a = Object.keys(n), s = {}, l = {}, d = {};
  a.forEach(function(v) {
    var O = n[v], h = no(t, v), N, m;
    "reducer" in O ? (N = O.reducer, m = O.prepare) : N = O, s[v] = N, l[h] = N, d[v] = m ? me(h, m) : me(h);
  });
  function w() {
    process.env.NODE_ENV !== "production" && typeof e.extraReducers == "object" && (hr || (hr = !0, console.warn("The object notation for `createSlice.extraReducers` is deprecated, and will be removed in RTK 2.0. Please use the 'builder callback' notation instead: https://redux-toolkit.js.org/api/createSlice")));
    var v = typeof e.extraReducers == "function" ? $r(e.extraReducers) : [e.extraReducers], O = v[0], h = O === void 0 ? {} : O, N = v[1], m = N === void 0 ? [] : N, E = v[2], S = E === void 0 ? void 0 : E, I = ge(ge({}, h), l);
    return ro(r, function(_) {
      for (var D in I)
        _.addCase(D, I[D]);
      for (var C = 0, M = m; C < M.length; C++) {
        var q = M[C];
        _.addMatcher(q.matcher, q.reducer);
      }
      S && _.addDefaultCase(S);
    });
  }
  var f;
  return {
    name: t,
    reducer: function(v, O) {
      return f || (f = w()), f(v, O);
    },
    actions: d,
    caseReducers: s,
    getInitialState: function() {
      return f || (f = w()), f.getInitialState();
    }
  };
}
var io = "ModuleSymbhasOwnPr-0123456789ABCDEFGHNRVfgctiUvz_KqYTJkLxpZXIjQW", ao = function(e) {
  e === void 0 && (e = 21);
  for (var t = "", r = e; r--; )
    t += io[Math.random() * 64 | 0];
  return t;
}, uo = [
  "name",
  "message",
  "stack",
  "code"
], ft = (
  /** @class */
  /* @__PURE__ */ function() {
    function e(t, r) {
      this.payload = t, this.meta = r;
    }
    return e;
  }()
), vr = (
  /** @class */
  /* @__PURE__ */ function() {
    function e(t, r) {
      this.payload = t, this.meta = r;
    }
    return e;
  }()
), so = function(e) {
  if (typeof e == "object" && e !== null) {
    for (var t = {}, r = 0, n = uo; r < n.length; r++) {
      var a = n[r];
      typeof e[a] == "string" && (t[a] = e[a]);
    }
    return t;
  }
  return { message: String(e) };
};
(function() {
  function e(t, r, n) {
    var a = me(t + "/fulfilled", function(v, O, h, N) {
      return {
        payload: v,
        meta: ct(ge({}, N || {}), {
          arg: h,
          requestId: O,
          requestStatus: "fulfilled"
        })
      };
    }), s = me(t + "/pending", function(v, O, h) {
      return {
        payload: void 0,
        meta: ct(ge({}, h || {}), {
          arg: O,
          requestId: v,
          requestStatus: "pending"
        })
      };
    }), l = me(t + "/rejected", function(v, O, h, N, m) {
      return {
        payload: N,
        error: (n && n.serializeError || so)(v || "Rejected"),
        meta: ct(ge({}, m || {}), {
          arg: h,
          requestId: O,
          rejectedWithValue: !!N,
          requestStatus: "rejected",
          aborted: (v == null ? void 0 : v.name) === "AbortError",
          condition: (v == null ? void 0 : v.name) === "ConditionError"
        })
      };
    }), d = !1, w = typeof AbortController < "u" ? AbortController : (
      /** @class */
      function() {
        function v() {
          this.signal = {
            aborted: !1,
            addEventListener: function() {
            },
            dispatchEvent: function() {
              return !1;
            },
            onabort: function() {
            },
            removeEventListener: function() {
            },
            reason: void 0,
            throwIfAborted: function() {
            }
          };
        }
        return v.prototype.abort = function() {
          process.env.NODE_ENV !== "production" && (d || (d = !0, console.info("This platform does not implement AbortController. \nIf you want to use the AbortController to react to `abort` events, please consider importing a polyfill like 'abortcontroller-polyfill/dist/abortcontroller-polyfill-only'.")));
        }, v;
      }()
    );
    function f(v) {
      return function(O, h, N) {
        var m = n != null && n.idGenerator ? n.idGenerator(v) : ao(), E = new w(), S;
        function I(D) {
          S = D, E.abort();
        }
        var _ = function() {
          return Vn(this, null, function() {
            var D, C, M, q, se, U, ne;
            return Dn(this, function(ee) {
              switch (ee.label) {
                case 0:
                  return ee.trys.push([0, 4, , 5]), q = (D = n == null ? void 0 : n.condition) == null ? void 0 : D.call(n, v, { getState: h, extra: N }), lo(q) ? [4, q] : [3, 2];
                case 1:
                  q = ee.sent(), ee.label = 2;
                case 2:
                  if (q === !1 || E.signal.aborted)
                    throw {
                      name: "ConditionError",
                      message: "Aborted due to condition callback returning false."
                    };
                  return se = new Promise(function(K, he) {
                    return E.signal.addEventListener("abort", function() {
                      return he({
                        name: "AbortError",
                        message: S || "Aborted"
                      });
                    });
                  }), O(s(m, v, (C = n == null ? void 0 : n.getPendingMeta) == null ? void 0 : C.call(n, { requestId: m, arg: v }, { getState: h, extra: N }))), [4, Promise.race([
                    se,
                    Promise.resolve(r(v, {
                      dispatch: O,
                      getState: h,
                      extra: N,
                      requestId: m,
                      signal: E.signal,
                      abort: I,
                      rejectWithValue: function(K, he) {
                        return new ft(K, he);
                      },
                      fulfillWithValue: function(K, he) {
                        return new vr(K, he);
                      }
                    })).then(function(K) {
                      if (K instanceof ft)
                        throw K;
                      return K instanceof vr ? a(K.payload, m, v, K.meta) : a(K, m, v);
                    })
                  ])];
                case 3:
                  return M = ee.sent(), [3, 5];
                case 4:
                  return U = ee.sent(), M = U instanceof ft ? l(null, m, v, U.payload, U.meta) : l(U, m, v), [3, 5];
                case 5:
                  return ne = n && !n.dispatchConditionRejection && l.match(M) && M.meta.condition, ne || O(M), [2, M];
              }
            });
          });
        }();
        return Object.assign(_, {
          abort: I,
          requestId: m,
          arg: v,
          unwrap: function() {
            return _.then(co);
          }
        });
      };
    }
    return Object.assign(f, {
      pending: s,
      rejected: l,
      fulfilled: a,
      typePrefix: t
    });
  }
  return e.withTypes = function() {
    return e;
  }, e;
})();
function co(e) {
  if (e.meta && e.meta.rejectedWithValue)
    throw e.payload;
  if (e.error)
    throw e.error;
  return e.payload;
}
function lo(e) {
  return e !== null && typeof e == "object" && typeof e.then == "function";
}
var jt = "listenerMiddleware";
me(jt + "/add");
me(jt + "/removeAll");
me(jt + "/remove");
var yr;
typeof queueMicrotask == "function" && queueMicrotask.bind(typeof window < "u" ? window : typeof global < "u" ? global : globalThis);
hn();
var Cr = { exports: {} };
(function(e, t) {
  (function(r) {
    e.exports = r();
  })(function() {
    var r = {}, n = {};
    Object.defineProperty(n, "__esModule", { value: !0 }), n.Gubu = void 0;
    const a = Symbol.for("gubu$"), s = { gubu$: a, v$: "6.0.1" }, l = Symbol.for("gubu$nil"), d = /^[A-Z]/, w = "gubu", f = "name", v = "nan", O = "never", h = "number", N = "required", m = "array", E = "function", S = "object", I = "string", _ = "boolean", D = "undefined", C = "any", M = "list", q = "instance", se = "null", U = "type", ne = "closed", ee = "shape", K = "check", he = "Object", Vr = "Array", Tr = "Function", ce = "Value", zr = "Above", Wr = "All", qr = "Below", Fr = "Max", Lr = "Min", Gr = "Len", Ur = "One", Kr = "Some", le = " for property ", fe = '"$PATH"', de = '"$VALUE"', je = (o) => Object.keys(o), Se = (o, u, c) => Object.defineProperty(o, u, c), oe = (o) => Array.isArray(o), He = (o) => JSON.parse(o), Qe = (o, u) => JSON.stringify(o, u);
    class Br {
      constructor(u, c, b, y) {
        this.match = !1, this.dI = 0, this.nI = 2, this.cI = -1, this.pI = 0, this.sI = -1, this.valType = O, this.isRoot = !1, this.key = "", this.type = O, this.stop = !0, this.nextSibling = !0, this.fromDefault = !1, this.ignoreVal = void 0, this.curerr = [], this.err = [], this.parents = [], this.keys = [], this.path = [], this.root = u, this.vals = [u, -1], this.node = c, this.nodes = [c, -1], this.ctx = b || {}, this.match = !!y;
      }
      next() {
        this.stop = !1, this.fromDefault = !1, this.ignoreVal = void 0, this.isRoot = this.pI === 0, this.check = void 0;
        let u = this.nodes[this.pI];
        for (; +u; )
          this.dI--, this.ctx.log && -1 < this.dI && this.ctx.log("e" + (oe(this.parents[this.pI]) ? "a" : "o"), this), this.pI = +u, u = this.nodes[this.pI];
        u ? (this.node = u, this.updateVal(this.vals[this.pI]), this.key = this.keys[this.pI], this.cI = this.pI, this.sI = this.pI + 1, this.parent = this.parents[this.pI], this.nextSibling = !0, this.type = this.node.t, this.path[this.dI] = this.key, this.oval = this.val, this.curerr.length = 0) : this.stop = !0;
      }
      updateVal(u) {
        this.val = u, this.valType = typeof this.val, h === this.valType && isNaN(this.val) && (this.valType = v), this.isRoot && !this.match && (this.root = this.val);
      }
    }
    class Yr extends TypeError {
      constructor(u, c, b, y) {
        var j;
        super((c = c == null ? "" : c + ": ") + b.map((g) => g.t).join(`
`)), this.gubu = !0, this.name = "GubuError", this.code = u, this.prefix = c, this.desc = () => ({ name: "GubuError", code: u, err: b, ctx: y }), this.stack = (j = this.stack) === null || j === void 0 ? void 0 : j.replace(/.*\/gubu\/gubu\.[tj]s.*\n/g, ""), this.props = b.map((g) => {
          var p;
          return { path: g.p, what: g.w, type: (p = g.n) === null || p === void 0 ? void 0 : p.t, value: g.v };
        });
      }
      toJSON() {
        return Object.assign(Object.assign({}, this), { err: this.desc().err, name: this.name, message: this.message });
      }
    }
    const Ze = { String: !0, Number: !0, Boolean: !0, Object: !0, Array: !0, Function: !0, Symbol: !0, BigInt: !0 }, et = { string: "", number: 0, boolean: !1, object: {}, array: [], symbol: Symbol(""), bigint: BigInt(0), null: null };
    function te(o, u, c) {
      var b, y, j, g;
      if (Ie === o)
        o = void 0;
      else if (o != null && (!((b = o.$) === null || b === void 0) && b.gubu$)) {
        if (a === o.$.gubu$)
          return o.d = u ?? o.d, o;
        if (o.$.gubu$ === !0) {
          let R = Object.assign({}, o);
          return R.$ = Object.assign(Object.assign({ v$: "6.0.1" }, R.$), { gubu$: a }), R.v = R.v != null && S === typeof R.v ? Object.assign({}, R.v) : R.v, R.t = R.t || typeof R.v, E === R.t && Ze[R.v.name] && (R.t = R.v.name.toLowerCase(), R.v = tt(et[R.t]), R.f = R.v), R.r = !!R.r, R.p = !!R.p, R.d = u ?? (R.d == null ? -1 : R.d), R.b = R.b || [], R.a = R.a || [], R.u = R.u || {}, R.m = R.m || c || {}, R;
        }
      }
      let p = o === null ? se : typeof o;
      p = D === p ? C : p;
      let x = o, A = x, $ = l, P = !1, i = {}, k = [], V = [];
      if (S === p)
        A = void 0, oe(x) ? (p = m, x.length === 1 && ($ = x[0], x = [])) : x != null && Function !== x.constructor && Object !== x.constructor && x.constructor != null ? (p = q, i.n = x.constructor.name, i.i = x.constructor, A = x) : je(x).length === 0 && ($ = we());
      else if (E === p)
        if (Ze[o.name])
          p = o.name.toLowerCase(), P = !0, x = tt(et[p]), A = x, he === o.name && ($ = we());
        else if (x.gubu === s || ((y = x.$) === null || y === void 0 ? void 0 : y.gubu) === !0) {
          let R = x.node ? x.node() : x;
          p = R.t, x = R.v, A = x, P = R.r, i = Object.assign({}, R.u), k = [...R.a], V = [...R.b];
        } else
          Tr === x.constructor.name && d.test(x.name) && (p = q, P = !0, i.n = (g = (j = x.prototype) === null || j === void 0 ? void 0 : j.constructor) === null || g === void 0 ? void 0 : g.name, i.i = x);
      else
        h === p && isNaN(x) ? p = v : I === p && x === "" && (i.empty = !0);
      let G = x == null || S !== p && m !== p ? x : Object.assign({}, x);
      return { $: s, t: p, v: G, f: A, n: G != null && S === typeof G ? je(G).length : 0, c: $, r: P, p: !1, d: u ?? -1, k: [], e: !0, u: i, a: k, b: V, m: c || {} };
    }
    function Ie(o, u) {
      const c = u ?? {};
      c.name = c.name == null ? "G" + ("" + Math.random()).substring(2, 8) : "" + c.name, c.prefix = c.prefix == null ? void 0 : c.prefix;
      let b = c.meta = c.meta || {};
      b.active = b.active === !0 || !1, b.suffix = I == typeof b.suffix ? b.suffix : "$$";
      let y = c.keyexpr = c.keyexpr || {};
      y.active = y.active !== !1;
      let j = te(o, 0);
      function g(A, $, P) {
        let i = new Br(A, j, $, P);
        for (; i.next(), !i.stop; ) {
          let k = i.node, V = !1, G = !1;
          if (0 < k.b.length)
            for (let B = 0; B < k.b.length; B++) {
              let z = St(k.b[B], i);
              k = i.node, z.done !== void 0 && (V = z.done), G = G || !!z.fatal;
            }
          if (!V) {
            let B = !0, z = i.val === void 0;
            if (O === i.type)
              i.curerr.push(re(O, i, 1070));
            else if (S === i.type) {
              let F;
              if (k.r && z ? (i.ignoreVal = !0, i.curerr.push(re(N, i, 1010))) : z || i.val !== null && S === i.valType && !oe(i.val) ? !k.p && z && k.f !== void 0 ? (i.updateVal(k.f), i.fromDefault = !0, F = i.val, B = !1) : k.p && z || (i.updateVal(i.val || (i.fromDefault = !0, {})), F = i.val) : (i.curerr.push(re(U, i, 1020)), F = oe(i.val) ? i.val : {}), B && (F = F == null && i.ctx.err === !1 ? {} : F, F != null)) {
                i.ctx.log && i.ctx.log("so", i);
                let ke = !1, ae = je(k.v), We = i.nI;
                if (0 < ae.length) {
                  ke = !0, i.pI = We;
                  for (let J = 0; J < ae.length; J++) {
                    let Oe, Q = ae[J];
                    if (b.active && Q.endsWith(b.suffix)) {
                      if (Oe = { short: "" }, I === typeof k.v[Q] ? Oe.short = k.v[Q] : Oe = Object.assign(Object.assign({}, Oe), k.v[Q]), delete k.v[Q], J++, ae.length <= J)
                        break;
                      if (ae[J] !== Q.substring(0, Q.length - b.suffix.length))
                        throw new Error("Invalid meta key: " + Q);
                      Q = ae[J];
                    }
                    let Pe = Q, rt = k.v[Q];
                    if (y.active) {
                      let nt = /^\s*("(\\.|[^"\\])*"|[^\s]+):\s*(.*?)\s*$/.exec(Q);
                      nt && (Pe = nt[1], rt = Ce({ src: nt[3], val: rt }), delete k.v[Q]);
                    }
                    let Xt = te(rt, 1 + i.dI, Oe);
                    k.v[Pe] = Xt, k.k.includes(Pe) || k.k.push(Pe), i.nodes[i.nI] = Xt, i.vals[i.nI] = F[Pe], i.parents[i.nI] = F, i.keys[i.nI] = Pe, i.nI++;
                  }
                }
                let Y = je(F).filter((J) => k.v[J] === void 0);
                if (0 < Y.length)
                  if (l === k.c)
                    i.ignoreVal = !0, i.curerr.push(re(ne, i, 1100, void 0, { k: Y }));
                  else {
                    ke = !0, i.pI = We;
                    for (let J of Y) {
                      let Oe = k.c = te(k.c, 1 + i.dI);
                      i.nodes[i.nI] = Oe, i.vals[i.nI] = F[J], i.parents[i.nI] = F, i.keys[i.nI] = J, i.nI++;
                    }
                  }
                ke ? (i.dI++, i.nodes[i.nI] = i.sI, i.parents[i.nI] = F, i.nextSibling = !1, i.nI++) : i.ctx.log && i.ctx.log("eo", i);
              }
            } else if (m === i.type)
              if (k.r && z)
                i.ignoreVal = !0, i.curerr.push(re(N, i, 1030));
              else if (z || oe(i.val)) {
                if (!k.p && z && k.f !== void 0)
                  i.updateVal(k.f), i.fromDefault = !0;
                else if (!k.p || i.val != null) {
                  i.updateVal(i.val || (i.fromDefault = !0, []));
                  let F = l !== k.c, ke = 0 < i.val.length, ae = je(k.v).filter((Y) => !isNaN(+Y)), We = 0 < ae.length;
                  if (i.ctx.log && i.ctx.log("sa", i), ke || We) {
                    i.pI = i.nI;
                    let Y = 0;
                    if (We)
                      if (ae.length < i.val.length && !F)
                        i.ignoreVal = !0, i.curerr.push(re(ne, i, 1090, void 0, { k: ae.length }));
                      else
                        for (; Y < ae.length; Y++) {
                          let J = k.v[Y] = te(k.v[Y], 1 + i.dI);
                          i.nodes[i.nI] = J, i.vals[i.nI] = i.val[Y], i.parents[i.nI] = i.val, i.keys[i.nI] = "" + Y, i.nI++;
                        }
                    if (F && ke) {
                      let J = k.c = te(k.c, 1 + i.dI);
                      for (; Y < i.val.length; Y++)
                        i.nodes[i.nI] = J, i.vals[i.nI] = i.val[Y], i.parents[i.nI] = i.val, i.keys[i.nI] = "" + Y, i.nI++;
                    }
                    i.ignoreVal || (i.dI++, i.nodes[i.nI] = i.sI, i.parents[i.nI] = i.val, i.nextSibling = !1, i.nI++);
                  } else
                    i.ctx.log && F && A == null && i.ctx.log("kv", Object.assign(Object.assign({}, i), { key: 0, val: k.c })), i.ctx.log && i.ctx.log("ea", i);
                }
              } else
                i.curerr.push(re(U, i, 1040));
            else if (C === i.type || M === i.type || i.val === void 0 || i.type === i.valType || q === i.type && k.u.i && i.val instanceof k.u.i || se === i.type && i.val === null)
              if (i.val === void 0) {
                let F = i.path[i.dI];
                !k.r || D === i.type && i.parent.hasOwnProperty(F) ? k.f !== void 0 && !k.p || D === i.type ? (i.updateVal(k.f), i.fromDefault = !0) : C === i.type && (i.ignoreVal = i.ignoreVal === void 0 || i.ignoreVal) : (i.ignoreVal = !0, i.curerr.push(re(N, i, 1060))), i.ctx.log && i.ctx.log("kv", i);
              } else
                I !== i.type || i.val !== "" || k.u.empty || i.curerr.push(re(N, i, 1080)), i.ctx.log && i.ctx.log("kv", i);
            else
              i.curerr.push(re(U, i, 1050));
          }
          if (0 < k.a.length)
            for (let B = 0; B < k.a.length; B++) {
              let z = St(k.a[B], i);
              k = i.node, z.done !== void 0 && (V = z.done), G = G || !!z.fatal;
            }
          let R = i.node.p ? i.ignoreVal !== !1 : !!i.ignoreVal;
          !i.match && i.parent != null && !V && !R && (i.parent[i.key] = i.val), i.nextSibling && (i.pI = i.sI), (i.node.e || G) && i.err.push(...i.curerr);
        }
        if (0 < i.err.length) {
          if (oe(i.ctx.err))
            i.ctx.err.push(...i.err);
          else if (!i.match && i.ctx.err !== !1)
            throw new Yr(ee, c.prefix, i.err, i.ctx);
        }
        return i.match ? i.err.length === 0 : i.root;
      }
      function p(A, $) {
        return g(A, $, !1);
      }
      p.valid = function(A, $) {
        let P = $ || {};
        return P.err = P.err || [], g(A, P, !1), P.err.length === 0;
      }, p.match = (A, $) => g(A, $ = $ || {}, !0), p.error = (A, $) => {
        let P = $ || {};
        return P.err = P.err || [], g(A, P, !1), P.err;
      }, p.spec = () => (p(void 0, { err: !1 }), He(H(j, (A, $) => a === $ || $, !1, !0))), p.node = () => (p.spec(), j);
      let x = "";
      return p.toString = () => (x = Ve(x === "" ? H(j && j.$ && (a === j.$.gubu$ || j.$.gubu$ === !0) ? j.v : j) : x), `[Gubu ${c.name} ${x}]`), r.inspect && r.inspect.custom && (p[r.inspect.custom] = p.toString), p.gubu = s, p.spec(), p;
    }
    function Ce(o) {
      let u = !1;
      if (o.tokens == null) {
        u = !0, o.tokens = [];
        let p = /\s*,?\s*([)(\.]|"(\\.|[^"\\])*"|\/(\\.|[^\/\\])*\/[a-z]?|[^)(,\s]+)\s*/g, x = null;
        for (; x = p.exec(o.src); )
          o.tokens.push(x[1]);
      }
      o.i = o.i || 0;
      let c = o.tokens[o.i], b = Te[c];
      if (o.tokens[o.i] === ")")
        return o.i++, o.val;
      o.i++;
      let y = { Number, String, Boolean };
      if (b == null)
        try {
          return y[c] || (D === c ? void 0 : c === "NaN" ? NaN : c.match(/^\/.+\/$/) ? new RegExp(c.substring(1, c.length - 1)) : He(c));
        } catch {
          throw new SyntaxError(`Gubu: unexpected token ${c} in builder expression ${o.src}`);
        }
      o.tokens[o.i] === "(" && o.i++;
      let j = [], g = null;
      for (; (g = o.tokens[o.i]) != null && g !== ")"; ) {
        let p = Ce(o);
        j.push(p);
      }
      return o.i++, o.val = b.call(o.val, ...j), o.tokens[o.i] === "." ? (o.i++, Ce(o)) : u && o.i < o.tokens.length ? Ce(o) : o.val;
    }
    function St(o, u) {
      var c;
      let b, y = {}, j = !1;
      try {
        j = !(u.val !== void 0 || !(!((c = o.gubu$) === null || c === void 0) && c.Check)) || (u.check = o, o(u.val, y, u));
      } catch (p) {
        b = p;
      }
      let g = oe(y.err) ? 0 < y.err.length : y.err != null;
      if (!j || g) {
        if (u.val === void 0 && (u.node.p || !u.node.r) && y.done !== !0)
          return delete y.err, y;
        let p = y.why || K, x = It(u);
        if (I === typeof y.err)
          u.curerr.push(ie(u, y.err));
        else if (S === typeof y.err)
          u.curerr.push(...[y.err].flat().filter((A) => A != null).map((A) => (A.p = A.p == null ? x : A.p, A.m = A.m == null ? 2010 : A.m, A)));
        else {
          let A = o.name;
          A != null && A != "" || (A = Ve(o.toString().replace(/[ \t\r\n]+/g, " "))), u.curerr.push(re(p, u, 1045, void 0, { thrown: b }, A));
        }
        y.done = y.done == null || y.done;
      }
      return y.hasOwnProperty("uval") ? (u.updateVal(y.uval), u.ignoreVal = !1) : y.val === void 0 || Number.isNaN(y.val) || (u.updateVal(y.val), u.ignoreVal = !1), y.node !== void 0 && (u.node = y.node), y.type !== void 0 && (u.type = y.type), y;
    }
    function It(o) {
      return o.path.slice(1, o.dI + 1).filter((u) => u != null).join(".");
    }
    function Me(o) {
      return h === typeof o ? o : h === typeof (o == null ? void 0 : o.length) ? o.length : o != null && S === typeof o ? je(o).length : NaN;
    }
    function Ve(o, u) {
      let c = String(o), b = u == null || isNaN(u) ? 30 : u < 0 ? 0 : ~~u, y = o == null ? 0 : c.length, j = o == null ? "" : c.substring(0, y);
      return j = b < y ? j.substring(0, b - 3) + "..." : j, j.substring(0, b);
    }
    const kt = function(o) {
      let u = T(this, o);
      return u.r = !0, u.p = !1, o === void 0 && arguments.length === 1 && (u.t = D, u.v = void 0), u;
    }, Pt = function(o) {
      let u = T(this, o);
      return u.c = we(), u;
    }, Jr = function(o) {
      let u = T(this, o);
      return u.r = !1, o === void 0 && arguments.length === 1 && (u.t = D, u.v = void 0), u;
    }, we = function(o) {
      let u = T(this, o);
      return u.t = C, o !== void 0 && (u.v = o, u.f = o), u;
    }, At = function(o, u) {
      let c = T(this, u);
      return c.z = o, c;
    }, Dt = function(o) {
      let u = T(this, o);
      return u.r = !1, u.p = !0, u;
    }, _t = function(o) {
      let u = T(this, o);
      return u.r = !1, u.p = !0, u.e = !1, u.a.push(function(c, b, y) {
        return 0 < y.curerr.length && (b.uval = void 0, b.done = !1), !0;
      }), u;
    }, Xr = function(o) {
      let u = T(this);
      return u.t = E, u.v = o, u.f = o, u;
    }, Hr = function(o, u) {
      let c = T(this, u === void 0 ? o : u);
      return c.r = !1, c.f = o, E === typeof o && Ze[o.name] && (c.t = o.name.toLowerCase(), c.f = tt(et[c.t])), c.p = !1, c;
    }, Rt = function(o) {
      let u = T(this, o);
      return u.u.empty = !0, u;
    }, $t = function(o) {
      let u = T(this, o);
      return u.t = O, u;
    }, Qr = function(o, u) {
      let c = T(this), b = h === typeof o;
      c.t = I, b && u == null && (c = te([]));
      let y = null;
      return E === typeof o && (y = o, c = we()), c.b.push(function(j, g, p) {
        if (y)
          g.val = y(p.path, p);
        else if (b) {
          let x = o;
          g.val = p.path.slice(p.path.length - 1 - (0 <= x ? x : 0), p.path.length - 1 + (0 <= x ? 0 : 1)), I === typeof u && (g.val = g.val.join(u));
        } else
          o == null && (g.val = p.path[p.path.length - 2]);
        return !0;
      }), c;
    }, Zr = function(...o) {
      let u = T();
      u.t = M, u.r = !0;
      let c = o.map((b) => ze(b));
      return u.u.list = o, u.b.push(function(b, y, j) {
        let g = !0;
        for (let p of c) {
          let x = Object.assign(Object.assign({}, j.ctx), { err: [] });
          p(b, x), 0 < x.err.length && (g = !1);
        }
        return g || (y.why = Wr, y.err = [ie(j, ce + " " + de + le + fe + " does not satisfy all of: " + o.map((p) => H(p, null, !0)).join(", "))]), g;
      }), u;
    }, en = function(...o) {
      let u = T();
      u.t = M, u.r = !0;
      let c = o.map((b) => ze(b));
      return u.u.list = o, u.b.push(function(b, y, j) {
        let g = !1;
        for (let p of c) {
          let x = Object.assign(Object.assign({}, j.ctx), { err: [] }), A = p.match(b, x);
          A && (y.val = p(b, x)), g || (g = A);
        }
        return g || (y.why = Kr, y.err = [ie(j, ce + " " + de + le + fe + " does not satisfy any of: " + o.map((p) => H(p, null, !0)).join(", "))]), g;
      }), u;
    }, tn = function(...o) {
      let u = T();
      u.t = M, u.r = !0;
      let c = o.map((b) => ze(b));
      return u.u.list = o, u.b.push(function(b, y, j) {
        let g = 0;
        for (let p of c) {
          let x = Object.assign(Object.assign({}, j.ctx), { err: [] });
          if (p.match(b, x)) {
            g++, y.val = p(b, x);
            break;
          }
        }
        return g !== 1 && (y.why = Ur, y.err = [ie(j, ce + " " + de + le + fe + " does not satisfy one of: " + o.map((p) => H(p, null, !0)).join(", "))]), !0;
      }), u;
    }, Ct = function(...o) {
      let u = T();
      return u.b.push(function(c, b, y) {
        for (let j = 0; j < o.length; j++)
          if (c === o[j])
            return !0;
        return b.err = ie(y, ce + " " + de + le + fe + " must be exactly one of: " + y.node.s + "."), b.done = !0, !1;
      }), u.s = o.map((c) => H(c, null, !0)).join(", "), u;
    }, Mt = function(o, u) {
      let c = T(this, u);
      return c.b.push(o), c;
    }, Ge = function(o, u) {
      let c = T(this, u);
      return c.a.push(o), c;
    }, Vt = function(o, u) {
      let c = T(this, u);
      if (E === typeof o) {
        let b = o;
        b.gubu$ = b.gubu$ || {}, b.gubu$.Check = !0, c.b.push(o), c.s = (c.s == null ? "" : c.s + ";") + H(o, null, !0), c.r = !0;
      } else if (S === typeof o) {
        if (Object.prototype.toString.call(o).includes("RegExp")) {
          let b = (y) => y != null && !Number.isNaN(y) && !!String(y).match(o);
          Se(b, f, { value: String(o) }), Se(b, "gubu$", { value: { Check: !0 } }), c.b.push(b), c.s = H(o), c.r = !0;
        }
      } else
        I === typeof o && (c.t = o, c.r = !0);
      return c;
    }, Tt = function(o) {
      let u = T(this, o);
      return m === u.t && l !== u.c && u.n === 0 && (u.v = [u.c]), u.c = l, u;
    }, zt = function(o, u) {
      let c = T(this, u), b = I === typeof o ? o : (S === typeof o && o || {}).name;
      return b != null && b != "" && c.b.push(function(y, j, g) {
        return (g.ctx.ref = g.ctx.ref || {})[b] = g.node, !0;
      }), c;
    }, Wt = function(o, u) {
      let c = T(this, u), b = S === typeof o && o || {}, y = I === typeof o ? o : b.name, j = !!b.fill;
      return y != null && y != "" && c.b.push(function(g, p, x) {
        if (g !== void 0 || j) {
          let A = x.ctx.ref = x.ctx.ref || {};
          if (A[y] !== void 0) {
            let $ = Object.assign({}, A[y]);
            $.t = $.t || O, p.node = $, p.type = $.t;
          }
        }
        return !0;
      }), c;
    }, qt = function(o, u) {
      let c = T(this, u), b = S === typeof o && o || {}, y = I === typeof o ? o : b.name, j = _ === typeof b.keep ? b.keep : void 0, g = oe(b.claim) ? b.claim : [];
      if (y != null && y != "") {
        let p = (A, $, P) => {
          if (A === void 0 && 0 < g.length) {
            P.ctx.Rename = P.ctx.Rename || {}, P.ctx.Rename.fromDefault = P.ctx.Rename.fromDefault || {};
            for (let i of g) {
              let k = P.ctx.Rename.fromDefault[i] || {};
              if (P.parent[i] !== void 0 && !k.yes) {
                $.val = P.parent[i], P.match || (P.parent[y] = $.val), $.node = k.node;
                for (let V = 0; V < P.err.length; V++)
                  P.err[V].k === k.key && (P.err.splice(V, 1), V--);
                if (j) {
                  let V = P.cI + 1;
                  P.nodes.splice(V, 0, te(k.dval)), P.vals.splice(V, 0, void 0), P.parents.splice(V, 0, P.parent), P.keys.splice(V, 0, i), P.nI++, P.pI++;
                } else
                  delete P.parent[i];
                break;
              }
            }
            $.val === void 0 && ($.val = P.node.v);
          }
          return !0;
        };
        Se(p, f, { value: "Rename:" + y }), c.b.push(p);
        let x = (A, $, P) => (P.parent[y] = A, P.match || j || P.key === y || oe(P.parent) && j !== !1 || (delete P.parent[P.key], $.done = !0), P.ctx.Rename = P.ctx.Rename || {}, P.ctx.Rename.fromDefault = P.ctx.Rename.fromDefault || {}, P.ctx.Rename.fromDefault[y] = { yes: P.fromDefault, key: P.key, dval: P.node.v, node: P.node }, !0);
        Se(x, f, { value: "Rename:" + y }), c.a.push(x);
      }
      return c;
    }, Ft = function(o, u) {
      let c = T(this, u);
      return c.b.push(function(b, y, j) {
        let g = Me(b);
        if (o <= g)
          return !0;
        j.checkargs = { min: 1 };
        let p = h === typeof b ? "" : "length ";
        return y.err = ie(j, ce + " " + de + le + fe + ` must be a minimum ${p}of ${o} (was ${g}).`), !1;
      }), c.s = Lr + "(" + o + (u == null ? "" : "," + H(u)) + ")", c;
    }, Lt = function(o, u) {
      let c = T(this, u);
      return c.b.push(function(b, y, j) {
        let g = Me(b);
        if (g <= o)
          return !0;
        let p = h === typeof b ? "" : "length ";
        return y.err = ie(j, ce + " " + de + le + fe + ` must be a maximum ${p}of ${o} (was ${g}).`), !1;
      }), c.s = Fr + "(" + o + (u == null ? "" : "," + H(u)) + ")", c;
    }, Gt = function(o, u) {
      let c = T(this, u);
      return c.b.push(function(b, y, j) {
        let g = Me(b);
        if (o < g)
          return !0;
        let p = h === typeof b ? "be" : "have length";
        return y.err = ie(j, ce + " " + de + le + fe + ` must ${p} above ${o} (was ${g}).`), !1;
      }), c.s = zr + "(" + o + (u == null ? "" : "," + H(u)) + ")", c;
    }, Ut = function(o, u) {
      let c = T(this, u);
      return c.b.push(function(b, y, j) {
        let g = Me(b);
        if (g < o)
          return !0;
        let p = h === typeof b ? "be" : "have length";
        return y.err = ie(j, ce + " " + de + le + fe + ` must ${p} below ${o} (was ${g}).`), !1;
      }), c.s = qr + "(" + o + (u == null ? "" : "," + H(u)) + ")", c;
    }, Kt = function(o, u) {
      let c = T(this, u || we());
      return c.b.push(function(b, y, j) {
        let g = Me(b);
        if (o === g)
          return !0;
        let p = h === typeof b ? "" : " in length";
        return y.err = ie(j, ce + " " + de + le + fe + ` must be exactly ${o}${p} (was ${g}).`), !1;
      }), c.s = Gr + "(" + o + (u == null ? "" : "," + H(u)) + ")", c;
    }, Bt = function(o, u) {
      let c = T(this, u || {});
      return c.c = te(o), c;
    }, Yt = function(o, u) {
      let c = T(this, u || []);
      return c.t = "array", c.c = te(o), c.m = c.m || {}, c.m.rest = !0, c;
    };
    function T(o, u) {
      let c = te(o == null || o.window === o || o.global === o ? u : o);
      return Object.assign(c, { Above: Gt, After: Ge, Any: we, Before: Mt, Below: Ut, Check: Vt, Child: Bt, Closed: Tt, Define: zt, Empty: Rt, Exact: Ct, Fault: At, Ignore: _t, Len: Kt, Max: Lt, Min: Ft, Never: $t, Open: Pt, Refer: Wt, Rename: qt, Required: kt, Skip: Dt, Rest: Yt });
    }
    function ie(o, u, c, b) {
      return re(c || K, o, 4e3, u, b);
    }
    function re(o, u, c, b, y, j) {
      var g;
      let p = { k: u.key, n: u.node, v: u.val, p: It(u), w: o, c: ((g = u.check) === null || g === void 0 ? void 0 : g.name) || "none", a: u.checkargs || {}, m: c, t: "", u: y || {} }, x = Ve((u.val === void 0 ? D : H(u.val)).replace(/"/g, ""));
      if ((b = b || u.node.z) == null || b === "") {
        let A = x.startsWith("[") ? m : x.startsWith("{") ? S : u.val == null || h === typeof u.val && isNaN(u.val) ? "value" : typeof u.val, $ = x.startsWith("[") || oe(u.parents[u.pI]) ? "index" : "property", P = "is", i = y == null ? void 0 : y.k;
        i = oe(i) ? ($ = 1 < i.length ? (P = "are", "properties") : $, i.join(", ")) : i, p.t = "Validation failed for " + (0 < p.p.length ? `${$} "${p.p}" with ` : "") + `${A} "${x}" because ` + (U === o ? q === u.node.t ? `the ${A} is not an instance of ${u.node.u.n}` : `the ${A} is not of type ${u.node.t}` : N === o ? u.val === "" ? "an empty string is not allowed" : `the ${A} is required` : o === "closed" ? `the ${$} "${i}" ${P} not allowed` : O === o ? "no value is allowed" : `check "${j ?? o}" failed`) + (p.u.thrown ? " (threw: " + p.u.thrown.message + ")" : ".");
      } else
        p.t = b.replace(/\$VALUE/g, x).replace(/\$PATH/g, p.p);
      return p;
    }
    function Jt(o) {
      return o.s != null && o.s !== "" ? o.s : o.r || o.v === void 0 ? o.t : o.v;
    }
    function H(o, u, c, b) {
      let y;
      b || !o || !o.$ || a !== o.$.gubu$ && o.$.gubu$ !== !0 || (o = Jt(o));
      try {
        y = Qe(o, (j, g) => {
          var p, x;
          if (u && (g = u(j, g)), g != null && S === typeof g && g.constructor && he !== g.constructor.name && Vr !== g.constructor.name)
            g = E === typeof g.toString ? g.toString() : g.constructor.name;
          else if (E === typeof g)
            g = E === typeof Ie[g.name] && isNaN(+j) ? void 0 : g.name != null && g.name !== "" ? g.name : Ve(g.toString().replace(/[ \t\r\n]+/g, " "));
          else if (typeof g == "bigint")
            g = String(g.toString());
          else {
            if (Number.isNaN(g))
              return "NaN";
            b === !0 || ((p = g == null ? void 0 : g.$) === null || p === void 0 ? void 0 : p.gubu$) !== !0 && a !== ((x = g == null ? void 0 : g.$) === null || x === void 0 ? void 0 : x.gubu$) || (g = Jt(g));
          }
          return g;
        }), y = String(y);
      } catch {
        y = Qe(String(o));
      }
      return c === !0 && (y = y.replace(/^"/, "").replace(/"$/, "")), y;
    }
    function tt(o) {
      return o == null || S !== typeof o ? o : He(Qe(o));
    }
    const rn = (o) => te(Object.assign(Object.assign({}, o), { $: { gubu$: !0 } })), Te = { Above: Gt, After: Ge, All: Zr, Any: we, Before: Mt, Below: Ut, Check: Vt, Child: Bt, Closed: Tt, Default: Hr, Define: zt, Empty: Rt, Exact: Ct, Fault: At, Func: Xr, Ignore: _t, Key: Qr, Len: Kt, Max: Lt, Min: Ft, Never: $t, One: tn, Open: Pt, Optional: Jr, Refer: Wt, Rename: qt, Required: kt, Skip: Dt, Some: en, Rest: Yt };
    if (D !== typeof window)
      for (let o in Te)
        Se(Te[o], f, { value: o });
    Object.assign(Ie, Object.assign(Object.assign(Object.assign({ Gubu: Ie }, Te), Object.entries(Te).reduce((o, u) => (o["G" + u[0]] = u[1], o), {})), { isShape: (o) => o && s === o.gubu, G$: rn, buildize: T, makeErr: ie, stringify: H, truncate: Ve, nodize: te, expr: Ce, MakeArgu: nn })), Se(Ie, f, { value: w });
    const ze = Ie;
    n.Gubu = ze;
    function nn(o) {
      return function(u, c, b) {
        let y = !1;
        I === typeof u && (y = !0, b = c, c = u);
        const j = ze(b = b || c, { prefix: o + (c = I === typeof c ? " (" + c + ")" : "") }), g = j.node(), p = g.k;
        let x = u, A = {}, $ = 0, P = 0;
        for (; $ < p.length; $++) {
          let k = g.v[p[$]];
          k.p && (k = g.v[p[$]] = ((V) => Ge(function(G, R, B) {
            if (0 < B.curerr.length) {
              P++;
              for (let z = p.length - 1; z > V; z--)
                g.v[p[z]].m.rest ? A[p[z]].splice(g.v[p[z]].m.rest_pos + V - z, 0, A[p[z - 1]]) : (B.vals[B.pI + z - V] = B.vals[B.pI + z - V - 1], A[p[z]] = A[p[z - 1]]);
              R.uval = void 0, R.done = !1;
            }
            return !0;
          }, k))($), k.e = !1), $ !== p.length - 1 || g.v[p[$]].m.rest || (g.v[p[$]] = Ge(function(V, G, R) {
            return !(p.length - P < x.length && (R.curerr.length === 0 && (G.err = `Too many arguments for type signature (was ${x.length}, expected ${p.length - P})`), G.fatal = !0, 1));
          }, g.v[p[$]]));
        }
        function i(k) {
          for (let V = 0; V < p.length; V++) {
            let G = g.v[p[V]];
            G.m.rest ? (A[p[V]] = [...k].slice(V), G.m.rest_pos = A[p[V]].length) : A[p[V]] = k[V];
          }
          return A;
        }
        return y ? function(k) {
          return x = k, A = {}, $ = 0, P = 0, j(i(k));
        } : j(i(u));
      };
    }
    const { Gubu: on } = n;
    return on;
  });
})(Cr);
var fo = Cr.exports;
const { One: wo, Default: gr, Any: po, Min: Oo, Skip: dt, Required: ho, Open: vo } = fo.Gubu;
function Xe(e) {
  const t = this, r = t.util.deep;
  console.log("RO", e);
  const n = e.name, a = e.store, s = e.state;
  s[e.entity.root] = e.entity.space.reduce((O, h) => (O[h] = {}, O), {});
  const l = oo({
    name: n,
    initialState: s,
    reducers: {
      response: (O, h) => {
        let N = h.payload, m = N.msg, E = N.res, S = { ...m, aim: "res" };
        t.find(S) && (S.direct$ = !0, S.res = () => ({
          state: O,
          res: E,
          req: m
        }), t.act(S));
      },
      entityResponse: (O, h) => {
        var S, I;
        let N = h.payload, m = N.msg, E = N.res;
        if (yo(E)) {
          console.log("ENT ERR", E);
          return;
        } else if (((S = m.q) == null ? void 0 : S.store$) !== !1 && ((I = m.ent) == null ? void 0 : I.store$) !== !1 && E) {
          let _ = (m.ent || m.qent).entity$.replace(/^(-\/)+/, ""), D = e.entity.canonMap(O, m, e);
          if (D[_] = D[_] || {
            list: [],
            state: { list: "initial" }
          }, E != null && m.cmd === "load" || m.cmd === "save") {
            let C = !1;
            D[_].list = D[_].list.map(
              (M) => M.id === E.id ? (C = !0, { ...M, ...E }) : M
            ), C || D[_].list.push({ ...E });
          } else if (m.cmd === "list") {
            let C = e.entity.canonMap(O, m, e);
            C[_].list = E.map((M) => ({
              ...M
            })), C[_].state.list = "loaded";
          }
        }
      },
      update: (O, h) => {
        let m = h.payload.msg, E = m.update || (m.section ? [{ section: m.section, content: m.content }] : []);
        for (let S of E) {
          let I = S.section, _ = S.content;
          if (I) {
            let D = I.split("."), C = D[D.length - 1];
            D.length = D.length - 1;
            let M = O;
            for (let q = 0; q < D.length; q++)
              M = M[D[q]] = M[D[q]] || {};
            C != null && (M[C] = _);
          }
        }
      }
    }
  }), { response: d, entityResponse: w, update: f } = l.actions, v = eo(r(a, {
    reducer: {
      [n]: l.reducer
    },
    middleware: (O) => O({
      serializableCheck: {
        ignoredActions: [
          n + "/response",
          n + "/entityResponse",
          n + "/update"
        ]
      }
    })
  }));
  return t.sub("aim:req,out$:true", function(O, h, N) {
    v.dispatch(d({ msg: O, res: h, meta: N }));
  }).sub("sys:entity,out$:true", function(O, h, N) {
    v.dispatch(w({ msg: O, res: h, meta: N }));
  }).add(
    "aim:app,set:state",
    {
      section: dt(String),
      content: dt(),
      update: dt([{
        section: String,
        content: ho()
      }])
    },
    function(O, h, N) {
      v.dispatch(f({ msg: O, meta: N })), h(O);
    }
  ), {
    name: "redux",
    exports: {
      slice: l,
      store: v
    }
  };
}
Xe.defaults = {
  name: "seneca",
  state: gr({
    entity: {
      main: {}
    }
  }, vo({})),
  store: {},
  entity: {
    root: "entity",
    space: gr(["main"], [String]),
    // ['main'], // Min(1, ['main']),
    pin: po("on:entity"),
    // Default('on:entity', One(String, Object, [One(String, Object)]))
    canonMap: (e, t, r) => {
      let n = t.space$ || r.entity.space[0];
      return e[r.entity.root][n] = e[r.entity.root][n] || {};
    }
  }
};
function yo(e) {
  return Object.prototype.toString.call(e) === "[object Error]";
}
const Mr = un(null), go = (e) => an.createElement(
  Mr.Provider,
  { value: e.seneca },
  e.children
), mo = () => sn(Mr);
Xe.SenecaProvider = go;
Xe.useSeneca = mo;
Object.defineProperty(Xe, "name", { value: "redux" });
export {
  go as SenecaProvider,
  Xe as default,
  mo as useSeneca
};
//# sourceMappingURL=seneca-redux.es.js.map
