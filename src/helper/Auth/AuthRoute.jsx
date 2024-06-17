import { Navigate } from "react-router-dom";
import { CheckJwtToken } from "../CheckJwtToken";


export const AuthRoute = ({children}) =>{
    const isAuthenticated = CheckJwtToken();
    return isAuthenticated ? <Navigate to="/"/> : children ;
}