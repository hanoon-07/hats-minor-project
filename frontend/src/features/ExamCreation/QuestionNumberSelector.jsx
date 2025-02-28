/* eslint-disable react/prop-types */

const QuestionSelector = ({
  numValue,
  setNum,
  handleNum,
  title = "Number of Questions",
  minValue = 1,
  maxValue = 30,
}) => {
  return (
    <div className="flex flex-wrap items-center gap-4 bg-zinc-900 py-3 pl-2 pr-2 rounded-lg">
      <label className="text-gray-200 text-sm min-w-[150px]">{title}</label>
      <div className="flex flex-wrap gap-3">
        <div className="relative">
          <input
            type="number"
            min="1"
            readOnly
            value={numValue}
            className="bg-zinc-800 w-[150px] text-white px-3 py-1 rounded border border-zinc-700  focus:outline-none focus:border-blue-500 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
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

        <button
          className="bg-textBlue hover:bg-blue-700 text-white px-4 py-1 rounded text-sm
       focus:outline-none"
          onClick={handleNum}
          type="button"
        >
          apply
        </button>
      </div>
    </div>
  );
};

export default QuestionSelector;
