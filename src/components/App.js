import { useEffect, useReducer } from "react";
import Header from "./Header";
import Main from "./Main";
import Loader from "./Loader";
import Error from "./Error";
import StartScreen from "./StartScreen";
import Question from "./Question";

const initialstate = {
  questions: [],

  step: "loading",
  index : 0,

  

};

function reducer(state, action) {
  switch (action.type) {
    case "dataRecived":
      return { ...state, questions: action.payload, step: "ready" };
    case "notRecived":
      return { ...state, step: "error" };
      case 'start':
        return {...state , step : 'active' }
    default:
      return new Error("data not able to fetched ");
  }
}
export default function App() {
  const [{ questions, step , index}, dispatch] = useReducer(reducer, initialstate);

const numberOfQuestions = questions.length;
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
        {step === 'ready' &&  <StartScreen numberOfQuestions={numberOfQuestions} dispatch={dispatch}/>}
        {step ==='active' && <Question question ={questions[index]}/>}
      </Main>
    </div>
  );
}
