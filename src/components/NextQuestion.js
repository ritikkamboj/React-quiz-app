function NextQuestion({ dispatch, answer, index, numberOfQuestions }) {
    // console.log('jai shree ram')
    // console.log(index, numberOfQuestions)
  if (answer === null) return null;
  if (index < numberOfQuestions - 1)
    return (
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "nextQuestion" })}
      >
        Next
      </button>
    );

  if (index === numberOfQuestions - 1)
  {
    console.log('equality mein aa gaya ')
    return (
        <button
          className="btn btn-ui"
          onClick={() => dispatch({ type: "finish" })}
        >
          Finish
        </button>
      );
  }
   
}

export default NextQuestion;
