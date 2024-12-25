import { Navigate } from "react-router-dom";
import PropTypes from "prop-types";
import { authStore } from "../stores/authStore";

const ProtectedRoute = ({children}) => {

    const {token} = authStore()

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
