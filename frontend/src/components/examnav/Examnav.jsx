import Button from '../Button'
import { Movebutton } from '../Movebutton';
import Timer from './Timer'
import {useState, useEffect} from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';


function Examnav({timeStart, setFinish, socket, studentData, duration}) {

  const navigate = useNavigate()

 
  const [time, setTime] = useState(new Date());
  
  useEffect(() => {
    console.log(duration);
    // Set expiry time to current time + duration minutes
    const newTime = new Date();
    newTime.setHours(newTime.getHours() + Math.floor(duration / 60));
    newTime.setMinutes(newTime.getMinutes() + (duration % 60));
    setTime(newTime);
  }, []); // Add duration as dependency to re-run if duration changes
  

  function finishExam() {

    if(socket != null) {
      socket.emit("identify", {
        event: "student-submit",
        rollNo: studentData.rollNo,
        examId: studentData.examId,
      });
    }

    navigate('/check')
  }

  return (
    <div className='flex justify-between items-center h-full'>
      {/* the label -exam name will be updated later -note */}
      <Button label='CST-303 Operating system' buttonClass={'text-white bg-[#3141f3] rounded-sm border-[#A8FF53] '} />

      <div className="flex-grow flex justify-center mx-auto">
        <Timer expiryTimestamp={time} timeStart={timeStart} />
      </div>

     
      {/* <Button label='finish exam' buttonClass={' glow-on-hover text-white w-[150px] bg-blue-500'} 
      action={()=>navigate('/check')}/> */}
      <Movebutton label='finish exam' action={() => {navigate('check')}} extraStyleP={' translate-y-[1px]'} direction={'right'} extraStyleDiv={' bg-[#F43F5E] outline max-w-[140px] rounded-[3px] hover:bg-[#F51D42]'}/>


    </div>
  )
}

export default Examnav