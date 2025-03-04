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
        activeExam: 1//will change later
    }
}

export {getClassesDb, getClassCountDB, createClassDB}