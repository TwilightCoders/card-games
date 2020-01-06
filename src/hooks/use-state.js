import React from 'react'

const useStateReducer = (prevState, newState) =>
  typeof newState === 'function' ? newState(prevState) : newState

const useStateInitializer = initialValue =>
  typeof initialValue === 'function' ? initialValue() : initialValue

export function useState(initialValue) {
  return React.useReducer(useStateReducer, initialValue, useStateInitializer)
}

export default useState