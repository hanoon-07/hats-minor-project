import React, { useState, useEffect, useRef } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import axios from 'axios';
import Loadinganimation from './animation/Loadinganimation';
import {LoadingRing} from './animation/LoadingRing';

const ExamGraph = ({
  title = "Performance Trend",
  id
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [chartKey, setChartKey] = useState(0);
  const graphRef = useRef(null);

  const [pastExam, setPastExam] = useState([]);
  const [pastResult, setPastResult] = useState([]);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  // Format date function
  const formatDate = (dateString) => {
    if (!dateString) return '';
    return new Date(dateString).toISOString().split("T")[0];
  };

  // Fetch data when component mounts or id changes
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Fetch student's past scores
        const examResponse = await axios.get(
          `http://localhost:3000/getPast6Scores/?sid=${id}`
        );
        setPastExam(examResponse.data);

        // Fetch class average scores
        const resultResponse = await axios.get(
          `http://localhost:3000/getPast6Average`
        );
        setPastResult(resultResponse.data);

      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [id]);

  // Process data after both API responses are received
  useEffect(() => {
    if (pastExam.length > 0 && pastResult.length > 0) {
      // Create a map of date to class average for easier lookup
      const averagesByDate = {};
      pastResult.forEach(item => {
        if (item.exam_date) {
          const formattedDate = formatDate(item.exam_date);
          averagesByDate[formattedDate] = item.average_score_percentage;
        }
      });

      // Create chart data combining student scores with class averages
      const chartData = pastExam.map(exam => {
        const formattedDate = formatDate(exam.exam_date);
        return {
          date: formattedDate,
          studentScore: exam.score_percentage,
          averageScore: averagesByDate[formattedDate] || null
        };
      });

      // Sort the data chronologically (oldest to newest)
      chartData.sort((a, b) => new Date(a.date) - new Date(b.date));

      setData(chartData);
      setLoading(false);
    }
  }, [pastExam, pastResult]);

  // Animation observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
          setChartKey(prev => prev + 1);
        }
      },
      {
        root: null,
        rootMargin: '0px',
        threshold: 0.3,
      }
    );

    if (graphRef.current) {
      observer.observe(graphRef.current);
    }

    return () => {
      if (graphRef.current) {
        observer.unobserve(graphRef.current);
      }
    };
  }, [isVisible]);

  if (loading) {
    return <div className='flex justify-center '>
                  <LoadingRing/>
            </div>
  }

  // Calculate highest score and average
  const highestScore = data.length > 0
    ? Math.max(...data.map(item => item.studentScore || 0))
    : 0;

  const averageScore = data.length > 0
    ? (data.reduce((acc, curr) => acc + (parseInt(curr.studentScore) || 0), 0) / data.length).toFixed(1)
    : 0;

  return (
    <div
      ref={graphRef}
      className="w-full bg-black rounded-xl p-6 border border-gray-800 shadow-lg relative overflow-hidden"
    >
      {/* Subtle glow accent */}
      <div className="absolute -bottom-12 -right-12 w-40 h-40 bg-emerald-500 rounded-full opacity-10 blur-2xl"></div>

      {/* Header */}
      <div className="mb-6">
        <h3 className="text-gray-300 font-medium bg-transparent">{title}</h3>
        <p className="text-gray-400 text-sm bg-transparent">Student scores compared to class average</p>
      </div>

      {/* Graph */}
      <div className="h-64 w-full bg-[#272a2e] ">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            key={chartKey}
            data={data}
            margin={{ top: 5, right: 5, left: 5, bottom: 5 }}
            style={{ backgroundColor: 'black' }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#333" opacity={0.5} />
            <XAxis
              dataKey="date"
              tick={{ fill: '#9CA3AF' }}
              stroke="#555"
            />
            <YAxis
              tick={{ fill: '#9CA3AF' }}
              stroke="#555"
              domain={[0, 100]}
              ticks={[0, 20, 40, 60, 80, 100]}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: '#111',
                borderColor: '#333',
                color: '#E5E7EB',
                borderRadius: '6px',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.3)'
              }}
              itemStyle={{ color: '#E5E7EB' }}
              labelStyle={{ color: '#E5E7EB', fontWeight: 'bold', marginBottom: '4px' }}
            />
            <Legend wrapperStyle={{ color: '#E5E7EB', paddingTop: '10px' }} />
            <Line
              type="monotone"
              dataKey="studentScore"
              name="Your Score"
              stroke="#A8FF53"
              strokeWidth={2}
              dot={{ fill: '#A8FF53', r: 4 }}
              activeDot={{ r: 6, fill: '#A8FF53', stroke: '#FFF' }}
              isAnimationActive={true}
              animationDuration={1000}
              animationBegin={0}
            />
            <Line
              type="monotone"
              dataKey="averageScore"
              name="Class Average"
              stroke="#60A5FA"
              strokeWidth={2}
              dot={{ fill: '#60A5FA', r: 4 }}
              activeDot={{ r: 6, fill: '#60A5FA', stroke: '#FFF' }}
              isAnimationActive={true}
              animationDuration={1000}
              animationBegin={300}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Summary stats */}
      <div className="grid grid-cols-2 gap-4 mt-4 pt-4 border-t border-gray-700">
        <div className="bg-gray-900 bg-opacity-60 p-3 rounded-lg">
          <p className="text-xs text-gray-400 mb-1 bg-transparent">Highest Score</p>
          <p className="text-[#A8FF53] font-medium bg-transparent">{highestScore}%</p>
        </div>
        <div className="bg-gray-900 bg-opacity-60 p-3 rounded-lg">
          <p className="text-xs text-gray-400 mb-1 bg-transparent">Your Average</p>
          <p className="text-[#A8FF53] font-medium bg-transparent">{averageScore}%</p>
        </div>
      </div>
    </div>
  );
};

export default ExamGraph;