import React, { useEffect, useState } from 'react'
import { TeacherNavBar } from '../components/TeacherSection/TeacherNavBar'
import { motion } from 'framer-motion';
import { Movebutton } from '../components/Movebutton';
import { ClassroomCreate } from '../components/TeacherSection/ClassroomCreate';
import { LoadingRing } from '../components/animation/LoadingRing';
import axios from 'axios';
import { ClassView } from '../components/TeacherSection/ClassView';

export const Teacher = ({teacherId = 22, teacherName}) => {

    const [selected, setSelected] = useState('classes');
    const [open, setOpen] = useState(false);
    const [createClassroom, setCreateClassRoom] = useState(false);
    const [classData, setClassData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [showingClass, setShowingClass] = useState(false);
    const [currentClass, setCurrentClass] = useState(null);

    const [currentClasses, setCurrentClasses] = useState([]);

    async function postClassData() {
        if (!classData) { // Validate before sending
            console.error("Error: Class data is empty or invalid.");
            return;
        }
        setLoading(true);
        try {
            const response = await axios.post("http://localhost:3000/createClass", classData, {
                headers: {
                    "Content-Type": "application/json",
                },
            });
            const newClassId = response.data.newClassId;
            // console.log("Response:", response.data);
            // console.log(response.data);
            setCurrentClasses([...currentClasses, {className: response.data.className, studentCount: response.data.studentCount, activeExam: response.data.activeExam, subject: response.data.subjectm, classId: newClassId}]);
        } catch (error) {
            console.error("Error posting class data:", error);
        } finally {
            setLoading(false);
        }
    }

    async function getClases() {
        
        setLoading(true);
        try {
            const response = await axios.get('http://localhost:3000/getClasses', {
                params: {
                    teacherId: teacherId
                }
            });
            //console.log("Response:", response.data);
            setCurrentClasses(response.data.classData);
        } catch (error) {
            console.error("Error posting class data:", error);
        } finally {
            setLoading(false);
        }
    }

    function selectClass(item) {
        //console.log(item);
        setCurrentClass({className: item.className, subject: item.subject, classId: item.classId})
        setShowingClass(true);
    }

    function clearClass() {
        setCurrentClass(false);
        setShowingClass(false);
    }

    useEffect(() => {
        getClases();
    }, []);

    useEffect(() => {
        if(classData) {
            postClassData();
            setClassData(null);
        }
    }, [classData])

    return (<>
        {loading && <LoadingRing />}
        {createClassroom && <ClassroomCreate setOpenClassCreator={setCreateClassRoom} setData={setClassData} teacherId={teacherId}/>}
        <div className='h-screen w-screen flex flex-row bg-[#15171a]'>
            {<TeacherNavBar currentClass={currentClass} showingClass={showingClass} clearClass={clearClass} selected={selected} setSelected={setSelected} setOpen={setOpen}/>}
            {selected == 'classes' && showingClass && <ClassView clearClass={clearClass} classId={currentClass.classId} classroomName={currentClass.className} subjectName={currentClass.subject}/>}
            {selected == 'classes' && !showingClass && <div className='h-screen w-full p-10'>
                <div className='flex flex-col'>
                    <div className='flex flex-row justify-between items-center'>
                        <h1 className='text-[#c1c4c7] text-3xl font-bold'>My Classes</h1>      
                    </div>

                    <div className='scroller flex flex-row flex-wrap gap-3 mt-[20px] overflow-y-scroll max-h-[70vh]'>
                        
                        {currentClasses.map((item, index) => {
                            return <motion.div onClick={() => {selectClass(item);}} initial={{opacity: 0.4}} animate={{opacity: 1}} transition={{duration: (index+1) * 0.04}} className='w-[250px] h-[150px] rounded-md bg-[#272a2e] hover:bg-[#212327] p-4 flex flex-col gap-2 justify-around'>
                                <p className='font-semibold text-lg text-[#c1c4c7]'>{item.className}</p>
                                <div>
                                    <p className='text-[#c1c4c7]'><span className='font-bold text-2xl text-[#474aa5]'>{item.studentCount}</span> students</p> 
                                </div>
                                <div className='w-[70%] h-[30px] bg-[#1a1b1f]  rounded-sm grid place-content-center'>
                                    <p className='text-[#A8FF53]'>active exam: {item.activeExam}</p>
                                </div>
                            </motion.div>
                        })}
                        
                    </div>

                    <div className='flex flex-row mt-6 gap-2'>
                        <Movebutton action={() => {setCreateClassRoom(true)}} label={'create class'} extraStyleDiv={' rounded-sm '}/>
                        <Movebutton label={'delete class'} direction={'left'} extraStyleDiv={' rounded-sm '}/>
                    </div>

                    
                </div>
            </div>}
        </div>
        </>
    )
}
