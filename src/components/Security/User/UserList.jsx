import React from "react";
import TableScroll from "../../Shared/Table/Table";
import columns from "../../../helper/DataStructure/UserColumns"
import { Outlet } from "react-router-dom";

function UserList() {
    return (
        <div>
            <h2>Usuarios</h2>
            <TableScroll columns={columns} path={"/api/usuarios"}/>
            <Outlet />
        </div>
    )
}

export default UserList;