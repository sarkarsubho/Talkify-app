import React, { Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";
import ProtectRoute from "./auth/ProtectRoute";
import { LayoutLoader } from "./Layout/Loaders";
// import { Home } from '../pages/Home'
// using dynamic routes with React.lazy because we dont want to load the whole app at once once the page is visited only then it should load.

const Home = lazy(() => import("../pages/Home"));
const Login = lazy(() => import("../pages/Login"));
const Chat = lazy(() => import("../pages/Chat"));
const Groups = lazy(() => import("../pages/Groups"));
const NotFoundPage = lazy(() => import("../pages/NotFound"));
export const AllRoutes = () => {
  return (
    <Suspense fallback={<LayoutLoader></LayoutLoader>}>
      <Routes>
        <Route path="/" element={<ProtectRoute user={true}></ProtectRoute>}>
          {" "}
          <Route path="" element={<Home></Home>}></Route>
          <Route path="groups" element={<Groups />}></Route>
          <Route path="chat/:chatId" element={<Chat></Chat>}></Route>
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
        <Route path="*" element={<NotFoundPage></NotFoundPage>}></Route>
      </Routes>
    </Suspense>
  );
};
