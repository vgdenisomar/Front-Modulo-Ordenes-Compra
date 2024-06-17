import React from "react";
import { Link } from "react-router-dom";
import "../../App.css"
import "./SideBar.css"
import { Menu, MenuItem, Sidebar, SubMenu } from "react-pro-sidebar";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import MenuIcon from '@mui/icons-material/Menu';
import AssignmentTurnedInOutlinedIcon from '@mui/icons-material/AssignmentTurnedInOutlined';
import Diversity3OutlinedIcon from '@mui/icons-material/Diversity3Outlined';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
function SideBar() {
    const [collapsed, setCollapsed] = React.useState(false);
    return (
        <Sidebar style={{ height: "100vh" }} collapsed={collapsed}>
            <Menu>
                <MenuItem
                    icon = {<MenuIcon />}
                    onClick={() => setCollapsed(!collapsed)}
                    style={{ textAlign: "center", height:"10vh" }}
                >
                    {" "}
                    <h2>Adminstrador</h2>
                </MenuItem>
                <SubMenu icon={<LockOutlinedIcon />} label="Seguridad">
                    <MenuItem component={<Link to="user" />}> Usuarios</MenuItem>
                    <MenuItem> Roles </MenuItem>
                    <MenuItem> Permisos </MenuItem>
                </SubMenu>
                <MenuItem icon={<AssignmentTurnedInOutlinedIcon />}> Ordenes de Compra </MenuItem>
                <MenuItem icon={<Diversity3OutlinedIcon  />}> Proveedores </MenuItem>
                <MenuItem icon={<DescriptionOutlinedIcon />}> Reportes </MenuItem>
                
            </Menu>
        </Sidebar>
    )
}

export default SideBar;