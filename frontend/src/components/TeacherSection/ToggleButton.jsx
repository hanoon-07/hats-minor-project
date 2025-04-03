import React, { useState } from 'react'
import { motion } from 'framer-motion';

export const ToggleButton = ({label, status, setStatus, socket, examId}) => {
    

    function changeStatus() {
        let tempStatus = status; 
        setStatus(!status);
        if(socket != null) {
            // console.log('test');
            socket.emit("identify", {
                examId: examId,
                event: 'invert-wait-status',
                waitStatus: !tempStatus
            });      
        }   
    }

    return (
        <div className='flex flex-col gap-2'>
            <p className={`${status?"text-[#a8ff53]": "text-[#f43f5e]"}`}>{label+` current status: ${status?' allow':'do not allow'}`}</p>
            <div onClick={changeStatus} className={`outer relative w-[65px] h-[30px] rounded-sm ${status?"bg-[#243513]": "bg-[#581923]"} outline-1 outline ${status?"outline-[#5a8234]":"outline-[#992a3c]"}`}>
            <motion.div initial={{left: status?2:37}} animate={{left: status?2:37}} transition={{duration: 0.2}} className={`inner absolute top-[2px] left-[2px] h-[26px] w-[26px] rounded-sm ${status?"bg-[#a8ff53]": "bg-[#f43f5e]"}`}></motion.div>
            </div>
        </div>
    )
}
