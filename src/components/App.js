import { useEffect, useReducer } from "react";
import Header from "./Header";
import Main from "./Main";
import Loader from "./Loader";
import Error from "./Error";
import StartScreen from "./StartScreen";
import Question from "./Question";
import NextQuestion from "./NextQuestion";
import Progress from "./Progress";
import FinishScreen from "./FinishScreen";
import Footer from "./Footer";
import Timer from "./Timer";


const SECS_PER_QUES=30;

const initialstate = {
  questions: [],

  step: "loading",
  index: 0,
  answer: null,
  points: 0,
  highscore: 0,
  timeRemaining : null
};

function reducer(state, action) {
  switch (action.type) {
    case "dataRecived":
      return { ...state, questions: action.payload, step: "ready" };
    case "notRecived":
      return { ...state, step: "error" };
    case "start":
      return { ...state, step: "active" , timeRemaining : state.questions.length* SECS_PER_QUES};
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
    case "finish":
      return {
        ...state,
        step: "finished",
        highscore:
          state.points > state.highscore ? state.points : state.highscore,
      };
      case 'restart':
        return {...initialstate,step : 'ready',questions : state.questions}
      case 'tick':
        return {...state, timeRemaining : state.timeRemaining -1,
          step : state.timeRemaining === 0 ? 'finished' : state.step

        }
    default:
      return new Error("data not able to fetched ");
  }
}
export default function App() {
  const [{ questions, step, index, answer, points,highscore ,timeRemaining}, dispatch] = useReducer(
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
            <Footer>
              <Timer dispatch={dispatch} timeRemaining={timeRemaining}/>
            <NextQuestion
              dispatch={dispatch}
              answer={answer}
              index={index}
              numberOfQuestions={numberOfQuestions}
            />
            </Footer>
        
          </>
        )}
        {step === "finished" && (
          <FinishScreen points={points} maxPossiblePoints={maxPossiblePoints} highscore={highscore} dispatch={dispatch}/>
        )}
      
      </Main>
    </div>
  );
}
