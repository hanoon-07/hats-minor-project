/* eslint-disable react/prop-types */
import React, {useState} from "react";
import {Eye, EyeOff} from "lucide-react";
import axios from "axios";
import {UserPlus, Shuffle} from "lucide-react";
import {useNavigate} from "react-router-dom";
import validator from "validator";
const OnlyPipeSignupPage = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedRole, setSelectedRole] = useState("student");
  const navigate = useNavigate();
  const [userDetails, setUserDetails] = useState({
    name: "",
    email: "",
    password: "",
    uni: "",
    admi_num: "",
    roll: "",
    role: "student",
  });

  function optionHandler(option) {
    console.log(option);

    setSelectedRole(option);
    setUserDetails((prev) => ({...prev, role: option}));
  }
  const handleInputChange = (e) => {
    let {name, value} = e.target;
    if (name === "roll") {
      value = parseInt(value, 10) || "";
    }
    setUserDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (!validator.isEmail(userDetails.email)) {
      setError("Invalid Email");
      return;
    }
    setError(null);
    //console.log(userDetails);
    try {
      const response = await axios.post(
        `http://localhost:3000/register/${userDetails.role}`,
        userDetails
      );
      navigate("/login");
    } catch (err) {
      console.error("Registration Failed:", err.message);
      console.log(err);
      setError(err.response?.data || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="flex min-h-screen bg-black text-white p-4  gap-2 relative z-10   justify-center ">
      <LeftPanel optionHandler={optionHandler} />

      <RightPanel
        userDetails={userDetails}
        optionHandler={optionHandler}
        handleInputChange={handleInputChange}
        handleSubmit={handleSubmit}
        selectedRole={selectedRole}
        loading={loading}
        error={error}
      />
    </div>
  );
};

// Left Panel Component with Gradient Background
const LeftPanel = ({optionHandler}) => {
  return (
    <div className="w-2/5 relative  p-8 flex flex-col items-center justify-end  overflow-hidden rounded-xl z-20 hidden xl:flex xl:flex-col">
      <div className="w-[50%] h-[100%]  bg-[radial-gradient(circle_at_top_left,#d8b4fe_0%,#4c1d95_0%,#000000_100%)] absolute   left-0 top-0 ] "></div>
      {/*  <div className="w-[50%] h-[100%] bg-gradient-to-br from-lime-300 via-green-500 to-emerald-900 absolute left-0 top-0"></div> */}
      <div className="w-[50%] h-[100%]  bg-[radial-gradient(circle_at_top_right,#d8b4fe_0%,#7e22ce_0%,#4c1d95_20%,#000000_100%)] absolute right-0 top-0  "></div>
      <div className="w-[50%] h-[100%]  bg-[radial-gradient(circle_at_top_left,#d8b4fe_0%,#7e22ce_0%,#4c1d95_20%,#000000_100%)] absolute left-0 top-0  "></div>
      {/*  <div className="w-[50%] h-[100%]  bg-[radial-gradient(circle_at_top_right,#d8b4fe_0%,#7e22ce_40%,#4c1d95_70%,#000000_100%)]  absolute right-0 top-0"></div> */}
      {/*  <div className="absolute  w-1/2 h-[40%] top-1 right-[-130px] rotate-45 z-0 bg-gradient-to-b  from-purple-400 via-purple-700 via-purple-900 to-black rounded-full"></div> */}
      <div className="flex flex-col items-center max-w-xs mb-[20%] relative z-20 rounded-3xl ">
        <h1 className="text-3xl font-bold mt-8 mb-4">Get Started with Us</h1>
        <p className="text-center mb-8">Register Your Account</p>

        <StepButtons optionHandler={optionHandler} />
      </div>
    </div>
  );
};

// Step Buttons Component
const StepButtons = ({optionHandler}) => {
  function handleRegisterSubmit(option) {
    optionHandler(option);
  }

  return (
    <div className="w-full space-y-4">
      <button
        className="text-white bg-black rounded-lg w-full py-3 px-4 font-medium flex items-center border border-transparent hover:border-[#A8FF53] transition
      "
        onClick={() => handleRegisterSubmit("teacher")}
      >
        <span className="bg-gray-600 text-white w-6 h-6 rounded-full flex items-center justify-center mr-3 text-sm">
          1
        </span>
        Register as a Teacher
      </button>

      <button
        className="text-white bg-black rounded-lg w-full py-3 px-4 font-medium flex items-center border border-transparent hover:border-[#A8FF53] transition"
        onClick={() => handleRegisterSubmit("student")}
      >
        <span className="bg-gray-600 w-6 h-6 rounded-full flex items-center justify-center mr-3 text-sm">
          2
        </span>
        Register as a Student
      </button>

      <div className="text-white bg-black rounded-lg w-full py-3 px-4 font-medium flex items-center justify-center ">
        Set up your profile
      </div>
    </div>
  );
};

// Right Panel Component with Form
const RightPanel = ({
  userDetails,
  handleInputChange,
  handleSubmit,
  selectedRole,
  loading,
  optionHandler,
  error,
}) => {
  return (
    <div className="xl:w-3/5 p-2 flex flex-col items-center justify-center bg-black rounded-xl">
      <div className="max-w-md w-full">
        <h2 className="text-2xl font-semibold mb-1 text-center">
          Sign Up {userDetails.role}
        </h2>
        <p className="text-gray-400 text-center mb-6">
          Enter your personal data to create your account as a {selectedRole}.
        </p>

        <Divider />
        <SignUpForm
          userDetails={userDetails}
          handleInputChange={handleInputChange}
          optionHandler={optionHandler}
          selectedRole={selectedRole}
          handleSubmit={handleSubmit}
          loading={loading}
          error={error}
        />
      </div>
    </div>
  );
};

const Divider = () => {
  return (
    <div className="flex items-center my-4">
      <div className="flex-grow border-t border-gray-700"></div>

      <div className="flex-grow border-t border-gray-700"></div>
    </div>
  );
};

// Import Lucide React icons

const SignUpForm = ({
  userDetails,
  handleInputChange,
  handleSubmit,
  selectedRole,
  optionHandler,
  loading,
  error,
}) => {
  const navigate = useNavigate();
  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      {/* Always visible fields */}
      <div className="flex gap-4 place-items-center justify-center">
        <div className="flex-1">
          <label className="block text-sm mb-2">Name</label>
          <input
            type="text"
            name="name"
            value={userDetails.name}
            onChange={handleInputChange}
            placeholder="eg. John"
            className="w-full bg-gray-800 rounded-sm p-3 text-white"
            required
          />
        </div>

        {userDetails.role === "student" && (
          <div className="flex-1">
            <label className="block text-sm mb-2">Roll</label>
            <input
              type="number"
              name="roll"
              value={userDetails.roll}
              onChange={handleInputChange}
              placeholder="Roll"
              className="w-full bg-gray-800 rounded-sm p-3 text-white"
              required
            />
          </div>
        )}
      </div>

      <div>
        <label className="block text-sm mb-1">Email</label>
        <input
          type="email"
          name="email"
          value={userDetails.email}
          onChange={handleInputChange}
          placeholder="eg. john.francis@gmail.com"
          className="w-full bg-gray-800 rounded-sm p-3 text-white"
          required
        />
      </div>

      <PasswordInput
        password={userDetails.password}
        handleInputChange={handleInputChange}
      />

      {userDetails.role === "student" && (
        <div className="flex gap-4">
          <div className="flex-1">
            <label className="block text-sm xl:mb-2 mb-7">
              University Name
            </label>
            <input
              type="text"
              name="uni"
              value={userDetails.uni}
              onChange={handleInputChange}
              placeholder="eg. KTU"
              className="w-full bg-gray-800 rounded-sm p-3 text-white"
              required
            />
          </div>
          <div className="flex-1">
            <label className="block text-sm mb-2">
              University Registration Number
            </label>
            <input
              type="text"
              name="admi_num"
              value={userDetails.admi_num}
              onChange={handleInputChange}
              placeholder="KNR22008"
              className="w-full bg-gray-800 rounded-sm p-3 text-white"
              required
            />
          </div>
        </div>
      )}

      <button
        type="submit"
        className="w-full bg-[#A8FF53] text-black font-bold rounded-lg py-3 mt-2 flex items-center justify-center gap-2"
      >
        <UserPlus size={18} /> {/* Sign up icon from Lucide */}
        {loading ? "Registering..." : "Sign Up"}
      </button>
      <p className="w-full h-[10px] mt-1 ml-5 text-red-300">
        {error ? error : ""}
      </p>
      <div className="flex place-items-center gap-3 flex-wrap xl:block ">
        <div className="text-center flex gap-3 float-right text-gray-400 ">
          Already have an account?{" "}
          <p
            className="text-[#A8FF53] underline cursor-pointer mr-2"
            onClick={() => navigate("/login")}
          >
            Log In
          </p>
        </div>
        <button
          type="button"
          className="bg-[#A8FF53] text-black font-bold rounded-lg flex float-right py-2 px-6 xl:hidden mr-4 items-center gap-2"
          onClick={() =>
            selectedRole == "student"
              ? optionHandler("teacher")
              : optionHandler("student")
          }
        >
          <Shuffle size={16} /> {/* Toggle/shuffle icon from Lucide */}
          {selectedRole == "student" ? "Register Teacher" : "Register Student"}
        </button>
      </div>
    </form>
  );
};

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
          minLength={4}
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
      <p className="text-gray-400 text-xs mt-1">
        Must be at least 4 characters.
      </p>
    </div>
  );
};
export default OnlyPipeSignupPage;
