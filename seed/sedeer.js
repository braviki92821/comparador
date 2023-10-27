import sistemas from "./sistemas.js";
import marcaLaptops from "./marcalaptops.js";
import marcaTyTs from "./marcaTyT's.js";
import tiendas from "./tiendas.js";
import db from "../config/db.js"
import {MarcaL, SO, MarcaTyT, Tienda, Laptop, Telefono} from '../models/index.js'
import laptops from "./laptops.js";
import telefonos from "./telefonos.js"
import Componente from "../models/Componente.js";
import componentes from "./componentes.js";
import Usuario from "../models/Usuario.js";
import usuarios from "./usuarios.js";


const importarDatos = async () => {
    try {
      
      await db.authenticate()
  
      await db.sync()
  
      await Promise.all([
          //Categoria.bulkCreate(categorias),
          SO.bulkCreate(sistemas),
          MarcaL.bulkCreate(marcaLaptops),
          MarcaTyT.bulkCreate(marcaTyTs),
          Tienda.bulkCreate(tiendas),
          //Laptop.bulkCreate(laptops),
          //Telefono.bulkCreate(telefonos),
          Componente.bulkCreate(componentes),
          Usuario.bulkCreate(usuarios)
      ])
  
      console.log('Datos importados')
  
      process.exit()
      
    } catch (error) {
      console.log(error)
      process.exit(1)
    }
}

const eliminarDatos = async() => {
  try {
      await db.sync({force: true})
      console.log('Datos eliminados')
      process.exit() 
  } catch (error) {
      console.log(error)
      process.exit(1)
  }
}

if(process.argv[2]==="-i"){
    importarDatos();
}

if(process.argv[2]==="-e"){
  eliminarDatos();
}