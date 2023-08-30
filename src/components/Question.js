import { SET_ANSWER } from '../actions';

function Question({ question, answerIndex, dispatch }) {
  const isAnswered = answerIndex !== null;

  return (
    <div>
      <h4>{question.question}</h4>
      <div className="options">
        {question.options.map((option, optionIndex) => {
          return (
            <button
              key={option}
              onClick={() =>
                dispatch({ type: SET_ANSWER, payload: { optionIndex } })
              }
              className={`btn btn-option ${
                answerIndex === optionIndex ? 'answer' : ''
              } 
              ${
                // always mark the correct answer when click on any answer
                isAnswered && optionIndex === question.correctOption
                  ? 'correct'
                  : ''
              }
              ${
                // only mark wrong answer when click on it
                isAnswered &&
                optionIndex !== question.correctOption &&
                answerIndex === optionIndex
                  ? 'wrong'
                  : ''
              }
              `}
              disabled={isAnswered}
            >
              {option}
            </button>
          );
        })}
      </div>
    </div>
  );
}
export default Question;
