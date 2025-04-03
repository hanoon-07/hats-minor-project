import Button from '../Button'
import { Movebutton } from '../Movebutton';
import Timer from './Timer'
import {useState, useEffect} from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function finishExam(socket, studentData) {

  if(socket != null) {
    socket.emit("identify", {
      event: "student-submit",
      rollNo: studentData.rollNo,
      examId: studentData.examId,
    });
  }
 
}


function Examnav({timeStart, setFinish, socket, studentData, duration, report}) {

  const navigate = useNavigate()

 
  const [time, setTime] = useState(new Date());
  
  useEffect(() => {
    //console.log(duration);
    // Set expiry time to current time + duration minutes
    const newTime = new Date();
    newTime.setHours(newTime.getHours() + Math.floor(duration / 60));
    newTime.setMinutes(newTime.getMinutes() + (duration % 60));
    setTime(newTime);
  }, []); // Add duration as dependency to re-run if duration changes
  
  const [autoEnd, setAutoEnd] = useState(false);
  
  useEffect(() => {

    socket.on("exam-end", (data1) => {
        setAutoEnd(true);
        //console.log('auto end');
        setTimeout(() => {
          finishExam(socket, studentData);
          setAutoEnd(false);
          navigate('check');
        }, 3000);
    });
    
  }, []);
  

  return (<>
      {autoEnd && <div className="gap-10 h-screen w-screen z-40 grid place-content-center absolute top-0 left-0 bg-[#15171a]">
            <h1 className="text-[#c1c4c7] text-4xl">Exam stopped by the teacher ! auto submission in 3 seconds</h1>        
            <p className='text-center text-xl text-[#a8ff53]'>your response will be saved</p>
      </div>}
      <div className="flex justify-between items-center h-full">
        {/* the label -exam name will be updated later -note */}
        <Button
          label="CST-303 Operating system"
          buttonClass={"text-white bg-[#3141f3] rounded-sm border-[#A8FF53] "}
        />

        <div className="flex-grow flex justify-center mx-auto">
          <Timer expiryTimestamp={time} timeStart={timeStart} report={report} />
        </div>

        {/* <Button label='finish exam' buttonClass={' glow-on-hover text-white w-[150px] bg-blue-500'} 
      action={()=>navigate('/check')}/> */}
      <Movebutton label='finish exam' action={() => {navigate('check/result'); finishExam(socket, studentData)}} extraStyleP={' translate-y-[1px]'} direction={'right'} extraStyleDiv={' bg-[#F43F5E] outline max-w-[140px] rounded-[3px] hover:bg-[#F51D42]'}/>


    </div>
    </>
  )
}

export default Examnav