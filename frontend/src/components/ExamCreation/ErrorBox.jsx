/* eslint-disable react/prop-types */
function ErrorBox({errors}) {
  if (!errors) return null;

  const errorMessages = [];
  if (errors.examName === "This field is required") {
    errorMessages.push("Exam Name is required");
  }

  if (errors.subject === "This field is required") {
    errorMessages.push("Subject is required");
  }
  errors.questions?.forEach((question, index) => {
    if (question.questionName === "This field is required") {
      errorMessages.push(`Question ${index + 1} name is required`);
    }
    if (question.description === "This field is required") {
      errorMessages.push(`Question ${index + 1} description is required`);
    }

    
    question.testCases?.forEach((test, testCaseIndex) => {
      if (test.input === "This field is required") {
        errorMessages.push(
          `Question ${index + 1} test case ${
            testCaseIndex + 1
          } input is required`
        );
      }
      if (test.output === "This field is required") {
        errorMessages.push(
          `Question ${index + 1} test case ${
            testCaseIndex + 1
          } output is required`
        );
      }
      if (test.caseCount) {
        errorMessages.push(`Question ${index} testcases ` + test.caseCount);
      }
    });
    question.constraintCases?.forEach((constraint, constraintIndex) => {
      if (constraint.input === "This field is required") {
        errorMessages.push(
          `Question ${index + 1} constraint ${
            constraintIndex + 1
          } input is required`
        );
      }
      if (constraint.output === "This field is required") {
        errorMessages.push(
          `Question ${index + 1} constraint ${
            constraintIndex + 1
          } output is required`
        );
      }
      if (constraint.caseCount) {
        errorMessages.push(
          `Question ${index} constraints ` + constraint.caseCount
        );
      }
    });
  });

  //console.log(errorMessages);
  if (errorMessages.length === 0) {
    return null;
  }
  return (
    <div className="outline outline-1 outline-red-800 p-4 rounded-md mb-4 mt-5">
      <div className="flex items-start lg:w-[350px]">
        <div className="flex-shrink-0">
          <svg
            className="h-5 w-5 text-red-500"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        <div className="ml-3">
          <h3 className="text-sm font-medium text-red-600">
            Please fix the following errors:
          </h3>
          <div className="mt-2 text-sm text-red-700">
            <ul className="list-disc pl-5 space-y-1">
              {errorMessages.map((message, index) => (
                <li key={index}>{message}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ErrorBox;
