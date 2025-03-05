import { getClassesDb, getClassCountDB, createClassDB, getClassCodeDB, getClassStudentsDB } from "../models/teacherModel.js";

export const createNewClass = async (req, res) => {

    const classData = req.body;
    console.log(classData);
    const response = await createClassDB(classData.teacherId, classData.className, classData.maxCount, classData.subject); //teacher id will be changed later
    if(response.error != null) {
        res.json(response);
        return;
    } else {
        res.json(response);
    }
    
}

export const getClassCode = async (req, res) => {
    const {classId} = req.query;
    const classCode = await getClassCodeDB(classId);
    //console.log(classCode);
    res.json(classCode);
}

export const getClassStudents = async (req, res) => {
    const {classId} = req.query;
    const studentData = await getClassStudentsDB(classId);
    res.json(studentData);
}

export const getClasses = async (req, res) => {
    const {teacherId} = req.query;
    const data = await getClassesDb(teacherId);
    //get the student count for each class
    const counts = await Promise.all(
        data.map(async (item) => {
            const count = await getClassCountDB(item.class_id);
            return count.count;
        })
    );

    console.log(data);
    //console.log(counts);
    const resultData = [];
    data.map((item, index) => {
        resultData.push({
            className: item.name,
            studentCount: counts[index],
            activeExam: 2 ,
            subject: item.subject,
            classId: item.class_id
        })
    });

    res.json({msg: 'sucess!', classData: resultData});
}