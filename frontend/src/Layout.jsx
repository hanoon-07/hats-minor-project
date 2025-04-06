import React, {useEffect} from "react";
import axios from "axios";
import {Outlet, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";

import {setIsCheckingAuth, setUser} from "./features/authControl/authSlice";

function Layout() {
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Correct usage of useNavigate
  const {isAuthenticated} = useSelector((state) => state["auth-control"]);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        dispatch(setIsCheckingAuth(true));
        const response = await axios.get("https://hats-minor-project-production.up.railway.app/check-auth", {
          withCredentials: true,
        });
        //console.log("Lay out running ");
        dispatch(setUser(response.data.user));
      } catch (error) {
        console.error("Not authenticated:", error);
      } finally {
        dispatch(setIsCheckingAuth(false));
      }
    };

    checkAuth();
  }, [dispatch, navigate, isAuthenticated]);

  return (
    <>
      <Outlet />
    </>
  );
}

export default Layout;
