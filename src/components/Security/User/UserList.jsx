import TableScroll from "../../Shared/Table/Table";
import columns from "../../../helper/DataStructure/UserColumns";
import { Outlet } from "react-router-dom";
import PeopleOutlineOutlinedIcon from "@mui/icons-material/PeopleOutlineOutlined";

function UserList() {
  return (
    <div>
      <h2 className="titleCatalog"><PeopleOutlineOutlinedIcon /> Usuarios</h2>
      <TableScroll columns={columns} path={"/api/usuarios"} />
      <Outlet />
    </div>
  );
}

export default UserList;
