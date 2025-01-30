import React, { useState } from "react";
import Child from "../pure/child";

const Father = () => {

    const [name, setName] = useState('Martin');

    const showMessage = (text) => {
        alert(`Text: ${text}`)
    }

    const updateName = (newName) => {
        setName(newName);
    }

    return (
        <div className="border border-gray-300 rounded p-2 bg-gray-100">
            <Child name={name} send={showMessage} update={updateName}/>
        </div>
    )
}

export default Father;