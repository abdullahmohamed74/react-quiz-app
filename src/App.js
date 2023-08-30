import { useReducer, useEffect } from 'react';
import {
  Error,
  Header,
  Loader,
  Main,
  Start,
  Question,
  NextQuestion,
  QuestionHeader,
  Score,
  QuestionFooter,
  Timer,
  AnsweredQuestions,
} from './components';
import reducer from './reducers/reducer';
import { DATA_ARRIVED, DATA_FAILED } from './actions';

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

function App() {
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
    <div className="app">
      <Header />
      <Main>
        {status === 'loading' && <Loader />}
        {status === 'error' && <Error />}
        {status === 'ready' && (
          <Start
            dispatch={dispatch}
            numQuestions={numQuestions}
            highScore={highScore}
            maxPoints={maxPoints}
            difficulty={difficulty}
          />
        )}
        {status === 'active' && (
          <>
            <QuestionHeader
              points={points}
              index={index}
              numQuestions={numQuestions}
              maxPoints={maxPoints}
              answerIndex={answerIndex}
            />
            <Question
              question={filteredQuestions[index]}
              answerIndex={answerIndex}
              dispatch={dispatch}
            />
            <QuestionFooter>
              <>
                <Timer numQuestions={numQuestions} dispatch={dispatch} />
                <NextQuestion
                  dispatch={dispatch}
                  answerIndex={answerIndex}
                  index={index}
                  numQuestions={numQuestions}
                />
              </>
            </QuestionFooter>
          </>
        )}
        {status === 'finished' && (
          <Score
            points={points}
            maxPoints={maxPoints}
            dispatch={dispatch}
            highScore={highScore}
          />
        )}
        {status === 'show-answers' && (
          <AnsweredQuestions
            question={filteredQuestions[index]}
            dispatch={dispatch}
            selectedOptionAnswers={selectedOptionAnswers}
            index={index}
            numQuestions={numQuestions}
          />
        )}
      </Main>
    </div>
  );
}
export default App;
