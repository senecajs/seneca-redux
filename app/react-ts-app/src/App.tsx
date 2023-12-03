// import { useState } from 'react'
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
  const count = useSelector((state:any)=>state.seneca.count)
  const seneca = useSeneca()
  
  function incrCount() {
    window.main.seneca.act('aim:req,on:count,cmd:incr',{incr:1})
  }
  
  return (
    <>
      <div className="card">
        <button onClick={incrCount}>
          count is {count}
        </button>
      </div>
    </>
  )
}

export default App
