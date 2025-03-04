import { getClassesDb, getClassCountDB, createClassDB } from "../models/teacherModel.js";

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

    //console.log(data);
    //console.log(counts);
    const resultData = [];
    data.map((item, index) => {
        resultData.push({
            className: item.name,
            studentCount: counts[index],
            activeExam: 2 //will be calculated and changed later
        })
    });

    res.json({msg: 'sucess!', classData: resultData});
}