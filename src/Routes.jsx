import { createBrowserRouter } from "react-router-dom";

import "./index.css";
import App from "./App.jsx";
import Main from "./components/Main.jsx";
import User from "./components/user/AddUser.jsx";
import Warehouse from "./components/warehouse/AddWarehouse.jsx";
import Good from "./components/good/AddGood.jsx";
import GoodType from "./components/good/AddGoodType.jsx";
import AddWarehouseAllocation from "./components/warehouse/AddWarehouseAllocation.jsx";
import AddWarehouseDispatch from "./components/warehouse/AddWarehouseDispatch.jsx";
import NotFound from "./components/NotFound.jsx";
import Home from "./components/Home.jsx";
import LoginForm from "./components/Login.jsx";
import Auth from "./validation/Auth.jsx";

const AuthComponent = Auth(App);

export const router = createBrowserRouter([
  {
    path: "/login",
    element: <LoginForm />,
  },
  {
    path: "/",
    element: <AuthComponent />,
    children: [
      {
        path: "/",
        element: <Main />,
        children: [
          {
            path: "/",
            element: <Home />,
          },
          {
            path: "/users",
            element: <User />,
          },
          {
            path: "/warehouses",
            element: <Warehouse />,
          },
          {
            path: "/goods",
            element: <Good />,
          },
          {
            path: "/good-types",
            element: <GoodType />,
          },
          {
            path: "/warehouse-allocation",
            element: <AddWarehouseAllocation />,
          },
          {
            path: "/warehouse-dispatch",
            element: <AddWarehouseDispatch />,
          },
          {
            path: "*",
            element: <NotFound />,
          },
        ],
      },
    ],
  },
]);
