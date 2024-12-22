import { useContext } from "react";
import TokenContext from "../contexts/token.context";
import { Navigate } from "react-router-dom";
import PropTypes from "prop-types";

const ProtectedRoute = ({children}) => {

    const {token} = useContext(TokenContext)

    if(!token) {
        return <Navigate to="/opening"/>
    }
    
    return (
        <>
          {children}  
        </>
    );
}

ProtectedRoute.propTypes = {
    children: PropTypes.node,
}

export default ProtectedRoute;
