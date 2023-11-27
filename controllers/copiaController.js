import { Laptop, Telefono, Tablet } from '../models/index.js'

const respaldoLaptops = async (req, res) => {

    const laptops = await Laptop.scope("eliminarCreatedUpdated").findAll()

    res.json( { laptops } )
}

const cargaMasivaLaptops = async (req, res) => {
    
    const { body } = req

    let resultado = []
    
    body.forEach((element,index) => {
        if(typeof element.nombre !== "string")
            resultado.push({error: `El nombre del elemento: ${index} no es de tipo cadena`})  
        if(typeof element.procesador !== "string")
            resultado.push({error: `El procesador del elemento: ${index} no es de tipo cadena`})
        if(typeof element.grafica !== "string")
            resultado.push({error: `La grafica del elemento: ${index} no es de tipo cadena`})    
        if(typeof element.memoriaRam !== "string")
            resultado.push({error: `La memoriaRam del elemento: ${index} no es de tipo cadena`})
        if(typeof element.almacenamiento !== "string")
            resultado.push({error: `El almacenamiento del elemento: ${index} no es de tipo cadena`})  
        if(typeof element.bateria !== "number")
            resultado.push({error: `La bateria del elemento: ${index} no es de tipo numerico`})      
        if(typeof element.interfaz !== "string")
            resultado.push({error: `La interfaz del elemento: ${index} no es de tipo cadena`}) 
        if(typeof element.precio !== "number")
            resultado.push({error: `El precio del elemento: ${index} no es de tipo numerico`})   
        if(typeof element.imagen !== "string")
            resultado.push({error: `El precio del elemento: ${index} no es de tipo cadena`}) 
        if(typeof element.oferta !== "boolean")
            resultado.push({error: `Oferta del elemento: ${index} no es de tipo booleano`})   
        if(typeof element.descuento !== "number")
            resultado.push({error: `El descuento del elemento: ${index} no es de tipo numerico`}) 
        if(typeof element.sistemaOperativoId !== "number")
            resultado.push({error: `El id del sistema del elemento: ${index} no es de tipo numerico`})   
        if(typeof element.marcasLaptopId !== "number")
            resultado.push({error: `El id de la marca del elemento: ${index} no es de tipo numerico`})      
        if(typeof element.tiendaId !== "number")
            resultado.push({error: `El id de la tienda del elemento: ${index} no es de tipo numerico`})            
            //console.log(typeof element.oferta === "boolean")
    });

    if(resultado.length !== 0){
        return res.json( { result : 'error' , errores: resultado} )
    }

    //Laptop.bulkCreate(body)
    body.forEach(element => {
        Laptop.create(element)
    })
  
    res.json( { result : 'ok'} )

}
 
const imagenes = (req, res) => {
    res.render('admin/carga-masiva-imagenes',{
        pagina: 'Carga Masiva de Imagenes',
        csrfToken: req.csrfToken()
    })
}

const cargaImagenes = (req, res) => {
    console.log(req.file.filename)
    res.redirect('/admin/admimistrarLaptops')
}

const respaldoTelefonos = async (req, res) => {
    
    const telefonos = await Telefono.scope("eliminarCreatedUpdated").findAll()

    res.json( { telefonos } )
}

