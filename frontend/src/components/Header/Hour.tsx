import {useState, useEffect} from "react";

const Time = () => {
    var [date, setDate] = useState(new Date())

    useEffect(() => {
        var timer = setInterval(() => setDate(new Date()), 1000)

        return function cleanup(){
            clearInterval(timer)
        }
    }, []);

    return(
        <span className="align-center text-center" style={{fontSize: "2rem"}}>{date.toLocaleTimeString()}</span>
    )
}

export default Time;