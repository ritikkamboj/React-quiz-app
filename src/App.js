import { useEffect, useReducer } from "react";
import Header from "./Header";
import Main from "./Main";

const initialstate ={

  questions :[],

  step : 'loading'
}

function reducer (state , action)
{
  switch(action.type){
    case 'dataRecived':
      return {...state , questions : action.payload, step : 'Ready'}
    case 'notRecived':
      return {...state , step : 'Error'}
      default:
        return new Error("data not able to fetched ");  
}
}
export default function App() {

  const [state , dispatch]= useReducer(reducer , initialstate)
  useEffect(function () {
    fetch("http://localhost:8000/questions")
      .then((res) => res.json())
      .then((data) => dispatch({type :'dataRecived', payload : data}))
      .catch((err) => dispatch({type : 'notRecived'}));
  }, []);
  return (
    <div className="app">
      <Header />
      <Main>
        <p> 1/15</p>
        <p> Questions </p>
      </Main>
    </div>
  );
}
