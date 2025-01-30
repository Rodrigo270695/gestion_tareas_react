import React, {useState} from "react";
import PropTypes from "prop-types";

const GreetingF = (props) => {

    const [age, setAge] = useState(25);

    const birthday = () => {
        setAge(age + 1);
    }

    return (
        <div>
            <h1>¡HOLA {props.name}! desde el componente funcional</h1>
            <h2>Tu edad es de: {age}</h2>    
            <button onClick={birthday}>Cumplir años</button>
        </div>
    )
};

GreetingF.propTypes = {
    name: PropTypes.string.isRequired,
};

export default GreetingF;