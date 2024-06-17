import { Navigate } from "react-router-dom";
import { CheckJwtToken } from "../CheckJwtToken";


export const PrivateRoute = ({children}) =>{
    const isAuthenticated = CheckJwtToken();
    return isAuthenticated ? children : <Navigate to="/login" replace />;
}