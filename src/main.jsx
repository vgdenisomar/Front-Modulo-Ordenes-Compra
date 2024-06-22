import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Login from './components/Login/Login.jsx'
import Home from './components/Home/Home.jsx'
import UserList from './components/Security/User/UserList.jsx'
import { AuthRoute } from './helper/Auth/AuthRoute.jsx'
import { PrivateRoute } from './helper/Auth/PrivateRoute.jsx'
import UserDetail from './components/Security/User/UserDetail.jsx'
import RoleList from './components/Security/Role/RoleList.jsx'
import PermissionList from './components/Security/Permission/PermissionList.jsx'
import CreateSupplyChain from './components/SupplyChain/CreateSupplyChain.jsx'

const router = createBrowserRouter([
  {
    path: "/login",
    element: <AuthRoute><Login /></AuthRoute>
  },
  {
    path: "/",
    element: <PrivateRoute><Home /></PrivateRoute>,
    children: [
      {
        path: "user",
        element: <UserList />
      },
      {
        path: "user/detail/:id",
        element: <UserDetail />

      },
      {
        path: "role",
        element: <RoleList />
      },
      {
        path: "permission",
        element: <PermissionList />
      },
      {
        path: "supplychain",
        element: <CreateSupplyChain />
      },
    ]
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <RouterProvider router={router} />
  </React.StrictMode>,
)
