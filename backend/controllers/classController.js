import { getAllClassesDetails, storeClass, someClassInfo } from "../models/classModel.js";


export const getAllClassOfStudent = async (req,res)=>{
        const studentId = parseInt(req.query.studentId, 10);
        const allClassDetails = await getAllClassesDetails(studentId);
        res.json(allClassDetails)
}

export const joinClass = async(req,res)=>{
        const {studentId, classCode} = req.body
        storeClass(studentId,classCode)
        
}

export const getSomeClassInfo = async (req,res)=>{
        const studentId = parseInt(req.query.studentId, 10);
        const info = await someClassInfo(studentId);
        res.json(info)
}