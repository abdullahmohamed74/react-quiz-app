import { useEffect, useState } from 'react';
import { FINISH_QUIZ } from '../actions';
import useQuizContext from '../hooks/useQuizContext';

const SECS_PER_QUESTION = 30;

function Timer() {
  const { numQuestions, dispatch } = useQuizContext();
  const [time, setTime] = useState(numQuestions * SECS_PER_QUESTION);

  const mins = Math.floor(time / 60);
  const secs = Math.floor(time % 60);

  useEffect(() => {
    if (time === 0) {
      dispatch({ type: FINISH_QUIZ });
      return;
    }

    const id = setInterval(() => {
      setTime((curTime) => curTime - 1);
    }, 1000);

    return () => clearInterval(id);
  }, [time, dispatch]);

  return (
    <div className="timer">
      {mins < 10 && 0}
      {mins}:{secs < 10 && 0}
      {secs}
    </div>
  );
}
export default Timer;
