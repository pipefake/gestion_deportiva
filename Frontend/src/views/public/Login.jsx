import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';
import fotoFelipeJimenez from '../..//assets/sulogisticaLogo.png';
// import Axios from 'axios';



const Login = () => {

    const [email, setEmail] = useState('');
    const [contrasena, setContrasena] = useState('');

    const navigate = useNavigate();

    const login = (e) => {
        e.preventDefault();

    }

    const handleRedirectionRegister =  (e) => {
        navigate('/registro');
    }

    return (
        <div className='Home ingresarHome'>
            <div>
                <img className='' src={fotoFelipeJimenez} alt='foto de felipe jimenez' />
                <h2 className='largeText blueTittle poppins-semibold'>
                    Ingresar
                </h2>
                <p className='smallText poppins-regular'>
                    Bienvenidos a esta prueba técnica Full Stack.
                </p>
                <form onSubmit={login}>
                    <input
                        id='email'
                        className='input'
                        name='email'
                        value={email}
                        placeholder='Email'
                        onChange={(e) => setEmail(e.target.value)} />
                    <input id='contrasena'
                        className='input'
                        type='password'
                        name='contrasena'
                        placeholder='Contraseña'
                        onChange={(e) => setContrasena(e.target.value)} />
                        <div className='content_botones'>
                            
                    <button id='loginBtn' className='loginBtn regularText poppins-semibold'
                    >
                        Login
                    </button >
                    <button id='registerBtn'
                    className='btnNegativo poppins-semibold'
                    onClick={handleRedirectionRegister}>
                    Crear una nueva cuenta.
                </button>
</div>
                </form>
            </div>
        </div>
    )
}

export default Login;