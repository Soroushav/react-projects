function FinishedStatus({points, totalPoints, highScore, dispatch}) {
    const percentage = (points / totalPoints) * 100;
    let emoji;
    if (percentage === 100) emoji= "🏅";
    else if (percentage >= 80 && percentage < 100) emoji="😍";
    else if (percentage >= 50 && percentage < 80) emoji="🙂";
    else if (percentage >= 20 && percentage < 50) emoji="😶";
    else if (percentage >= 0 && percentage < 20) emoji="😑";

    return (
        <>
        <p className="result">{emoji}
            You Scored <strong>{points}</strong> out of {totalPoints} ({Math.ceil(percentage)}%).
        </p>
        <p className="highscore">(Highest Score is : {highScore})</p>
        <button className="btn btn-ui" onClick={()=>dispatch({type: "restart"})}>Restart</button>
        </>
    )
}

export default FinishedStatus
