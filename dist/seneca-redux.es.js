import f, { createContext as x, useContext as g } from "react";
function o(e) {
  const n = this, c = e.name, s = e.createSlice({
    name: c,
    initialState: e.state,
    reducers: {
      response: (t, a) => {
        let u = a.payload, l = u.msg, S = u.res, r = { ...l, aim: "res" };
        n.find(r) && (r.direct$ = !0, r.res = () => ({
          state: t,
          res: S,
          req: l
        }), n.act(r));
      }
    }
  }), { response: m } = s.actions, i = e.configureStore({
    reducer: {
      [c]: s.reducer
    },
    middleware: (t) => t({
      serializableCheck: {
        ignoredActions: [c + "/response"]
      }
    })
  });
  return n.sub("aim:req,out$:true", function(t, a) {
    i.dispatch(m({ msg: t, res: a }));
  }), {
    name: "redux",
    exports: {
      slice: s,
      store: i
    }
  };
}
o.defaults = {
  state: {},
  name: "seneca",
  createSlice: Function,
  configureStore: Function
};
const d = x(null), p = (e) => f.createElement(
  d.Provider,
  { value: e.seneca },
  e.children
), h = () => g(d);
o.SenecaProvider = p;
o.useSeneca = h;
export {
  p as SenecaProvider,
  o as default,
  h as useSeneca
};
//# sourceMappingURL=seneca-redux.es.js.map
