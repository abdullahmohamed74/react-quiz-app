import { RESTART_QUIZ, SHOW_ANSWERS } from '../actions';

function Score({ points, maxPoints, dispatch, highScore }) {
  const percentage = Math.ceil((points / maxPoints) * 100);
  return (
    <div>
      <p className="result">
        You scored <strong>{points}</strong> out of {maxPoints} ({percentage}%)
      </p>
      <p className="highscore">(Highscore: {highScore} points)</p>

      <div className="score-buttons-container">
        <button
          onClick={() => dispatch({ type: SHOW_ANSWERS })}
          className="btn btn-ui"
        >
          Show Answers
        </button>

        <button
          onClick={() => dispatch({ type: RESTART_QUIZ })}
          className="btn btn-ui"
        >
          Restart Quiz
        </button>
      </div>
    </div>
  );
}
export default Score;
