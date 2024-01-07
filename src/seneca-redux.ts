import React, { createContext, useContext } from 'react'
import { createSlice, configureStore } from '@reduxjs/toolkit'

import { Gubu } from 'gubu'

import Pkg from '../package.json'


// TODO: remove slots - just use spaces
// each space has one list and one item
// TODO: don't use canons - use sub props: foo.bar - better DX


const { One, Default, Any, Min, Skip, Required, Open } = Gubu


type SenecaReduxFullOptions = {
  name: string
  debug: boolean
  log: {
    err: boolean
    msg: boolean
  }
  state: any
  store: any
  slots: Record<string, any>
}

type SenecaReduxOptions = Partial<SenecaReduxFullOptions>


const defaults: SenecaReduxFullOptions = {
  name: 'seneca',
  debug: false,
  log: {
    err: true,
    msg: false,
  },
  state: Default({
  }, Open({}))/*.Default({
    entity: {
      main: {}
    }
  })*/,
  store: {},

  slot: {
  },
}


const pname = '@seneca/redux'


function Redux(this: any, options: any) {
  const seneca = this
  const deep = seneca.util.deep

  // NOTE: only ever add once
  // if (null != this.find_plugin('Redux')) {
  //  return;
  // }


  if (options.debug) {
    console.warn(pname, Pkg.version, options)
  }

  const name = options.name
  const extStore = options.store
  const errlog: any[] = []
  const msglog: any[] = []


  function log(kind: string, msg: any, res?: any) {
    if (options.log.err && isError(res)) {
      res.when$ = Date.now()
      res.kind$ = kind
      errlog.push(res)
    }

    if (options.log.msg) {
      msglog.push({
        msg,
        res,
        when$: Date.now(),
        kind$: kind,
      })
    }
  }


  const initialState: any = options.state

  // TODO: expose as message so that slots can be added dynamically
  for (let slotPath in options.slot) {
    entityPrepare(initialState, slotPath)
  }

  const slice = createSlice({
    name,
    initialState,
    reducers: {
      response: (state: any, action: any) => {
        let payload: any = action.payload

        let msg = payload.msg
        let res = payload.res

        log('response', msg, res)

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

        let cmd = msg.cmd
        let kind = 'list' === cmd ? 'list' : 'item'

        log('entity', msg, res)

        let path = msg.slot$ || msg.q?.slot$ || msg.ent?.slot$

        if (null == path || false === path) {
          return
        }

        if (true === path) {
          path = ''
        }

        let { space, slot } = parseSlot(path)
        // console.log('ERp', path, space, slot)
        let spaceRoot = descend(state, space, true)
        // console.log('ERr', kind, JSON.stringify(spaceRoot))
        if (null == spaceRoot) {
          throw new Error('Entity space not prepared: ' + space.join('.'))
        }

        let slotMeta = spaceRoot.meta && spaceRoot.meta[slot]
        if (null == slotMeta) {
          throw new Error('Entity slot not prepared: ' + path)
        }

        let slotKind = slotMeta[kind]

        slotKind.error = null
        slotKind.when = Date.now()

        if (isError(res)) {

          if (options.debug) {
            console.warn(pname, 'entity-error', msg, res)
          }

          slotKind.state = 'error'
          slotKind.error = { ...res }

          return
        }

        // Don't store in redux if store$ directive is false
        else if (null != res) {
          if ('load' === cmd || 'save' === cmd) {
            let item = spaceRoot.item[slot] = { ...res }
            let list = spaceRoot.list[slot]

            let found = false
            spaceRoot.list[slot] = list.map(
              (entry: any) => {
                if (entry.id === item.id) {
                  found = true
                  return { ...entry, ...item }
                }
                else {
                  return entry
                }
              }
            )
            if (!found) {
              spaceRoot.list[slot] = list.concat({ ...item })
              // list.push({ ...item })
            }
            // console.log('ITEM', found, list)

            slotKind.state = 'load' === cmd ? 'loaded' : 'saved'
          }

          else if ('list' === cmd) {
            spaceRoot.list[slot] = res.map((entry: any) => ({
              ...entry
            }))
            slotKind.state = 'listed'
          }
        }
        else if ('remove' === cmd) {
          let removed: string[] = [msg.q?.id]
          spaceRoot.list[slot] =
            spaceRoot.list[slot].filter((entry: any) => !removed.includes(entry.id))
          if (spaceRoot.item[slot] && removed.includes(spaceRoot.item[slot].id)) {
            spaceRoot.item[slot] = null
            spaceRoot.meta[slot].item.state = 'removed'
          }
        }
        else {
          slotKind.state = 'done'
        }
      },


      update: (state: any, action: any) => {
        let payload: any = action.payload

        let msg = payload.msg

        log('update', msg)

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
      },

      modifier: (state: any, action: any) => {
        let payload: any = action.payload
        let modifier = payload.modifier
        modifier(state)
        return
      },
    }
  })

  const {
    response,
    entityResponse,
    update,
    modifier,
  } = slice.actions


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
            name + '/modifier',
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

  seneca.order.add.add({
    name: 'redux_modifier',
    before: 'prepare',
    exec: function(spec: any) {
      const args = spec.ctx.args
      const pattern = args.pattern
      const action = args.action

      // console.log('ADD redux', pattern, action)

      if (true === pattern.redux$ && null != action) {
        let origAction = action
        args.action = function(this: any, msg: any, reply: any, meta: any) {
          // console.log('DISPATCH modifier', msg)
          store.dispatch(modifier(
            {
              modifier: (state: any) => {
                meta.custom.state = () => state
                // console.log('ORIGACT', msg, meta.custom)
                origAction.call(this, msg, reply, meta)
              }
            } as any))
        }
        Object.defineProperty(args.action, 'name', {
          value: origAction.name + '_redux'
        })
        // console.log('ADD redux action', args.action)
      }
    }
  })


  const slotSelectors = (path?: string) => {
    let { space, slot } = parseSlot(path)
    return {
      space,
      slot,
      selectItem: (state: any) => {
        let root = descend(state.seneca, space)
        return root.item[slot]
      },
      selectList: (state: any) => {
        let root = descend(state.seneca, space)
        return root.list[slot]
      },
      selectMeta: (state: any, kind: 'item' | 'list') => {
        let root = descend(state.seneca, space)
        return root.meta[slot][kind]
      }
    }
  }

  return {
    name: 'Redux',
    exports: {
      slice,
      store,
      slotSelectors,
      errlog,
      msglog,
    }
  }
}


