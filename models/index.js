//import Categoria from './Categoria.js'
import Laptop from './Laptop.js'
import Tablet from './Tablet.js'
import Telefono from './Telefono.js'
import Tienda from './Tienda.js'
import MarcaL from './MarcaL.js'
import SO from './SO.js'
import MarcaTyT from './MarcaTyT.js'
import Calificacion from './Calificacion.js'
import Favorito from './Favorito.js'


Laptop.belongsTo(SO, {foraingKey: 'sistemaId'})
Laptop.belongsTo(MarcaL, {foraingKey: 'marcaId'})
Laptop.belongsTo(Tienda, {foraingKey: 'tiendaId'})

Telefono.belongsTo(SO, {foraingKey: 'sistemaId'})
Telefono.belongsTo(MarcaTyT, {foraingKey: 'marcaId'})
Telefono.belongsTo(Tienda, {foraingKey: 'tiendaId'})

Tablet.belongsTo(SO, {foraingKey: 'sistemaId'})
Tablet.belongsTo(MarcaTyT, {foraingKey: 'marcaId'})
Tablet.belongsTo(Tienda, {foraingKey: 'tiendaId'})

 
export{
   // Categoria,
    SO,
    Laptop,
    Telefono,
    Tablet,
    MarcaL,
    MarcaTyT,
    Tienda,
}