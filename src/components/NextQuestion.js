import { FINISH_QUIZ, NEXT_QUESTION } from '../actions';
import useQuizContext from '../hooks/useQuizContext';

function NextQuestion() {
  const { dispatch, answerIndex, index, numQuestions } = useQuizContext();
  
  // only show Next or Finish buttom when the user selects an answer
  if (answerIndex === null) return;

  const isLastQuestion = index === numQuestions - 1;

  if (isLastQuestion) {
    return (
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: FINISH_QUIZ })}
      >
        Finish
      </button>
    );
  }

  return (
    <button
      className="btn btn-ui"
      onClick={() => dispatch({ type: NEXT_QUESTION })}
    >
      Next
    </button>
  );
}
export default NextQuestion;
