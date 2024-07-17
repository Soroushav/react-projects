import Header from "./Header";
import Main from "./Main";
import Loader from "./Loader";
import Error from "./Error";
import StartScreen from "./StartScreen";
import Question from "./Question";
import React, { act, useEffect, useReducer } from "react";
import NextQuestion from "./NextQuestion";
import Progress from "./Progress";
import FinishedStatus from "./FinishedStatus";
import Footer from "./Footer";
import Timer from "./Timer";
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
      return { ...state, status: "active", secondsRemaining: state.questions.length * SEC_REMAINING_PER_Q };
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
      return {...state, status: "finished", highScore: `${state.points > state.highScore ? state.points : state.highScore}`};

    case "restart":
      return {...initialState, highScore: state.highScore, questions: state.questions, status: "ready"};

    case "timer":
      return {...state, secondsRemaining: state.secondsRemaining - 1, status: state.secondsRemaining === 0 ? "finished" : state.status };
    default:
      throw new Error("Unknown action!");
  }
}
export default function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { status, questions, index, answer, points, highScore, secondsRemaining } = state;
  const numQuestions = questions.length;
  const totalPoints = questions.reduce((acc, cur)=> acc + cur.points , 0);
  useEffect(function () {
    fetch("http://localhost:9000/questions")
      .then((res) => res.json())
      .then((data) => dispatch({ type: "dataRecieved", payload: data }))
      .catch((err) => dispatch({ type: "dataFailed" }));
  }, []);
  return (
    <div className="app">
      <Header />
      <Main>
        {status === "loading" && <Loader />}
        {status === "failed" && <Error />}
        {status === "ready" && (
          <StartScreen numQuestions={numQuestions} dispatch={dispatch} />
        )}
        {status === "active" && (
          <>
          <Progress numQuestions={numQuestions} index={index} points={points} totalPoints={totalPoints} answer={answer}/>
            <Question
              question={questions[index]}
              dispatch={dispatch}
              answer={answer}
            />
            <Footer>
              <NextQuestion dispatch={dispatch} answer={answer} index={index} numQuestions={numQuestions}/>
              <Timer dispatch={dispatch} secondsRemaining={secondsRemaining} />
            </Footer>
          </>
        )}
        {status === "finished" && (
          <>
            <FinishedStatus points={points} totalPoints={totalPoints} highScore={highScore} dispatch={dispatch}/>
          </>
        )}
      </Main>
    </div>
  );
}
