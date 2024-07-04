function Option({ question, dispatch, answer }) {
  const hasAnswer = answer !== null;
  console.log(answer);
  return (
    <div>
      <div className="options">
        {question.options.map((option, index) => (
          <button
            className={`btn btn-option ${index === answer ? "answer" : ""} ${
              hasAnswer
                ? index === question.correctOption
                  ? "correct"
                  : "wrong"
                : " "
            }`}
            key={option}
            onClick={() => dispatch({ type: "newAnswer", payload: index })}
            disabled={hasAnswer}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
}

export default Option;
