export const initialTimerState = {
    isRunning: false, 
    isPaused: false,
    totalSeconds: 0,
}

export const timerActions = {
  start: (totalSeconds) => ({ type: 'START', totalSeconds }),
  pause: () => ({ type: 'PAUSE' }),
  reset: () => ({ type: 'RESET' }),
  tick: () => ({ type: 'TICK' }),
  finish: () => ({ type: 'FINISH' })
}

export const timerReducer = (state, action) => {
  switch (action.type) {
    case 'START':
      return { 
        isRunning: true, 
        isPaused: false, 
        totalSeconds: action.totalSeconds 
      }
    case 'PAUSE':
      return state.isRunning 
        ? { ...state, isPaused: !state.isPaused }
        : state
    case 'RESET':
      return { 
        isRunning: false, 
        isPaused: false, 
        totalSeconds: 0 
      }
    case 'TICK':
      return state.totalSeconds <= 1
        ? { isRunning: false, isPaused: false, totalSeconds: 0 }
        : { ...state, totalSeconds: state.totalSeconds - 1 }
    case 'FINISH':
      return { 
        isRunning: false, 
        isPaused: false, 
        totalSeconds: 0 
      }
    default:
      return state
  }
}

