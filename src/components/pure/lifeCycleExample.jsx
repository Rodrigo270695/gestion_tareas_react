import React, { Component } from "react"

class LifeCycleExample extends Component {

    constructor(props) {
        super(props)
        console.log("Constructor: cuando se instancia el componente")
    }

    componentWillMount() {
        console.log("ComponentWillMount: cuando se va a renderizar el componente")
    }

    componentDidMount() {
        console.log("ComponentDidMount: cuando el componente ya se ha renderizado")
    }

    componentWillReceiveProps() {
        console.log("ComponentWillReceiveProps: cuando el componente va a recibir nuevos props")
    }

    shouldComponentUpdate() {
        /* console.log("ShouldComponentUpdate: controla si el componente debe ser o no actualizado")
        return true */
    }

    componentWillUpdate() {
        console.log("ComponentWillUpdate: cuando el componente va a ser actualizado")
    }

    componentDidUpdate() {
        console.log("ComponentDidUpdate: cuando el componente ya se ha actualizado")
    }

    componentWillUnmount() {
        console.log("ComponentWillUnmount: cuando el componente se va a desmontar")
    }
    
    render() {
        return (
            <div>
                
            </div>
        )
    }
}

export default LifeCycleExample