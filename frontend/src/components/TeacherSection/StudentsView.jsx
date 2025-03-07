import React from 'react'
import { motion } from 'framer-motion';

export const StudentsView = ({studentData, setStudentInfo}) => {
    return (
        <motion.div  className='h-screen w-screen z-20 absolute top-0 left-0 grid place-content-center bg-black/45 backdrop-blur-[5px]'>
            <motion.div initial={{y: -10}} animate={{y: 0}} className='flex flex-col gap-2 rounded-sm outline outline-1 outline-[#212327] w-[350px] h-[500px] md:h-[500px] md:w-[700px] bg-[#1A1B1F]'>
                <button  onClick={() => {setStudentInfo(false);}} className=' self-end m-2 text-sm px-2 py-1 font-semibold hover:bg-[#CA314B] rounded-sm bg-[#F43F5E]'>close</button>
                <div className='md:flex md:flex-row hidden flex-col gap-2 px-2 ml-4'>
                    <p className='text-lg text-[#C1C4C7] font-normal'>Name</p>
                    <div className='w-[1px] h-[30px] hidden md:block bg-white'></div>
                    <p className='text-lg text-[#C1C4C7] font-normal'>Roll number</p>
                    <div className='w-[1px] h-[30px] hidden md:block bg-white'></div>
                    <p className='text-lg text-[#C1C4C7] font-normal'>University reg number</p>
                    <div className='w-[1px] h-[30px] hidden md:block bg-white'></div>
                    <p className='text-lg text-[#C1C4C7] font-normal'>Joined date</p>
                </div>

                <div className='py-2 max-h-full flex flex-col gap-4 box-border px-5 overflow-y-scroll'>
                    

                    {studentData.map((item, index) => {
                        //console.log(item);
                        return <div className='w-full flex justify-around md:items-center md:p-0 p-3 md:flex-row flex-col md:gap-0 gap-2 bg-[#15161A] md:min-h-[50px] rounded-sm outline outline-1 outline-[black]'>
                            <p className='text-white text-md font-normal'>{item.Name}</p>
                            <p className='text-[#A8FF53] text-md font-normal'>{item.RollNo}</p>
                            <p className='text-[#A8FF53] text-md font-normal'>{item.UniversityNum}</p>
                            <p className='text-[#474AA5] text-md font-normal'>{item.joinedAt}</p>
                       
                        </div>
                    })}

                </div>
            </motion.div>
        </motion.div>
    )
}
