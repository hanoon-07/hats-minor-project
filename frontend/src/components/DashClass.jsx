import React, { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';

const DashClass = ({studentId, changer}) => {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const getSomeClassDetails = async () => {
        try {
          setIsLoading(true);
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
        } finally {
          setIsLoading(false);
        }
      };
    
      useEffect(() => {
        getSomeClassDetails();
      }, [studentId]);

    // Color mapping
    const colorMap = {
        blue: "from-blue-300 to-blue-800",
        green: "from-green-500 to-green-700",
        purple: "from-purple-600 to-purple-800",
        orange: "from-orange-500 to-orange-700"
    };

    // Loading skeleton
    const LoadingSkeleton = () => (
        <div className="flex overflow-x-auto scroller p-5 gap-4 snap-x items-center">
            {[1, 2, 3].map((item) => (
                <div 
                    key={item}
                    className="snap-start flex-shrink-0 w-64 rounded-lg overflow-hidden shadow-lg animate-pulse"
                >
                    <div className="h-3 bg-gray-600"></div>
                    <div className="bg-[#1a1b1f] p-5">
                        <div className="h-6 bg-gray-600 rounded w-3/4 mb-2"></div>
                        <div className="h-4 bg-gray-700 rounded w-1/2 mb-4"></div>
                        <div className="h-4 bg-gray-700 rounded w-full mb-1"></div>
                    </div>
                </div>
            ))}
        </div>
    );

    return (
        <div className="w-full">
            {isLoading ? (
                <LoadingSkeleton />
            ) : (
                <div className="flex overflow-x-auto scroller p-5 gap-4 snap-x items-center">
                    {data.length > 0 ? data.map((classItem) => (
                        <div
                            key={classItem.id}
                            className="snap-start flex-shrink-0 w-64 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer"
                        >
                            <div className={`h-3 bg-[#A8FF53] `}></div>
                            <div onClick={() => changer('classes')} className="bg-[#1a1b1f] p-5">
                                <h3 className="text-xl font-bold text-white mb-2">{classItem.name}</h3>
                                <p className="text-gray-400 mb-4">{classItem.teacher_name}</p>
                                <div className="text-gray-500 text-sm">
                                    subject: {classItem.subject}
                                </div>
                            </div>
                        </div>
                    )) : (
                        <div className="text-gray-400">No classes joined yet</div>
                    )}

                    {data.length > 0 && (
                        <button
                            onClick={() => changer('classes')}
                            className="flex flex-col items-center text-gray-400 hover:text-gray-300 transition-colors"
                        >
                            <span className="mb-2">View all classes</span>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 100" className="w-16 h-8">
                                <rect x="20" y="40" width="120" height="20" rx="10" fill="#808080" />
                                <path d="M150 50 L130 25 L130 75 Z" fill="#808080" />
                                <ellipse cx="100" cy="85" rx="70" ry="5" fill="#333" opacity="0.1" />
                            </svg>
                        </button>
                    )}
                </div>
            )}
        </div>
    );
};

export default DashClass;