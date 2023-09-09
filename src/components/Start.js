import { SET_DIFFICULTY, START_QUESTIONS } from '../actions';
import useQuizContext from '../hooks/useQuizContext';

function Start() {
  const { numQuestions, dispatch, highScore, difficulty } = useQuizContext();

  return (
    <div className="start">
      <h2>Welcome to The React Quiz!</h2>

      <h3>{numQuestions} questions to test your React mastery</h3>

      <div className="select-container">
        <p>select the difficulty of the questions</p>
        <select
          value={difficulty}
          onChange={(e) =>
            dispatch({
              type: SET_DIFFICULTY,
              payload: { value: e.target.value },
            })
          }
        >
          <option value="all">All</option>
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>
      </div>

      <div className="start-container">
        <p className="btn start-highscore">
          Highscore <strong>{highScore}</strong>
        </p>
        <button
          onClick={() => dispatch({ type: START_QUESTIONS })}
          className="btn btn-ui"
        >
          Let's start
        </button>
      </div>
    </div>
  );
}
export default Start;
