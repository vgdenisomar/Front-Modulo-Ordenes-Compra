import TableScroll from "../../Shared/Table/Table";
import columns from "../../../helper/DataStructure/UserColumns";
import { Outlet } from "react-router-dom";
import ConstructionOutlinedIcon from '@mui/icons-material/ConstructionOutlined';

function RoleList() {
  return (
    <div>
      <h2 className="titleCatalog"><ConstructionOutlinedIcon /> Roles</h2>
      <TableScroll columns={columns} path={"/api/usuarios"} />
      <Outlet />
    </div>
  );
}

export default RoleList;
