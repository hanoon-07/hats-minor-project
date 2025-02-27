

const Progresscircle = ({ score, maxScore = 100 }) => {
  // Calculate percentage for color determination and stroke-dasharray
  const percentage = (score / maxScore) * 100;
  
  // Determine color based on score percentage
  let color = "#FF4D4D"; // Red for low scores
  if (percentage >= 80) {
    color = "#4CAF50"; // Green for high scores
  } else if (percentage >= 50) {
    color = "#FFC107"; // Yellow/amber for medium scores
  }
  
  // SVG circle parameters
  const radius = 35;
  const circumference = 2 * Math.PI * radius;
  const strokeDasharray = circumference;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;
  
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="relative w-24 h-24">
        {/* Background circle */}
        <svg className="w-full h-full" viewBox="0 0 100 100">
          <circle 
            cx="50" 
            cy="50" 
            r={radius} 
            fill="transparent" 
            stroke="#e6e6e6" 
            strokeWidth="2" // Thinner stroke
          />
          {/* Progress circle */}
          <circle 
            cx="50" 
            cy="50" 
            r={radius} 
            fill="transparent" 
            stroke={color} 
            strokeWidth="2" // Thinner stroke
            strokeDasharray={strokeDasharray}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            transform="rotate(-90 50 50)"
          />
        </svg>
        {/* Center text */}
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-xl font-bold" style={{ color }}>
            {score}%
          </span>
        </div>
      </div>
    </div>
  );
};

export default Progresscircle;