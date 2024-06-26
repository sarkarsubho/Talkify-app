import React, { Suspense, lazy, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import ProtectRoute from "./auth/ProtectRoute";
import { LayoutLoader } from "./Layout/Loaders";
import axios from "axios";
import { Toaster } from "react-hot-toast";

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
import { server } from "../constants/config";
import { useDispatch, useSelector } from "react-redux";
import { userExists, userNotExists } from "../redux/reducers/auth";
import { SocketProvider } from "../socket";

export const AllRoutes = () => {
  const dispatch = useDispatch();
  const { user, loader } = useSelector((state) => state.auth);
  // console.log(user);

  useEffect(() => {
    // console.log(server);
    axios
      .get(`${server}/api/v1/user/me`, { withCredentials: true })
      .then(({ data }) => {
        // console.log("user", data);
        dispatch(userExists(data.user));
      })
      .catch((er) => {
        // console.log(er);
        dispatch(userNotExists());
      });
  }, []);
  return loader ? (
    <LayoutLoader />
  ) : (
    <BrowserRouter>
      <Suspense fallback={<LayoutLoader></LayoutLoader>}>
        <Routes>
          <Route
          // as only want socket on the below components. covered with Socket Provider
            element={
              <SocketProvider>
                <ProtectRoute user={user}/>
              </SocketProvider>
            }
          >
            {" "}
            <Route path="/" element={<Home />} />
            <Route path="/groups" element={<Groups />} />
            <Route path="/chat/:chatId" element={<Chat />} />
          </Route>
          {/* if already loged in should not able to visit login again  */}
          <Route
            path="/login"
            element={
              <ProtectRoute user={!user} redirect="/">
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
      <Toaster position="bottom-center"></Toaster>
    </BrowserRouter>
  );
};
