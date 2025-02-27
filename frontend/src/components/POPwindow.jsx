import QuestionBox from "./Questionbox";

const POPwindow = ({score1,score2}) => {
    // Sample data - replace with your actual data
    const questions = [
      {
        id: 1,
        title: "Question 1",
        score: score1,
      
      },
      {
        id: 2,
        title: "Question 2",
        score: score2,
       
      }
    ];
  
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="rounded-xl shadow-lg p-8 max-w-4xl w-full border-[0.1px] border-[#A8FF53] ">
          <h1 className="text-2xl font-bold text-center mb-8 text-white">Partial Assessment Results</h1>
          
          <div className="flex flex-wrap justify-center">
            {questions.map((question) => (
              <QuestionBox 
                key={question.id}
                title={question.title}
                score={question.score}
              />
            ))}
          </div>
        </div>
      </div>
    );
  };
  
export default POPwindow;