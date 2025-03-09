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
