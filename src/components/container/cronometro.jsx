import { useState, useRef } from 'react';

function Cronometro() {
    const [time, setTime] = useState(0);
    const intervalRef = useRef(null);

    const startTimer = () => {
    intervalRef.current = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
    }, 1000);
    };

    const stopTimer = () => {
        clearInterval(intervalRef.current);
    };

    return (
    <div>
        <p>Tiempo: {time} segundos</p>
        <button onClick={startTimer}>Iniciar</button>
        <button onClick={stopTimer}>Detener</button>
    </div>
    );
}

export default Cronometro;
