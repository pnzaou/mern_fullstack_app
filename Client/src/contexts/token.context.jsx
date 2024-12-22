import { createContext, useState } from "react";
import PropTypes from "prop-types";

const TokenContext = createContext({
    token: '',
    login: () => {},
    logout: () => {}
})

export default TokenContext

export const TokenContextProvider = ({children}) => {
    const [token, setToken] = useState(() => {
        return localStorage.getItem('auth_token')
    })

    const login = (newToken) => {
        setToken(newToken)
        localStorage.setItem('auth_token', newToken)
    }

    const logout = () => {
        setToken(null)
        localStorage.removeItem('auth_token')
    }

    return (
        <TokenContext.Provider value={{ token, login, logout }}>
            {children}
        </TokenContext.Provider>
    )
}

TokenContextProvider.propTypes = {
    children: PropTypes.node
}