import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';
import Axios from 'axios';
import fotoFelipeJimenez from '../../assets/sulogisticaLogo.png';
// import Axios from 'axios';


const Registro = () => {


    const [cedula, setCedula] = useState('');
    const [email, setEmail] = useState('');
    const [contrasena, setContrasena] = useState('');
    const [nombre, setNombre] = useState('');
    const [mensaje, setMensaje] = useState('');
    const navigate = useNavigate();

    const login = async (e) => {
        e.preventDefault();
        const usuario = { nombre, email, contrasena, cedula };
        console.log(usuario);
        try {

            const respuesta = await Axios.post('http://localhost:3001/usuarios', usuario, {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
            );
            console.log(respuesta);
            const mensaje = respuesta.data.mensaje;
            const token = respuesta.data.token;

            if (mensaje !== 'Registro exitoso') {
                console.log('Usuario no registrado');
                setMensaje('Usuario no registrado');
            } else {
                setMensaje('Registro exitoso');
                console.log('Registro');
                sessionStorage.setItem('token', token)
            }

        } catch (err) {

            setMensaje('Registro Error');
            console.error(err.response ? err.response.data : err.message);
        }

    }

    const handleRedirectionInicio = (e) => {
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
                        id='cedula'
                        className='input'
                        name='cedula'
                        value={cedula}
                        placeholder='Cédula'
                        onChange={(e) => setCedula(e.target.value)} />
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