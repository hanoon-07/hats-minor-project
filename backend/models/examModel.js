import pool from '../config/db.js';

const getExamDetails =  async (examdId) => {
    const result = await pool.query("select * from exam join question on exam.exam_id = question.exam_id where exam.exam_id = $1", [examdId]);
    return result.rows;
}

export {getExamDetails};