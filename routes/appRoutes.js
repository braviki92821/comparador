import express  from "express";
import { inicio, promociones, laptops, compararLaptops, telefonos, compararTelefonos, tablets, compararTablets, noEncontrado, buscador } from '../controllers/appController.js'
import protegerRuta from '../middleware/protegerRuta.js';

const router = express.Router()

router.get('/',inicio)

router.get('/promociones', promociones)

router.get('/laptops', laptops)

router.get('/compararLaptops', protegerRuta, compararLaptops)

router.get('/telefonos', telefonos)

router.get('/compararTelefonos', protegerRuta, compararTelefonos)

router.get('/tablets', tablets)

router.get('compararTablets', protegerRuta, compararTablets)

router.get('/404', noEncontrado)

router.post('/buscador',buscador)

export default router;