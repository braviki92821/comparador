import express  from "express";
import { body } from 'express-validator'
import { adminLaptops, crearLaptop, guardarlaptop, agregarImagenLaptop, almacenarImagenLaptop, editarLaptop, actualizarLaptop, eliminarLaptop } from "../controllers/adminLaptopController.js";
import { adminTelefonos, crearTelefono, guardarTelefono, agregarImagenTelefono, almacenarImagenTelefono, editarTelefono, actualizarTelefono, eliminarTelefono } from '../controllers/adminTelefonoController.js'
import { adminTablets, crearTablet, guardarTablet, agregarImagenTablet, almacenarImagenTablet, editarTablet, actualizarTablet, eliminarTablet} from '../controllers/adminTabletController.js'
import upload from "../middleware/subirImagen.js"
import protegerRuta from '../middleware/protegerRuta.js';

const router = express.Router()

router.get('/admin/admimistrarLaptops', protegerRuta, adminLaptops)

router.get('/admin/agregarLaptop', protegerRuta, crearLaptop)
router.post('/admin/agregarLaptop', 
            body('nombre').notEmpty().withMessage('El nombre es obligatorio'),
            body('precio').notEmpty().withMessage('Debe colocar un precio'),
            body('procesador').notEmpty().withMessage('Seleccione el procesador'),
            body('grafica').notEmpty().withMessage('Seleccione la grafica'),
            body('interfaz').notEmpty().withMessage('Seleccione interfaz'),
            body('memoriaRam').notEmpty().withMessage('Seleccione cantidad de memoria ram'),
            body('almacenamiento').notEmpty().withMessage('Seleccione cantidad del almacenamiento'),
            body('bateria').notEmpty().withMessage('Seleccione bateria'),
            body('sistema').isNumeric().withMessage('Seleccione sistema operativo'),
            body('marca').isNumeric().withMessage('Seleccione marca'),
            body('tienda').isNumeric().withMessage('Seleccione tienda'),
            protegerRuta, guardarlaptop)

router.get('/admin/agregar-imagen-laptop/:id', protegerRuta, agregarImagenLaptop)
router.post('/admin/agregar-imagen-laptop/:id', protegerRuta, upload.single('imagen'), almacenarImagenLaptop)

router.get('/admin/editarLaptop/:id', protegerRuta, editarLaptop)

router.post('/admin/editarLaptop/:id',
            body('nombre').notEmpty().withMessage('El nombre es obligatorio'),
            body('precio').notEmpty().withMessage('Debe colocar un precio'),
            body('procesador').notEmpty().withMessage('Seleccione el procesador'),
            body('grafica').notEmpty().withMessage('Seleccione la grafica'),
            body('oferta').notEmpty().withMessage('Debe seleccionar el estatus de oferta'),
            body('descuento').notEmpty().withMessage('Debe seleccionar cantidad de descuento'),
            body('interfaz').notEmpty().withMessage('Seleccione interfaz'),
            body('memoriaRam').notEmpty().withMessage('Seleccione cantidad de memoria ram'),
            body('almacenamiento').notEmpty().withMessage('Seleccione cantidad del almacenamiento'),
            body('bateria').notEmpty().withMessage('Seleccione bateria'),
            body('sistemaOperativoId').isNumeric().withMessage('Seleccione sistema operativo'),
            body('marcasLaptopId').isNumeric().withMessage('Seleccione marca'),
            body('tiendaId').isNumeric().withMessage('Seleccione tienda'),
            protegerRuta, actualizarLaptop)       
            
router.post('/admin/eliminarLaptop/:id', protegerRuta, eliminarLaptop)

router.get('/admin/admimistrarTelefonos', protegerRuta, adminTelefonos)

router.get('/admin/agregarTelefono', protegerRuta, crearTelefono)
router.post('/admin/agregarTelefono', 
            body('nombre').notEmpty().withMessage('El nombre es obligatorio'),
            body('precio').notEmpty().withMessage('Debe colocar un precio'),
            body('procesador').notEmpty().withMessage('Seleccione el procesador'),
            body('camaraF').notEmpty().withMessage('Seleccione los MPX de la camara frontal'),
            body('camaraT').notEmpty().withMessage('Seleccione los MPX de la camara trasera'),
            body('memoriaRam').notEmpty().withMessage('Seleccione cantidad de memoria ram'),
            body('almacenamiento').notEmpty().withMessage('Seleccione cantidad del almacenamiento'),
            body('bateria').notEmpty().withMessage('Seleccione bateria'),
            body('sistema').isNumeric().withMessage('Seleccione sistema operativo'),
            body('marca').isNumeric().withMessage('Seleccione marca'),
            body('tienda').isNumeric().withMessage('Seleccione tienda'), 
            protegerRuta, guardarTelefono)

