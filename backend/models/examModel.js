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

export {getExamDetails, storeExam, getHeaders};