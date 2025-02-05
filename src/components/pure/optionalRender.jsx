import React, { useState } from 'react';

const LoginButton = ({loginAction}) => {
    return (
        <button onClick={loginAction}>Login</button>
    )
}

const LogoutButton = ({logoutAction}) => {
    return (
        <button onClick={logoutAction}>Logout</button>
    )
}

const OptionalRender = () => {

    const [access, setAcces] = useState(true);
    const [nMessages, setNMessages] = useState(0);

    const loginAction = () => {
        setAcces(true);
    }

    const logoutAction = () => {
        setAcces(false);
    }

    let optionalButton;

    access ? optionalButton = <LogoutButton logoutAction={logoutAction} /> : optionalButton = <LoginButton loginAction={loginAction} />;

    let addMessages = () => {
        setNMessages(nMessages + 1);
    }

    return (
        <div>
            {optionalButton}
            { nMessages > 0 && <p>Tienes {nMessages} mensajes</p> }
            { nMessages === 0 && <p>No tienes mensajes</p> }
            <button onClick={addMessages}>{nMessages === 0 ? 'añade tu primer mensaje' : 'añade otro mensaje'}</button>
        </div>
    )
};

export default OptionalRender;