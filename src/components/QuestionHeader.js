import useQuizContext from '../hooks/useQuizContext';

function QuestionHeader() {
  const { points, index, numQuestions, maxPoints } = useQuizContext();
  return (
    <header className="progress">
      <input
        type="range"
        className="range-input"
        value={index + 1}
        disabled
        min={1}
        max={numQuestions}
      />
      {/* <progress
        max={numQuestions}
        value={index + Number(answerIndex !== null)}
      ></progress> */}
      <p>
        Question <strong>{index + 1}</strong> / {numQuestions}
      </p>
      <p>
        <strong>{points}</strong> / {maxPoints}
      </p>
    </header>
  );
}
export default QuestionHeader;
