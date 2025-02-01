import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';
import fotoFelipeJimenez from '../../assets/felipejimenez.jpg';

const Home = () => {

    const navigate = useNavigate();

    const handleLogin = () => {
        navigate('login');
    };

    const handleRegister = () => {
        navigate('registro');
    };

    return (
        <div className='Home'>
            <div>
                <h3 className='largeText ligth-tittle poppins-regular'>
                    Juan Felipe Jiménez Salazar
                </h3>
                <img className='foto' src={fotoFelipeJimenez} alt='foto de felipe jimenez' />
                <h2 className='largeText blueTittle poppins-semibold'>
                    Prueba Full Stack
                </h2>
                <p className='smallText poppins-regular'>
                    Esta api es una prueba para mi postulación en la empresa Susoftware.
                </p>
                <button id='loginBtn' className='regularText loginBtn poppins-semibold'
                    onClick={handleLogin}>
                    Login
                </button >
                <button id='registerBtn'
                    className='regularText registerBtn poppins-semibold'
                    onClick={handleRegister}>
                    Register
                </button>
            </div>
        </div>
    )
}

export default Home;