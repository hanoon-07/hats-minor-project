/* eslint-disable react/prop-types */
function ExamResultBox_1({examResponse}) {
  let hours = examResponse.timelapsed / 60;
  let minutes = examResponse.timelapsed % 60;
  return (
    <section className=" lg:mt-12 mt-5 ">
      <div className=" border-[1px] border-[#A8FF53]  p-6 pt-8  pb-8 rounded-lg flex flex-col gap-3  bg-[#000000]">
        <h1 className="text-[1.2rem] font-semibold">
          {examResponse.studentName}
        </h1>
        <p>
          Time elapsed :{" "}
          <span className="text-[#A8FF53]">
            {hours}hr {hours < 1 ? "" : `${minutes}min`}
          </span>
        </p>
        {/* inner result box */}
        <div className=" border-1 border-[#666763] mt-8">
          <QuestionScoreCard questionData={examResponse.questionData} />
        </div>
        <ExamMarkCard mark={examResponse.mark} partial={examResponse.partial} />
      </div>
    </section>
  );
}

const QuestionScoreCard = ({questionData}) => {
  return (
    <div className=" text-white rounded-lg p-4 pr-4 pt-6 border-[1px] border-[#666763]">
      {questionData.map((questionData, index) => (
        <div key={index} className="mb-2">
          <div className="text-base mb-1">{`Question - ${index + 1}`}</div>
          <div className="flex  items-center">
            <div className="flex-1 bg-gray-700 rounded-full h-2 mr-2">
              <div
                className="bg-[#A8FF53] h-2 rounded-full"
                style={{
                  width: `${
                    (questionData.correctTestCases /
                      questionData.totalTestCases) *
                    100
                  }%`,
                }}
              />
            </div>
            <div className="text-sm">
              {questionData.correctTestCases}/{questionData.totalTestCases}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

const ExamMarkCard = ({mark, partial}) => {
  return (
    <section className=" text-white rounded-lg p-4 pr-4  border-[1px] border-[#666763] mt-4">
      <div className="flex  gap-3 justify-between mx-5 py-1 place-items-center">
        <p className="font-semibold flex place-items-center gap-3 flex-wrap justify-center tracking-wide">
          Mark :{" "}
          <span className="py-2 px-2 bg-[#479DEC] rounded-lg ">{mark}%</span>
        </p>
        <p className="font-semibold flex place-items-center gap-3 flex-wrap justify-center tracking-wide">
          Partial :{" "}
          <span className="py-2 px-2 bg-[#3B3E45] rounded-lg">{partial}%</span>
        </p>
      </div>
    </section>
  );
};

export default ExamResultBox_1;
