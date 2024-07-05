import { useEffect, useReducer } from "react";
import Header from "./Header";
import Main from "./Main";
import Loader from "./Loader";
import Error from "./Error";
import StartScreen from "./StartScreen";
import Question from "./Question";
import NextQuestion from "./NextQuestion";
import Progress from "./Progress";

const initialstate = {
  questions: [],

  step: "loading",
  index: 0,
  answer: null,
  points: 0,
};

function reducer(state, action) {
  switch (action.type) {
    case "dataRecived":
      return { ...state, questions: action.payload, step: "ready" };
    case "notRecived":
      return { ...state, step: "error" };
    case "start":
      return { ...state, step: "active" };
    case "newAnswer":
      const question1 = state.questions.at(state.index);

      return {
        ...state,
        answer: action.payload,
        points:
          action.payload === question1.correctOption
            ? state.points + question1.points
            : state.points,
      };
    case "nextQuestion":
      return { ...state, index: state.index + 1, answer: null };
    default:
      return new Error("data not able to fetched ");
  }
}
export default function App() {
  const [{ questions, step, index, answer, points }, dispatch] = useReducer(
    reducer,
    initialstate
  );

  const numberOfQuestions = questions.length;
  const maxPossiblePoints = questions.reduce(
    (prev, cur) => prev + cur.points,
    0
  );

  // console.log(numberOfQuestions)

  useEffect(function () {
    fetch("http://localhost:8000/questions")
      .then((res) => res.json())
      .then((data) => dispatch({ type: "dataRecived", payload: data }))
      .catch((err) => dispatch({ type: "notRecived" }));
  }, []);
  return (
    <div className="app">
      <Header />
      <Main>
        {step === "loading" && <Loader />}
        {step === "error" && <Error />}
        {step === "ready" && (
          <StartScreen
            numberOfQuestions={numberOfQuestions}
            dispatch={dispatch}
          />
        )}
        {step === "active" && (
          <>
            <Progress
              index={index}
              numberOfQuestions={numberOfQuestions}
              points={points}
              maxPossiblePoints={maxPossiblePoints}
              answer={answer}
            />

            <Question
              question={questions[index]}
              dispatch={dispatch}
              answer={answer}
            />
            <NextQuestion dispatch={dispatch} answer={answer} />
          </>
        )}
      </Main>
    </div>
  );
}
