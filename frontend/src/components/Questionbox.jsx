import Progresscircle from "./Progresscircle";

const QuestionBox = ({ title, score }) => {
    return (
      <div className="rounded-lg shadow-md p-6 w-64 m-4 border border-darkGray">
        <h2 className="text-center text-xl font-semibold mb-4 text-white">{title}</h2>
        <div className="flex flex-col items-center mb-4">
          <Progresscircle score={score} />
        </div>
        {/* <p className="text-center text-sm text-white">{feedback}</p> */}
      </div>
    );
  };


export default QuestionBox;