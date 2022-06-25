import { useEffect } from "react"
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom"
import { isTokenCorrect } from "./helpers/isTokenCorrect"
import Page from "./pages"

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

export const RoutesApp = () =>
    <BrowserRouter>
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
    </BrowserRouter>