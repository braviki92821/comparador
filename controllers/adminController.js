import { unlink } from "node:fs/promises";
import { Laptop, Tablet, Telefono, SO, MarcaL, MarcaTyT, Tienda } from '../models/index.js'
import { validationResult } from "express-validator";
import Componente from '../models/Componente.js'

const adminLaptops = async (req, res) => {
    const { pagina: paginaActual } = req.query;

    const exp = /^[0-9]$/;
  
    if (!exp.test(paginaActual)) {
      return res.redirect("/admin/admimistrarLaptops?pagina=1");
    }

    try {

      let limite = 5;
    
      const offset = paginaActual * limite - limite;

      const [laptops, total] = await Promise.all([
        await Laptop.findAll({
            limit: limite,
            offset,
            include:[
                { model: SO, as:'sistemaOperativo' },
                { model: MarcaL, as:'marcasLaptop' },
                { model: Tienda, as:'tienda'}
            ]
        }),
        Laptop.count()
      ])
     
      res.render('admin/laptops',{
          pagina: 'Administrar Laptops',
          laptops,
          csrfToken: req.csrfToken(),
          paginas: Math.ceil(total / limite),
          paginaActual: Number(paginaActual),
          total,
          offset,
          limite
      })
        
    } catch (error) {
       console.log(error);
    }


}

const crearLaptop = async (req, res) => {

    const [ sistemas, marcas, tiendas] = await Promise.all([
        SO.findAll(),
        MarcaL.findAll(),
        Tienda.findAll()
    ])

    const [ procesadores, graficas, memoriasRam, almacenamientos, baterias, interfaces] = await Promise.all([
        Componente.findAll({ where:{ tipo: 'procesador' } }),
        Componente.findAll({ where:{ tipo: 'grafica' } }),
        Componente.findAll({ where:{ tipo: 'memoria ram' } }),
        Componente.findAll({ where:{ tipo: 'almacenamiento laptop' } }),
        Componente.findAll({ where:{ tipo: 'bateria laptop' } }),
        Componente.findAll({ where:{ tipo: 'interfaz' } }),
    ])

    res.render('admin/crearLaptop',{
        pagina: 'Añadir laptop',
        csrfToken: req.csrfToken(),
        sistemas,
        marcas,
        tiendas,
        procesadores,
        graficas,
        memoriasRam,
        almacenamientos,
        baterias,
        interfaces,
        datos:{}
    })

}

const guardarlaptop = async (req, res) => {
    let resultado = validationResult(req);

    if (!resultado.isEmpty()) {
        const [ sistemas, marcas, tiendas] = await Promise.all([
            SO.findAll(), //select * from sistemas where campo=s
            MarcaL.findAll(),
            Tienda.findAll()
        ])
    
        const [ procesadores, graficas, memoriasRam, almacenamientos, baterias, interfaces] = await Promise.all([
            Componente.findAll({ where:{ tipo: 'procesador' } }),
            Componente.findAll({ where:{ tipo: 'grafica' } }),
            Componente.findAll({ where:{ tipo: 'memoria ram' } }),
            Componente.findAll({ where:{ tipo: 'almacenamiento laptop' } }),
            Componente.findAll({ where:{ tipo: 'bateria laptop' } }),
            Componente.findAll({ where:{ tipo: 'interfaz' } }),
        ])

        return res.render('admin/crearLaptop',{
            pagina: 'Añadir laptop',
            csrfToken: req.csrfToken(),
            sistemas,
            marcas,
            tiendas,
            procesadores,
            graficas,
            memoriasRam,
            almacenamientos,
            baterias,
            interfaces,
            datos: req.body,
            errores: resultado.array()
        })
    }

    const { nombre, precio, procesador, grafica, interfaz, 
            memoriaRam, almacenamiento, bateria,sistema: sistemaOperativoId,
            marca: marcasLaptopId, tienda: tiendaId } = req.body

    try {
    
        const laptopGuardada = await Laptop.create({
           nombre,
           procesador,
           grafica,
           memoriaRam,
           almacenamiento,
           bateria: Number(bateria),
           interfaz,
           precio,
           imagen: '',
           oferta: false,
           descuento: 0,
           sistemaOperativoId,
           marcasLaptopId,
           tiendaId
        })
    
        const { id } = laptopGuardada
        
        res.redirect(`/admin/agregar-imagen-laptop/${id}`);

    } catch (error) {
        console.log(error)
    }


}

const agregarImagenLaptop = async (req, res) => {
  
 const { id } = req.params;

 const laptop = await Laptop.findByPk(id)

 if(!laptop){
    return res.redirect('/admin')
 }

 res.render('admin/agregar-imagen-laptop',{
    pagina: `Agregar imagen: ${laptop.nombre}`,
    laptop,
    csrfToken: req.csrfToken(),
 })

}

const almacenarImagenLaptop = async (req, res) => {
    
    const { id } = req.params;

    const laptop = await Laptop.findByPk(id)

    if(!laptop){
        return res.redirect('/admin/agregarLaptop')
    }

    try{
      laptop.imagen = req.file.filename;
      console.log(req.file.filename)

      await laptop.save()

      res.redirect('/admin/admimistrarLaptops')

    }catch(error){
        console.log(error)
    }
}

