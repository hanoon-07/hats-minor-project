import React, {useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {Eye, EyeOff} from "lucide-react";
import {useDispatch, useSelector} from "react-redux";
import CodeflowTerminal from "./CodeFlowTerminal";
import {motion} from "framer-motion";

import {setUser, setLoading, setError} from "../authControl/authSlice";

import axios from "axios";
const LoginPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loginDetails, setLoginDetails] = useState({
    email: "",
    password: "",
  });
  const {user, isLoading, error} = useSelector(
    (state) => state["auth-control"]
  );

  const handleInputChange = (e) => {
    const {name, value} = e.target;
    setLoginDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // console.log("in suniit");
    dispatch(setLoading(true));
    try {
      const response = await axios.post(
        "http://localhost:3000/login",
        loginDetails,
        {withCredentials: true}
      );

      dispatch(setUser(response.data));
      if (response.data.role == "student") {
        navigate("/tempPage", {replace: true});
      } else {
        console.log("hello teacher");
        console.log(response.data);
        navigate(
          `/teacherDashboard/${response.data.user_id}/${response.data.name}`
        );
      }
    } catch (error) {
      console.log(error);
      dispatch(setError("Unable to Login"));
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <div className="flex min-h-screen bg-[#15171A] text-white md:p-4 gap-2 relative z-10 justify-center ">
      <LeftPanel />
      <RightPanel
        loginDetails={loginDetails}
        handleInputChange={handleInputChange}
        handleSubmit={handleSubmit}
        isLoading={isLoading}
        error={error}
      />
    </div>
  );
};

const LeftPanel = () => {
  return (
    <div className="relative xl:w-2/5   flex flex-col items-center justify-center overflow-hidden rounded-md z-20 hidden xl:flex xl:flex-col">
      {/*  <div className="w-[50%] h-[100%]  bg-[radial-gradient(circle_at_top_right,#7e22ce_0%,#4c1d95_20%,#000000_100%)] absolute right-0 top-0  "></div>
      <div className="w-[50%] h-[100%]  bg-[radial-gradient(circle_at_top_left,#7e22ce_0%,#4c1d95_20%,#000000_100%)] absolute left-0 top-0  "></div> */}
      <div className="w-[50%] h-[100%]  bg-[radial-gradient(circle_at_top_right,#77C828_0%,#A8FF53_20%,#1A1B1F_100%)] absolute right-0 top-0  "></div>
      <div className="w-[50%] h-[100%]  bg-[radial-gradient(circle_at_top_left,#77C828_0%,#A8FF53_20%,#1A1B1F_100%)] absolute left-0 top-0  "></div>
      <div className="flex flex-col bg-black/0 backdrop-blur-[4px] w-full h-full justify-center items-center  relative z-20 rounded-3xl">
        {/* <CodeflowTerminal /> */}
        <h2 className="text-3xl font-semibold mb-6 text-black orbitron-font-only">
          CODEFLOW
        </h2>
        <h1 className="text-3xl font-bold mt-8 mb-2 text-white">
          Welcome Back
        </h1>
        <p className="text-center mb-8 text-black font-medium ">
          Login to Your Account
        </p>
      </div>
    </div>
  );
};

// Login Form Component
const LoginForm = ({
  loginDetails,
  handleInputChange,
  handleSubmit,
  isLoading,
}) => {
  return (
    <form onSubmit={handleSubmit} className="flex flex-col  gap-8">
      <div>
        <label className="block text-sm mb-1">Email</label>
        <input
          type="email"
          name="email"
          value={loginDetails.email}
          onChange={handleInputChange}
          placeholder="eg. john.francis@gmail.com"
          className="w-full bg-gray-800 rounded-sm p-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>

      <PasswordInput
        password={loginDetails.password}
        handleInputChange={handleInputChange}
      />

      <button
        type="submit"
        disabled={isLoading}
        className={`w-full text-black font-bold rounded-sm py-3 mt-2 ${
          isLoading
            ? "bg-gray-500 cursor-not-allowed"
            : "bg-[#A8FF53] hover:bg-[#90E446]"
        }`}
      >
        {isLoading ? "Logging in..." : "Login"}
      </button>

      <p className="text-center text-gray-400 mt-2">
        Don't have an account?{" "}
        <Link to="/register" className="text-white underline">
          Sign Up
        </Link>
      </p>
      <Link
        to="/forgot-password"
        className="text-center text-gray-300 hover:text-white "
      >
        Forgot passoword
      </Link>
    </form>
  );
};

// Right Panel Component with Form
const RightPanel = ({
  loginDetails,
  handleInputChange,
  handleSubmit,
  isLoading,
  error,
}) => {
  return (
    <div className="xl:w-3/5 p-2 flex flex-col items-center justify-center bg-[#15171A] rounded-xl">
      <div className="orbitron-font text-2xl mb-5 xl:hidden">CODEFLOW</div>
      <div className="max-w-md w-full">
        <h2 className="text-2xl font-semibold mb-1 text-center">Login</h2>
        <p className="text-gray-400 text-center mb-6">
          Enter your credentials to access your account
        </p>

        {error && (
          <div className="bg-red-500/20 text-red-400 p-3 rounded-md mb-4 text-center">
            {error}
          </div>
        )}

        <Divider />
        <LoginForm
          loginDetails={loginDetails}
          handleInputChange={handleInputChange}
          handleSubmit={handleSubmit}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
};
// Password Input Component
const PasswordInput = ({password, handleInputChange}) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="w-full max-w-md">
      <label className="block text-sm mb-1 text-gray-300">Password</label>
      <div className="relative">
        <input
          type={showPassword ? "text" : "password"}
          name="password"
          value={password}
          onChange={handleInputChange}
          placeholder="Enter your password"
          className="w-full bg-gray-800 rounded-sm p-3 pr-10 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        <button
          type="button"
          onClick={togglePasswordVisibility}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
        >
          {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
        </button>
      </div>
      <p className="text-gray-400 text-xs mt-1">Must be at least 4</p>
    </div>
  );
};

// Divider Component
const Divider = () => {
  return (
    <div className="flex items-center my-4">
      <div className="flex-grow border-t border-gray-700"></div>
      <div className="flex-grow border-t border-gray-700"></div>
    </div>
  );
};

export default LoginPage;
