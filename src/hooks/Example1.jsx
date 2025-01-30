/** 
 * Example 1 de uso del Hook use State
 * 
 * Crear un componente de tipo función y acceder a sy estado
 * privado a trevés de un hook y, a demás, poder modificarlo
 */ 

import React, {useState} from 'react'

const Example1 = () => {

    const valorInicial = 0;

    const personaInicial = {
        nombre: 'Rodrigo',
        email: 'rodrigo@hola-mundo.com'
    }

    const [contador, setContador] = useState(valorInicial);

    const [persona, setPersona] = useState(personaInicial);

    const incrementarContador = () => {
        setContador(contador + 1)
    }

    const actualizarPersona = () => {
        setPersona({
            nombre: 'Pepe',
            email: 'pepe@hola-mundo.com'
        })
    }

    return (
    <div>
        <h1>Example 1 - sobre Hook useState()</h1>
        <h2>Contador: {contador}</h2>
        <h2>Datos de la persona:</h2>
        <h3>Nombre: {persona.nombre}</h3>
        <h4>Email: {persona.email}</h4>
        <button onClick={incrementarContador}>Incrementar contador</button>
        <button onClick={actualizarPersona}>Actualizar persona</button>
    </div>
    )
}

export default Example1
