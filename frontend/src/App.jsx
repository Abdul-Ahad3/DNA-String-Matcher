import { useState } from 'react'
import Matcher from './components/Matcher'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     
      <div className="app">
        <h1>DNA String Matcher</h1>
        <Matcher />
      </div>
    </>
  )
}

export default App;
