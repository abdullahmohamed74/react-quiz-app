import { useReducer } from 'react';

function reducer(state, action) {
  switch (action.type) {
    case 'COUNT_DECREASE':
      return { ...state, count: state.count - state.step };

    case 'COUNT_INCREASE':
      return { ...state, count: state.count + state.step };

    case 'SET_COUNT':
      return { ...state, count: action.payload };

    case 'SET_STEP':
      return { ...state, step: action.payload };

    case 'RESET':
      return { ...state, count: 0, step: 1 };

    default:
      throw new Error(`${action.type} action type is not exist`);
  }
}

function DateCounter() {
  const [state, dispatch] = useReducer(reducer, { count: 0, step: 1 });
  const { count, step } = state;

  // This mutates the date object.
  const date = new Date();
  date.setDate(date.getDate() + count);

  const handleCountDecrease = function () {
    dispatch({ type: 'COUNT_DECREASE' });
  };

  const handleCountIncrease = function () {
    dispatch({ type: 'COUNT_INCREASE' });
  };

  const handleCountChange = function (e) {
    dispatch({ type: 'SET_COUNT', payload: +e.target.value });
  };

  const handleStepChange = function (e) {
    dispatch({ type: 'SET_STEP', payload: +e.target.value });
  };

  const reset = function () {
    dispatch({ type: 'RESET' });
  };

  return (
    <div className="counter">
      <div>
        <input
          type="range"
          min="0"
          max="10"
          value={step}
          onChange={handleStepChange}
        />
        <span>{step}</span>
      </div>

      <div>
        <button onClick={handleCountDecrease}>-</button>
        <input value={count} onChange={handleCountChange} />
        <button onClick={handleCountIncrease}>+</button>
      </div>

      <p>
        {count === 0 && 'Today is'}
        {count > 0 && `${count} days from today is`}
        {count < 0 && `${Math.abs(count)} days ago was`}
      </p>
      <p>{date.toDateString()}</p>

      <div>
        <button onClick={reset}>Reset</button>
      </div>
    </div>
  );
}
export default DateCounter;
