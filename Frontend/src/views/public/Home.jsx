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
                <h3 className="sombra-suave-texto largeText ligth-tittle poppins-regular nombre">Juan Felipe Jiménez Salazar</h3>
                <img className='foto sombra-suave' src={fotoFelipeJimenez} alt='foto de felipe jimenez' />
                <h2 className='sombra-suave-texto largeText blueTittle poppins-semibold'>
                    Prueba Full Stack
                </h2>
                <p className='poppins-regular parrafo sombra-medio-text'>
                    Esta api es una prueba para mi postulación
                    <br />
                    en el cargo de desarrollador fullstack,
                    <br />
                    en la empresa Susoftware.
                </p>
                <div className='content_botones'>
                    <button id='loginBtn' className=' regularText loginBtn poppins-semibold'
                        onClick={handleLogin}>
                        Login
                    </button >
                    <button id='registerBtn'
                        className='regularText btnNegativo poppins-semibold'
                        onClick={handleRegister}>
                        Register
                    </button>
                </div>

            </div>
        </div>
    )
}

export default Home;