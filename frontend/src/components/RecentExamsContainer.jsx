import React from 'react'
import RecentExamCard from './RecentExamCard';
import axios from 'axios';
import { useState, useRef, useEffect } from "react";


const RecentExamsContainer = ({id}) => {
    
    const [isFooterVisible, setIsFooterVisible] = useState(false);
    const footerRef = useRef(null);

    const [recentExam, setRecentExam] = useState([])
    const [loading, setLoading] = useState(1)
    
    // const exams = [
    //   { id: 1, courseCode: 'CST-302', courseName: 'Operating System', date: '27/03/24' },
    //   { id: 2, courseCode: 'CST-405', courseName: 'Database Systems', date: '22/03/24' }
    // ];

    useEffect(() => {
      const fetchRecentExam = async (id) => {
        try {
          const response = await axios.get(
            `http://localhost:3000/getRecentExams/?sid=${id}`
          );
       
          setRecentExam(response.data);
        
          setLoading(0)
        } catch (error) {
          console.error("Error fetching exams:", error);
        }
      }
      fetchRecentExam(id)
    }, [])
    
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
    }, [loading]);

    if (loading) {
      return <div className="text-white p-5">Loading...</div>;
    }
    
    return (
      <div className='rounded-xl  p-5'>
        {recentExam.map((exam, index) => (
          <React.Fragment key={exam.id}>
            {index > 0 && <br />}
            <RecentExamCard 
              // courseCode={exam.courseCode} 
              // courseName={exam.courseName} 
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
          <button className="text-gray-300 hover:text-white transition-colors duration-300">
              view full history
          </button>
          <svg
            width="50"
            height="30"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 100 60"
            className=""
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

      </div>
    );
  };
  
  export default RecentExamsContainer;