router.get('/admin/agregar-imagen-telefono/:id', protegerRuta, agregarImagenTelefono)
router.post('/admin/agregar-imagen-telefono/:id', protegerRuta, upload.single('imagen'), almacenarImagenTelefono)

router.get('/admin/editarTelefono/:id', protegerRuta, editarTelefono)
router.post('/admin/editarTelefono/:id',
            body('nombre').notEmpty().withMessage('El nombre es obligatorio'),
            body('precio').notEmpty().withMessage('Debe colocar un precio'),
            body('procesador').notEmpty().withMessage('Seleccione el procesador'),
            body('camaraF').notEmpty().withMessage('Seleccione los MPX de la camara frontal'),
            body('camaraT').notEmpty().withMessage('Seleccione los MPX de la camara trasera'),
            body('oferta').notEmpty().withMessage('Debe seleccionar el estatus de oferta'),
            body('descuento').notEmpty().withMessage('Debe seleccionar cantidad de descuento'),
            body('memoriaRam').notEmpty().withMessage('Seleccione cantidad de memoria ram'),
            body('almacenamiento').notEmpty().withMessage('Seleccione cantidad del almacenamiento'),
            body('bateria').notEmpty().withMessage('Seleccione bateria'),
            body('sistemaOperativoId').isNumeric().withMessage('Seleccione sistema operativo'),
            body('marcastytId').isNumeric().withMessage('Seleccione marca'),
            body('tiendaId').isNumeric().withMessage('Seleccione tienda'),
            protegerRuta, actualizarTelefono)

router.post('/admin/eliminarTelefono/:id', protegerRuta, eliminarTelefono)

router.get('/admin/admimistrarTablets', protegerRuta, adminTablets)

router.get('/admin/agregarTablet', protegerRuta, crearTablet)
router.post('/admin/agregarTablet',             
             body('nombre').notEmpty().withMessage('El nombre es obligatorio'),
             body('precio').notEmpty().withMessage('Debe colocar un precio'),
             body('procesador').notEmpty().withMessage('Seleccione el procesador'),
             body('camaraF').notEmpty().withMessage('Seleccione los MPX de la camara frontal'),
             body('camaraT').notEmpty().withMessage('Seleccione los MPX de la camara trasera'),
             body('memoriaRam').notEmpty().withMessage('Seleccione cantidad de memoria ram'),
             body('almacenamiento').notEmpty().withMessage('Seleccione cantidad del almacenamiento'),
             body('bateria').notEmpty().withMessage('Seleccione bateria'),
             body('sistema').isNumeric().withMessage('Seleccione sistema operativo'),
             body('marca').isNumeric().withMessage('Seleccione marca'),
             body('tienda').isNumeric().withMessage('Seleccione tienda'), 
             protegerRuta, guardarTablet )

router.get('/admin/agregar-imagen-tablet/:id', protegerRuta, agregarImagenTablet)
router.post('/admin/agregar-imagen-tablet/:id', protegerRuta, upload.single('imagen'), almacenarImagenTablet)

router.get('/admin/editarTablet/:id', protegerRuta, editarTablet)
router.post('/admin/editarTablet/:id',
            body('nombre').notEmpty().withMessage('El nombre es obligatorio'),
            body('precio').notEmpty().withMessage('Debe colocar un precio'),
            body('procesador').notEmpty().withMessage('Seleccione el procesador'),
            body('camaraF').notEmpty().withMessage('Seleccione los MPX de la camara frontal'),
            body('camaraT').notEmpty().withMessage('Seleccione los MPX de la camara trasera'),
            body('oferta').notEmpty().withMessage('Debe seleccionar el estatus de oferta'),
            body('descuento').notEmpty().withMessage('Debe seleccionar cantidad de descuento'),
            body('memoriaRam').notEmpty().withMessage('Seleccione cantidad de memoria ram'),
            body('almacenamiento').notEmpty().withMessage('Seleccione cantidad del almacenamiento'),
            body('bateria').notEmpty().withMessage('Seleccione bateria'),
            body('sistemaOperativoId').isNumeric().withMessage('Seleccione sistema operativo'),
            body('marcastytId').isNumeric().withMessage('Seleccione marca'),
            body('tiendaId').isNumeric().withMessage('Seleccione tienda'),
            protegerRuta, actualizarTablet)

router.post('/admin/eliminarTablet/:id', protegerRuta, eliminarTablet)


export default router;