import { useContext } from 'react';
import QuizContext from '../context/quizContext';

function useQuizContext() {
  return useContext(QuizContext);
}
export default useQuizContext;
