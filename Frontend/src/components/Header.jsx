import React, { Fragment } from 'react';
import sulogisticaLogo from '../assets/sulogisticaLogo.png';
import { Layout, Menu } from 'antd';
import { MailOutlined, AppstoreOutlined, SettingOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const { Sider, Content } = Layout;

const items = [
    {
        key: 'sub1',
        label: 'Menú de usuario',
        icon: <MailOutlined />,
        children: [
            {
                key: 'g1',
                label: 'Usuario',
                type: 'group',
                children: [
                    {
                        key: '1',
                        label: 'Tareas',
                    },
                    {
                        key: '2',
                        label: 'Perfil',
                    },
                    {
                        key: '3',
                        label: 'Áreas',
                        disabled: true
                    },
                    {
                        key: '4',
                        label: 'Departamentos',
                        disabled: true
                    },
                    {
                        key: '5',
                        label: 'Sedes',
                        disabled: true
                    },
                    {
                        key: '6',
                        label: 'Salir'
                    },
                ],
            },

        ],
    },
];

export default function Header() {
    const navigate = useNavigate();
    const onClick = (e) => {
        console.log(e);
        if (e.key == "1") {
            navigate('/tasks');
        } else if (e.key == "2") {
            navigate('/perfil');
        } else if (e.key == "6") {
            sessionStorage.removeItem('token');
            navigate('/');
        } else {
            console.log("error");
        }
    };

    return (
        <Fragment>
            <Layout style={{ minHeight: '100vh' }}>
                <Sider
                    width={256}
                    className="site-layout-background"
                    style={{
                        top: 0,
                        rigth: 0,
                        bottom: 0,
                        zIndex: 1000,  // Para asegurar que esté sobre otros elementos
                    }}
                >
                    <Menu
                        onClick={onClick}
                        style={{
                            width: '100%',
                            height: '100%',
                            marginTop: '20px',  // Espaciado para el logo
                        }}
                        defaultSelectedKeys={['1']}
                        defaultOpenKeys={['sub1']}
                        mode="inline"
                        items={items}
                    />
                </Sider>
            </Layout>
        </Fragment>
    );
}
