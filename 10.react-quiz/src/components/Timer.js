import { useEffect } from "react"
import { useAppContext } from "../contexts/AppContext";

function Timer() {
    const {dispatch, secondsRemaining} = useAppContext();
    const seconds = secondsRemaining % 60;
    const minutes = Math.floor(secondsRemaining / 60);
    useEffect(function(){
        const id = setInterval(function(){
            dispatch({type: "timer"});
            
        }, 1000)
        return (function(){
            clearInterval(id);
        })
    }, [])
    return (
        <div className="timer">
            {minutes < 10 && "0"}{minutes} : {seconds < 10 && "0"}{seconds}
        </div>
    )
}

export default Timer
