import { lazy } from "react";
import { Navigate } from "react-router-dom";

import AuthGuard from "./auth/AuthGuard";
import { authRoles } from "./auth/authRoles";

import Loadable from "./components/Loadable";
import MatxLayout from "./components/MatxLayout/MatxLayout";

import materialRoutes from "app/views/material-kit/MaterialRoutes";

// SESSION PAGES
const NotFound = Loadable(lazy(() => import("app/views/sessions/NotFound")));
const JwtLogin = Loadable(lazy(() => import("app/views/sessions/JwtLogin")));
const JwtRegister = Loadable(lazy(() => import("app/views/sessions/JwtRegister")));
const ForgotPassword = Loadable(lazy(() => import("app/views/sessions/ForgotPassword")));
// E-CHART PAGE
const AppEchart = Loadable(lazy(() => import("app/views/charts/echarts/AppEchart")));
// DASHBOARD PAGE
const Analytics = Loadable(lazy(() => import("app/views/dashboard/Analytics")));
// Transaction page
const Transaction=Loadable(lazy(()=>import("app/views/transaction/Transaction") ))
// Order page
const Order=Loadable(lazy(()=>import("app/views/order/Order")))
// SubReseller page 
const SubReseller=Loadable(lazy(()=>import("app/views/subReseller/SubReseller")))
// SubReseller add page 
const AddSubReseller=Loadable(lazy(()=>import("app/views/subReseller/AddSubReseller")))

// Recharge page
const Recharge=Loadable(lazy(()=>import("app/views/recharge/Recharge")))


const routes = [
  {
    element: (
      <AuthGuard>
        <MatxLayout />
      </AuthGuard>
    ),
    children: [
      ...materialRoutes,
      // dashboard route
      { path: "/dashboard/default", element: <Analytics />, auth: authRoles.admin },
      // e-chart route
      { path: "/charts/echarts", element: <AppEchart />, auth: authRoles.editor },
      { path: "/transaction/default", element: <Transaction /> },
      { path: "/order/default", element: <Order /> },
      { path: "/sub-reseller/default", element: <SubReseller /> },
      { path: "/sub-reseller/add", element: <AddSubReseller /> },
      { path: "/recharge/default", element: <Recharge /> },
    ]
  },

  
  // session pages route
  { path: "/session/404", element: <NotFound /> },
  { path: "/session/signin", element: <JwtLogin /> },
  { path: "/session/signup", element: <JwtRegister /> },
  { path: "/session/forgot-password", element: <ForgotPassword /> },

  { path: "/", element: <Navigate to="dashboard/default" /> },
  { path: "*", element: <NotFound /> }
];

export default routes;
