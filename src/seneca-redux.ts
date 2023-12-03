import React, { createContext, useContext } from 'react'
import { createSlice, configureStore } from '@reduxjs/toolkit'

import { Gubu } from 'gubu'

const { One, Default, Any, Min, Skip, Required, Open } = Gubu


// TODO: set state


function redux(this: any, options: any) {
  const seneca = this
  const deep = seneca.util.deep

  if (options.debug) {
    console.log('@seneca/redux', '001', options)
  }

  const name = options.name
  const extStore = options.store

  // const matchEntity = seneca.util.Patrun()
  // seneca.util.pins(options.entity.pin).forEach((p: any) => matchEntity.add(p, true))

  const initialState = options.state
  initialState[options.entity.root] =
    options.entity.space.reduce((a: any, n: string) => (a[n] = {}, a), {})

  const slice = createSlice({
    name,
    initialState,
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
      },

      entityResponse: (state: any, action: any) => {
        let payload: any = action.payload

        let msg = payload.msg
        let res = payload.res

        if (isError(res)) {
          // TODO: error log?
          console.log('ENT ERR', res)
          return
        }

        else if (false !== msg.q?.store$ && false !== msg.ent?.store$ && res) {
          let canon = (msg.ent || msg.qent).entity$.replace(/^(-\/)+/, '')
          let canonMap = options.entity.canonMap(state, msg, options)

          canonMap[canon] = (canonMap[canon] || {
            list: [],
            slot: {},
            state: { list: 'initial', slot: {} }
          })

          if (null != res && 'load' === msg.cmd || 'save' === msg.cmd) {
            const slot = msg.slot$ || options.entity.slot
            canonMap[canon].slot[slot] = { ...res }
            canonMap[canon].state.slot[slot] = { id: res.id, when: Date.now(), cmd: msg.cmd }

            let found = false
            canonMap[canon].list = canonMap[canon].list.map(
              (item: any) => {
                if (item.id === res.id) {
                  found = true
                  return { ...item, ...res }
                } else {
                  return item
                }
              }
            )
            if (!found) {
              canonMap[canon].list.push({ ...res })
            }
          }

          else if ('list' === msg.cmd) {
            let canonMap = options.entity.canonMap(state, msg, options)
            canonMap[canon].list = res.map((item: any) => ({
              ...item
            }))
            canonMap[canon].state.list = 'loaded'
          }
        }
      },

      update: (state: any, action: any) => {
        let payload: any = action.payload

        let msg = payload.msg

        // Either one section and content, or multiple section and content updates.
        let updatelist: any =
          msg.update ||
          (msg.section ? [{ section: msg.section, content: msg.content }] : [])

        for (let update of updatelist) {
          // Format: a.b.c=1 => set {a:{b:{c:1}}}
          let section = update.section
          let content = update.content

          if (section) {
            let levels = section.split('.')
            let last = levels[levels.length - 1]
            levels.length = levels.length - 1
            let base = state
            for (let levelI = 0; levelI < levels.length; levelI++) {
              base = base[levels[levelI]] = base[levels[levelI]] || {}
            }
            if (null != last) {
              base[last] = content
            }
          }
        }
      }
    }
  })

  const { response, entityResponse, update } = slice.actions

  const store = configureStore(deep(extStore, {
    reducer: {
      [name]: slice.reducer
    },
    middleware: (getDefaultMiddleware: any) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [
            name + '/response',
            name + '/entityResponse',
            name + '/update',
          ]
        }
      })
  }))

  seneca
    .sub('aim:req,out$:true', function(msg: any, res: any, meta: any) {
      store.dispatch(response({ msg, res, meta } as any))
    })

    .sub('sys:entity,out$:true', function(msg: any, res: any, meta: any) {
      store.dispatch(entityResponse({ msg, res, meta } as any))
    })

    .add(
      'aim:app,set:state',
      {
        section: Skip(String),
        content: Skip(),
        update: Skip([{
          section: String,
          content: Required()
        }])
      },
      function(msg: any, reply: any, meta: any) {
        store.dispatch(update({ msg, meta } as any))
        reply(msg)
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
  name: 'seneca',
  debug: false,
  state: Default({
    entity: {
      main: {}
    }
  }, Open({}))/*.Default({
    entity: {
      main: {}
    }
  })*/,
  store: {},
  entity: {
    root: 'entity',
    space: Default(['main'], [String]), // ['main'], // Min(1, ['main']),
    slot: 'current',
    pin: Any('on:entity'), // Default('on:entity', One(String, Object, [One(String, Object)]))
    canonMap: (state: any, msg: any, options: any) => {
      let space = msg.space$ || options.entity.space[0]
      return state[options.entity.root][space] = (state[options.entity.root][space] || {})
    }
  }
}


function isError(x: any) {
  return Object.prototype.toString.call(x) === "[object Error]"
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


// Prevent name mangling
Object.defineProperty(redux, 'name', { value: 'redux' })


export {
  SenecaProvider,
  useSeneca,
}

export default redux
