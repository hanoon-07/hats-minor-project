// ResetPasswordPage.jsx
import React, {useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import axios from "axios";
import {motion} from "framer-motion";

const ResetPasswordPage = () => {
  const [token, setToken] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState("false");
  const navigate = useNavigate();
  console.log(isLoading);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:3000/reset-password",
        {token, newPassword}
      );
      //  console.log(response);
      //   console.log(isLoading);
      setMessage(response.data.message);
      setError("");
      setTimeout(() => navigate("/login"), 3000);
    } catch (err) {
      setError(err.response?.data?.error || "Something went wrong");
      setMessage("");
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      initial={{opacity: 0, y: 20}}
      animate={{opacity: 1, y: 0}}
      transition={{duration: 0.5}}
      className="flex min-h-screen bg-black text-white items-center justify-center p-4"
    >
      <div className="max-w-md w-full">
        <h2 className="text-2xl font-semibold mb-1 text-center">
          Reset Password
        </h2>
        <p className="text-gray-400 text-center mb-6">
          Enter your token and new password
        </p>
        {message && (
          <div className="bg-green-500/20 text-green-400 p-3 rounded-md mb-4 text-center">
            {message}
          </div>
        )}
        {error && (
          <div className="bg-red-500/20 text-red-400 p-3 rounded-md mb-4 text-center">
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="block text-sm mb-1">Reset Token</label>
            <input
              type="text"
              value={token}
              onChange={(e) => setToken(e.target.value)}
              placeholder="Enter the token"
              className="w-full bg-gray-800 rounded-sm p-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm mb-1">New Password</label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Enter new password"
              className="w-full bg-gray-800 rounded-sm p-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full text-black font-bold rounded-lg py-3 bg-gradient-to-r from-[#A8FF53] via-[#BFFF78] to-[#76CC33]"
          >
            {isLoading == true ? "Loading..." : "Reset Password"}
          </button>
          <p className="text-center text-gray-400 mt-2">
            Back to{" "}
            <Link to="/login" className="text-white underline">
              Login
            </Link>
          </p>
        </form>
      </div>
    </motion.div>
  );
};

export default ResetPasswordPage;
