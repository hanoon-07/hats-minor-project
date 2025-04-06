import React, { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';

const DashClass = ({studentId, changer}) => {
    // Sample class data - replace with actual data

    const [data, setData] = useState([])

    const getSomeClassDetails = async () => {
        try {
         
          const response = await axios.get(
            `https://hats-minor-project-production.up.railway.app/someClassInfo?studentId=${studentId}`
          );
          console.log(response)
         
          if (response.data.msg) {
            setData([]);
          } else {
            setData(response.data || []);
          }
        } catch (error) {
          console.error("Error fetching class details:", error);
        }
      };
    
      useEffect(() => {
        getSomeClassDetails();
      }, [studentId]);
    // const classes = [
    //     {
    //         id: 1,
    //         name: "Introduction to JavaScript",
    //         instructor: "Prof. Sarah Johnson",
    //         progress: 85,
    //         lastActive: "2 days ago",
    //         color: "blue"
    //     },

    //     {
    //         id: 3,
    //         name: "Data Structures & Algorithms",
    //         instructor: "Prof. James Wilson",
    //         progress: 45,
    //         lastActive: "Today",
    //         color: "blue"
    //     },
    //     {
    //         id: 4,
    //         name: "Full Stack Development",
    //         instructor: "Maria Rodriguez",
    //         progress: 28,
    //         lastActive: "3 days ago",
    //         color: "blue"
    //     }
    // ];

    // Color mapping
    const colorMap = {
        blue: "from-blue-300 to-blue-800",
        green: "from-green-500 to-green-700",
        purple: "from-purple-600 to-purple-800",
        orange: "from-orange-500 to-orange-700"
    };

    return (
        <div className="w-full">
            {/* <h2 className="text-4xl font-bold mb-8 text-white">Classes Joined</h2> */}

            <div className="flex overflow-x-auto scroller p-5 gap-4 snap-x items-center">
                {data.map((classItem) => (
                    <div
                        key={classItem.id}
                        className="snap-start flex-shrink-0 w-64 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer"
                    >
                        <div className={`h-3 bg-[#A8FF53] `}></div>
                        <div onClick={() => changer('classes')} className="bg-[#1a1b1f] p-5">
                            <h3 className="text-xl font-bold text-white mb-2">{classItem.name}</h3>
                            <p className="text-gray-400 mb-4">{classItem.teacher_name}</p>

                            {/* <div className="mb-3">
                                <div className="flex justify-between text-sm mb-1">
                                    <span className="text-gray-400">Progress</span>
                                    <span className="text-green-400">{classItem.progress}%</span>
                                </div>
                                <div className="w-full bg-gray-800 rounded-full h-2">
                                    <div
                                        className={`h-2 rounded-full bg-gradient-to-r ${colorMap[classItem.color]}`}
                                        style={{ width: `${classItem.progress}%` }}
                                    ></div>
                                </div>
                            </div> */}

                            <div className="text-gray-500 text-sm">
                                subject: {classItem.subject}
                            </div>
                        </div>
                    </div>
                ))}

                {data?<button
                    onClick={() => changer('classes')}
                >
                    view all classes
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 100">
        
                        <rect x="20" y="40" width="120" height="20" rx="10" fill="#808080" />

                   
                        <path d="M150 50 L130 25 L130 75 Z" fill="#808080" />

                      
                        <ellipse cx="100" cy="85" rx="70" ry="5" fill="#333" opacity="0.1" />
                    </svg>
                </button>:<div>no classes joined yet</div>}
                
            </div>
        </div>
    );
};

export default DashClass;