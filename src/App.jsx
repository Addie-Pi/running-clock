import { useState, useEffect, useRef, useReducer } from 'react'
import { timerReducer, initialTimerState, timerActions } from './hooks/timer.reducer'
import './App.css'

function App() {
  const [minutes, setMinutes] = useState(0)
  const [seconds, setSeconds] = useState(0)
  const [timerState, dispatch] = useReducer(timerReducer, initialTimerState)
  const intervalRef = useRef(null)


  const formatTime = (totalSeconds) => {
    const mins = Math.floor(totalSeconds / 60)
    const secs = totalSeconds % 60
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`
  }

  const start = () => {
    const inputMinutes = parseInt(minutes) || 0
    const inputSeconds = parseInt(seconds) || 0
    const totalSeconds = inputMinutes * 60 + inputSeconds
    
    dispatch(timerActions.start(totalSeconds))
  }

  const pauseResume = () => {
    dispatch(timerActions.pause())
  }

  const reset = () => {
    setMinutes(0);
    setSeconds(0);
    dispatch(timerActions.reset())
  }

  // countDown function
  useEffect(()=>{
    if(timerState.isRunning && !timerState.isPaused) {
      intervalRef.current = setInterval(() => {
        dispatch(timerActions.tick())
      }, 1000)
    }
    else{
      // adding condition is preventive 
      if(intervalRef.current) {
        clearInterval(intervalRef.current)
        
        // if we are not set the interval reference to null, 
        // it will still keep the interval id after clearInterval
        intervalRef.current = null
      }
    }

    // cleanup
    return () => {
      if(intervalRef.current) {
        clearInterval(intervalRef.current)
        intervalRef.current = null
      }
    }
  }, [timerState.isRunning, timerState.isPaused])

  return (
    <>
      <label>
        <input type="number" value={minutes} onChange={(e)=>{setMinutes(e.target.value)}}/>Minutes
      </label>
      <label>
        <input type="number" value={seconds} onChange={(e)=>{setSeconds(e.target.value)}}/>Seconds
      </label>
      <button onClick={start}>START</button>
      <button onClick={pauseResume}>PAUSE / RESUME</button>
      <button onClick={reset}>RESET</button>
      <h1 data-testid="running-clock">{formatTime(timerState.totalSeconds)}</h1>
    </>
  )
}

export default App
