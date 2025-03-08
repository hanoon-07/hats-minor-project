import {useState} from "react";
const TimeInput = ({handleDuration}) => {
  const [hours, setHours] = useState(1);
  const [minutes, setMinutes] = useState(30);
  const [seconds, setSeconds] = useState(0);

  const handleHoursChange = (e) => {
    const value = Math.min(Math.max(parseInt(e.target.value)), 10);
    setHours(value);
    handleDuration(hours, minutes, seconds);
  };

  const handleMinutesChange = (e) => {
    const value = Math.min(Math.max(0, parseInt(e.target.value)), 59);
    setMinutes(value);
    handleDuration(hours, minutes, seconds);
  };

  const handleSecondsChange = (e) => {
    const value = Math.min(Math.max(0, parseInt(e.target.value)), 59);
    setSeconds(value);
    handleDuration(hours, minutes, seconds);
  };

  return (
    <div>
      <p className="text-normal text-white  text-md md:text-base mt-2 mb-2">
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
          <label className="text-sm font-normal text-white mb-1">
            Hours
          </label>
          <input
            id="hours"
            type="number"
            min="0"
            max="10"
            value={hours}
            onChange={handleHoursChange}
            className="w-12 px-3 py-1   bg-[#272A2E] rounded-sm focus:outline-none text-white"
          />
        </div>

        <div className="flex flex-col">
          <label
            htmlFor="minutes"
            className="text-sm font-medium text-white mb-1"
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
            className="w-12 px-3 py-1   bg-[#272A2E] rounded-sm border-0 focus:outline-none text-white"
          />
        </div>

        <div className="flex flex-col">
          <label
            htmlFor="seconds"
            className="text-sm font-medium text-white mb-1"
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
            className="w-12 px-3 py-1   bg-[#272A2E] rounded-sm focus:outline-none text-white"
          />
        </div>
      </div>
    </div>
  );
};

export default TimeInput;
