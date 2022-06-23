import React, { useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { store } from './app/store'
import reportWebVitals from './reportWebVitals'
import './index.module.sass'
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom"
import Page from "./pages"
import { isTokenCorrect } from './helpers/isTokenCorrect'

const container = document.getElementById('root')!
const root = createRoot(container)

function CheckConnect() {
  const navigate = useNavigate()
  useEffect(() => {
    if (isTokenCorrect(true)) {
      navigate("/claims")
    } else {
      navigate("/login")
    }
  }, [navigate])
  return null
}

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <Routes>
          <Route path='login' element={<Page.LoginRegPage />} />
          <Route path='reg' element={<Page.LoginRegPage fullNameInput={true} />} />
          <Route path='create' element={<Page.CreatePage />} />
          <Route path='claims' element={<Page.ClaimsPage />}>
            <Route path=':page' element={<Page.ClaimsPage />} />
          </Route>
          <Route path='/claim/:claimId' element={<Page.ClaimPage />} />
          <Route path='/' element={<CheckConnect />} />
        </Routes>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()

