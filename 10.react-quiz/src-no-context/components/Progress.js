function Progress({numQuestions, index, points, totalPoints, answer}) {
    return (
        <header className="progress">
            <progress max={numQuestions} value={index + Number(answer !== null)}></progress>
            <p>Question <strong>{index+1}</strong>/<strong>{numQuestions}</strong></p>
            <p>Points <strong>{points}</strong>/<strong>{totalPoints}</strong></p>
        </header>
    )
}

export default Progress
