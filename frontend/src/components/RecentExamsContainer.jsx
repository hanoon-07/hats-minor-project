import React from 'react'
import RecentExamCard from './RecentExamCard';
import axios from 'axios';
import { useState, useRef, useEffect } from "react";
import Loadinganimation from './animation/Loadinganimation';
import {LoadingRing} from './animation/LoadingRing';


const RecentExamsContainer = ({id, changer}) => {
    
    const [isFooterVisible, setIsFooterVisible] = useState(false);
    const footerRef = useRef(null);

    const [recentExam, setRecentExam] = useState([])
    const [loading, setLoading] = useState(true)
    
    useEffect(() => {
      const fetchRecentExam = async (id) => {
        try {
          setLoading(true);
          const response = await axios.get(
            `https://hats-minor-project-production.up.railway.app/getRecentExams/?sid=${id}`
          );
<<<<<<< HEAD
          console.log(response)
       
=======
          console.log(response.data);
>>>>>>> e4a0541 (initial case)
          setRecentExam(response.data);
        } catch (error) {
          console.error("Error fetching exams:", error);
        } finally {
          setLoading(false);
        }
      }
      fetchRecentExam(id);
    }, [id]);
    
    useEffect(() => {
      if (loading || recentExam.length === 0) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            // Add a delay longer than the cards
            setTimeout(() => {
              setIsFooterVisible(true);
            }, 600);
            observer.unobserve(entry.target);
          }
        },
        {
          threshold: 0.1,
          rootMargin: "0px 0px 50px 0px" 
        }
      );
      
      if (footerRef.current) {
        observer.observe(footerRef.current);
      }
      
      return () => {
        if (footerRef.current) {
          observer.unobserve(footerRef.current);
        }
      };
    }, [loading, recentExam.length]);

    if (loading) {
      return (
        <div className='flex justify-center items-center h-48'>
          <LoadingRing />
        </div>
      );
    }
    
    return (
      <div className='rounded-xl p-5'>
        {recentExam.length > 0 ? (
          <>
            {recentExam.map((exam, index) => (
              <React.Fragment key={exam.id || index}>
                {index > 0 && <br />}
                <RecentExamCard 
                  changer={changer}
                  date={exam.created_at} 
                  delay={index * 200} // Stagger the animations
                />
              </React.Fragment>
            ))}
            
            <div 
              ref={footerRef}
              className={`text-center flex flex-col items-center mt-6 transition-all duration-500 ${
                isFooterVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              <button 
                onClick={() => changer('classes')} 
                className="text-gray-300 hover:text-white transition-colors duration-300"
              >
                view full history
              </button>
              <svg
                width="50"
                height="30"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 100 60"
                className="cursor-pointer"
                onClick={() => changer('classes')}
              >
                <line
                  x1="20"
                  y1="20"
                  x2="50"
                  y2="40"
                  stroke="#333333"
                  strokeWidth="4"
                  strokeLinecap="round"
                />
                <line
                  x1="80"
                  y1="20"
                  x2="50"
                  y2="40"
                  stroke="#333333"
                  strokeWidth="4"
                  strokeLinecap="round"
                />
              </svg>
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center h-48 text-gray-400">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-16 w-16 mb-4 text-gray-600" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={1.5} 
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" 
              />
            </svg>
            <p className="text-lg">No recent exams</p>
            <button 
              onClick={() => changer('classes')} 
              className="mt-4 text-blue-400 hover:text-blue-300 transition-colors duration-300"
            >
              Go to classes
            </button>
          </div>
        )}
      </div>
    );
  };
  
  export default RecentExamsContainer;