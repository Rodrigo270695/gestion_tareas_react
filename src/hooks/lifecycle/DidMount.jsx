/**
 * Ejemplo de uso del metodo
 * de ciclo de vida en el componente y el hook de ciclo de vida en un componente funcional
 */

import React, { Component, useEffect } from 'react'

export class DidMount extends Component {

    componentDidMount() {
        console.log("ComponentDidMount: comportamiento antes de que el componente se anadido al DOM (renderice)")
    }

    render() {
        return (
            <div>
                <h1>ComponentDidMount</h1>
            </div>
        )
    }
}

export const DidmountHook = () => {

    useEffect(() => {
        console.log("ComponentDidMount: comportamiento antes de que el componente se anadido al DOM (renderice)")
    }, [])

    return (
        <div>
            <h1>ComponentDidMount</h1>
        </div>
    )
}