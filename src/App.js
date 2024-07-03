import { useEffect, useReducer } from "react";
// import DateCounter from "./DateCounter";
import Header from "./Header";
import Main from "./Main";
const initialState = {
  value: [],

  state: "loading..",
};

function reducer(state, action) {
  switch (action.type) {
    case "recieved":
      return { ...state, value: action.payload, state: "loaded" };

    case "dataFailer":
      return { ...state, state: "failed to fetch" };

    default:
      return new Error("data not able to fetched ");
  }
}

export default function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  useEffect(function () {
    fetch("http://localhost:8000/questions")
      .then((res) => res.json())
      .then((data) => dispatch({ type: "recieved", payload: data }))
      .catch((err) => dispatch({ type: "dataFailer" }));
  }, []);

  return (
    <div className="app">
      <Header />

      <Main>
        <p>1 /15</p>
        <p> Question </p>
      </Main>
    </div>
  );
}
