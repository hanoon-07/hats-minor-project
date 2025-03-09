
import { getStudentDetails } from "../models/studentModel.js";

export const getInfoOfStudent = async (req,res)=>{
        const studentId = parseInt(req.query.studentId, 10);
        const allStudentDetails = await getStudentDetails(studentId);
        res.json(allStudentDetails)
}