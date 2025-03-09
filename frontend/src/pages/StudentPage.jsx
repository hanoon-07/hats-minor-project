import React, { useEffect, useState } from 'react'
import { TeacherNavBar } from '../components/TeacherSection/TeacherNavBar'
import { motion } from 'framer-motion';
import axios from 'axios';
import { ExamDisplay } from '../components/ExamDisplay';
import { JoinClassButton } from '../components/JoinClassButton';
import StudentProfile from '../components/StudentProfile';
import { LoadingRing } from '../components/animation/LoadingRing';
import { useParams } from 'react-router-dom';

export const StudentPage = () => {

    const { studentId } = useParams();

    const [modalWindow, setModalWindow] = useState(false)
    const [selected, setSelected] = useState('classes')

    const [data, setData] = useState([])
    const [classId, setClassId] = useState(0)

    const [classCode, setClassCode] = useState('')

    const [studentData, setStudentData] = useState('')

    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const getStudentDetails = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/studentInfo?studentId=${studentId}`);
                setStudentData(response.data)
                setLoading(false)
            } catch (error) {
                console.error("Error fetching class details:", error);
            }
        };
        getStudentDetails();
    }, [studentId])

    useEffect(() => {
        const getAllClassDetails = async () => {
            try {
                setLoading(true)
                const response = await axios.get(`http://localhost:3000/allClassInfo?studentId=${studentId}`);
                setData(response.data || [])
                setLoading(false)
            } catch (error) {
                console.error("Error fetching class details:", error);
            }
        };
        getAllClassDetails();
    }, [studentId]);

    const handleJoinClass = async () => {
        try {
            setModalWindow(false);
            setClassCode('');

            const response = await axios.post('http://localhost:3000/joinClass', {
                studentId,
                classCode
            });

        } catch (error) {
            console.error("Error joining class:", error);

        }
    };

    return (
        <>
            {selected == 'classes' &&
                <div className={`min-h-screen h-full w-screen flex flex-col md:flex-row bg-[#15171a] ${modalWindow ? "blur-lg" : ""}`}>
                    <TeacherNavBar
                        selected={selected}
                        setSelected={setSelected}
                        name={studentData?.data?.name || ''}
                        initial={studentData?.data?.name?.[0] || ''}
                    />
                    {loading&&<LoadingRing/>}

                    {!loading && (<>
                        <div className='h-full w-full p-10'>
                            <div className='flex flex-row gap-x-3 flex-wrap'>
                                <div className='flex flex-row justify-between items-center w-full'>
                                    <h1 className='text-[#c1c4c7] text-3xl font-bold'>My Classes</h1>
                                </div>

                                {data && data.map((item, index) => (
                                    <div
                                        key={index}
                                        className='flex flex-row flex-wrap gap-3 mt-[20px] max-h-[70vh]'
                                        onClick={() => { setSelected('exam'); setClassId(item.class_id) }}
                                    >
                                        <motion.div
                                            initial={{ y: -20 }}
                                            animate={{ y: 0 }}
                                            className='w-[250px] h-[150px] rounded-md bg-[#272a2e] hover:bg-[#212327] p-4 flex flex-col gap-2 justify-around'
                                        >
                                            <p className='font-semibold text-lg text-[#c1c4c7]'>{item.name}</p>
                                            <div>
                                                <p className='text-[#c1c4c7]'><span className='font-bold text-2xl text-[#474aa5]'>{item.capacity}</span> students</p>
                                            </div>

                                        </motion.div>
                                    </div>
                                ))}

                                <div className='flex flex-row mt-6 gap-2 w-full'>
                                    <JoinClassButton onClick={() => setModalWindow(true)} />
                                </div>
                            </div>
                        </div>


                    </>)}


                </div>
            }

            {selected == 'exam' && (<div className={`min-h-screen h-full w-screen flex flex-col md:flex-row bg-[#15171a] ${modalWindow ? "blur-lg" : ""}`}>
                <TeacherNavBar
                    selected={selected}
                    setSelected={setSelected}
                    name={studentData?.data?.name || ''}
                    initial={studentData?.data?.name?.[0] || ''}
                />
                <ExamDisplay id={classId}/>
                
            </div>)}

            {modalWindow && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="h-[350px] w-[450px] rounded-lg bg-[#272a2e] outline outline-1 shadow-xl p-4 pt-4">
                        <div className="text-center text-white">
                            <h1 className="text-2xl mb-6">Enter the class code</h1>

                            <input
                                type="text"
                                value={classCode}
                                onChange={(e) => setClassCode(e.target.value)}
                                placeholder="Enter class code"
                                className="w-full p-2 mb-6 bg-[#1a1b1f] text-white rounded-md focus:outline-none focus:ring-2 focus:ring-[#474aa5]"
                            />

                            <div className="flex justify-between">
                                <button
                                    onClick={() => setModalWindow(false)}
                                    className="px-4 py-2 bg-[#1a1b1f] text-white rounded-md hover:bg-[#212327]"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleJoinClass}
                                    className="px-4 py-2 bg-[#474aa5] text-white rounded-md hover:bg-[#5b61c7]"
                                >
                                    Join Class
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}


            {
                selected === 'profile' && studentData?.data ? (
                    <div className={`min-h-screen h-full w-screen flex flex-col md:flex-row bg-[#15171a] ${modalWindow ? "blur-lg" : ""}`}>
                        <TeacherNavBar
                            selected={selected}
                            setSelected={setSelected}
                            name={studentData?.data?.name || ''}
                            initial={studentData?.data?.name?.[0] || ''}
                        />
                        <StudentProfile
                            ktuRollNo={studentData?.data?.admission_no || ''}
                            university={studentData?.data?.university || ''}
                            studentName={studentData?.data?.name || ''}
                            email={studentData?.data?.email || ''}
                        />
                    </div>
                ) : null
            }

        </>
    )
}