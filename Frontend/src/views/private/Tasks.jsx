import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { List, Button, Modal, Input, DatePicker } from 'antd';
import './list.css';
import Axios from 'axios';
import { jwtDecode } from "jwt-decode";

const { TextArea } = Input;

const Tasks = () => {
    const [data, setData] = useState([]); // Inicializando datos como un array vacío
    const [error, setError] = useState(null); // Estado para almacenar mensajes de error
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isModalOpenTask, setIsModalOpenTask] = useState(false);
    const [selectedTask, setSelectedTask] = useState(null); // Tarea seleccionada para vista detallada
    const [id_user, setId_user] = useState();
    // Estados para los valores del formulario
    const [titulo, setTitulo] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [fechaInicio, setFechaInicio] = useState(null);
    const [fechaFin, setFechaFin] = useState(null);

    const showModal = (task) => {
        setSelectedTask(task);
        setIsModalOpen(true);
    };

    const showModalAddTask = () => {
        setIsModalOpenTask(true);
    };

    const handleOkDetail = async (id) => {
        setIsModalOpen(false);
        setIsModalOpenTask(false);
        const token = sessionStorage.getItem('token');
        if (!token) {
            setError('Token no encontrado');
            return;
        }
        try {
            // Usamos backticks para la interpolación de variables
            const respuesta = await Axios.put(`http://127.0.0.1:3001/user/confirmtask/${id}`, null, {
                headers: { Authorization: token },
            });

            const mensaje = respuesta.data.mensaje;
            if (mensaje !== 'Tarea actualizada') {
                console.log('Algo anda mal');
            } else {
                console.log('Tarea creada con éxito');
                fetchData();
            }
        } catch (error) {
            console.error('Error al crear tarea:', error);
        }
    };

    // Función para manejar el envío del formulario de creación de tarea
    const handleOkCreate = async () => {
        setIsModalOpenTask(false);
        const token = sessionStorage.getItem('token');
        if (!token) {
            setError('Token no encontrado');
            return;
        }

        const decoded = jwtDecode(token);

        const usuario = {
            titulo,
            descripcion,
            fecha_inicio: fechaInicio ? fechaInicio.format('YYYY-MM-DD') : '',
            fecha_fin: fechaFin ? fechaFin.format('YYYY-MM-DD') : '',
            id_usuario: decoded.id,
        };

        try {
            const respuesta = await Axios.post('http://localhost:3001/user/tarea', usuario, {
                headers: { Authorization: token },
            });

            const mensaje = respuesta.data.mensaje;
            if (mensaje !== 'Registro exitoso') {
                console.log('Algo anda mal');
            } else {
                console.log('Tarea creada con éxito');
                fetchData(); // Recargar los datos después de crear una tarea
            }
        } catch (error) {
            console.error('Error al crear tarea:', error);
        }
    };

    const handleCancelDetail = () => {
        setIsModalOpen(false);
    };

    const handleCancelCreate = () => {
        setIsModalOpenTask(false);
    };

    // Función para obtener los datos de las tareas
    const fetchData = async () => {
        try {
            const token = sessionStorage.getItem('token');

            if (!token) {
                setError('Token no encontrado');
                return;
            }
            const decoded = jwtDecode(token);
            setId_user(decoded.id);


            const id_usuario = decoded.id;

            const response = await axios.get(`http://localhost:3001/user/tareas/${id_usuario}`, {
                headers: { Authorization: token },
            });
            if (response.data.mensaje !== 'Operación exitosa') {
                setError('Respuesta de la API indica error: ' + response.data.mensaje);
                setData([]);
            } else {
                setData(response.data.tasks || []);
            }
        } catch (err) {
            setError('Error al obtener datos: ' + (err.response ? err.response.data : err.message));
        }
    };

    const parseoFechas = (fecha) => {
        const [day, month, year] = fecha.split('-');
        const date = new Date(year, month - 1, day);
        return date.toLocaleDateString('es-ES');
    };

    useEffect(() => {
        fetchData();
    }, []); // Se ejecuta una sola vez cuando el componente se monta

    return (
        <div className='content-tasks'>
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
                <Button className='btnCreateTask' type="primary" onClick={showModalAddTask}>Crear nueva tarea</Button>
            </div>

            {error && <div style={{ color: 'red', textAlign: 'center' }}>{error}</div>}

            <List
                className="lista"
                itemLayout="horizontal"
                dataSource={data}
                split
                renderItem={(item) => (
                    <List.Item>
                        <List.Item.Meta
                            className="text_list"
                            title={<a onClick={() => showModal(item)}>{item.titulo}</a>}
                            description={`${parseoFechas(item.fecha_inicio)} - ${parseoFechas(item.fecha_fin)}`}
                        />
                        {item.descripcion}
                    </List.Item>
                )}
            />

            {/* Modal para crear nueva tarea */}
            <Modal
                title="Crear Nueva Tarea"
                open={isModalOpenTask}
                onOk={handleOkCreate}
                onCancel={handleCancelCreate}
            >
                <Input
                    placeholder="Titulo"
                    value={titulo}
                    onChange={(e) => setTitulo(e.target.value)}
                />
                <TextArea
                    placeholder="Descripción"
                    value={descripcion}
                    onChange={(e) => setDescripcion(e.target.value)}
                    allowClear
                />
                <DatePicker
                    placeholder="Fecha Inicio"
                    value={fechaInicio}
                    onChange={(date) => setFechaInicio(date)}
                />
                <DatePicker
                    placeholder="Fecha Fin"
                    value={fechaFin}
                    onChange={(date) => setFechaFin(date)}
                />
            </Modal>

            {/* Modal de detalles de tarea */}
            <Modal
                title="Detalles de la Tarea"
                open={isModalOpen}
                onOk={() => handleOkDetail(selectedTask.id_tarea)}
                onCancel={handleCancelDetail}
            >

                {selectedTask && (
                    <>
                        <p><strong>Titulo:</strong> {selectedTask.titulo}</p>
                        <p><strong>Fecha:</strong> {parseoFechas(selectedTask.fecha_inicio)} - {parseoFechas(selectedTask.fecha_fin)}</p>
                        <p><strong>Descripción:</strong> {selectedTask.descripcion}</p>
                    </>
                )}
            </Modal>
        </div>
    );
};

export default Tasks;
