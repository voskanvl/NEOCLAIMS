import React, { useEffect } from 'react'
import logo from './logo.svg'
import { Counter } from './features/counter/Counter'
import './App.css'
import { Link, useNavigate } from 'react-router-dom'

function App() {
  const navigate = useNavigate()

  useEffect(() => {
    const isToken = localStorage.getItem('token')
    console.log("🚀 ~ isToken", isToken)
    if (isToken) {
      navigate("/claims")
    } else {
      navigate("/login")
    }
  }, [navigate])
  return <></>
  // return (
  //   <div className="App">
  //     <header className="App-header">
  //       <img src={logo} className="App-logo" alt="logo" />
  //       <Counter />
  //       <p>
  //         Edit <code>src/App.tsx</code> and save to reload.
  //       </p>
  //       <span>
  //         <span>Learn </span>
  //         <a
  //           className="App-link"
  //           href="https://reactjs.org/"
  //           target="_blank"
  //           rel="noopener noreferrer"
  //         >
  //           React
  //         </a>
  //         <span>, </span>
  //         <a
  //           className="App-link"
  //           href="https://redux.js.org/"
  //           target="_blank"
  //           rel="noopener noreferrer"
  //         >
  //           Redux
  //         </a>
  //         <span>, </span>
  //         <a
  //           className="App-link"
  //           href="https://redux-toolkit.js.org/"
  //           target="_blank"
  //           rel="noopener noreferrer"
  //         >
  //           Redux Toolkit
  //         </a>
  //         ,<span> and </span>
  //         <a
  //           className="App-link"
  //           href="https://react-redux.js.org/"
  //           target="_blank"
  //           rel="noopener noreferrer"
  //         >
  //           React Redux
  //         </a>
  //         <Link to="login">Login</Link>
  //         <Link to="create">Create</Link>
  //       </span>
  //     </header>
  //   </div>
  // )
}

export default App
