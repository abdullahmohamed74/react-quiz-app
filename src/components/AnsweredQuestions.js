import { FINISH_QUIZ, NEXT_QUESTION } from '../actions';
import useQuizContext from '../hooks/useQuizContext';

function AnsweredQuestions() {
  const {
    filteredQuestions,
    selectedOptionAnswers,
    dispatch,
    index,
    numQuestions,
  } = useQuizContext();
  
  const question = filteredQuestions[index];
  const isLastIndex = index === numQuestions - 1;
  // access the user answer from "selectedOptionAnswers" array
  // using index of the question
  const answerIndex = selectedOptionAnswers[index];

  return (
    <div>
      <h3 style={{ color: '#1098ad', fontWeight: '500' }}>your Answers :</h3>
      <h4>{question.question}</h4>
      <div className="options">
        {question.options.map((option, optionIndex) => {
          return (
            <button
              key={option}
              className={`btn btn-option ${
                answerIndex === optionIndex ? 'answer' : ''
              } 
              ${
                // always show the correct answer
                // when the user selected that correct answer
                // and when the user selected a wrong answer
                optionIndex === question.correctOption ? 'correct' : ''
              }
              ${
                // show the wrong answer only if the user selected that wrong answer
                optionIndex !== question.correctOption &&
                answerIndex === optionIndex
                  ? 'wrong'
                  : ''
              }
              `}
              disabled={true}
            >
              {option}
            </button>
          );
        })}
      </div>

      {!isLastIndex ? (
        <button
          onClick={() => dispatch({ type: NEXT_QUESTION })}
          className="btn btn-ui"
        >
          Next
        </button>
      ) : (
        <button
          onClick={() => dispatch({ type: FINISH_QUIZ })}
          className="btn btn-ui"
        >
          Finish
        </button>
      )}
    </div>
  );
}
export default AnsweredQuestions;
