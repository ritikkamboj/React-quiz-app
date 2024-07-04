
import Option from "./Option";

function Question({ question, dispatch, answer}) {
  console.log(question);
  return (
    <div>
      {/* <p> Jai shree Ram </p> */}
      <h2>{question.question}</h2>
      <Option question={question} dispatch={dispatch} answer={answer} />
     
    </div>
  );
}

export default Question;
