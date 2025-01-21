import React from 'react'
import Editor from '@monaco-editor/react'
import { useSelector } from 'react-redux'
import { selectResult } from '../../redux/examSelector'

function Output() {

  const results = useSelector(selectResult);

  function getItem(item, index) {
    return <div className='bg-secondaryGray width-full m-[20px] rounded-[4px] px-2'>
      <span className='text-textGray'>case {index}</span>
      <p className='text-white'>{item}</p>
    </div>
  }

  if(!results) {
    return <div className=" text-center relative">
      <p className="text-gray-300">Run the Code to Obtain Results</p>
      <span className="w-[40%] h-[1px] left-[30%] bg-red-600 absolute "> </span>
    </div>
  }

  return (
    <div style={{ height: '100%', width: '100%'}} className='p-[15px]'>
      {results.stdErr.length != 0 && <p className='overflow-y-scroll text-textRed px-[15px]'>{results.stdErr[0]}</p>}
      {results.stdOut[0] != null && <div className='overflow-scroll overflow-y-scroll max-h-[200px]'>
        {results.stdOut.map(getItem)}  
      </div>}
    </div>
  )
}

export default Output