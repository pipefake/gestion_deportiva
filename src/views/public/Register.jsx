import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';
import fotoFelipeJimenez from '../../assets/sulogisticaLogo.png';
// import Axios from 'axios';


const Registro = () => {


    const [id_cedula, setID_cedula] = useState('');
    const [email, setEmail] = useState('');
    const [contrasena, setContrasena] = useState('');
    const [nombre, setNombre] = useState('');
    const [mensaje, setMensaje] = useState('');
    const navigate = useNavigate();

    const login = (e) => {
        e.preventDefault();
    }

    const handleRedirectionInicio =  (e) => {
        navigate('/login');
    }

    return (
        <div className='Home ingresarHome'>
            <div>
                <img className='' src={fotoFelipeJimenez} alt='foto de felipe jimenez' />
                <h2 className='largeText blueTittle poppins-semibold'>
                    Registrarse
                </h2>
                <p className='smallText poppins-regular'>
                    Cree una cuenta para poder ingresar a la prueba Full Stack.
                </p>
                <form className='formularioRegister' onSubmit={login}>
                    <input id='nombre'
                        className='input'
                        value={nombre}
                        name='nombre'
                        placeholder='Nombre'
                        onChange={(e) => setNombre(e.target.value)} />
                    <input
                        id='id_cedula'
                        className='input'
                        name='cedula'
                        value={id_cedula}
                        placeholder='Cédula'
                        onChange={(e) => setID_cedula(e.target.value)} />
                    <input
                        id='email'
                        className='input'
                        name='email'
                        value={email}
                        placeholder='Email'
                        onChange={(e) => setEmail(e.target.value)} />
                    <input id='contrasena'
                        className='input'
                        name='contrasena'
                        value={contrasena}
                        placeholder='Contraseña'
                        onChange={(e) => setContrasena(e.target.value)} />
<div className='content_botones'>
 <button id='nombreBtn' className='regularText loginBtn poppins-semibold'
                    >
                        Registrar
                    </button>
                    <button id='registerBtn'
                    className='btnNegativo poppins-semibold'
                    onClick={handleRedirectionInicio}>
                    Ya tengo una cuenta.
                </button>
</div>
                   
                </form>
                {mensaje && <p>{mensaje}</p>}
                
            </div>
        </div>
    )
}
export default Registro;