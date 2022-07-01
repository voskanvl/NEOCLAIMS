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

enum Paths {
    Login = "login",
    Reg = "reg",
    Create = "create",
    Claims = "claims",
    Page = ":page",
    Claim = "/claim/:claimId",
    Root = "/"
}


export const RoutesApp = () =>
    <BrowserRouter>
        <Routes>
            <Route path={Paths.Login} element={<Page.LoginRegPage />} />
            <Route path={Paths.Reg} element={<Page.LoginRegPage fullNameInput={true} />} />
            <Route path={Paths.Create} element={<Page.CreatePage />} />
            <Route path={Paths.Claims} element={<Page.ClaimsPage />}>
                <Route path={Paths.Page} element={<Page.ClaimsPage />} />
            </Route>
            <Route path={Paths.Claim} element={<Page.ClaimPage />} />
            <Route path={Paths.Root} element={<CheckConnect />} />
        </Routes>
    </BrowserRouter>