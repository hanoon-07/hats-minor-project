import React, { useCallback } from 'react'
import Editor from '@monaco-editor/react'
import { useSelector } from 'react-redux'
import { selectResult } from '../../redux/examSelector'

function Output() {

  const results = useSelector(selectResult);

  const errorOccured = useCallback(() => {
    
    for(let i = 0;i < results.stdErr.length;i++) {
      if(results.stdErr[i] != null) return i;
    }
    return -1;

  }, [results]);

  function  getItem(item ,index) {
    return <div className='flex flex-col gap-1'>
      <p className='text-textGray'>case {index+1}</p>
      <p className='whitespace-pre-wrap text-textGreen'>{item}</p>
    </div>
  }


  if(results == null) {
    return <div className=" text-center relative">
      <p className="text-gray-300">Run the Code to Obtain Results</p>
      <span className="w-[40%] h-[1px] left-[30%] bg-red-600 absolute "> </span>
    </div>
  }

  if(errorOccured() != -1) {
    return <div className='bg-darkGray w-full p-0 h-[100%]'>
      <div className='h-full bg-black rounded-md pb-5'>
        <p className='p-4  rounded-md text-red-500 whitespace-pre-wrap w-full'>{results.stdErr[errorOccured()]}</p>
      </div>
    </div>
  }

  return <div className='bg-black rounded-md w-full p-3 max-h-[80%] min-h-[70%] overflow-y-scroll pb-5'>
    {results.stdOut.map(getItem)}
  </div>

}

export default Output