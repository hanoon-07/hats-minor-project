import Button from '../Button'
import { Movebutton } from '../Movebutton';
import Timer from './Timer'
import {useState, useEffect} from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';


function Examnav({timeStart, setFinish}) {

  const navigate = useNavigate()

  let hrs = useSelector((state) => state['exam-data'].proposedTime)
 
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const newTime = new Date();
    // newTime.setHours(newTime.getHours() + hrs);
    newTime.setMinutes(newTime.getMinutes() + 25);
    
    setTime(newTime);

   
  }, [hrs,timeStart]);


  return (
    <div className='flex justify-between items-center h-full'>
      {/* the label -exam name will be updated later -note */}
      <Button label='CST-303 Operating system' buttonClass={'text-white bg-blue-500 border-[#A8FF53] '} />

      <div className="flex-grow flex justify-center mx-auto">
        <Timer expiryTimestamp={time} timeStart={timeStart} />
      </div>

     
      <Button label='finish exam' buttonClass={' glow-on-hover text-white w-[150px] bg-blue-500'} 
      action={()=>navigate('/check')}/>


    </div>
  )
}

export default Examnav