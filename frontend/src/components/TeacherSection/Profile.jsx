import {motion } from "framer-motion";
import React from "react";
import {Clock, LogOut, UserCheck, Award, Pen, AlertCircle} from "lucide-react";
import {useEffect} from "react";
import axios from "axios";
import {useState} from "react";
import {LoadingRing} from "../../components/animation/LoadingRing";

const Profile = ({teacherId}) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [update, setUpdate] = useState(false);
  const [updateData, setUpdateData] = useState({
    name: "",
    email: "",
  });
  const [data, setData] = useState({
    name: "",
    email: "",
    role: "",
    numStudents: 0,
    numClasses: 0,
    numExams: 0,
  });

  function handleInputChange(e) {
    setUpdateData({...updateData, [e.target.name]: e.target.value});
  }

  function handleSubmit(e) {
    e.preventDefault();
    const updateTeacherData = async () => {
      try {
        setLoading(true);
        setError(null);
        await axios.put(`https://hats-minor-project-production.up.railway.app/updateTeacherData`, {
          id: teacherId,
          name: updateData.name,
          email: updateData.email,
        });
        setData((prevData) => ({
          ...prevData,
          name: updateData.name,
          email: updateData.email,
        }));
        setUpdate(false);
      } catch (error) {
        console.error("Error updating teacher data:", error);
        if (error.response) {
          setError(
            error.response.data.error || "Failed to update teacher data"
          );
        } else if (error.request) {
          setError(
            "Unable to connect to server. Please check your connection."
          );
        } else {
          setError("An unexpected error occurred. Please try again later.");
        }
      } finally {
        setLoading(false);
      }
    };

    updateTeacherData();
  }

  useEffect(() => {
    const fetchTeacherData = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await axios.get(
          `https://hats-minor-project-production.up.railway.app/getTeacherData`,
          {
            params: {id: teacherId},
          }
        );
        setData(response.data);
      } catch (error) {
        console.error("Error fetching teacher data:", error);
        if (error.response) {
          setError(error.response.data.error || "Failed to fetch teacher data");
        } else if (error.request) {
          setError(
            "Unable to connect to server. Please check your connection."
          );
        } else {
          setError("An unexpected error occurred. Please try again later.");
        }
      } finally {
        setLoading(false);
      }
    };

    if (teacherId) {
      fetchTeacherData();
    } else {
      setError("No teacher ID provided");
    }
  }, [teacherId]);

  if (loading) {
    return (
      <div className="flex items-center justify-center p-6">
        <LoadingRing />
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 rounded-sm w-[100%]">
        <div className="bg-red-500/10 border border-red-500 rounded-sm p-4 flex items-center gap-3">
          <AlertCircle className="w-5 h-5 text-red-500" />
          <div>
            <h3 className="text-red-500 font-medium">Error Loading Profile</h3>
            <p className="text-red-400 text-sm mt-1">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="mt-2 text-sm text-red-400 hover:text-red-300 underline"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
    {update && (
        <UpdateForm
          handleSubmit={handleSubmit}
          handleInputChange={handleInputChange}
          updateData={updateData}
          loading={loading}
          setUpdate={setUpdate}
        />
      )}

    <div className="p-6 rounded-sm w-[100%] relative">
      
      <div className="flex justify-between items-center mb-6">
        
        
      </div>

      <div className="flex items-center mb-8 flex-wrap gap-3 justify-start">
        <div className="">
          <h2 className="text-[#C1C4C7] text-4xl font-bold mb-1">{data.name}</h2>

          <div className="grid grid-cols-2 gap-x-16 gap-y-2 mt-2">
            
            <div className="mt-6">
              <p className="text-[#C1C4C7] text-sm">Email Address</p>
              <p className="text-[#A8FF53]">{data.email}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 max-[470px]:grid-cols-2 max-[370px]:grid-cols-1 gap-4 justify-between max-w-4xl">
        <div className="bg-[#272a2e] rounded-md p-4">
          <div className="flex items-center mb-2">
            <div className="w-10 h-10 bg-[yellow] rounded-full flex items-center justify-center mr-3">
              <LogOut className="w-5 h-5 text-black" />
            </div>
            <div>
              <h3 className="text-white text-2xl font-bold">
                {data.numStudents}
              </h3>
            </div>
          </div>
          <p className="text-[#A8FF53]">Total Students</p>
        </div>

        <div className="bg-[#272a2e] rounded-md p-4">
          <div className="flex items-center mb-2">
            <div className="w-10 h-10 bg-[#3B82F6] rounded-full flex items-center justify-center mr-3">
              <Clock className="w-5 h-5 text-black" />
            </div>
            <div>
              <h3 className="text-white text-2xl font-bold">
                {data.numClasses}
              </h3>
            </div>
          </div>
          <p className="text-[#A8FF53]">Classes</p>
        </div>

        <div className="bg-[#272a2e] rounded-md p-4">
          <div className="flex items-center mb-2">
            <div className="w-10 h-10 bg-[#F43F5E] rounded-full flex items-center justify-center mr-3">
              <Award className="w-5 h-5 text-black" />
            </div>
            <div>
              <h3 className="text-white text-2xl font-bold">{data.numExams}</h3>
            </div>
          </div>
          <p className="text-[#A8FF53]">Exams</p>
        </div>
      </div>

      <div className="border-t-2 border-dashed border-gray-500 mt-4 mr-10"></div>
      <div className="mt-6 flex items-center gap-4">
      <motion.button
      whileHover="hover"
      className="bg-[#A8FF53] hover:bg-[#5E8834] text-white h-[30px] font-medium py-2 px-4 rounded-sm flex items-center"
      onClick={() => setUpdate(true)}
    >
      <motion.div
        initial={{ rotate: 0 }}
        variants={{ hover: { rotate: 360 } }}
        animate="initial"
      >
        <Pen size={15} color="black" />
      </motion.div>
      <p className="ml-2 text-sm md:text-base text-black">Update Info</p>
    </motion.button>

        </div>
    </div>
    </>
  );
};

