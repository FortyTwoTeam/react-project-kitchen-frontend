import React from "react";
import s from './style.module.scss';

export default (props) => {
    const [timeLeft, setTimeLeft] = React.useState(5);
    React.useEffect(() => {
        const timer = setTimeout(() => {
            setTimeLeft(timeLeft-1);
        }, 1000);
        return () => {
            clearTimeout(timer)
        }
    });
    if (timeLeft === 0) {
        props.onTimeExpired()
    }

    return (
        <p className={s.timer}>{timeLeft}</p>
    )
}