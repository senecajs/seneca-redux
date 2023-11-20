import React, { createContext, useContext } from 'react'


function redux(this: any, options: any) {
  const seneca = this

  const name = options.name

  const slice = options.createSlice({
    name,
    initialState: options.state,
    reducers: {
      response: (state: any, action: any) => {
        let payload: any = action.payload

        let msg = payload.msg
        let res = payload.res

        let resmsg = { ...msg, aim: 'res' }

        if (seneca.find(resmsg)) {
          resmsg.direct$ = true
          resmsg.res = () => ({
            state, res, req: msg
          })
          seneca.act(resmsg)
        }
      }

    }
  })

  const { response } = slice.actions

  const store = options.configureStore({
    reducer: {
      [name]: slice.reducer
    },
    middleware: (getDefaultMiddleware: any) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [name + '/response']
        }
      })
  })

  seneca
    .sub('aim:req,out$:true', function(msg: any, res: any) {
      store.dispatch(response({ msg, res } as any))
    })



  return {
    name: 'redux',
    exports: {
      slice,
      store,
    }
  }
}

redux.defaults = {
  state: {},
  name: 'seneca',
  createSlice: Function,
  configureStore: Function,
}



const SenecaContext = createContext(null)

const SenecaProvider = (spec: any) => {
  return React.createElement(
    SenecaContext.Provider,
    { value: spec.seneca },
    spec.children
  )
}

const useSeneca = () => {
  return useContext(SenecaContext)
}


redux.SenecaProvider = SenecaProvider
redux.useSeneca = useSeneca

export {
  SenecaProvider,
  useSeneca,
}

export default redux
