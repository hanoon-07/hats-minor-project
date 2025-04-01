import pool from '../config/db.js';

export const getAllClassesDetails = async (studentId) => {
    try {
        const result = await pool.query(
            `SELECT c.*
             FROM classroom c
             JOIN class_Students cs ON c.class_id = cs.class_id
             WHERE cs.student_id = $1;`,
            [studentId]
        );

        if (result.rowCount === 0) {
            return { msg: 'No classes found for this student' };
        }

        return result.rows;
    } catch (error) {
        console.error("Database error:", error);
        return { msg: 'Error fetching classes', error };
    }
};


export const storeClass = async (studentId, classCode) => {
    try {
        // Convert studentId to an integer if necessary
        studentId = parseInt(studentId, 10);
        
        if (isNaN(studentId)) {
            return { msg: "Invalid student ID" };
        }

        // Query for class_id using classCode
        const classResult = await pool.query(
            "SELECT class_id FROM classroom WHERE unique_code = $1",
            [classCode] // Keep classCode as a string
        );

        if (classResult.rowCount === 0) {
            return { msg: "Error! Class not found" };
        }

        const classId = classResult.rows[0].class_id;

        // Insert student into Class_Students with the correct classId
        const insertResult = await pool.query(
            "INSERT INTO class_students (student_id, class_id, joined_at) VALUES ($1, $2, CURRENT_DATE) RETURNING *",
            [studentId, classId]
        );

        return { msg: "Student added to class successfully", data: insertResult.rows[0] };
    } catch (error) {
        console.error("Error storing class:", error);
        return { msg: "Database error", error };
    }
};


export const someClassInfo = async (studentId) => {
    try {
        const result = await pool.query(
            `SELECT c.class_id, c.name, c.unique_code, c.created_at, c.subject,
                    u.name as teacher_name, u.email as teacher_email
             FROM classroom c
             JOIN class_students cs ON c.class_id = cs.class_id
             JOIN "User" u ON c.teacher_id = u.user_id
             WHERE cs.student_id = $1
             LIMIT 3;`,
            [studentId]
        );

        if (result.rowCount === 0) {
            return { msg: 'No classes found for this student' };
        }

        return result.rows;
    } catch (error) {
        console.error("Database error:", error);
        return { msg: 'Error fetching classes', error };
    }
};


