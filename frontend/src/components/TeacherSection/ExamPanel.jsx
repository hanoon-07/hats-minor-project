import axios, { getAdapter } from 'axios';
import React, { useEffect, useState } from 'react'
import { selectClassId } from '../../redux/classSelector';
import { useSelector } from 'react-redux';
import { LoadingRing } from '../animation/LoadingRing'

export const ExamPanel = ({examId = 22}) => {
    
    const classId = useSelector(selectClassId);
    const [examName, setExamName] = useState('--------');
    const [duration, setDuration] = useState('0000');
    const [loading, setLoading] = useState(false);
    const [studentData, setStudentData] = useState([]);

    async function getFullData() {
        setLoading(true);
        try {
            const response = await axios.get("http://localhost:3000/getExamData/", {
                params: {examId: examId}
            });
            setExamName(response.data.examData.name);
            setDuration(response.data.examData.duration);
            const response1 = await axios.get("http://localhost:3000/getClassStudents", {
                params: {classId: classId}
            })
            //console.log(response1.data)
            var tempArr = [];
            response1.data.map((item) => {
                tempArr.push({
                    rollNo: item.roll_no,
                    status: 'not-joined'
                });
            });
            setStudentData(tempArr);
        } catch(error) {
            console.log(error);
        } finally {
            setLoading(false);   
        }
    }
    


    useEffect(() => {
        //console.log("examid: "+examId);
        //select exam name, duration , 
        //connect to the web socket provided by the backend, inform this as the teacher
        //console.log(classId);
        
        async function getFullData() {
            setLoading(true);
            try {
                const response = await axios.get("http://localhost:3000/getExamData/", {
                    params: {examId: examId}
                });
                setExamName(response.data.examData.name);
                setDuration(response.data.examData.duration);
                const response1 = await axios.get("http://localhost:3000/getClassStudents", {
                    params: {classId: classId}
                })
                //console.log(response1.data)
                var tempArr = [];
                response1.data.map((item) => {
                    tempArr.push({
                        rollNo: item.roll_no,
                        status: 'not-joined'
                    });
                });
                setStudentData(tempArr);
            } catch(error) {
                console.log(error);
            } finally {
                setLoading(false);   
            }
        }
        
        // [
        //     {
        //       "student_id": "22",
        //       "class_id": "45",
        //       "joined_at": "2025-03-07T18:30:00.000Z",
        //       "roll_no": 43,
        //       "university": "KTU",
        //       "admission_no": "KNR22CS043",
        //       "user_id": 22,
        //       "name": "hanoon",
        //       "email": "han@gmail.com",
        //       "password": "12345",
        //       "role": "student"
        //     }
        // ]

        getFullData();

    }, []);
    
    return (
        <div className='h-full w-full bg-[#15171A]'>
            {loading && <LoadingRing />}
            <div className='head-section flex flex-col gap-1 pt-10 pl-10'>
                <h1 className='text-[#C1C4C7] font-bold text-3xl'>{examName}</h1>
                <div className='flex flex-row gap-2 items-center'>
                    <p className='text-[#C1C4C7] font-normal text-lg'>duration</p>
                    <p className='text-[#474AA5] font-medium'>{duration}</p>
                </div>
                <div className="border-t-2 border-dashed border-gray-500 mt-4 mr-10"></div>
            </div>

            <div className='flex flex-col gap-2 px-10 pt-5'>
                <p className='text-[#A8FF53] font-normal text-md pb-2'>colors meaning</p>
                <div className='flex flex-row gap-3'>
                    <div className='h-[30px] w-[30px] rounded-full bg-[#A8FF53] grid place-content-center'>
                        
                    </div>
                    <p className='text-[#C1C4C7]'>on exam</p>
                </div>

                <div className='flex flex-row gap-3'>
                    <div className='h-[30px] w-[30px] rounded-full bg-[#5F97F3] grid place-content-center'>
                        
                    </div>
                    <p className='text-[#C1C4C7]'>completed</p>
                </div>

                <div className='flex flex-row gap-3'>
                    <div className='h-[30px] w-[30px] rounded-full bg-[#F43F5E] grid place-content-center'>
                        
                    </div>
                    <p className='text-[#C1C4C7]'>not joined</p>
                </div>
            </div>

            <div className='mx-10'>
                <div className='flex flex-row w-full justify-end gap-2'>
                    <div className='flex flex-row gap-2 items-center'>
                        <div className='h-[24px] w-[24px] rounded-full bg-[#A8FF53] grid place-content-center'>
                            <p className='text-black font-normal'>0</p>
                        </div>
                        <p className='text-[#C1C4C7] '>on exam</p>
                    </div>

                    <div className='flex flex-row gap-2 items-center'>
                        <div className='h-[24px] w-[24px] rounded-full bg-[#5F97F3] grid place-content-center'>
                            <p className='text-black font-normal'>0</p>
                        </div>
                        <p className='text-[#C1C4C7] '>completed</p>
                    </div>

                    <div className='flex flex-row gap-2 items-center'>
                        <div className='h-[24px] w-[24px] rounded-full bg-[#F43F5E] grid place-content-center'>
                            <p className='text-black font-normal'>0</p>
                        </div>
                        <p className='text-[#C1C4C7] '>not joined</p>
                    </div>

                    
                </div>

                <div className='box-border  my-4 flex flex-col gap-0 w-full  bg-[#1B1D1F] rounded-sm outline outline-1 outline-[#1f2124]'>
                        <div className='flex flex-row gap-2 flex-wrap max-h-[150px] h-[150px] overflow-y-scroll p-2 content-start'>
                            

                            {studentData.map((item) => {
                                return <>
                                    {item.status == 'not-joined' &&
                                    <div className='h-[30px] w-[30px] rounded-full bg-[#F43F5E] grid place-content-center'>
                                        <p className='text-black font-semibold'>{item.rollNo}</p>
                                    </div>
                                    }
                                    {/* <div className='h-[30px] w-[30px] rounded-full bg-[#5F97F3] grid place-content-center'>
                                        <p className='text-black font-semibold'>4</p>
                                    </div>
                                    <div className='h-[30px] w-[30px] rounded-full bg-[#A8FF53] grid place-content-center'>
                                        <p className='text-black font-semibold'>14</p>
                                    </div> */}
                                </>
                            })}

                        </div>

                        <div className='pl-2 w-full box-border text-sm bg-[#15171A] max-h-[30px] overflow-y-scroll flex flex-col'>
                            <p className='py-1 font-light text-[#A8FF53]'>nothing to display</p>
                        </div>
                        
                </div>
                
            </div>
            <div className="border-t-2 border-dashed border-gray-500 mt-8 mr-10 ml-10"></div>
        
            <div className='flex flex-row w-full px-10 mt-4 gap-2'>
                <button className='bg-[#5F97F3] px-2 py-[2px] rounded-sm'>stop waiting</button>
                <button className='bg-[#F43F5E] px-2 py-[2px] rounded-sm'>stop exam</button>
            </div>

            <div className='w-full flex flex-col gap-2 px-10 mt-6'>
                <p className='text-[#5F97F3] font-normal'>after you click stop waiting new students can’t join exam</p>
                <p className='text-[#F43F5E] font-normal'>stop exam will stop the exam for every active student participating in the current exam</p>
            </div>
        </div>
    )
}
