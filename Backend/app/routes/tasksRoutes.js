const express = require('express');
const router = express.Router();
const tasksContoller = require('../controller/tasksController');

//rutas para los usuarios
router.get('/tareas/:id', tasksContoller.listarTareas);
router.get('/cabecera', tasksContoller.listarCabecera);
router.post('/tarea', tasksContoller.createTarea);
router.put('/confirmtask/:id', tasksContoller.updateTarea);
// router.delete('/usuarios/:id', userContoller.eliminarUsuario);  // Para eliminar un usuario por ID
// router.put('/usuarios/:id', userContoller.actualizarUsuario);  // Para actualizar un usuario por ID

module.exports = router;