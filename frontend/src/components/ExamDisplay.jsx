import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Results from "./Results"; // Import the Results component

export const ExamDisplay = ({id, rollNo}) => {
  const [exams, setExams] = useState([]);
  const [selectedExam, setSelectedExam] = useState(null);
  const { studentId } = useParams(); // Extract studentId from URL
  const navigate = useNavigate();

  useEffect(() => {
    const fetchExams = async (classId) => {
      try {
        const response = await axios.get(
          `http://localhost:3000/getExamsInClass/?classId=${classId}`
        );
        setExams(response.data);
      } catch (error) {
        console.error("Error fetching exams:", error);
      }
    };
    fetchExams(id);
  }, [id]);

  const getStatusColor = (status) => {
    switch (status) {
      case "ongoing":
        return "text-[var(--primary-color)]";
      case "completed":
        return "text-[var(--success-color)]";
      case "upcoming":
        return "text-[var(--secondary-color)]";
      default:
        return "text-[var(--grey-text)]";
    }
  };

  const handleExamClick = (examId) => {
    navigate(`/editor/${examId}/${rollNo}`, {replace: true});
  };

  return (
    <div className="text-[var(--light-text)] w-full">
      {/* Show Results if selected */}
      {selectedExam ? (
        <Results 
          examName={selectedExam.name} 
          examId={selectedExam.id} 
          onClose={() => setSelectedExam(null)} 
          studentId={studentId} 
        />
      ) : (
        <div className="rounded-lg overflow-auto scroller">
          {exams.map((exam, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-4 border-b border-[var(--light-bg)] 
                        hover:bg-[var(--light-bg)] transition-colors duration-300"
            >
              {/* Subject Name */}
              <div className="flex-1 text-lg font-semibold">{exam.name}</div>

              {/* Time/Status */}
              <div
                className={`flex-1 text-center ${getStatusColor(exam.status)}`}
              >
                duration: {exam.duration} mins
              </div>

              {/* Action Button */}
              <div className="flex-1 flex justify-end">
                <button
                  className={`px-4 py-2 rounded-md 
                    ${exam.active === "active"
                      ? "bg-[var(--primary-color)] text-[var(--dark-text)]"
                      : "bg-[var(--secondary-color)] text-white"
                    } hover:opacity-90 transition-opacity`}
                  onClick={() =>
                    exam.active === "active"
                      ? handleExamClick(exam.exam_id)
                      : resultFunc(exam) // Pass entire exam object
                  }
                >
                  {exam.active == "active" ? "join": exam.active == "upcoming"? "not started":"finished"}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};