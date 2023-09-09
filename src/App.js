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
import useQuizContext from './hooks/useQuizContext';

function App() {
  const { status } = useQuizContext();

  return (
    <div className="app">
      <Header />
      <Main>
        {status === 'loading' && <Loader />}
        {status === 'error' && <Error />}
        {status === 'ready' && <Start />}
        {status === 'active' && (
          <>
            <QuestionHeader />
            <Question />
            <QuestionFooter>
              <>
                <Timer />
                <NextQuestion />
              </>
            </QuestionFooter>
          </>
        )}
        {status === 'finished' && <Score />}
        {status === 'show-answers' && <AnsweredQuestions />}
      </Main>
    </div>
  );
}
export default App;
