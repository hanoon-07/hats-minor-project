import React, { useState } from 'react'
import Statcard from './Statcard'
import ExamGraph from './ExamGraph'
import RecentExamCard from './RecentExamCard'
import RecentExamsContainer from './RecentExamsContainer'
import DashClass from './DashClass'
import axios from 'axios'
import { useEffect } from 'react'
import { LoadingRing } from './animation/LoadingRing'

function Dashboard({id}) {

  const [name, setName] = useState('')
  const [loading, setLoading] = useState(1)
  


  useEffect(() => {
    const fetchName = async (id) => {
      try {
        const response = await axios.get(
          `http://localhost:3000/getStudentInfo/?sid=${id}`
        );
        setName(response.data.data.name);
        setLoading(0)
      } catch (error) {
        console.error("Error fetching name:", error);
      }
    }
    fetchName(id)
  }, [])
  


  if (loading) {
    return <LoadingRing/>;
  }

  return (
    <div className="h-full text-white p-5 overflow-y-scroll scroller">
      <div className="p-[40px] mb-6 border border-gray-800 rounded-xl bg-gradient-to-t from-[#1a1b1f] via-[#1a1b1f] via-95% to-[#A8FF53]">
        <h1 className="text-[#A8FF53] text-4xl font-bold">Welcome back, {name}!</h1>
        <p className="pt-4 mb-3 text-white">
          Track your progress, review past submissions, and improve your coding skills.
        </p>
      </div>

      <h1 className="text-2xl font-bold">Classes joined</h1>
      <br />
      <div className="w-full flex justify-between mb-10">
        <DashClass studentId={id}/>

        {/* <Statcard name="Exams" /> */}
        {/* <Statcard name="Quizzes" /> */}
      </div>

      <h1 className="text-2xl font-bold">Your progress</h1>
      <br />
      <ExamGraph id={id} />

      <br />
      <h1 className="text-2xl font-bold">Recent Exams</h1>
      <br />

      <RecentExamsContainer id={id} />
    </div>
  );
}

export default Dashboard