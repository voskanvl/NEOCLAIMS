import { FC, memo, ReactNode } from "react"

const Header: FC<{ children: ReactNode }> = ({ children }) => {
    return <header className="header">{children}</header>
}

export default memo(Header)