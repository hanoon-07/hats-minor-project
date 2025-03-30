import {motion} from "framer-motion";
import {useEffect, useState} from "react";
import validator from "validator";
import Input from "../../components/ExamCreation/Input";
import {ArrowLeft, Loader, Mail} from "lucide-react";
import {Link} from "react-router-dom";
import axios from "axios";
import {useDispatch, useSelector} from "react-redux";
import {setLoading, setError, clearAll} from "../authControl/authSlice";
import {LoadingRingSmall} from "../../components/animation/LoadingRingSmall";
//
//
//
const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    //console.log("wow");
    dispatch(clearAll());
  }, []);

  const {isLoading, error} = useSelector((state) => state["auth-control"]);
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validator.isEmail(email)) {
      dispatch(setError("Enter valid Email"));
      return;
    }
    dispatch(setLoading(true));
    try {
      const response = await axios.post(
        "http://localhost:3000/forgot-password",
        {email}
      );
      //console.log(response);
      setIsSubmitted(true);
    } catch (err) {
      dispatch(setError(err.response?.data?.error || "Something Went Wrong"));
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <section className="grid h-screen w-screen place-items-center">
      <motion.div
        initial={{opacity: 0, y: 20}}
        animate={{opacity: 1, y: 0}}
        transition={{duration: 0.5}}
        className="max-w-md w-full py-3 bg-gray-800 bg-opacity-50  rounded-2xl shadow-xl overflow-hidden"
      >
        <div className="px-6 ">
          <h2 className="text-3xl py-3 font-bold mb-6 text-center bg-gradient-to-r bg-[#A8FF53] text-transparent bg-clip-text">
            Forgot Password
          </h2>

          {!isSubmitted ? (
            <form onSubmit={handleSubmit} className="flex flex-col">
              <p className="text-gray-300 mb-2 text-center">
                Enter your email address and we'll send you a link to reset your
                password.
              </p>

              <Input
                icon={Mail}
                placeholder="Email Address"
                value={email}
                changeAction={(e) => setEmail(e.target.value)}
              />
              <motion.button
                whileHover={{scale: 1.02}}
                whileTap={{scale: 0.98}}
                disabled={isLoading}
                className={`self-end w-[40%] text-sm py-2 px-4 mt-4 
                       bg-gradient-to-r from-[#A8FF53] to-[#76CC33] rounded-sm
                  font-bold rounded-sm shadow-lg focus:outline-none  focus:ring-offset-gray-900 transition duration-200`}
                type="submit"
              >
                {isLoading ? "Loading..." : "Send Reset Link"}
              </motion.button>
              {error && (
                <div className="bg-red-500/20 mt-2 text-red-400 px-1 py-1 rounded-md mb-4 text-center">
                  {error}
                </div>
              )}
            </form>
          ) : (
            <div className="text-center">
              <motion.div
                initial={{scale: 0}}
                animate={{scale: 1}}
                transition={{type: "spring", stiffness: 500, damping: 30}}
                className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4 "
              >
                <Mail className="h-8 w-8 text-black " />
              </motion.div>
              <p className="text-gray-300 mb-6">
                If an account exists for {email}, you will receive an OTP in
                Email
              </p>
              <Link to={"/reset-password"} className=" text-green-400">
                Reset Password
              </Link>
            </div>
          )}
        </div>

        <div className="px-4 py-2 bg-gray-900 bg-opacity-50 flex justify-center">
          <Link
            to={"/login"}
            className="text-sm text-green-400 hover:underline flex items-center"
          >
            <ArrowLeft className="h-4 w-4 mr-2 " /> Back to Login
          </Link>
        </div>
      </motion.div>
    </section>
  );
};
export default ForgotPasswordPage;
