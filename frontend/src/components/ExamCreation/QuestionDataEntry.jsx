/* eslint-disable react/prop-types */
import Textarea from "./Textarea";
function QuestionDataEntry({
  queIndex,
  ExampleIndex,
  examDetails,
  handleQuestionExamples,
  caseType,
}) {
  if (caseType === "constraint") {
    //console.log("Case type");
  }
  return (
    <div className="flex flex-col gap-4 p-2">
      <Textarea
        placeholder="Input data"
        textValue={
          examDetails.questions[queIndex]?.[`${caseType}Cases`][ExampleIndex]
            .input
        }
        inputTitle={"Input"}
        changeAction={(e) =>
          handleQuestionExamples(ExampleIndex, e, "input", caseType)
        }
      />
      {caseType != "constraint" ? (
        <Textarea
          placeholder="Output data"
          textValue={
            examDetails.questions[queIndex]?.[`${caseType}Cases`][ExampleIndex]
              .output
          }
          inputTitle={"Output"}
          changeAction={(e) =>
            handleQuestionExamples(ExampleIndex, e, "output", caseType)
          }
        />
      ) : (
        ""
      )}
    </div>
  );
}
export default QuestionDataEntry;
