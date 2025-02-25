/* eslint-disable react/prop-types */
function Input({
  placeholder = "enter",
  changeAction = null,
  textValue = 'test',
  inputTitle = 'hello test',
  width = '140',
  height = 40,
}) {
  return (
    <div className="flex flex-wrap sm:gap-8 gap-2  place-items-center ">
      <p className="text-textGray font-semibold text-sm md:text-base">
        {inputTitle}
      </p>
      <input
        className={`bg-buttonGray text-white placeholder-textGray  py-4 rounded-md  px-3 focus:outline-none text-sm md:text-base 
        h-[${height}px] min-w-[200px] w-60 `}
        placeholder={placeholder}
        value={textValue}
        onChange={changeAction}
      />
    </div>
  );
}

export default Input;
