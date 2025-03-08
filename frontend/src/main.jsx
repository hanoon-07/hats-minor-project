/* eslint-disable react/prop-types */
import React from "react";
import ReactDOM from "react-dom/client";
import "./styles/index.css";
import TempStartPage from "./pages/TempStartPage";
import Exampage from "./pages/Exampage";
import AfterSubmissionPage from "./pages/AfterSubmissionpage";
import AfterExamPage from "./pages/AfterExamPage";
import Layout from "./Layout";
import RegistrationPage from "./features/Login/RegistrationPage";
import LoginPage from "./features/Login/LoginPage";
import CreateExam from "./components/ExamCreation/ExamCreation";
import {Route} from "react-router-dom";
import {createBrowserRouter} from "react-router-dom";
import {createRoutesFromElements} from "react-router-dom";
import {RouterProvider} from "react-router-dom";
import {store} from "./redux/store";
import {Provider} from "react-redux";
import {Teacher} from "./pages/Teacher";
import {Navigate, Outlet, useLocation} from "react-router-dom";
import {useSelector} from "react-redux";
import UnauthorizedPage from "./features/Login/UnauthorizedPage";

import WaitingAnim from "./features/Login/WaitingAnim";


const RootRedirect = () => {
  const {isAuthenticated, user} = useSelector((state) => state["auth-control"]);

  if (isAuthenticated) {
    if (user.role === "teacher") {
      return <Navigate to="/teacherDashboard" replace />;
    } else {
      return <Navigate to="/tempPage" replace />;
    }
  }

  return <WaitingAnim />;
};

const Protected = ({authRoles}) => {
  const {isAuthenticated, user, isCheckingAuth} = useSelector(
    (state) => state["auth-control"]
  );

  console.log(isAuthenticated, user, isCheckingAuth);
  if (isCheckingAuth) {
    return <WaitingAnim />;
  }
  if (!isAuthenticated) {
    console.log("Not authenticated, redirecting to login");
    return <Navigate to="/login" replace />;
  }

  if (authRoles && !authRoles.includes(user.role)) {
    console.log(authRoles, user.role);
    return <Navigate to="/unauthorized" replace />;
  }
  return <Outlet />;
};
const root = ReactDOM.createRoot(document.getElementById("root"));

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route index element={<RootRedirect />} />

      <Route path="/register" element={<RegistrationPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/unauthorized" element={<UnauthorizedPage />} />
      <Route element={<Protected authRoles={["student"]} />}>
        <Route path="check" element={<AfterSubmissionPage />} />
        <Route path="/tempPage" element={<TempStartPage />} />
        <Route path="editor/:examId" element={<Exampage />} />

        <Route path="result" element={<AfterExamPage />} />
      </Route>

      <Route element={<Protected authRoles={["teacher"]} />}>
        <Route path="" element={<Teacher />} />
        <Route path="/teacherDashboard/:teacherId/:teacherName" element={<Teacher />} />
        <Route path="/create-exam/:classRoom" element={<CreateExam />} />
      </Route>

      {/* <Route path='' element={<AfterExamPage />} /> */}
    </Route>
  )
);

root.render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
