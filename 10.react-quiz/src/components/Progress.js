import { useAppContext } from "../contexts/AppContext"

function Progress() {
    const {numQuestions, index, points, totalPoints, answer} = useAppContext();
    return (
        <header className="progress">
            <progress max={numQuestions} value={index + Number(answer !== null)}></progress>
            <p>Question <strong>{index+1}</strong>/<strong>{numQuestions}</strong></p>
            <p>Points <strong>{points}</strong>/<strong>{totalPoints}</strong></p>
        </header>
    )
}

export default Progress
