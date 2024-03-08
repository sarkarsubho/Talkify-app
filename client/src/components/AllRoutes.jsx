import React, { lazy } from "react";
import { Route, Routes } from "react-router-dom";
import ProtectRoute from "./auth/ProtectRoute";
// import { Home } from '../pages/Home'
// using dynamic routes with React.lazy because we dont want to load the whole app at once once the page is visited only then it should load.

const Home = lazy(() => import("../pages/Home"));
const Login = lazy(() => import("../pages/Login"));
const Chat = lazy(() => import("../pages/Chat"));
const Groups = lazy(() => import("../pages/Groups"));
const NotFound = lazy(() => import("../pages/NotFound"));
export const AllRoutes = () => {
  return (
    <Routes>
      <Route element={<ProtectRoute></ProtectRoute>} user={true}>
        {" "}
        <Route path="/" element={<Home></Home>}></Route>
        <Route path="/groups" element={<Groups />}></Route>
        <Route path="/chat/:chatId" element={<Chat></Chat>}></Route>
      </Route>
      {/* if already loged in should not able to visit login again  */}
      <Route
        path="/login"
        element={
          <ProtectRoute user={!true} redirect="/">
            <Login></Login>
          </ProtectRoute>
        }
      ></Route>
      <Route path="*" element={<NotFound></NotFound>}></Route>
    </Routes>
  );
};
