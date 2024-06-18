import TableScroll from "../../Shared/Table/Table";
import columns from "../../../helper/DataStructure/UserColumns";
import { Outlet } from "react-router-dom";
import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined';

function PermissionList() {
  return (
    <div>
      <h2 className="titleCatalog"><ArticleOutlinedIcon /> Permisos</h2>
      <TableScroll columns={columns} path={"/api/usuarios"} />
      <Outlet />
    </div>
  );
}

export default PermissionList;
