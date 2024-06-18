import { Avatar, Box, IconButton, Menu, MenuItem, Tooltip, Typography } from "@mui/material";
import Toolbar from '@mui/material/Toolbar';
import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import "../../App.css";
import SideBar from "../SideBar/SideBar";
import "./Home.css";
import { clearCookies } from "../../helper/CookieService";

function Home() {
    const [anchorElUser, setAnchorElUser] = React.useState(null);
    const nav = useNavigate();

    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const cerrarSesion = () => {
        clearCookies();
        nav("/login")
    };

    return (
        <div id="app" style={({ height: "100vh" }, { display: "flex" })}>
            <SideBar />
            <main>
                <Toolbar sx={{ backgroundColor: '#1976d2' }}>
                    <Typography
                        component="h1"
                        variant="h5"
                        color="white"
                        noWrap
                        sx={{ flexGrow: 1}}
                    >
                        Modulo de ordenes de compra
                    </Typography>
                    <Box sx={{ flexGrow: 0 }}>
                        <Tooltip title="Cerrar sesion">
                            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                <Avatar alt="Remy Sharp" src="/user.jpg" />
                            </IconButton>
                        </Tooltip>
                        <Menu
                            sx={{ mt: '45px' }}
                            id="menu-appbar"
                            anchorEl={anchorElUser}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(anchorElUser)}
                            onClose={handleCloseUserMenu}
                        >

                            <MenuItem onClick={cerrarSesion}>
                                <Typography textAlign="center">Cerrar sesion</Typography>
                            </MenuItem>
                        </Menu>
                    </Box>
                </Toolbar>
                <div id="content" className="content">
                    <Outlet />
                </div>
            </main>

        </div>
    )
}

export default Home;