function entityPrepare(state: any, path: string) {
  let { space, slot } = parseSlot(path)

  let spaceRoot = descend(state, space, true)

  if (null == spaceRoot.meta) {
    spaceRoot.meta = {}
    spaceRoot.item = {}
    spaceRoot.list = {}
  }

  if (null == spaceRoot.meta[slot]) {
    spaceRoot.meta[slot] = {
      item: {
        state: 'initial',
        when: 0,
        error: null,
      },
      list: {
        state: 'initial',
        when: 0,
        error: null,
      }
    }
    spaceRoot.list[slot] = []
    spaceRoot.item[slot] = null
  }

  // console.log('PS A', space, slot)
}

function parseSlot(path?: string): { space: string[], slot: string } {
  let [spacePath, slot] = 'string' === typeof path ? path.split('/') : ''

  let hasSlot = null != slot && '' != slot
  let hasSpace = null != spacePath && '' != spacePath

  slot = hasSlot ? slot : hasSpace ? spacePath : 'main'
  spacePath = hasSlot && hasSpace ? spacePath : '.entity'

  if (!spacePath.endsWith('.entity')) {
    spacePath += '.entity'
  }

  let space = spacePath.split('.').filter((p: any) => null != p && '' != p)

  return { space, slot }
}


function descend(root: any, parts: string[], create: boolean = false): any {
  let current = root
  for (let pI = 0; pI < parts.length; pI++) {
    let partName = parts[pI]
    if (null == partName || '' == partName) {
      continue
    }

    if (null == current[partName] && create) {
      current = current[partName] = {}
    }
    else {
      current = current[partName]
    }
  }

  return current
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



Redux.defaults = defaults

Redux.SenecaProvider = SenecaProvider
Redux.useSeneca = useSeneca


// Prevent name mangling
Object.defineProperty(Redux, 'name', { value: 'Redux' })


export type {
  SenecaReduxOptions
}

export {
  SenecaProvider,
  useSeneca,
  Redux,
}

export default Redux
