
import app from "./app.js";
import { createServer } from "http";
import { Server } from "socket.io"
import dotenv from 'dotenv'

const PORT = process.env.port || 3000;
dotenv.config();

const server = createServer(app);
const io = new Server(server, {
    cors: {
        origin: process.env.FRONTEND_URL, // Allow frontend
        methods: ["GET", "POST"],
        credentials: true
    }
});

//following code the websocket implementation for the online exam, (apply ws: before the backend url inorder to connect with the socket)
//global array to tracp the current exams
//after the presentation the activeExams data will be moved to the database
const activeExams = [];

io.on("connection", (socket) => {
    //console.log(`Client connected: ${socket.id}`);

    socket.on('identify', (data) => {
        if (data.userType === "teacher") {
            let examId = data.examId;
            const examData = activeExams.find(exam => exam.examId === examId);
            if (examData) {
                examData.teacherSocket = socket.id;
                socket.emit("exam-status", { examData });
                socket.emit("student-pause", { waitStatus: examData.waitingStudents });
                //console.log('hello');
            } else {
                //console.log("Teacher active - no exam related!");
            }
        } else if(data.event == 'invert-wait-status') {
            let examId = data.examId;
            const examData = activeExams.find(exam => exam.examId === examId);
            if (examData) {
                
                examData.waitStatus = data.waitStatus;
                //console.log('wait status is changed! ', examData.waitStatus);
            }
        } else if(data.event == 'student-submit') {
            const {examId, rollNo } = data;
            const examData = activeExams.find(exam => exam.examId == examId);

            if(examData) {
                let studentInfo = examData.studentsInfo.find(student => student.rollNo === rollNo);
                studentInfo.status = "submit";
                io.to(examData.teacherSocket).emit("exam-status", {examData})
            }
            
        } else if(data.event == 'stop-exam') {
            const {examId} = data;
            const examData = activeExams.find(exam => exam.examId == examId);
            //console.log('test data');
            //console.log(examData);
            if(examData) {
                if(examData.studentsInfo) {
                    examData.studentsInfo.forEach((student) => {
                        //console.log('sending to student');
                        io.to(student.socketId).emit('exam-end', {
                            msg: 'exam-over!'
                        });
                    });
                }
            }
        } 
        else if (data.userType === "student") { 
            let examId = data.examId;
            
            let rollNo = data.rollNo;
            const examData = activeExams.find(exam => exam.examId == examId);
            // console.log(examData);
            if (!examData || examData.waitStatus == false) { //do not allow if teacher set the do not allow new students
                console.log("Error: No such active exam!");
                return;
            }

            let studentInfo = examData.studentsInfo.find(student => student.rollNo === rollNo);

            if (studentInfo) {
                //console.log("Student reconnected!");
                studentInfo.socketId = socket.id;
                studentInfo.status = "active";
                //const currentTime = new Date();
                //const startTime = new Date(studentInfo.startTime);
                studentInfo.startTime = new Date();
                const elapsedTime = studentInfo.timeConsumed; // Convert to minutes
                const remainingTime = examData.duration - elapsedTime;
                //console.log(remainingTime);

                if (remainingTime > 0) {
                    socket.emit("exam-status", { validity: examData.waitStatus });
                } else {
                    socket.emit("exam-over", { msg: "Exam is over!" });
                }
            } else {
               
                studentInfo = {
                    socketId: socket.id,
                    rollNo,
                    startTime: new Date(),
                    endTime: null,
                    status: "active", //it can be completed also
                    timeConsumed: 0
                };
                examData.studentsInfo.push(studentInfo);
                //console.log("New student joined the exam. ", studentInfo);
                //console.log(examData.waitStatus);
                socket.emit("exam-status", { validity: examData.waitStatus });
            }
            io.to(examData.teacherSocket).emit("exam-status", {examData})
        } 
        
    });

    socket.on("exam-cheat", (data) => {
        const {examId, rollNo, type} = data;
        const examData = activeExams.find(exam => exam.examId == examId);
       
        if (examData) { 
            const exists = examData.waitingStudents.some(student => student.rollNo === rollNo);
            if (!exists) {
                examData.waitingStudents.push({ rollNo, type });
                console.log(examData.waitingStudents);
                io.to(examData.teacherSocket).emit("student-pause", { waitStatus: examData.waitingStudents });
            }
        }
    }); 

    socket.on("start-exam", (data) => {
        const { examId, duration } = data;
        const newExam = {
            examId,
            startTime: new Date(),
            duration,
            studentsInfo: [],
            teacherSocket: socket.id,
            waitStatus: true, //students can join
            waitingStudents: []
        };
        activeExams.push(newExam);
        //console.log("Exam started:", newExam);
    });

    socket.on("remove-waiting", (data) => {
        const {examId, rollNo} = data;
        const examData = activeExams.find(exam => exam.examId == examId);
        examData.waitingStudents = examData.waitingStudents.filter((student) => student.rollNo != rollNo);
        socket.emit("student-pause", { waitStatus: examData.waitingStudents });
    
        const waitingStudent = examData.studentsInfo.find((temp) => temp.rollNo == rollNo);
        io.to(waitingStudent.socketId).emit('continue-exam', {
            msg: 'sucess!'
        });
    });

    socket.on("disconnect", () => {
        let studentInfo = null;
        let teacherSocketId = null;
        var examRelated = null;
        activeExams.forEach(exam => {
            const foundStudent = exam.studentsInfo.find(student => student.socketId === socket.id);
            if (foundStudent) {
                studentInfo = foundStudent;
                teacherSocketId = exam.teacherSocket;
                examRelated = exam;
                return;
            }
        });

        if (studentInfo) {
            const timeNow = new Date();
            var diffMin = Math.floor((timeNow - studentInfo.startTime) / 60000);
            studentInfo.timeConsumed = studentInfo.timeConsumed += diffMin;
            studentInfo.status != 'submit'?studentInfo.status = "not-joined": null;
            //console.log(`Student ${studentInfo.rollNo} disconnected and time recorded is ${studentInfo.timeConsumed}.`);
            if(examRelated) {
                var examData = examRelated;
                io.to(teacherSocketId).emit("exam-status", {examData});
            }
        }
    });
});

//app routes to update the exam details 
app.post("/addExam", (req, res) => {
    const data = req.body;
    const { examId, duration } = data;
    const newExam = {
        examId,
        startTime: new Date(),
        duration,
        studentsInfo: [],
        waitStatus: true,
        waitingStudents: []
    };
    activeExams.push(newExam);
    //console.log("Exam started:", newExam);
    res.json({
        msg: 'successfull!'
    });
});


app.post("/removeExam", (req, res) => {
    const data = req.body;
    
    res.json({
        msg: 'successfull!'
    });
});


server.listen(PORT, () => {
    console.log(`Server started at port ${PORT}`);
});



