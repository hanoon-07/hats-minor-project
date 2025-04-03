import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight, Award, CheckCircle } from 'lucide-react';

// Individual card component with animation
const RecentExamCard = ({ 
  courseCode='CST-302', 
  courseName='Operating system', 
  date='27/03/24',
  delay = 0,
  changer
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef(null);
  
  // Custom color (bright lime green)
  const accentColor = "#A8FF53";
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Add a small delay to create a cascading effect
          setTimeout(() => {
            setIsVisible(true);
          }, delay);
          observer.unobserve(entry.target);
        }
      },
      {
        threshold: 0.1
      }
    );
    
    if (cardRef.current) {
      observer.observe(cardRef.current);
    }
    
    return () => {
      if (cardRef.current) {
        observer.unobserve(cardRef.current);
      }
    };
  }, [delay]);
  
  return (
    <div 
      ref={cardRef}
      className={`bg-[#1a1b1f] relative overflow-hidden rounded-lg  p-6 shadow-lg border-l-4 hover:shadow-xl transition-all duration-500 transform ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'
      }`} 
      style={{ borderLeftColor: accentColor }}
    >
      <div className="absolute -top-10 -right-10 w-20 h-20 rounded-full blur-xl" style={{ backgroundColor: `${accentColor}10` }}></div>
      <div className="absolute -bottom-8 -left-8 w-16 h-16 rounded-full blur-lg" style={{ backgroundColor: `${accentColor}10` }}></div>
      
      <div className="absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1" 
           style={{ backgroundColor: `${accentColor}10`, color: `white` }}>
        <button onClick={() => changer('classes')}>View results</button>
      </div>
      
      {/* Course info */}
      <div className="mb-4">
        <h2 className="text-xl font-bold text-white mb-1 flex items-center">
          {courseCode}: {courseName}
        </h2>
      </div>
      <div className='text-gray-400'>
        Attempted on {date}
      </div>
    </div>
  );
};


export default RecentExamCard;