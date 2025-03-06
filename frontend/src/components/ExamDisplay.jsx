import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { LoadingRing } from './animation/LoadingRing';


export const ExamDisplay = ({id}) => {
    const [exams, setExams] = useState([]);
    const [loading, setLoading] = useState(true)

   

    
    useEffect(() => {
        const fetchExams = async (classId) => {
            try {
                const response = await axios.get(`http://localhost:3000/getExamsInClass/?classId=${classId}`);
                setExams(response.data);
                setLoading(false)
                console.log(response.data)
            } catch (error) {
                console.error('Error fetching exams:', error);
            }
        };
        fetchExams(id);
    }, []);

    const getStatusColor = (status) => {
        switch(status) {
            case 'ongoing': return 'text-[var(--primary-color)]'
            case 'completed': return 'text-[var(--success-color)]'
            case 'upcoming': return 'text-[var(--secondary-color)]'
            default: return 'text-[var(--grey-text)]'
        }
    }

    return (
        <div className='min-h-screen bg-[#1a1b1f] text-[var(--light-text)] p-6 w-full'>
            <h1 className='text-3xl font-bold mb-6 text-[var(--primary-color)]'>
                Current Exams
            </h1>

            <div className='bg-[#272a2e] rounded-lg overflow-hidden'>
                {loading&&<LoadingRing/>}
                {!loading && exams.map((exam, index) => (
                    <div 
                        key={index} 
                        className='flex items-center justify-between p-4 border-b border-[var(--light-bg)] 
                        hover:bg-[var(--light-bg)] transition-colors duration-300'
                    >
                        {/* Subject Name */}
                        <div className='flex-1 text-lg font-semibold'>
                            {exam.name}
                        </div>

                        {/* Time/Status */}
                        <div className={`flex-1 text-center ${getStatusColor(exam.status)}`}>
                            duration:{exam.duration}mins
                        </div>

                        {/* Action Button */}
                        <div className='flex-1 flex justify-end'>
                            <button 
                                className={`
                                    px-4 py-2 rounded-md 
                                    ${exam.active === 'active' ? 'bg-[var(--primary-color)] text-[var(--dark-text)]' : 
                                      exam.active === 'unactive' ? 'bg-blue-400 text-white' : 
                                      'bg-[var(--secondary-color)] text-white'}
                                    hover:opacity-90 transition-opacity
                                `}
                            >
                    

                                {exam.active=='active'?'click me':'view result'}
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}