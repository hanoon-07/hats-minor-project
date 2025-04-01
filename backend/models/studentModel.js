import pool from '../config/db.js';

export const getStudentDetails = async (studentId) => {
    try {
        const query = `
            SELECT 
                s.roll_no, 
                s.university, 
                s.admission_no, 
                u.name, 
                u.email
            FROM student_info s
            JOIN "User" u ON s.student_id = u.user_id
            WHERE s.student_id = $1
        `;
        const result = await pool.query(query, [studentId]);

        if (result.rowCount === 0) {
            return { msg: "Student not found", data: null };
        }

        return { msg: "Student found", data: result.rows[0] };
    } catch (error) {
        console.error("Error fetching student info:", error);
        return { msg: "Database error", error };
    }
};

export const getStudentResults = async (studentId, examId) => {
    try {
        const result = await pool.query(
            "SELECT * FROM result WHERE student_id = $1 AND exam_id = $2",
            [studentId, examId]
        );
        return result.rows;
    } catch (error) {
        console.error("Database error:", error);
        throw error;
    }
};


export const fetchPast6Scores = async (studentId) => {
    try {
        const result = await pool.query(`
            WITH ExamScores AS (
                SELECT 
                    exam_id,
                    submission_date::date as exam_date,
                    SUM(testcases_passed) as total_passed,
                    SUM(total_testcases) as total_testcases,
                    CASE 
                        WHEN SUM(total_testcases) > 0 
                        THEN ROUND((SUM(testcases_passed)::numeric / SUM(total_testcases)) * 100, 2) 
                        ELSE 0 
                    END as score_percentage
                FROM result
                WHERE student_id = $1
                GROUP BY exam_id, submission_date::date
                ORDER BY submission_date DESC
                LIMIT 6
            )
            SELECT 
                exam_id,
                exam_date,
                total_passed,
                total_testcases,
                score_percentage
            FROM ExamScores
            ORDER BY exam_date DESC
        `, [studentId]);
        
        return result.rows;
    } catch (error) {
        console.error("Database error:", error);
        throw error;
    }
};