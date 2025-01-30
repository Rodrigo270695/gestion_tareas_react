/** 
 * Ejemplo de uso de:
 * - useState()
 * - useRef()
 * - useEffect()
*/

import React from 'react'
import { useState, useRef, useEffect } from 'react'

const Example2 = () => {

    const [counter1, setCounter1] = useState(0);
    const [counter2, setCounter2] = useState(0);

    const miRef = useRef(0);

    const incrementar1 = () => {
        setCounter1(counter1 + 1)
    }

    const incrementar2 = () => {
        setCounter2(counter2 + 1)
    }

/*     useEffect(() => {
        console.log('Cambio en el estado del componente')
        console.log(miRef)
    }) */

/*     useEffect(() => {
        console.log('Cambio en el estado del contador 1')   
        console.log(miRef)
    }, [counter1]) */

    useEffect(() => {
        console.log('Cambio en el estado del contador 1 o 2')   
        console.log(miRef)
    }, [counter1, counter2])

    return (
        <div>
            <h1>Example 2 - sobre Hook useState(), useRef() y useEffect()</h1>
            <h2>Contador 1: {counter1}</h2>
            <h2>Contador 2: {counter2}</h2>
            <h4 ref={miRef}>Ejemplo de elemento ref</h4>
            <div>
                <button onClick={incrementar1}>Incrementar contador 1</button>
                <button onClick={incrementar2}>Incrementar contador 2</button>
            </div>
        </div>
    )
}

export default Example2;