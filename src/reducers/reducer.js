import {
  DATA_ARRIVED,
  DATA_FAILED,
  SET_ANSWER,
  START_QUESTIONS,
  NEXT_QUESTION,
  RESTART_QUIZ,
  FINISH_QUIZ,
  SET_DIFFICULTY,
  SHOW_ANSWERS,
} from '../actions';

function reducer(state, action) {
  if (action.type === DATA_ARRIVED) {
    return {
      ...state,
      questions: action.payload.data,
      filteredQuestions: action.payload.data,
      status: 'ready',
    };
  }

  if (action.type === DATA_FAILED) {
    return {
      ...state,
      status: 'error',
    };
  }

  if (action.type === SET_DIFFICULTY) {
    const { questions } = state;
    const difficulty = action.payload.value;

    const filteredQuestions = questions.filter((question) =>
      difficulty === 'all' ? true : question.difficulty === difficulty
    );

    return {
      ...state,
      difficulty,
      filteredQuestions,
    };
  }

  if (action.type === START_QUESTIONS) {
    return {
      ...state,
      status: 'active',
    };
  }

  if (action.type === SET_ANSWER) {
    const { optionIndex } = action.payload;
    const question = state.filteredQuestions[state.index];

    // only add the points of corrected answer
    const answerPoints =
      optionIndex === question.correctOption ? question.points : 0;

    return {
      ...state,
      answerIndex: optionIndex,
      points: state.points + answerPoints,
      selectedOptionAnswers: [...state.selectedOptionAnswers, optionIndex],
    };
  }

  if (action.type === NEXT_QUESTION) {
    // show next question
    return {
      ...state,
      index: state.index + 1,
      answerIndex: null,
    };
  }

  if (action.type === FINISH_QUIZ) {
    // when you are in the last question
    // show the score board
    return {
      ...state,
      status: 'finished',
      highScore:
        state.points > state.highScore ? state.points : state.highScore,
    };
  }

  if (action.type === RESTART_QUIZ) {
    return {
      ...state,
      status: 'ready',
      index: 0,
      answerIndex: null,
      points: 0,
    };
  }

  if (action.type === SHOW_ANSWERS) {
    return {
      ...state,
      status: 'show-answers',
      index: 0,
    };
  }

  throw new Error(`${action.type} action type is unknown`);
}

export default reducer;
