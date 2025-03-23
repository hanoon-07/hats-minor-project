import React from 'react'
import Statcard from './Statcard'
import ExamGraph from './ExamGraph'
import RecentExamCard from './RecentExamCard'
import RecentExamsContainer from './RecentExamsContainer'

function Dashboard() {
  return (
    <div className='h-full text-white p-5 overflow-y-scroll scroller'>

      <div className="p-[40px] mb-6  border border-gray-800 rounded-xl bg-gradient-to-t from-black via-black via-95% to-[#A8FF53]">

        <h1 className="text-[#A8FF53] text-4xl font-bold">Welcome back, John!</h1>
        <p className="pt-4 mb-3 text-white">
          Track your progress, review past submissions, and improve your coding skills.
        </p>
      </div>


      <h1 className='text-2xl font-bold'>
        Your progress
      </h1>
      <br />
      <div className='w-full flex justify-between mb-10'>
        <Statcard name='Exams' />
        <Statcard name='Quizzes' />
      </div>



      <ExamGraph />

      <br />
      <h1 className='text-2xl font-bold'>
        Recent Exams
      </h1>
      <br />


      <RecentExamsContainer/>



    </div>
  )
}

export default Dashboard