const editarLaptop = async (req, res) => {
    const { id } = req.params;

    const laptop = await Laptop.findByPk(id)

    if(!laptop){
        return res.redirect('/admin/admimistrarLaptops')
    }

    const [ sistemas, marcas, tiendas] = await Promise.all([
        SO.findAll(),
        MarcaL.findAll(),
        Tienda.findAll()
    ])

    const [ procesadores, graficas, memoriasRam, almacenamientos, baterias, interfaces] = await Promise.all([
        Componente.findAll({ where:{ tipo: 'procesador' } }),
        Componente.findAll({ where:{ tipo: 'grafica' } }),
        Componente.findAll({ where:{ tipo: 'memoria ram' } }),
        Componente.findAll({ where:{ tipo: 'almacenamiento laptop' } }),
        Componente.findAll({ where:{ tipo: 'bateria laptop' } }),
        Componente.findAll({ where:{ tipo: 'interfaz' } }),
    ])

    res.render('admin/editarLaptop',{
        pagina: 'Editar laptop',
        csrfToken: req.csrfToken(),
        sistemas,
        marcas,
        tiendas,
        procesadores,
        graficas,
        memoriasRam,
        almacenamientos,
        baterias,
        interfaces,
        datos: laptop
    })

    
}

const actualizarLaptop = async (req, res) => {

}

const crearTelefono  = async (req, res) => {
    const [ sistemas, marcas, tiendas] = await Promise.all([
        SO.findAll(),
        MarcaTyT.findAll(),
        Tienda.findAll()
    ])

    const [ procesadores, camarasF, camarasT,memoriasRam, almacenamientos, baterias, interfaces] = await Promise.all([
        Componente.findAll({ where: { tipo: 'procesador telefono' } }),
        Componente.findAll({ where: { tipo: 'camara frontal' } }),
        Componente.findAll({ where: { tipo: 'camara trasera' } }),
        Componente.findAll({ where: { tipo: 'memoria ram' } }),
        Componente.findAll({ where: { tipo: 'almacenamiento telefono' } }),
        Componente.findAll({ where: { tipo: 'bateria laptop' } }),
        Componente.findAll({ where: { tipo: 'interfaz' } }),
    ])

    res.render('admin/crearTelefono',{
        pagina: 'Añadir Telefono',
        csrfToken: req.csrfToken(),
        sistemas,
        marcas,
        tiendas,
        procesadores,
        camarasF,
        camarasT,
        memoriasRam,
        almacenamientos,
        baterias,
        interfaces,
        datos:{}
    })
}

const guardarTelefono  = async (req, res) => {
    let resultado = validationResult(req);

    if (!resultado.isEmpty()) {
        const [ sistemas, marcas, tiendas] = await Promise.all([
            SO.findAll(),
            MarcaTyT.findAll(),
            Tienda.findAll()
        ])
    
        const [ procesadores, camarasF, camarasT,memoriasRam, almacenamientos, baterias, interfaces] = await Promise.all([
            Componente.findAll({ where: { tipo: 'procesador telefono' } }),
            Componente.findAll({ where: { tipo: 'camara frontal' } }),
            Componente.findAll({ where: { tipo: 'camara trasera' } }),
            Componente.findAll({ where: { tipo: 'memoria ram' } }),
            Componente.findAll({ where: { tipo: 'almacenamiento telefono' } }),
            Componente.findAll({ where: { tipo: 'bateria laptop' } }),
            Componente.findAll({ where: { tipo: 'interfaz' } }),
        ])
        
        return res.render('admin/crearTelefono',{
            pagina: 'Añadir Telefono',
            csrfToken: req.csrfToken(),
            sistemas,
            marcas,
            tiendas,
            procesadores,
            camarasF,
            camarasT,
            memoriasRam,
            almacenamientos,
            baterias,
            interfaces,
            datos: req.body,
            errores: resultado.array()
        })
    }

    const { nombre, precio, procesador, camaraF, camaraT, 
        memoriaRam, almacenamiento, bateria, sistema: sistemaOperativoId,
        marca: marcastytId, tienda: tiendaId } = req.body

        try {
    
            const telefonoGuardado = await Telefono.create({
               nombre,
               procesador,
               memoriaRam,
               almacenamiento,
               bateria: Number(bateria),
               camaraF,
               camaraT,
               precio,
               imagen: '',
               oferta: false,
               descuento: 0,
               sistemaOperativoId,
               marcastytId,
               tiendaId
            })
        
            const { id } = telefonoGuardado
            
            res.redirect(`/admin/agregar-imagen-telefono/${id}`);
    
        } catch (error) {
            console.log(error)
        }
    
}

const agregarImagenTelefono = async (req, res) => {
    const { id } = req.params;

    const telefono = await Telefono.findByPk(id)
   
    if(!telefono){
       return res.redirect('/telefonos')
    }
   
    res.render('admin/agregar-imagen-telefono',{
       pagina: `Agregar imagen: ${telefono.nombre}`,
       telefono,
       csrfToken: req.csrfToken(),
    })
}

