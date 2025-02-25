import Button from '../Button'
import Timer from './Timer'
import {useState, useEffect} from 'react';
import { useSelector } from 'react-redux';


function Examnav({timeStart}) {

  let hrs = useSelector((state) => state['exam-data'].proposedTime)
 
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const newTime = new Date();
    newTime.setHours(newTime.getHours() + hrs);  
    setTime(newTime);

   
  }, [hrs,timeStart]);


  return (
    <div className='flex justify-between items-center h-full'>
      {/* the label -exam name will be updated later -note */}
      <Button label='CST-303 Operating system' buttonClass={' text-white hover:text-orange-400 bg-[#FF6136]'} />

      <div className="flex-grow flex justify-center mx-auto">
        <Timer expiryTimestamp={time} timeStart={timeStart} />
      </div>

     
      <Button label='finish exam' buttonClass={' text-white w-[150px] hover:text-red-400 bg-[#F51D42]'}/>


    </div>
  )
}

export default Examnav