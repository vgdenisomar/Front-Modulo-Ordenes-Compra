import React from "react";
import { Link, Outlet } from "react-router-dom";
import SideBar from "../SideBar/SideBar";
import "../../App.css"
import "./Home.css"
import PowerSettingsNewOutlinedIcon from '@mui/icons-material/PowerSettingsNewOutlined';

function Home() {
    return (
        <div id="app" style={({ height: "100vh" }, { display: "flex" })}>
            <SideBar />
            <main>
                <div id="header" className="header">
                    <h1 style={{ padding: "0 10px" }}>Modulo de ordenes de compra</h1>
                    <button className="logout"><PowerSettingsNewOutlinedIcon /> Cerrar sesión</button>
                </div>
                <div id="content" className="content">
                    <Outlet />
                </div>
            </main>

        </div>
    )
}

export default Home;