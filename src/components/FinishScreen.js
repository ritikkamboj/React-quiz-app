function FinishScreen({ points, maxPossiblePoints,highscore }) {
  console.log(maxPossiblePoints);
  const percentage = (points / maxPossiblePoints) * 100;
  return (<>
  <p className="result">
      You Scored <strong>{points}</strong> out of {maxPossiblePoints} (
      {Math.ceil(percentage)}%)
    </p>
    <p className="highscore">(High Score : {highscore} points)</p>
  </>
  
  );
}

export default FinishScreen;
