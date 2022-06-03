import React, { useEffect } from 'react'
import logo from './logo.svg'
import { Counter } from './features/counter/Counter'
import './App.css'
import { Link, useNavigate } from 'react-router-dom'
import { isTokenCorrect } from './helpers/isTokenCorrect'

function App() {
  const navigate = useNavigate()

  useEffect(() => {
    console.log(isTokenCorrect())
    if (isTokenCorrect(true)) {
      navigate("/claims")
    } else {
      navigate("/login")
    }
  }, [navigate])
  return <></>

}

export default App
