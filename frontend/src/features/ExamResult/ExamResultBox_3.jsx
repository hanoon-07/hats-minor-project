function ExamResultBox_3() {
  const arr = [
    "meow \n 1\n 2",
    "meow \n 1\n 2",
    "meow \n 1\n 2",
    "meow \n 1\n 2",
  ];
  return (
    <section className=" mt-14 rounded-lg gap-2 p-4 pt-6 pb-6 border-[1px] border-[#479DEC] flex flex-wrap justify-between bg-[#000000]">
      <ExamQuestionInfo title={"Inputs"} dataArray={arr} />
      <ExamQuestionInfo title={"Expected Output"} dataArray={arr} />
      <ExamQuestionInfo title={"Output"} dataArray={arr} />
    </section>
  );
}

export default ExamResultBox_3;

function ExamQuestionInfo({title, dataArray}) {
  return (
    <div className="flex flex-col  gap-2">
      <p className="font-semibold whitespace-pre-line tracking-wide">{title}</p>
      <div className="flex flex-wrap gap-2    rounded-md">
        {dataArray.map((data, index) => {
          return (
            <div
              key={index}
              className="whitespace-pre-line bg-[#1F2125] p-2 px-4 rounded-lg min-w-[100px]"
            >
              {data}
            </div>
          );
        })}
      </div>
    </div>
  );
}
