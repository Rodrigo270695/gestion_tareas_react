import React, {useRef} from "react";

const Child = ({name, send, update}) => {

    const messageRef = useRef();
    const nameRef = useRef();

    const pressButton = () => {
        const text = messageRef.current.value
        alert(`Default Text: ${text}`)
    }

    const pressButtonParams = (text) => {
        alert(`Text:  ${text}`)
    }

    const submitForm = (e) => {
        e.preventDefault()
        update(nameRef.current.value)
    }

    return (
        <div className="border border-gray-300 rounded p-2 bg-blue-100">
            <p onMouseOver={() => console.log('On mouse over')}>Hello, {name}</p>
            <button onClick={() => console.log('Botón 1 pulsado')}>Botón 1</button>
            <button onClick={pressButton}>Botón 2</button>
            <button onClick={() => pressButtonParams('Text 1')}>Botón 3</button>
            <input className="text border border-gray-300 rounded p-2" type="text" 
                placeholder='Inserte el texto'
                ref={messageRef}
                onFocus={() => console.log('On focus')}
                onChange={(e) => console.log('Input changed: ', e.target.value)}
                onCopy={() => console.log('Text copied')}
            />
            <button onClick={() => send(messageRef.current.value)}>Send Message</button>
            <div className="border border-gray-300 rounded p-2 bg-green-100">
                <form onSubmit={submitForm}>
                    <input className="text border border-gray-300 rounded p-2" type="text" 
                        placeholder='Inserte el nombre'
                        ref={nameRef}
                    />
                    <button className='mt-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded' type='submit'>Update Name</button>
                </form>
            </div>
        </div>
    );
}

export default Child