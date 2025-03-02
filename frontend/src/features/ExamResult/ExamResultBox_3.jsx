/* eslint-disable react/prop-types */
function ExamResultBox_3({queIndex, questionData}) {
  return (
    <section className=" mt-14 rounded-lg gap-2 p-4 pt-6 pb-6 border-[1px] border-[#479DEC] flex flex-wrap justify-between bg-[#000000]">
      <ExamQuestionInfo
        title={"Inputs"}
        dataArray={questionData[queIndex].inputs}
      />
      <ExamQuestionInfo
        title={"Expected Output"}
        dataArray={questionData[queIndex].expectedOutputs}
      />
      <ExamQuestionInfo
        title={"Output"}
        dataArray={questionData[queIndex].outputs}
      />
    </section>
  );
}

export default ExamResultBox_3;

function ExamQuestionInfo({title, dataArray}) {
  return (
    <div className="flex flex-col  gap-2 border-[1px] border-[#4E4747] rounded-lg p-3">
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
