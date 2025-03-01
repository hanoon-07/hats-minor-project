function ExamResultBox_1() {
  return (
    <section className=" mt-12 ">
      <div className=" border-[1px] border-[#A8FF53]  p-6 pt-8  pb-8 rounded-lg flex flex-col gap-3  bg-[#000000]">
        <h1 className="text-[1.2rem] font-semibold">ARUN M</h1>
        <p>
          Time elapsed : <span className="text-[#A8FF53]">1hr 10min</span>
        </p>
        {/* inner result box */}
        <div className=" border-1 border-[#666763] mt-8">
          <QuestionScoreCard />
        </div>
        <ExamMarkCard />
      </div>
    </section>
  );
}

const QuestionScoreCard = () => {
  const questions = [
    {id: 1, title: "question -1", score: 4, maxScore: 5},
    {id: 2, title: "question -2", score: 2, maxScore: 5},
  ];

  return (
    <div className=" text-white rounded-lg p-4 pr-4 pt-6 border-[1px] border-[#666763]">
      {questions.map((question) => (
        <div key={question.id} className="mb-2">
          <div className="text-base mb-1">{question.title}</div>
          <div className="flex  items-center">
            <div className="flex-1 bg-gray-700 rounded-full h-2 mr-2">
              <div
                className="bg-[#A8FF53] h-2 rounded-full"
                style={{
                  width: `${(question.score / question.maxScore) * 100}%`,
                }}
              />
            </div>
            <div className="text-sm">
              {question.score}/{question.maxScore}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

const ExamMarkCard = () => {
  const result = {mark: 10, partialMark: 10};
  return (
    <section className=" text-white rounded-lg p-4 pr-4  border-[1px] border-[#666763] mt-4">
      <div className="flex  gap-3 justify-between mx-5 py-1 place-items-center">
        <p className="font-semibold flex place-items-center gap-3 flex-wrap justify-center tracking-wide">
          Mark :{" "}
          <span className="py-2 px-2 bg-[#479DEC] rounded-lg">
            {result.mark}%
          </span>
        </p>
        <p className="font-semibold flex place-items-center gap-3 flex-wrap justify-center tracking-wide">
          Partial :{" "}
          <span className="py-2 px-2 bg-[#3B3E45] rounded-lg">
            {result.partialMark}%
          </span>
        </p>
      </div>
    </section>
  );
};

export default ExamResultBox_1;
