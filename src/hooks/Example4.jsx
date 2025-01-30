/**
 * Ejemplo para entender el suso de props.children
 */

import React from 'react'

const Example4 = (props) => {
    return (
        <div>
            <h1>Example 4 - sobre props.children</h1>
            <h2>Nombre: {props.name}</h2>
            {props.children}
        </div>
    )
}   

export default Example4;