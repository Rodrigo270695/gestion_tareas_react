/**
 * Ejemplo de uso de método componenteWillUnmount en componente de clase y uso de hook en componente funcional
 * (Cuando el componente se desmonta)
 */

import React, { Component, useEffect } from 'react'

export class WillUnMount extends Component {
    componentWillUnmount() {
        console.log("ComponentWillUnmount: cuando el componente se va a desmontar")
    }
    render() {
        return (
            <div>
                <h1>WillUnMount</h1>
            </div>
        )
    }
}

export const WillUnMountHook = () => {    
    useEffect(() => {
        console.log("ComponentWillUnmount: cuando el componente se va a desmontar")
    }, [])    
    return (
        <div>
            <h1>WillUnMountHook</h1>
        </div>
    )
}