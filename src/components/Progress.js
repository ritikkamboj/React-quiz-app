function Progress({index,numberOfQuestions,points, maxPossiblePoints, answer}) {
    // console.log(numberOfQuestions)
    return (
       <header className="progress">
        <progress max={numberOfQuestions} value={index + Number( answer !== null  )}></progress>
        <p>Questions <strong>{index+1}/{numberOfQuestions}</strong></p>
        <p><strong>{points}/{maxPossiblePoints}</strong></p>
       </header>
    )
}

export default Progress
