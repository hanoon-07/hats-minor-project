import React, { useState } from 'react'
import { useEffect } from 'react';
import { useTimer } from 'react-timer-hook';
import { Clock } from "lucide-react";
import { useNavigate } from 'react-router-dom';


function Timer({ expiryTimestamp, timeStart, report }) {

  const navigate = useNavigate()
  const {
    seconds,
    minutes,
    hours,
    isRunning,
    start,
    pause,
    resume,
    restart,
    expired,
  } = useTimer({
    expiryTimestamp,
    onExpire: ()=>{
        navigate('check')
        

    },
    autoStart: false,
  });

  const [prev, setPrev] = useState('init');

  useEffect(() => {
    if(report) {
      
      setPrev('second');
      pause();
    
    } else {
      if(prev != 'init') {
        resume();
      }
    }
  }, [report]);

  useEffect(() => {
    restart(expiryTimestamp);
  }, [expiryTimestamp]);

  useEffect(() => {
    if (timeStart) { start() }
    else { pause() }

  }, [timeStart, start, pause]);


  return (
    <div>
      <p className='text-white bg-darkGray rounded-md px-2 py-1 flex gap-2 items-center'>
        <Clock className="w-5 h-5 text-[#77e10c]" />
        {hours}h {minutes}m {seconds}s
      </p>
    </div>
  );


}

export default Timer
