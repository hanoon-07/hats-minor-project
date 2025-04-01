import pool from '../config/db.js';

const getExamDetails =  async (examdId) => {
    const result = await pool.query("select * from exam join question on exam.exam_id = question.exam_id where exam.exam_id = $1", [examdId]);
    if(result.rowCount == 0) {
        return {msg: 'error! no exam found with this id'}
    }
    return result.rows;
}

const storeExam = async (examDetails, classId) => {
    //check already exist or not
    const result1 = await pool.query("select * from exam where name = $1 and class_id = $2;", [examDetails.examName, 1]); // exam name
    
    //console.log(result1.rows);
    if(result1.rowCount > 0) {
        return {msg: 'duplicate exam!'}
    } else {
        var duration = 0;
        duration += (parseInt(examDetails.duration.hours) * 60);
        duration += (parseInt(examDetails.duration.minutes));
        const result2 = await pool.query("insert into exam(class_id, name, created_at, duration, active) values($1, $2, $3, $4, $5)", [classId,examDetails.examName , "now()", duration, "upcoming"]); //creatin the exam with the class id =1
        const result3 = await pool.query("select exam_id from exam where name = $1 and class_id = $2;", [examDetails.examName, classId]);
        //console.log(result3.rows);
        //console.log(result1);
        //console.log(result2);
        let new_exam = parseInt(result3.rows[0].exam_id);
        //now insert all the questions into the question table
        var supportLang = "";
        for(let j = 0;j < examDetails.languages.length;j++) {
            if(j == 0) supportLang += examDetails.languages[j];
            else supportLang += (" "+examDetails.languages[j]);
        }
        for(let i = 0;i < examDetails.questions.length;i++) {
            //console.log("hello");
            const question = examDetails.questions[i];
            let qName = question.questionName;
            let desc = question.description;
            var constraintStr = "";
            for(let j = 0;j < question.constraintCases.length;j++) {
                if(j == 0) {
                    constraintStr += question.constraintCases[j].input;
                } else {
                    constraintStr += ("\r"+question.constraintCases[j].input);
                }
            }
            var inputStr = "";
            var outputStr = "";
            for(let j = 0;j < question.testCases.length;j++) {
                if(j == 0) {
                    inputStr += question.testCases[j].input;
                    outputStr += question.testCases[j].output;
                } else {
                    inputStr += ("\\r"+question.testCases[j].input);
                    outputStr += ("\\r"+question.testCases[j].output);
                }
            }
            //console.log(inputStr);
            //console.log(outputStr);
            pool.query("insert into question(name, description, constraints, test_inputs, test_outputs, support_langs, exam_id) values($1, $2, $3, $4, $5, $6, $7);", [qName, desc, constraintStr, inputStr, outputStr, supportLang, new_exam]);
        }
        return result3.rows[0].exam_id;
    }
    
}

const getHeaders = async () => {
    const result = await pool.query("select exam_id, name from exam;");
    return result.rows;
}

const getExamsInClassDetails = async (class_id) => {
    const query = `
        SELECT exam_id, class_id, name, created_at, duration, active, created_at
        FROM exam
        WHERE class_id = $1;
    `;

    try {
        const { rows } = await pool.query(query, [class_id]);
        return rows;
    } catch (error) {
        console.error("Error fetching exam details:", error);
        throw error;
    }
};

const storeResults = async (results) => {
    const client = await pool.connect();
    const savedResults = [];
    
    try {
      await client.query('BEGIN');
      
      for (const result of results) {
        const { 
          student_id, 
          exam_id, 
          question_id, 
          partial_output, 
          testcases_passed, 
          total_testcases 
        } = result;
        
        const query = `
          INSERT INTO result (
            student_id,
            exam_id,
            question_id,
            partial_output,
            testcases_passed,
            total_testcases,
            submission_date
          ) VALUES ($1, $2, $3, $4, $5, $6, CURRENT_DATE)
          RETURNING result_id
        `;
        
        const values = [
          student_id,
          exam_id,
          question_id,
          partial_output,
          testcases_passed,
          total_testcases
        ];
        
        const { rows } = await client.query(query, values);
        savedResults.push(rows[0].result_id);
      }
      
      await client.query('COMMIT');
      return savedResults;
    } catch (error) {
      await client.query('ROLLBACK');
      console.error('Database error when saving results:', error);
      throw error;
    } finally {
      client.release();
    }
};


const fetchLatestExams = async (studentId) => {
    const query = `
        WITH latest_results AS (
            SELECT 
                result_id,
                exam_id
            FROM 
                result
            WHERE 
                student_id = $1
            ORDER BY 
                submission_date DESC, result_id DESC
            LIMIT 2
        )
        SELECT DISTINCT
            e.exam_id,
            e.class_id,
            e.name,
            e.created_at,
            e.duration,
            e.active
        FROM 
            latest_results lr
        JOIN 
            exam e ON lr.exam_id = e.exam_id;
    `;
    
    try {
        const result = await pool.query(query, [studentId]);
        
        return result.rows;
    } catch (error) {
        console.error("Error fetching latest exams for student:", error);
        throw error;
    }
};

const fetchPast6Average = async () => {
    try {
        const result = await pool.query(`
            WITH RecentExams AS (
                SELECT DISTINCT 
                    exam_id, 
                    submission_date::date as exam_date
                FROM result
                ORDER BY exam_date DESC
                LIMIT 6
            ),
            ExamAverages AS (
                SELECT 
                    r.exam_id,
                    re.exam_date,
                    AVG(
                        CASE 
                            WHEN r.total_testcases > 0 
                            THEN (r.testcases_passed::numeric / r.total_testcases) * 100
                            ELSE 0 
                        END
                    ) as average_score,
                    COUNT(DISTINCT r.student_id) as student_count
                FROM result r
                JOIN RecentExams re ON r.exam_id = re.exam_id
                GROUP BY r.exam_id, re.exam_date
            )
            SELECT 
                exam_id,
                exam_date,
                ROUND(average_score, 2) as average_score_percentage,
                student_count
            FROM ExamAverages
            ORDER BY exam_date DESC
        `);
        
        return result.rows;
    } catch (error) {
        console.error("Database error:", error);
        throw error;
    }
}

const stopExamDB = async(examId) => {
    //console.log(examId);
    const query = `update exam set active = 'past' where exam_id = $1`;
    try {
        await pool.query(query, [examId]);
        return true;
    } catch (error) {
        console.log('something went wrong! in stop exam!');
    }
}



export {getExamDetails, storeExam, getHeaders, getExamsInClassDetails, storeResults, fetchLatestExams, fetchPast6Average, stopExamDB};