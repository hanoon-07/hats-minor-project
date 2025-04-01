
import { getStudentDetails, getStudentResults, fetchPast6Scores } from "../models/studentModel.js";

export const getInfoOfStudent = async (req,res)=>{
        const studentId = parseInt(req.query.sid, 10);
        const allStudentDetails = await getStudentDetails(studentId);
        res.json(allStudentDetails)
}

export const getResultsOfStudent = async (req, res) => {
        try {
            const studentId = parseInt(req.query.sid, 10);
            const examId = parseInt(req.query.eid, 10);
    
            if (isNaN(studentId) || isNaN(examId)) {
                return res.status(400).json({ error: "Invalid student or exam ID" });
            }
    
            const results = await getStudentResults(studentId, examId);
            res.json(results);
        } catch (error) {
            console.error("Error fetching results:", error);
            res.status(500).json({ error: "Internal server error" });
        }
    };

export const getPast6Scores = async (req,res)=>{
        const studentId = parseInt(req.query.sid, 10);
        const past6scores = await fetchPast6Scores(studentId);
        res.json(past6scores)
}


