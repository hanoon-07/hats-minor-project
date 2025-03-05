import React, { useState } from 'react'
import { Movebutton } from '../Movebutton';
import { motion } from 'framer-motion';

export const ClassroomCreate = ({setData, setOpenClassCreator, teacherId}) => {

    const studentCounts = [40, 80, 100];
    const [countSelected, setCountSelected] = useState(0);
    const [countValue, setCountValue] = useState(studentCounts[countSelected]);
    const [subject, setSubject] = useState('');
    const [className, setClassName] = useState('');
    const [errorMsg, setErrorMsg] = useState('');

    function handleSubjectName(e) {
        setSubject(e.target.value);
        // console.log(subject)
    }

    function handleClassName(e) {
        setClassName(e.target.value);
        //console.log(className);
    }

    function setMaxCount(value) {
        setCountValue(value);
    }

    function setCustomCount(e) {
        if(e.target.value.length == 0) return;
        setCountValue(e.target.value);
        setCountSelected(-1);
    }
    
    function handleSubmit() {
        if(subject.length == 0) {
            setErrorMsg('subject name invalid!');
            return;
        } else if(className.length == 0) {
            setErrorMsg('classname invalid!');
            return;
        } else if(countValue == null) {
            setErrorMsg('invalid max count!');
            return;
        } else {
            setErrorMsg('');
            setData({className: className, subject: subject, maxCount: countValue, teacherId: teacherId});
            setOpenClassCreator(false);
            
        }
    }

    return (
        <div className='h-screen absolute top-0 left-0 w-screen grid place-content-center bg-black/70 backdrop-blur-md z-10 '>
            <motion.div initial={{y: -10, opacity: 0.7}} transition={{ease: 'linear', duration: 0.2}} animate={{y: 0, opacity: 1}} className='md:w-[600px]  bg-[#1a1b1f] w-[400px]  rounded-sm outline outline-1 outline-[#212327] flex flex-col p-4 gap-4'>
                <div className='flex flex-row gap-4 items-center'>
                    <h2 className='text-[#c1c4c7] text-lg w-[20%]'>class name</h2>
                    <input onChange={(e) => {handleClassName(e);}} value={className} className='text-[#A8FF53] bg-[#272a2e] w-full box-border px-2 py-1 outline outline-1 outline-[#212327] rounded-sm'/>
                </div>
                <div className='flex flex-row gap-4 items-center'>
                    <h2 className='text-[#c1c4c7] text-lg w-[20%]'>subject</h2>
                    <input onChange={(e) => {handleSubjectName(e);}} value={subject} className='text-[#A8FF53] w-full bg-[#272a2e] box-border px-2 py-1 outline outline-1 outline-[#212327] rounded-sm'/>
                </div>

                <div className='flex flex-col gap-4'>
                    <h2 className='text-[#c1c4c7] text-md w-[40%]'>maxmimum no of students</h2>
                    <div className='flex flex-row gap-10'>
                        <div className='flex flex-row gap-2'>
                            {studentCounts.map((item, index) => {
                                return <div onClick={() => {setCountSelected(index); setMaxCount(item);}} className={`${index == countSelected?"bg-[#A8FF53]":"bg-[#15171a] hover:bg-[#272a2e]"} cursor-pointer  grid place-content-center w-[30px] h-[30px] rounded-sm  outline outline-1 outline-gray`}>
                                    <p className={`text-[#c1c4c7] ${index == countSelected?"text-[black]":null}`}>{item}</p>
                                </div>
                            })}
                        </div>

                        <div className='flex flex-row gap-4 items-center'>
                            <h2 className='text-[#c1c4c7] text-sm w-[20%]'>custom</h2>
                            <input onChange={setCustomCount} value={countValue} type='number' placeholder='00' className='text-[#A8FF53] ml-2 w-[100px] bg-[#272a2e] box-border px-2 py-1 outline outline-1 outline-[#212327] rounded-sm'/>
                        </div>
                    </div>

                </div>    

                <div className='flex flex-row gap-4'>
                    <Movebutton action={() => {handleSubmit()}} label={'create class'} extraStyleDiv={' rounded-sm max-w-[200px] '}/>
                    <Movebutton  action={() => {setData(null); setOpenClassCreator(false)}} label={'cancel'} extraStyleDiv={' rounded-sm max-w-[200px] '} direction={'left'}/>        
                </div>

                {errorMsg.length != 0 && <>
                    <p className='text-[#f43f5e]'>{errorMsg}</p>
                </>}
            </motion.div>
        </div>
    )
}
