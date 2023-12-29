import React, { useEffect } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import { useSelector } from 'react-redux'


// NOTE: also change App.tsx
// Use this for local development.
// import { useSeneca } from '@seneca/redux-dev'
// Use this to validate a published version.
import { useSeneca } from '@seneca/redux-dev'




import './App.css'

function App() {
  const seneca = useSeneca()

  const slotSelectors = seneca.export('Redux/slotSelectors')
  let { selectItem, selectList, selectMeta } = slotSelectors('foo')

  const count = useSelector((state:any)=>state.seneca.count)
  let item = useSelector((state:any)=>selectItem(state))
  let list = useSelector((state:any)=>selectList(state))
  let itemMeta = useSelector((state:any)=>selectMeta(state,'item'))
  let listMeta = useSelector((state:any)=>selectMeta(state,'list'))

  
  function incrCount() {
    seneca.act('aim:req,on:count,cmd:incr',{incr:1})
  }
  
  return (
    <div>
      <div className="card">
        <button onClick={incrCount}>
          count is {count}
        </button>
      </div>

      <div><b>ItemMeta:</b> {JSON.stringify(itemMeta)}</div>
      { item && <div>
        <b>Item:</b>
        <span>id: {item.id}, x: {item.x}</span>
      </div> }

      <div><b>ListMeta:</b> {JSON.stringify(listMeta)}</div>
      <ul>
        { list.map((item:any)=>
          <li key={item.id}>id: {item.id}, x: {item.x}</li>
        )}
      </ul>

    </div>
  )
}

export default App
