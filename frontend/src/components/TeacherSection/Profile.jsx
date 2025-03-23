/* eslint-disable react/prop-types */
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
        await axios.put(`http://localhost:3000/updateTeacherData`, {
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
          `http://localhost:3000/getTeacherData`,
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
      <div className="p-6 rounded-lg w-[100%]">
        <div className="bg-red-500/10 border border-red-500 rounded-lg p-4 flex items-center gap-3">
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
    <div className="p-6 rounded-lg w-[100%] relative">
      {update && (
        <UpdateForm
          handleSubmit={handleSubmit}
          handleInputChange={handleInputChange}
          updateData={updateData}
          loading={loading}
          setUpdate={setUpdate}
        />
      )}
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center">
          <div className="w-1 h-8 bg-[#2A7D67] mr-3"></div>
          <h1 className="text-white md:text-2xl font-bold">Teacher Details</h1>
        </div>
        <div className="flex items-center gap-4">
          <button
            className="bg-[#2A7D67] text-white font-medium py-2 px-4 rounded-lg flex items-center"
            onClick={() => setUpdate(true)}
          >
            <Pen size={15} />
            <p className="ml-2 text-sm md:text-base">Update Info</p>
          </button>
        </div>
      </div>

      <div className="flex items-center mb-8 flex-wrap gap-3 justify-start">
        <div className="">
          <h2 className="text-white text-2xl font-bold mb-1">{data.name}</h2>

          <div className="grid grid-cols-2 gap-x-16 gap-y-2 mt-2">
            <div>
              <p className="text-gray-400 text-sm">Role</p>
              <p className="text-white">{data.role.toUpperCase()}</p>
            </div>
            <div>
              <p className="text-gray-400 text-sm">Email Address</p>
              <p className="text-white">{data.email}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 max-[470px]:grid-cols-2 max-[370px]:grid-cols-1 gap-8 justify-between max-w-4xl">
        <div className="bg-[#272a2e] rounded-lg p-4">
          <div className="flex items-center mb-2">
            <div className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center mr-3">
              <LogOut className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-white text-2xl font-bold">
                {data.numStudents}
              </h3>
            </div>
          </div>
          <p className="text-gray-400">Total Students</p>
        </div>

        <div className="bg-[#272a2e] rounded-lg p-4">
          <div className="flex items-center mb-2">
            <div className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center mr-3">
              <Clock className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-white text-2xl font-bold">
                {data.numClasses}
              </h3>
            </div>
          </div>
          <p className="text-gray-400">Classes</p>
        </div>

        <div className="bg-[#272a2e] rounded-lg p-4">
          <div className="flex items-center mb-2">
            <div className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center mr-3">
              <Award className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-white text-2xl font-bold">{data.numExams}</h3>
            </div>
          </div>
          <p className="text-gray-400">Exams</p>
        </div>
      </div>
    </div>
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
    <section className="grid place-items-center justify-center absolute top-0 left-0 bg-black/70 h-full w-full z-50">
      <div className="min-w-[400px] p-8 rounded-lg bg-[#1a1c1e] border border-gray-700 relative">
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
              className="w-full bg-gray-800 rounded-lg p-3 text-white focus:outline-none focus:ring-2 focus:ring-[#2A7D67] border border-gray-700"
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
              className="w-full bg-gray-800 rounded-lg p-3 text-white focus:outline-none focus:ring-2 focus:ring-[#2A7D67] border border-gray-700"
              required
            />
          </div>

          <div className="flex gap-3 mt-2">
            <button
              type="button"
              onClick={() => setUpdate(false)}
              className="flex-1 py-3 px-4 rounded-lg border border-gray-700 text-white hover:bg-gray-800 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className={`flex-1 py-3 px-4 rounded-lg font-medium ${
                loading
                  ? "bg-gray-600 cursor-not-allowed"
                  : "bg-[#2A7D67] hover:bg-[#236B57] text-white"
              } transition-colors`}
            >
              {loading ? "Updating..." : "Update Profile"}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};
