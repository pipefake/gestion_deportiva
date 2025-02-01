import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Error404 } from '../views/public/Error404';
import Home from '../views/public/Home';

export const Routing = () => {
    return (
    <BrowserRouter>
            <Routes>
                <Route path='/' element={<Home />} />   
                {/* Configuramos la ruta para el error 404 */}
                <Route path="*" element={<Error404 />} />
            </Routes>

    </BrowserRouter>
    )
}