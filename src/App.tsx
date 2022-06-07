import { useEffect } from 'react'
import './App.css'
import { useNavigate } from 'react-router-dom'
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
  return null

}

export default App
