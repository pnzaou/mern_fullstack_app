import PropTypes from "prop-types";
import { themeStore } from "../stores/themeStore";
import { useEffect } from "react";

const ThemeProvider = ({children}) => {
    const {theme} = themeStore()

    useEffect(() => {
        document.documentElement.setAttribute("data-theme", theme)
    },[theme])

    return (
        <>{children}</>
    );
}

ThemeProvider.propTypes = {
    children: PropTypes.node
}

export default ThemeProvider;
