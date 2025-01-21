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
      <Button label='CST-303 Operating system' buttonClass={' text-orange-500 hover:text-orange-400 bg-orangeButton'} />

      <div className="flex-grow flex justify-center mx-auto">
        <Timer expiryTimestamp={time} timeStart={timeStart} />
      </div>

     
      <Button label='finish exam' buttonClass={' text-white w-[150px] hover:text-red-400 bg-red-900'}/>


    </div>
  )
}

export default Examnav