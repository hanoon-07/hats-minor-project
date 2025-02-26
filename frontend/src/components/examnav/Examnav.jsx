import Button from '../Button'
import Timer from './Timer'
import {useState, useEffect} from 'react';
import { useSelector } from 'react-redux';


function Examnav({timeStart}) {

  let hrs = useSelector((state) => state['exam-data'].proposedTime)
 
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const newTime = new Date();
    // newTime.setHours(newTime.getHours() + hrs);
    newTime.setSeconds(newTime.getSeconds() + 60);
    
    setTime(newTime);

   
  }, [hrs,timeStart]);


  return (
    <div className='flex justify-between items-center h-full'>
      {/* the label -exam name will be updated later -note */}
      <Button label='CST-303 Operating system' buttonClass={'text-white bg-blue-500 border-[#A8FF53] '} />

      <div className="flex-grow flex justify-center mx-auto">
        <Timer expiryTimestamp={time} timeStart={timeStart} />
      </div>

     
      <Button label='finish exam' buttonClass={' glow-on-hover text-white w-[150px] bg-blue-500'}/>


    </div>
  )
}

export default Examnav