import { getAllClassesDetails, storeClass } from "../models/classModel.js";


export const getAllClassOfStudent = async (req,res)=>{
        const studentId = parseInt(req.query.studentId, 10);
        const allClassDetails = await getAllClassesDetails(studentId);
        res.json(allClassDetails)
}

export const joinClass = async(req,res)=>{
        const {studentId, classCode} = req.body
        storeClass(studentId,classCode)
        
}