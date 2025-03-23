import {useState} from "react";

// Validation rules for different field types
const validationRules = {
  examName: {
    required: true,
    minLength: 3,
    maxLength: 100,
  },
  subject: {
    required: true,
    minLength: 2,
    maxLength: 50,
  },
  languages: {
    required: true,
    minItems: 1,
  },
  questions: {
    required: true,
    minItems: 1,
    questionRules: {
      questionName: {
        required: true,
        minLength: 3,
        maxLength: 200,
      },
      description: {
        required: true,
        minLength: 10,
      },
      exampleCases: {
        required: true,
        minItems: 1,
        caseRules: {
          input: {required: true},
          output: {required: true},
        },
      },
      testCases: {
        required: true,
        minItems: 5,
        caseRules: {
          input: {required: true},
          output: {required: true},
        },
      },
      constraintCases: {
        required: true,
        minItems: 2,
        caseRules: {
          input: {required: true},
        },
      },
    },
  },
};

// Custom hook for form validation
export const useFormValidation = (initialState) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateField = (value, rules) => {
    if (
      rules.required &&
      (!value || (Array.isArray(value) && value.length === 0))
    ) {
      return "This field is required";
    }
    if (rules.minLength && value.length < rules.minLength) {
      return `Must be at least ${rules.minLength} characters`;
    }
    if (rules.maxLength && value.length > rules.maxLength) {
      return `Must be less than ${rules.maxLength} characters`;
    }
    if (rules.minItems && value.length < rules.minItems) {
      return `Must have at least ${rules.minItems} items`;
    }
    return null;
  };

  const validateCases = (cases, rules) => {
    const caseErrors = [];
    if (cases.length < rules.minItems) {
      caseErrors.push({
        caseCount: `Must have at least ${rules.minItems} items`,
      });
      return caseErrors;
    }
    cases.forEach((caseItem, index) => {
      const caseError = {};
      Object.entries(rules.caseRules).forEach(([field, fieldRules]) => {
        const error = validateField(caseItem[field], fieldRules);
        if (error) caseError[field] = error;
      });
      if (Object.keys(caseError).length > 0) {
        caseErrors[index] = caseError;
      }
    });
    return caseErrors.length > 0 ? caseErrors : null;
  };

  const validateQuestion = (question, index) => {
    const questionErrors = {};
    const rules = validationRules.questions.questionRules;

    Object.entries(rules).forEach(([field, fieldRules]) => {
      if (
        field === "exampleCases" ||
        field === "testCases" ||
        field === "constraintCases"
      ) {
        const caseErrors = validateCases(question[field], fieldRules);
        if (caseErrors) questionErrors[field] = caseErrors;
      } else {
        const error = validateField(question[field], fieldRules);
        if (error) questionErrors[field] = error;
      }
    });

    return Object.keys(questionErrors).length > 0 ? questionErrors : null;
  };

  const validateForm = (formData) => {
    const newErrors = {};

    Object.entries(validationRules).forEach(([field, rules]) => {
      //console.log(field, rules);
      if (field == "questions") {
        const questionErrors = [];
        if (formData.questions.length <= 0) {
          newErrors.questionCount = "Please Add atleast one question";
        }
        formData.questions.forEach((question, index) => {
          const questionError = validateQuestion(question, index);
          if (questionError) questionErrors[index] = questionError;
        });
        if (questionErrors.length > 0) newErrors.questions = questionErrors;
      } else {
        const OtherErrors = validateField(formData[field], rules);
        if (OtherErrors) newErrors[field] = OtherErrors;
      }
    });

    return newErrors;
  };

  return {validateForm, isSubmitting, setIsSubmitting};
};
