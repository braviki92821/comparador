import express  from "express";
import { inicio, laptops, compararLaptops, telefonos, compararTelefonos, tablets, compararTablets, noEncontrado, buscador } from '../controllers/appController.js'

const router = express.Router()

router.get('/',inicio)

router.get('/laptops', laptops)

router.get('/compararLaptops', compararLaptops)

router.get('/telefonos', telefonos)

router.get('/compararTelefonos', compararTelefonos)

router.get('/tablets', tablets)

router.get('compararTablets',compararTablets)

router.get('/404', noEncontrado)

router.post('/buscador',buscador)

export default router;