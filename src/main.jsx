import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Login from './components/Login/Login.jsx'
import Home from './components/Home/Home.jsx'
import UserList from './components/Security/User/UserList.jsx'
import { AuthRoute } from './helper/Auth/AuthRoute.jsx'
import { PrivateRoute } from './helper/Auth/PrivateRoute.jsx'
import { QueryClient, QueryClientProvider } from 'react-query'
import UserDetail from './components/Security/User/UserDetail.jsx'


const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Cache time: how long the cache is persisted in memory AFTER components referencing it unmount.
      // Stale time: how long before cache data is considered stale and refreshed.
      cacheTime: Infinity,
      staleTime: Infinity,
    },
  },
});

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

      }
    ]
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </React.StrictMode>,
)