export default Profile;

const UpdateForm = ({
  handleSubmit,
  handleInputChange,
  updateData,
  loading,
  setUpdate,
}) => {
  return (
    <motion.div initial={{y: -10}} animate={{y: 0}} className="h-screen w-screen grid z-50 place-content-center absolute top-0 left-0 backdrop-blur-[5px]">
      <section className=" bg-black/70  ">
      <div className="min-w-[400px] p-8 rounded-sm bg-[#1a1c1e] outline outline-1 outline-gray-600  relative">
        <button
          onClick={() => setUpdate(false)}
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        <h2 className="text-white text-xl font-semibold mb-6">
          Update Profile
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <div>
            <label className="block text-sm text-gray-300 mb-2">Name</label>
            <input
              type="text"
              name="name"
              value={updateData.name}
              onChange={handleInputChange}
              placeholder="Enter your name"
              className="w-full bg-[#1f2124] rounded-sm p-3 text-white focus:outline-none focus:ring-2 focus:ring-[#2A7D67] border border-gray-700"
              required
            />
          </div>

          <div>
            <label className="block text-sm text-gray-300 mb-2">Email</label>
            <input
              type="email"
              name="email"
              value={updateData.email}
              onChange={handleInputChange}
              placeholder="Enter your email"
              className="w-full bg-[#1f2124] rounded-sm p-3 text-white focus:outline-none focus:ring-2 focus:ring-[#2A7D67] border border-gray-700"
              required
            />
          </div>

          <div className="flex gap-3 mt-2">
            <button
              type="button"
              onClick={() => setUpdate(false)}
              className="flex-1 py-3 px-4 rounded-sm max-h-[35px] w-[70px] bg-[#F43F5E] grid place-content-center text-black transition-colors"
            >
              Cancel
            </button>
            {/* <button
              type="submit"
              disabled={loading}
              className={`flex-1 py-3 px-4 rounded-lg font-medium ${
                loading
                  ? "bg-gray-600 cursor-not-allowed"
                  : "bg-[#A8FF53] hover:bg-[#236B57] text-white"
              } transition-colors`}
            >
              {loading ? "Updating..." : "Update Profile"}
            </button> */}
            <button className="flex-1 py-3 px-4 rounded-sm max-h-[35px] w-[70px] bg-[#A8FF53] grid place-content-center text-black transition-colors">
              update
            </button>

          </div>
        </form>
      </div>

      
    </section>
    </motion.div>
  );
};
