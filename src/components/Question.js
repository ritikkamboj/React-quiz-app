
import Option from "./Option";

function Question({ question }) {
  console.log(question);
  return (
    <div>
      {/* <p> Jai shree Ram </p> */}
      <h2>{question.question}</h2>
      <Option question={question}/>
     
    </div>
  );
}

export default Question;
