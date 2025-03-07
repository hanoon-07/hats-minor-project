/* eslint-disable react/prop-types */
const langArray = ["java", "python", "javascript", "c++", "c"];

function LanguageSelect({examDetails, handleLanguageCheck}) {
  return (
    <section>
      <p className="text-normal text-white  text-md mb-4 md:text-base mt-2">
        Select Required Languages
      </p>
      <div className="flex gap-3 flex-wrap">
        {langArray.map((item) => {
          return (
            <label className="flex  items-center cursor-pointer" key={item}>
              <input
                type="checkbox"
                className="hidden peer"
                name={item}
                checked={examDetails.languages.includes(item)}
                onChange={handleLanguageCheck}
              ></input>
              <span
                className=" min-w-[4rem] text-center 
                h-[30px]
                  bg-[#272A2E] rounded-sm
              peer-checked:bg-[#A8FF53] peer-checked:text-black text-white text-md font-normal px-2 flex items-center justify-center"
              >
                <p className="select-none font-semibold text-md">{item}</p>
              </span>
            </label>
          );
        })}
      </div>
    </section>
  );
}

export default LanguageSelect;
