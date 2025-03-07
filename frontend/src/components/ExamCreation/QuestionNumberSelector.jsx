/* eslint-disable react/prop-types */

import { Movebutton } from "../Movebutton";

const QuestionSelector = ({
  numValue,
  setNum,
  handleNum,
  title = "Number of Questions",
  minValue = 1,
  maxValue = 30,
}) => {
  return (
    <div className="flex flex-wrap items-center gap-4  py-1 pl-2 pr-2 rounded-lg">
      <label className="text-white text-md min-w-[150px]">{title}</label>
      <div className="flex flex-wrap gap-3">
        <div className="relative">
          <input
            type="number"
            min="1"
            readOnly
            value={numValue}
            className="bg-zinc-800 w-[100px] text-white px-3 py-1 rounded-sm      [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
          />
          <div className="absolute right-2 top-0 bottom-0  overflow-hidden flex flex-col ">
            <button
              className="flex-1 text-green-500  hover:text-green-400 flex items-center justify-center text-xs cursor-pointer"
              onClick={() => {
                if (numValue >= maxValue) return;
                setNum((prev) => prev + 1);
              }}
              type="button"
            >
              ▲
            </button>
            <button
              className="flex-1 text-green-500 hover:text-green-400 flex items-center justify-center text-xs cursor-pointer"
              onClick={() => {
                if (numValue == minValue) return;
                setNum((prev) => prev - 1);
              }}
              type="button"
            >
              ▼
            </button>
          </div>
        </div>

        <Movebutton action={handleNum} label={'apply'} direction={'right'} extraStyleDiv={' max-w-[100px] rounded-sm'}/>
      </div>
    </div>
  );
};

export default QuestionSelector;
