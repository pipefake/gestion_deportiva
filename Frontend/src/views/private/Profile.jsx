import React, { useState, useEffect } from 'react';
import './list.css';
import { Button, Select, Form, Input } from 'antd';
import { jwtDecode } from "jwt-decode";
import axios from 'axios';
import { decode } from 'punycode';

const Profile = () => {
    const [data, setData] = useState({});
    const [form] = Form.useForm();
    const [departamentos, setDepartamentos] = useState([]);
    const [sedes, setSedes] = useState([]);
    const token = sessionStorage.getItem('token');
    const [id_user, setId_user] = useState([]);

    useEffect(() => {
        if (token) {
            const decoded = jwtDecode(token);
            setData(decoded);
            setId_user(decoded.id);
            form.setFieldsValue({
                id: decoded.id_usuario,
                nombre: decoded.nombre,
                cedula: decoded.cedula,
                email: decoded.email,
                departamento: decoded.departamento,
                sede: decoded.sede,
            });
        }

        // Realizar la solicitud para obtener los datos de departamentos y sedes
        axios.get('http://127.0.0.1:3001/user/cabecera', {
            headers: {
                Authorization: token
            }
        })
            .then(response => {
                const { departamentos, sedes } = response.data;
                setDepartamentos(departamentos);  // Almacenar los departamentos
                setSedes(sedes);  // Almacenar las sedes
            })
            .catch(error => {
                console.error("Error al obtener los datos:", error);
            });

    }, [token, form]);

    const onFinish = (values) => {

        const id_usuario = id_user;

        const payload = {
            nombre: values.nombre,
            rol: "",
            cedula: values.cedula,
            email: values.email,
            id_sede: values.sede,
            id_departamento: values.departamento,
            contrasena: values.contrasena
        };

        // Enviar la solicitud POST con Axios
        axios.post(`http://127.0.0.1:3001/usuarios/${id_usuario}`, payload, {
            headers: {
                Authorization: token
            }
        })
            .then(response => {
                console.log("Datos enviados correctamente:", response);
            })
            .catch(error => {
                console.error("Error al enviar los datos:", error);
            });
    };



    const onFinishFailed = (errorInfo) => {
        console.log('Error en el envío:', errorInfo);
    };

    return (
        <div className='content-profile'>
            <Form
                form={form}
                className='profile'
                name="basic"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                style={{ maxWidth: 600 }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                <Form.Item
                    label="Nombre:"
                    name="nombre"
                    rules={[{ required: true, message: 'Ingrese el nombre' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Cédula:"
                    name="cedula"
                    rules={[{ required: true, message: 'Ingrese la cedula' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Email:"
                    name="email"
                    rules={[{ required: true, message: 'Ingrese el correo' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Departamento:"
                    name="departamento"
                    rules={[{ required: true, message: 'Ingrese el departamento' }]}
                >
                    <Select>
                        {departamentos.map(departamento => (
                            <Select.Option key={departamento.id_departamento} value={departamento.id_departamento}>
                                {departamento.nombre}
                            </Select.Option>
                        ))}
                    </Select>
                </Form.Item>
                <Form.Item
                    label="Sede:"
                    name="sede"
                    rules={[{ required: true, message: 'Ingrese la sede' }]}
                >
                    <Select>
                        {sedes.map(sede => (
                            <Select.Option key={sede.id_sede} value={sede.id_sede}>
                                {sede.nombre}
                            </Select.Option>
                        ))}
                    </Select>
                </Form.Item>
                <Form.Item
                    label="Contraseña:"
                    name="contrasena"
                    rules={[{ required: true, message: 'Ingrese la contraseña' }]}>
                    <Input.Password />
                </Form.Item>
                <Form.Item label={null}>
                    <Button type="primary" htmlType="submit">
                        Enviar
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default Profile;
