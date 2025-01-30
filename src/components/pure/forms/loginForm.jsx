/**
 * El componente que va a contener un formulario para la autenticación de usuario
 */

import React, { useState } from "react";

const LoginForm = () => {

    const initialCredentials = {
        user: "",
        password: ""
    }

    const [credentials, setCredentials] = useState(initialCredentials);

    const submit = (e) => {
        e.preventDefault();
    }

    return (
        <div>
            <h2>Formulario de login</h2>
            <form onSubmit={submit}>
                <input 
                    type="text"
                    placeholder="Username"
                    value={credentials.user}
                    onChange={(e) => setCredentials({...credentials, user: e.target.value})}
                />
                <input 
                    type="password"
                    placeholder="Password"
                    value={credentials.password}
                    onChange={(e) => setCredentials({...credentials, password: e.target.value})}
                />
                <input type="submit" value="Login" />
            </form>
        </div>
    )
}

export default LoginForm;