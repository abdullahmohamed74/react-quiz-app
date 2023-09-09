import { createContext, useEffect, useReducer } from 'react';
import reducer from '../reducers/reducer';
import { DATA_ARRIVED, DATA_FAILED } from '../actions';

const QuizContext = createContext();

const initialState = {
  // constatnt value of all fetched questions
  questions: [],
  // the questions after select the difficulty
  // all application details are based on it
  filteredQuestions: [],
  // difficulty of the questions
  difficulty: 'all',
  // 'loading', 'error', 'ready', 'active', 'finished', 'show-answers'
  status: 'loading',
  // to show the current question ==> changing it changes the current Question
  index: 0,
  // control the selected answer ==> the (index) of answer in options array
  answerIndex: null,
  // collect the points of corrected answers
  points: 0,
  // the highscore of points the user get
  highScore: JSON.parse(localStorage.getItem('highscore')) ?? 0,
  // store and used to show the user answers
  selectedOptionAnswers: [],
};

function QuizProvider({ children }) {
  const [
    {
      status,
      filteredQuestions,
      difficulty,
      index,
      answerIndex,
      points,
      highScore,
      selectedOptionAnswers,
    },
    dispatch,
  ] = useReducer(reducer, initialState);

  const numQuestions = filteredQuestions.length;
  const maxPoints = filteredQuestions.reduce((acc, question) => {
    return acc + question.points;
  }, 0);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await fetch('/.netlify/functions/questions');
        const data = await response.json();

        dispatch({ type: DATA_ARRIVED, payload: { data } });
      } catch (error) {
        dispatch({ type: DATA_FAILED });
      }
    };

    fetchQuestions();
  }, []);

  useEffect(() => {
    localStorage.setItem('highscore', JSON.stringify(highScore));
  }, [highScore]);

  return (
    <QuizContext.Provider
      value={{
        status,
        filteredQuestions,
        difficulty,
        index,
        answerIndex,
        points,
        highScore,
        selectedOptionAnswers,
        numQuestions,
        maxPoints,

        dispatch,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
}

export { QuizProvider };
export default QuizContext;
