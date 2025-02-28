/* eslint-disable react/prop-types */
const langArray = ["java", "python", "javascript", "c++", "c"];

function LanguageSelect({examDetails, handleLanguageCheck}) {
  return (
    <section>
      <p className="text-semibold text-textGray mb-2 text-sm md:text-base mt-2">
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
                 h-[25px]
                md:h-[40px]  outline outline-1 outline-gray-400 rounded-sm 
              peer-checked:outline-buttonGreen2 peer-checked:text-gray-200 text-textGray text-sm px-2 flex items-center justify-center"
              >
                <p className="select-none font-semibold text-sm">{item}</p>
              </span>
            </label>
          );
        })}
      </div>
    </section>
  );
}

export default LanguageSelect;
