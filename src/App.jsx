import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <label>
        <input type="number" />Minutes
      </label>
      <label>
        <input type="number" />Seconds
      </label>
        <button>START</button>
        <button>PAUSE / RESUME</button>
        <button>RESET</button>
        <h1 data-testid="running-clock">00:00</h1>
    </>
  )
}

export default App
