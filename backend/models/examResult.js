import pool from '../config/db.js';


export const getResultDB = async (examId) => {
    const result = {
        examId: examId,
        examName: null,
        present: null,
        total: null,
        classId: null,
        className: null,
        studentResultInfo: [],
    };

    try {
        
        const examQuery = await pool.query('SELECT name, class_id FROM exam WHERE exam_id = $1', [examId]);
        if (examQuery.rows.length > 0) {
            result.examName = examQuery.rows[0].name;
            result.classId = examQuery.rows[0].class_id;

            
            const classQuery = await pool.query('SELECT name FROM classroom WHERE class_id = $1', [result.classId]);
            if (classQuery.rows.length > 0) {
                result.className = classQuery.rows[0].name;
            }

            
            const totalStudentsQuery = await pool.query('SELECT COUNT(*) AS total FROM class_students WHERE class_id = $1', [result.classId]);
            result.total = parseInt(totalStudentsQuery.rows[0].total, 10);

            const presentStudentsQuery = await pool.query(
                `SELECT COUNT(DISTINCT result.student_id) AS present 
                 FROM class_students 
                 INNER JOIN result ON result.student_id = class_students.student_id 
                 WHERE class_students.class_id = $1 AND result.exam_id = $2`,
                [result.classId, examId]
            );
            result.present = parseInt(presentStudentsQuery.rows[0].present, 10);
            const studentResultsQuery = await pool.query(
                `SELECT 
                    s.student_id, s.roll_no, s.admission_no AS universityId, u.name,
                    COALESCE(r.partial_output, '-') AS partial_output,
                    COALESCE(r.testcases_passed, 0) AS testPassed,
                    COALESCE(r.total_testcases, 0) AS totalTestcases,
                    COALESCE(r.score, 0) AS score,
                    COALESCE(r.code_values, '[]') AS code_values,
                    r.exam_id
                FROM class_students cs
                INNER JOIN student_info s ON cs.student_id = s.student_id
                INNER JOIN "User" u ON s.student_id = u.user_id
                LEFT JOIN result r ON s.student_id = r.student_id AND r.exam_id = $1
                WHERE cs.class_id = $2`,
                [examId, result.classId]
            );
            
            result.studentResultInfo = studentResultsQuery.rows.map(row => ({
                present: row.exam_id !== null, 
                name: row.name,
                rollNo: row.roll_no,
                universityId: row.universityid,
                partialOutput: row.partial_output,
                testPassed: row.testpassed,
                totalTest: row.totaltestcases,
                score: row.score,
                codeValues: row.code_values ? row.code_values : [],
            }));
            
        }

        return result;
    } catch (error) {
        console.error('Something went wrong while fetching exam results:', error);
        return null;
    }
};

