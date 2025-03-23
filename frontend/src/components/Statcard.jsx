import React from 'react';

const Statcard = ({ 
  progress = 72,
  improvement = 5,
  completedExams = 18,
  totalAttempts = 25,
  averageScore = 68,
  name
}) => {
  return (
    <div className="w-full max-w-md">
      <div className="bg-black border border-gray-800 rounded-xl p-6 shadow-lg relative overflow-hidden">
        {/* Subtle glow accent */}
        <div className="absolute -bottom-12 -right-12 w-40 h-40 bg-emerald-500 rounded-full opacity-10 blur-2xl"></div>
        
        {/* Header with integrated progress */}
        <div className="flex justify-between items-center mb-6">
          <p className="text-gray-300 font-medium text-2xl">{name}</p>
          <div className="px-3 py-1 rounded-lg">
            <p className="text-[#A8FF53] text-sm font-medium">+{improvement}% improvement</p>
          </div>
        </div>
        
        {/* Progress bar with subtle animation */}
        <div className="relative pt-1 mb-6">
          <div className="flex items-center justify-between mb-2">
            <div>
              <span className="text-xs font-semibold inline-block text-[#A8FF53">
                Progress
              </span>
            </div>
            <div className="text-right">
              <span className="text-xs font-semibold inline-block text-[#A8FF53]">
                {progress}%
              </span>
            </div>
          </div>
          <div className="overflow-hidden h-2 text-xs flex rounded-full bg-gray-800">
            <div
              style={{ width: `${progress}%` }}
              className="shadow-lg flex flex-col text-center whitespace-nowrap text-white justify-center bg-[#A8FF53]"
            ></div>
          </div>
        </div>
        
        {/* Stats cards in a row */}
        <div className="grid grid-cols-3 gap-3">
          <div className="bg-gray-800 bg-opacity-50 p-3 rounded-lg border-b border-[#A8FF53]">
            <p className="text-xs text-gray-400 mb-1">Completed</p>
            <p className="text-white font-medium">{completedExams}</p>
          </div>
          <div className="bg-gray-800 bg-opacity-50 p-3 rounded-lg border-b border-[#A8FF53]">
            <p className="text-xs text-gray-400 mb-1">Attempts</p>
            <p className="text-white font-medium">{totalAttempts}</p>
          </div>
          <div className="bg-gray-800 bg-opacity-50 p-3 rounded-lg border-b border-[#A8FF53]">
            <p className="text-xs text-gray-400 mb-1">Avg. Score</p>
            <p className="text-white font-medium">{averageScore}%</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Statcard;