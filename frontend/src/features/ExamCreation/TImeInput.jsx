import {useState} from "react";
const TimeInput = ({onTimeChange}) => {
  const [hours, setHours] = useState(1);
  const [minutes, setMinutes] = useState(30);
  const [seconds, setSeconds] = useState(0);

  const handleHoursChange = (e) => {
    const value = Math.min(Math.max(parseInt(e.target.value)), 10);
    setHours(value);
  };

  const handleMinutesChange = (e) => {
    const value = Math.min(Math.max(0, parseInt(e.target.value)), 59);
    setMinutes(value);
  };

  const handleSecondsChange = (e) => {
    const value = Math.min(Math.max(0, parseInt(e.target.value)), 59);
    setSeconds(value);
  };

  return (
    <>
      <p className="text-semibold text-textGray  text-sm md:text-base mt-2">
        Enter the Duration
      </p>
      <div className="flex items-center gap-2">
        <style>{`
        /* Hide spinner buttons for Webkit browsers (Chrome, Safari, newer Edge) */
        input[type="number"]::-webkit-inner-spin-button,
        input[type="number"]::-webkit-outer-spin-button {
          -webkit-appearance: none;
          margin: 0;
        }

        /* Hide spinner buttons for Firefox */
        input[type="number"] {
          -moz-appearance: textfield;
        }
      `}</style>
        <div className="flex flex-col ml-0 pl-0">
          <label className="text-sm font-medium text-gray-500 mb-1">
            Hours
          </label>
          <input
            id="hours"
            type="number"
            min="0"
            max="10"
            value={hours}
            onChange={handleHoursChange}
            className="w-12 px-3 py-2   bg-darkGray rounded-md focus:outline-none text-textGray"
          />
        </div>

        <div className="flex flex-col">
          <label
            htmlFor="minutes"
            className="text-sm font-medium text-gray-500 mb-1"
          >
            Minutes
          </label>
          <input
            id="minutes"
            type="number"
            min="0"
            max="59"
            value={minutes}
            onChange={handleMinutesChange}
            className="w-12 px-3 py-2   bg-darkGray rounded-md border-0 focus:outline-none text-textGray"
          />
        </div>

        <div className="flex flex-col">
          <label
            htmlFor="seconds"
            className="text-sm font-medium text-gray-500 mb-1"
          >
            Seconds
          </label>
          <input
            id="seconds"
            type="number"
            min="0"
            max="59"
            value={seconds}
            onChange={handleSecondsChange}
            className="w-12 px-3 py-2   bg-darkGray rounded-md focus:outline-none text-textGray"
          />
        </div>
      </div>
    </>
  );
};

export default TimeInput;
