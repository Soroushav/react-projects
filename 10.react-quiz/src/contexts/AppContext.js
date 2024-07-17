import { createContext, useContext, useEffect, useReducer } from "react";

const AppContext = createContext();
const SEC_REMAINING_PER_Q = 30;

const initialState = {
  questions: [],

  status: "loading",
  index: 0,
  answer: null,
  points: 0,
  highScore: 0,
  secondsRemaining: null,
};

function reducer(state, action) {
  switch (action.type) {
    case "dataRecieved":
      return { ...state, questions: action.payload, status: "ready" };
    case "dataFailed":
      return { ...state, status: "failed" };
    case "start":
      return {
        ...state,
        status: "active",
        secondsRemaining: state.questions.length * SEC_REMAINING_PER_Q,
      };
    case "newAnswer":
      const question = state.questions.at(state.index);
      return {
        ...state,
        answer: action.payload,
        points:
          action.payload === question.correctOption
            ? state.points + question.points
            : state.points,
      };
    case "nextQuestion":
      return { ...state, index: state.index + 1, answer: null };
    case "finish":
      return {
        ...state,
        status: "finished",
        highScore: `${
          state.points > state.highScore ? state.points : state.highScore
        }`,
      };

    case "restart":
      return {
        ...initialState,
        highScore: state.highScore,
        questions: state.questions,
        status: "ready",
      };

    case "timer":
      return {
        ...state,
        secondsRemaining: state.secondsRemaining - 1,
        status: state.secondsRemaining === 0 ? "finished" : state.status,
      };
    default:
      throw new Error("Unknown action!");
  }
}

function AppProvider({children}) {
  const [
    { questions, status, index, answer, points, highScore, secondsRemaining },
    dispatch,
  ] = useReducer(reducer, initialState);
  const numQuestions = questions.length;
  const totalPoints = questions.reduce((acc, cur)=> acc + cur.points , 0);

  useEffect(function () {
    fetch("http://localhost:9000/questions")
      .then((res) => res.json())
      .then((data) => dispatch({ type: "dataRecieved", payload: data }))
      .catch((err) => dispatch({ type: "dataFailed" }));
  }, []);

  return <AppContext.Provider value={{
    status,
    numQuestions,
    index,
    points,
    totalPoints,
    answer,
    question: questions[index],
    highScore,
    secondsRemaining,
    dispatch
  }}>
    {children}
  </AppContext.Provider>
}

function useAppContext(){
    const context = useContext(AppContext);
    if (!context) {
        throw new Error("useAppContext must be used within an AppProvider");
      }
    return context
}

export {useAppContext, AppProvider}