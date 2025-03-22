import React, { useState } from 'react'
import axios from 'axios'
import { motion } from 'framer-motion'
import {LoadingRing} from '../animation/LoadingRing'

export const StartWindow = ({selectedExam, setShowStartExam, setNewState}) => {

    const [loading, setLoading] = useState(false);

    async function startExam() {

        setLoading(true);
        try {
            const response = await axios.post("http://localhost:3000/changeExamStatus", {
                examId: selectedExam,
                status: "active"
            });
        } catch(error) {
            console.log(error);
        } finally {

        }
        setLoading(false);
        setShowStartExam(false);
        setNewState((prev) => !prev);
    }


    return (
        <div className='h-screen w-screen absolute top-0 left-0 grid place-content-center bg-black/50 backdrop-blur-[5px] z-40'>
            {loading && <LoadingRing />}
            <motion.div initial={{y: -10}} animate={{y: 0}} className='h-[170px] w-[70%] md:w-[400px] flex flex-col gap-6 bg-[#15171A] items-center justify-center rounded-sm outline outline-1 outline-[#272A2E]'>
                <p className='text-[#A8FF53] text-lg font-medium'>are you sure, start this exam?</p>
                <div className='flex flex-row gap-7'>
                    <button onClick={() => {startExam();}} className='bg-[#A8FF53] px-2 py-[2px] rounded-sm'>yes, start</button>
                    <button onClick={() => {setShowStartExam(false);}} className='bg-[#F43F5E] px-2 py-[2px] rounded-sm'>no, cancel</button>   
                </div>
            </motion.div>
        </div>
    )
}
