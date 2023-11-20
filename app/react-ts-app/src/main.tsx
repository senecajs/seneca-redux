import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { createSlice, configureStore } from '@reduxjs/toolkit'

import Seneca from 'seneca-browser'
import SenecaEntity from 'seneca-entity'
import SenecaRedux, { SenecaProvider } from '@seneca/redux'

import App from './App.tsx'
import './index.css'



const seneca = Seneca({
  legacy: false,
  log: { logger: 'flat', level: 'warn' },
  plugin: {
    browser: {
      endpoint: '/api',
      headers: {},
      fetch: {
        credentials: 'include'
      }
    }
  },
  timeout: 98765
})
// .test('print')
  .test()
  .use(SenecaEntity)
  .use(SenecaRedux, {
    state: {
      count: 0
    },
    createSlice,
    configureStore,
  })
  
  .client({
    type: 'browser',
    pin: ['aim:req']
  })

  
  // Mock server message.
  .add('aim:req,on:count,cmd:incr', function(msg:any, reply:any) {
    reply({incr: msg.incr})
  })

  
  // Handle response to specific message.
  .add('aim:res,on:count,cmd:incr', function(msg:any) {
    let {state,res,req} = msg.res()
    state.count += res.incr
  })


  .ready(function(this:any) {
    const seneca = this
    ;(window as any).main = {seneca}

    ReactDOM.createRoot(document.getElementById('root')!).render(
      <React.StrictMode>
        <Provider store={seneca.export('redux/store')}>
          <SenecaProvider seneca={seneca}>
            <App />
          </SenecaProvider>
        </Provider>
      </React.StrictMode>,
    )
})
