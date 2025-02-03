import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Error404 } from '../views/public/Error404';
import Home from '../views/public/Home';
import Login from '../views/public/Login';
import Registro from '../views/public/Register';
import Tasks from '../views/private/Tasks';
import ProtectedRoute from '../views/private/ProtectectedRoute';
import Header from '../components/Header';
import Profile from '../views/private/Profile'

export const Routing = () => {
    return (
        <BrowserRouter>

            <Routes>
                <Route path='/' element={<Home />} />
                {/* Ruta para ir al Login */}
                <Route path='/login' element={<Login />} />
                {/* Ruta para ir al Registro */}
                <Route path='/registro' element={<Registro />} />
                {/* Rutas protegidas */}
                <Route element={<ProtectedRoute />}>

                    <Route path='/tasks' element={<><Header /><Tasks /></>} />
                    <Route path='/perfil' element={<><Header /><Profile /></>} />
                </Route>
                {/* Configuramos la ruta para el error 404 */}
                <Route path="*" element={<Error404 />} />
            </Routes>

        </BrowserRouter>
    )
}