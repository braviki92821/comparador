import express  from "express";
import { respaldoLaptops, cargaMasivaLaptops, imagenes, cargaImagenes, respaldoTelefonos, cargaMasivaTelefonos, respaldoTablets, cargaMasivaTablets} from "../controllers/copiaController.js";
import protegerRuta from '../middleware/protegerRuta.js';
import subir from '../middleware/respaldoImagen.js'

const router = express.Router()

router.post('/laptops', protegerRuta, respaldoLaptops)

router.post('/carga-masiva-laptops', protegerRuta, cargaMasivaLaptops)

router.get('/imagenes', protegerRuta, imagenes)

router.post('/imagenes', protegerRuta, subir.array('imagen'), cargaImagenes)

router.post('/telefonos', protegerRuta, respaldoTelefonos)

router.post('/carga-masiva-telefonos', protegerRuta, cargaMasivaTelefonos)

router.post('/tablets', protegerRuta, respaldoTablets)

router.post('/carga-masiva-tablets', protegerRuta, cargaMasivaTablets)


export default router;