import express  from "express";
import { body } from 'express-validator'
import { crearLaptop, guardarlaptop, agregarImagenLaptop, almacenarImagenLaptop, crearTelefono, guardarTelefono, agregarImagenTelefono,almacenarImagenTelefono, crearTablet, guardarTablet, agregarImagenTablet, almacenarImagenTablet } from "../controllers/adminController.js";
import upload from "../middleware/subirImagen.js"

const router = express.Router()

router.get('/admin/agregarLaptop', crearLaptop)
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
            guardarlaptop)

router.get('/admin/agregar-imagen-laptop/:id', agregarImagenLaptop)
router.post('/admin/agregar-imagen-laptop/:id', upload.single('imagen'), almacenarImagenLaptop)

router.get('/admin/agregarTelefono', crearTelefono)
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
            guardarTelefono)

router.get('/admin/agregar-imagen-telefono/:id', agregarImagenTelefono)
router.post('/admin/agregar-imagen-telefono/:id', upload.single('imagen'), almacenarImagenTelefono)

router.get('/admin/agregarTablet', crearTablet)
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
             guardarTablet )

router.get('/admin/agregar-imagen-tablet/:id', agregarImagenTablet)
router.post('/admin/agregar-imagen-tablet/:id', upload.single('imagen'), almacenarImagenTablet)



export default router;