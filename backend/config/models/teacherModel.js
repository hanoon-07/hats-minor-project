import pool from '../config/db.js'

// const getClassesDB = async (teacherId) => {
//     const response = await pool.query();
//     return response.rows;
// }

const getClassesDb = async (teacherId) => {
    const response = await pool.query("select * from classroom where teacher_id = $1", [teacherId]);
    return response.rows;
}

const getClassCountDB = async (class_id) => {
    const response = await pool.query("select count(*) from class_students where class_id = $1", [class_id]);
    //console.log(response.rows);
    return response.rows[0];
}

const createClassDB = async (teacherId, className , maxCount, subjectName) => {
    const response3 = await pool.query("select * from classroom where name = $1 and teacher_id = $2", [className, teacherId]);
    if(response3.rowCount > 0) {
        return {error: 'duplicate class!'}
    }
    const response1 = await pool.query("SELECT gen_random_uuid()");
    //console.log(response.rows);
    const uniqCode = response1.rows[0].gen_random_uuid.split("-")[0];
    //console.log(uniqCode);
    const response2 = await pool.query("insert into classroom(name, unique_code, created_at, teacher_id, subject, capacity) values($1, $2, now(), $3, $4, $5)", [className, uniqCode, teacherId, subjectName, maxCount])  
    const response4 = await pool.query("select * from classroom where name = $1 and teacher_id = $2", [className, teacherId]);
    return {
        className: className,
        studentCount: 0,
        activeExam: 1,
        newClassId: response4.rows[0].class_id
    }
}

const getClassCodeDB =  async (classId) => {
    //console.log(classId);
    const response = await pool.query("select unique_code from classroom where class_id  = $1", [classId]);
    //console.log(response);
    return response.rows[0];
}

const getClassStudentsDB = async (classId) => {
    const response = await pool.query(`select * from class_students inner join student_info on class_students.student_id = student_info.student_id inner join "User" on student_info.student_id = "User".user_id where class_students.class_id = $1`, [classId]);
    
    return response.rows;
}

const getClassExamsDB = async (classId) => {
    const response = await pool.query(`select * from exam where class_id = $1`, [classId]);
    //console.log(response.rows);
    return response.rows;
}

const changeExamStatusDB = async(examId, status) => {
    const response = await pool.query("update exam set active = $1 where exam_id = $2", [status, examId]);
    return {
        msg: "sucess!"
    }
}

const getExamDetailDB = async(examId) => {
    const response = await pool.query("select * from exam where exam_id = $1", [examId]);
    return response.rows[0];
}

export {getClassExamsDB ,getClassesDb, getClassCountDB, createClassDB, getClassCodeDB, getClassStudentsDB, getExamDetailDB, changeExamStatusDB}