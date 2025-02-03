const pool = require("./db");
const res = require("express/lib/response");

const listarTareas = async (req, res) => {
    const { id } = req.params;

    // Verificar que el identificador está presente
    if (!id) {
        return res.status(400).json({ mensaje: 'cedula del usuario es requerido' });
    }
    try {

        const result = await pool.query(
            `select
            id_tarea,
            descripcion,
            TO_CHAR(fecha_inicio, 'DD-MM-YYYY') as fecha_inicio,
            TO_CHAR(fecha_fin, 'DD-MM-YYYY') as fecha_fin,
            id_usuario,
            titulo
        from
            public.tarea
        where
            id_usuario = $1
            and estado is false
        ;`, [id]
        );



        const tasks = result.rows;


        res.status(200).json({ mensaje: 'Operación exitosa', tasks })
    } catch (error) {
        console.error('Error al registrar usuario:', error.message);
        res.status(500).json({ mensaje: 'Error al registrar usuario', error: error.message });
    }

}
const listarCabecera = async (req, res) => {

    try {


        const resultDepartamentos = await pool.query(
            `SELECT id_departamento, nombre, id_sede, descripcion, id_area
            FROM public.departamento;
        ;`);
        const resultSedes = await pool.query(
            `SELECT id_sede, nombre, ubicacion
            FROM public.sede;
        ;`);

        const departamentos = resultDepartamentos.rows;
        const sedes = resultSedes.rows;

        res.status(200).json({ mensaje: 'Operación exitosa', departamentos, sedes })
    } catch (error) {
        console.error('Error al registrar usuario:', error.message);
        res.status(500).json({ mensaje: 'Error al registrar usuario', error: error.message });
    }

}

const createTarea = async (req, res) => {
    const { titulo, descripcion, fecha_inicio, fecha_fin, id_usuario } = req.body;

    if (!titulo || !descripcion || !fecha_inicio || !fecha_fin || !id_usuario) {
        return res.status(402).send('Error en los datos')
    } else {
        try {
            await pool.query(
                `INSERT INTO tarea
            (descripcion, fecha_inicio, fecha_fin, id_usuario, titulo)
            VALUES($1, $2, $3, $4, $5);
        ;`,
                [descripcion,
                    fecha_inicio,
                    fecha_fin,
                    id_usuario,
                    titulo
                ]
            );
            // Enviar la respuesta con los detalles del nuevo usuario
            res.status(201).json({
                mensaje: 'Registro exitoso'
            });
        } catch (error) {
            console.error('Error al registrar tarea:', error.message);
            res.status(500).json({ mensaje: 'Error al registrar tarea', error: error.message });
        }


    }
}


const updateTarea = async (req, res) => {
    try {
        const { id } = req.params;
        // Verificar que el identificador está presente
        if (!id) {
            return res.status(400).json({ mensaje: 'id de la tarea es requerido' });
        }
        try {
            await pool.query('UPDATE public.tarea SET estado=true WHERE id_tarea= $1', [id]);
            res.status(201).json({ mensaje: 'Tarea actualizada' })
        } catch (error) {
            console.error('Error actualizar tarea:');
            res.status(402).send('Error al actualizar tarea');
        }
    } catch (error) {
        console.error('Error actualizar tarea:', error.message);
        res.status(500).json({ mensaje: 'Error al actualizar tarea', error: error.message });
    }
}
module.exports = {
    listarTareas,
    createTarea,
    updateTarea,
    listarCabecera
};