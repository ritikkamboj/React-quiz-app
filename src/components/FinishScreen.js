function FinishScreen({ points, maxPossiblePoints,highscore, dispatch }) {
  console.log(maxPossiblePoints);
  const percentage = (points / maxPossiblePoints) * 100;
  return (<>
  <p className="result">
      You Scored <strong>{points}</strong> out of {maxPossiblePoints} (
      {Math.ceil(percentage)}%)
    </p>
    <p className="highscore">(High Score : {highscore} points)</p>
    <button className="btn btn-ui" onClick={()=> dispatch({type : 'restart'})}>Restart Quiz</button>
  </>
  
  );
}

export default FinishScreen;
