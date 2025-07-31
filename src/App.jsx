import { useState, useEffect, useRef } from 'react'
import './App.css'

function App() {
  const [minutes, setMinutes] = useState(0)
  const [seconds, setSeconds] = useState(0)
  const [isRunning, setIsRunning] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const [totalSeconds, setTotalSeconds] = useState(0)
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

    // if the user has already started the timer, we reset it
    setIsRunning(false);
    setIsPaused(false);

    // start/ reset the timer
    setTimeout(()=>{
      setTotalSeconds(totalSeconds)
      setIsRunning(true)
    })
  }

  const pauseResume = () => {
    // only work if the user has started the timer
    if(isRunning){
      setIsPaused(!isPaused)
    }
  }

  const reset = () => {
    setMinutes(0);
    setSeconds(0);
    setIsRunning(false);
    setIsPaused(false);
    setTotalSeconds(0);
  }

  // countDown function
  useEffect(()=>{
    if(isRunning && !isPaused) {
      intervalRef.current = setInterval(() => {
        setTotalSeconds(prev => {
          if (prev <= 1) {
            setIsRunning(false);
            setIsPaused(false);
            return 0;
          }
          return prev - 1;
        });
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
  }, [isRunning, isPaused])

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
      <h1 data-testid="running-clock">{formatTime(totalSeconds)}</h1>
    </>
  )
}

export default App
