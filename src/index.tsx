import React from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { store } from './app/store'
import App from './App'
import reportWebVitals from './reportWebVitals'
// import style from './index.module.sass'
import './index.module.sass'
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Page from "./pages"

const container = document.getElementById('root')!
const root = createRoot(container)

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <Routes>
          <Route path='login' element={<Page.Login />} />
          <Route path='reg' element={<Page.Reg />} />
          <Route path='create' element={<Page.Create />} />
          <Route path='claims' element={<Page.Claims />} />
          <Route path='/claim/:claimId' element={<Page.Claim />} />
          <Route path='/' element={<App />} />
        </Routes>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()

//TODO: использовать SVG sprite
//TODO: разработать таблицу с сортировкой по колонкам. входные параметры - данные из стейта
//TODO: использовать react-responsive для изменения строки таблицы в карточку на низких разрешения, согласно макета
//TODO: как передавать пароль в POST запросе?
//TODO: учесть время хагурзки данных. поставить прелоадер
//TODO: сделать проверку не только на наличие токена в localstorage, но и на срок годности токена. В случае не актуальности токена удалить его иы редиректить на страницу Login
//TODO: ловить ошибку некактуальности токена с сервера