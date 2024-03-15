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

const AdminLogin = lazy(() => import("../pages/admin/AdminLogin"));
const Dashboard = lazy(() => import("../pages/admin/Dashboard"));
const ChatManagement = lazy(() => import("../pages/admin/ChatManagement"));
const MessageManagement = lazy(() =>
  import("../pages/admin/MessageManagement")
);
const UserManagement = lazy(() => import("../pages/admin/UserManagement"));
import { BrowserRouter } from "react-router-dom";

export const AllRoutes = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<LayoutLoader></LayoutLoader>}>
        <Routes>
          <Route element={<ProtectRoute user={true}></ProtectRoute>}>
            {" "}
            <Route path="/" element={<Home />} />
            <Route path="/groups" element={<Groups />} />
          </Route>
          <Route path="/chat/:chatId" element={<Chat />} />
          {/* if already loged in should not able to visit login again  */}
          <Route
            path="/login"
            element={
              <ProtectRoute user={true} redirect="/">
                <Login></Login>
              </ProtectRoute>
            }
          ></Route>
          <Route path="/admin" element={<AdminLogin />}></Route>
          <Route path="/admin/dashboard" element={<Dashboard />}></Route>
          <Route path="/admin/massages" element={<MessageManagement />}></Route>
          <Route path="/admin/groups" element={<ChatManagement />}></Route>
          <Route path="/admin/users" element={<UserManagement />}></Route>

          <Route path="*" element={<NotFoundPage></NotFoundPage>}></Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};
