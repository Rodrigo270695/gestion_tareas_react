import React, { useState } from 'react'

const RegisterForm = () => {
    
    const initialData = {
        user: '',
        name: '',
        password: '',
        email: ''
    }
    
    const [data, setData] = useState(initialData);
    
    return (
        <div>
            <h2>Formulario de registro</h2>
            <form>
                <input 
                    type="text"
                    placeholder="Username"
                    value={data.user}
                    onChange={(e) => setData({...data, user: e.target.value})}
                />
                <input 
                    type="text"
                    placeholder="Name"
                    value={data.name}
                    onChange={(e) => setData({...data, name: e.target.value})}
                />
                <input 
                    type="email"
                    placeholder="Email"
                    value={data.email}
                    onChange={(e) => setData({...data, email: e.target.value})}
                />
                <input 
                    type="password"
                    placeholder="Password"
                    value={data.password}
                    onChange={(e) => setData({...data, password: e.target.value})}
                />
                <input type="submit" value="Register" />
            </form>
        </div>
    )
}

export default RegisterForm
        