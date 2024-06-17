import React from "react";
import { setCookie } from "../../helper/CookieService";
import { useNavigate } from 'react-router-dom';

function Login() {
    const navigate = useNavigate();

    const hogin = () =>{
        setCookie("jwtuser","bnndsndknssdsds",7)
        navigate("/")

    }
    return (
        <div>
            <button onClick={() => hogin()}>Iniciar</button>
        </div>
    )
}

export default Login;