const almacenarImagenTelefono = async (req, res) => {
    const { id } = req.params;

    const telefono = await Telefono.findByPk(id)

    if(!telefono){
        return res.redirect('/admin/agregarTelefono')
    }

    try{
      telefono.imagen = req.file.filename;
      console.log(req.file.filename)

      await telefono.save()

      res.redirect('/admin/agregarTelefono')

    }catch(error){
        console.log(error)
    }
}

const crearTablet = async (req, res) => {
    const [ sistemas, marcas, tiendas] = await Promise.all([
        SO.findAll(),
        MarcaTyT.findAll(),
        Tienda.findAll()
    ])

    const [ procesadores, camarasF, camarasT,memoriasRam, almacenamientos, baterias, interfaces] = await Promise.all([
        Componente.findAll({ where: { tipo: 'procesador telefono' } }),
        Componente.findAll({ where: { tipo: 'camara frontal' } }),
        Componente.findAll({ where: { tipo: 'camara trasera' } }),
        Componente.findAll({ where: { tipo: 'memoria ram' } }),
        Componente.findAll({ where: { tipo: 'almacenamiento telefono' } }),
        Componente.findAll({ where: { tipo: 'bateria laptop' } }),
        Componente.findAll({ where: { tipo: 'interfaz' } }),
    ])

    res.render('admin/crearTablet',{
        pagina: 'Añadir Tablet',
        csrfToken: req.csrfToken(),
        sistemas,
        marcas,
        tiendas,
        procesadores,
        camarasF,
        camarasT,
        memoriasRam,
        almacenamientos,
        baterias,
        interfaces,
        datos:{}
    })    
}

const guardarTablet = async (req, res) => {
    let resultado = validationResult(req);

    if (!resultado.isEmpty()) {
        const [ sistemas, marcas, tiendas] = await Promise.all([
            SO.findAll(),
            MarcaTyT.findAll(),
            Tienda.findAll()
        ])
    
        const [ procesadores, camarasF, camarasT,memoriasRam, almacenamientos, baterias, interfaces] = await Promise.all([
            Componente.findAll({ where: { tipo: 'procesador telefono' } }),
            Componente.findAll({ where: { tipo: 'camara frontal' } }),
            Componente.findAll({ where: { tipo: 'camara trasera' } }),
            Componente.findAll({ where: { tipo: 'memoria ram' } }),
            Componente.findAll({ where: { tipo: 'almacenamiento telefono' } }),
            Componente.findAll({ where: { tipo: 'bateria laptop' } }),
            Componente.findAll({ where: { tipo: 'interfaz' } }),
        ])
        
        return res.render('admin/crearTelefono',{
            pagina: 'Añadir Tablet',
            csrfToken: req.csrfToken(),
            sistemas,
            marcas,
            tiendas,
            procesadores,
            camarasF,
            camarasT,
            memoriasRam,
            almacenamientos,
            baterias,
            interfaces,
            datos: req.body,
            errores: resultado.array()
        })
    }

    const { nombre, precio, procesador, camaraF, camaraT, 
        memoriaRam, almacenamiento, bateria, sistema: sistemaOperativoId,
        marca: marcastytId, tienda: tiendaId } = req.body

        try {
    
            const tabletGuardado = await Tablet.create({
               nombre,
               procesador,
               memoriaRam,
               almacenamiento,
               bateria: Number(bateria),
               camaraF,
               camaraT,
               precio,
               imagen: '',
               oferta: false,
               descuento: 0,
               sistemaOperativoId,
               marcastytId,
               tiendaId
            })
        
            const { id } = tabletGuardado
            
            res.redirect(`/admin/agregar-imagen-tablet/${id}`);
    
        } catch (error) {
            console.log(error)
        }
        
}

const agregarImagenTablet = async (req, res) => {
    const { id } = req.params;

    const tablet = await Tablet.findByPk(id)
   
    if(!tablet){
       return res.redirect('/tablets')
    }
   
    res.render('admin/agregar-imagen-tablet',{
       pagina: `Agregar imagen: ${tablet.nombre}`,
       tablet,
       csrfToken: req.csrfToken(),
    })   
}

const almacenarImagenTablet = async (req, res) => {
    const { id } = req.params;

    const tablet = await Tablet.findByPk(id)

    if(!tablet){
        return res.redirect('/admin/agregarTablet')
    }

    try{
      tablet.imagen = req.file.filename;
      console.log(req.file.filename)

      await tablet.save()

      res.redirect('/admin/agregarTablet')

    }catch(error){
        console.log(error)
    }    
}

export {
    adminLaptops,
    crearLaptop,
    guardarlaptop,
    agregarImagenLaptop,
    almacenarImagenLaptop,
    editarLaptop,
    actualizarLaptop,
    crearTelefono,
    guardarTelefono,
    agregarImagenTelefono,
    almacenarImagenTelefono,
    crearTablet,
    guardarTablet,
    agregarImagenTablet,
    almacenarImagenTablet
}