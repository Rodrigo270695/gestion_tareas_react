/** 
 * Ejemplo de Hooks:
 * - useState()
 * - useContext()
*/

import React, { useState, useContext } from 'react'

/**
 * 
 * @returns componente 1 
 * dispondra de un contexto que va a tener un valor
 * que recibe desde el padre
 */

const miContext = React.createContext(null);

const Componente1 = () => {

    const state = useContext(miContext);
    return (
        <div>
            <h1>El token es: {state.token}</h1>
            <Componente2 />
        </div>
    )
}

const Componente2 = () => {
    
    const state = useContext(miContext);

    return (
        <div>
            <h2>La sesión es: {state.session}</h2>
        </div>
    )
}

export default function MicomponenteConContexto() {
    
    const estadoInicial = {
        token: '123456789',
        session: 1
    }

    const [sesionData, setSesionData] = useState(estadoInicial);

    const actualizarSesion = () => {
        setSesionData({
            token: 'JWT123456',
            session: sesionData.session + 1
        })
    }

    return (
        <div>
            <miContext.Provider value={sesionData}>
                <h1>Example 3 - sobre Hook useContext()</h1>
                <Componente1 />
                <button onClick={actualizarSesion}>Actualizar sesión</button>
            </miContext.Provider>
        </div>
    )
}