const cargaMasivaTelefonos = (req, res) => {
    
    const { body } = req

    let resultado = []
    
    body.forEach((element,index) => {
        if(typeof element.nombre !== "string")
            resultado.push({error: `El nombre del elemento: ${index} no es de tipo cadena`})  
        if(typeof element.procesador !== "string")
            resultado.push({error: `El procesador del elemento: ${index} no es de tipo cadena`})  
        if(typeof element.memoriaRam !== "string")
            resultado.push({error: `La memoriaRam del elemento: ${index} no es de tipo cadena`})
        if(typeof element.almacenamiento !== "string")
            resultado.push({error: `El almacenamiento del elemento: ${index} no es de tipo cadena`})  
        if(typeof element.bateria !== "number")
            resultado.push({error: `La bateria del elemento: ${index} no es de tipo numerico`})      
        if(typeof element.camaraF !== "string")
            resultado.push({error: `La camara frontal del elemento: ${index} no es de tipo cadena`})
        if(typeof element.camaraT !== "string")
            resultado.push({error: `La camara trasera del elemento: ${index} no es de tipo cadena`}) 
        if(typeof element.precio !== "number")
            resultado.push({error: `El precio del elemento: ${index} no es de tipo numerico`})   
        if(typeof element.imagen !== "string")
            resultado.push({error: `El precio del elemento: ${index} no es de tipo cadena`}) 
        if(typeof element.oferta !== "boolean")
            resultado.push({error: `Oferta del elemento: ${index} no es de tipo booleano`})   
        if(typeof element.descuento !== "number")
            resultado.push({error: `El descuento del elemento: ${index} no es de tipo numerico`}) 
        if(typeof element.sistemaOperativoId !== "number")
            resultado.push({error: `El id del sistema del elemento: ${index} no es de tipo numerico`})   
        if(typeof element.marcastytId !== "number")
            resultado.push({error: `El id de la marca del elemento: ${index} no es de tipo numerico`})      
        if(typeof element.tiendaId !== "number")
            resultado.push({error: `El id de la tienda del elemento: ${index} no es de tipo numerico`})            
            //console.log(typeof element.oferta === "boolean")
    });

    if(resultado.length !== 0){
        return res.json( { result : 'error' , errores: resultado} )
    }

    body.forEach(element => {
        Telefono.create(element)
    })
  
    res.json( { result : 'ok'} )

}

const respaldoTablets = async (req, res) => {
    
    const tablets = await Tablet.scope("eliminarCreatedUpdated").findAll()

    res.json( { tablets } )
}

const cargaMasivaTablets = (req, res) => {
    
    const { body } = req

    let resultado = []
    //console.log(body)
    
    body.forEach((element,index) => {
        if(typeof element.nombre !== "string")
            resultado.push({error: `El nombre del elemento: ${index} no es de tipo cadena`})  
        if(typeof element.procesador !== "string")
            resultado.push({error: `El procesador del elemento: ${index} no es de tipo cadena`})  
        if(typeof element.memoriaRam !== "string")
            resultado.push({error: `La memoriaRam del elemento: ${index} no es de tipo cadena`})
        if(typeof element.almacenamiento !== "string")
            resultado.push({error: `El almacenamiento del elemento: ${index} no es de tipo cadena`})  
        if(typeof element.bateria !== "number")
            resultado.push({error: `La bateria del elemento: ${index} no es de tipo numerico`})      
        if(typeof element.camaraF !== "string")
            resultado.push({error: `La camara frontal del elemento: ${index} no es de tipo cadena`})
        if(typeof element.camaraT !== "string")
            resultado.push({error: `La camara trasera del elemento: ${index} no es de tipo cadena`}) 
        if(typeof element.precio !== "number")
            resultado.push({error: `El precio del elemento: ${index} no es de tipo numerico`})   
        if(typeof element.imagen !== "string")
            resultado.push({error: `El precio del elemento: ${index} no es de tipo cadena`}) 
        if(typeof element.oferta !== "boolean")
            resultado.push({error: `Oferta del elemento: ${index} no es de tipo booleano`})   
        if(typeof element.descuento !== "number")
            resultado.push({error: `El descuento del elemento: ${index} no es de tipo numerico`}) 
        if(typeof element.sistemaOperativoId !== "number")
            resultado.push({error: `El id del sistema del elemento: ${index} no es de tipo numerico`})   
        if(typeof element.marcastytId !== "number")
            resultado.push({error: `El id de la marca del elemento: ${index} no es de tipo numerico`})      
        if(typeof element.tiendaId !== "number")
            resultado.push({error: `El id de la tienda del elemento: ${index} no es de tipo numerico`})            
            //console.log(typeof element.oferta === "boolean")
    });

    if(resultado.length !== 0){
        return res.json( { result : 'error' , errores: resultado} )
    }

    //Tablet.bulkCreate(body)
    body.forEach(element => {
        Tablet.create(element)
    })
  
    res.json( { result : 'ok'} )

}

export {
    respaldoLaptops,
    cargaMasivaLaptops,
    imagenes,
    cargaImagenes,
    respaldoTelefonos,
    cargaMasivaTelefonos,
    respaldoTablets,
    cargaMasivaTablets
}