import { unlink } from "node:fs/promises";
import { Laptop, SO, MarcaL, Tienda } from '../models/index.js'
import { validationResult } from "express-validator";
import Componente from '../models/Componente.js'

const adminLaptops = async (req, res) => {
    const { pagina: paginaActual } = req.query;

    const exp = /^[0-9]+$/;

    if(req.usuario.tipo !== 1){
        return res.redirect("/");
    }
  
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
          //paginas: 150,
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

    if(req.usuario.tipo !== 1){
        return res.redirect("/");
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

    if(req.usuario.tipo !== 1){
        return res.redirect("/");
    }

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

 if(req.usuario.tipo !== 1){
    return res.redirect("/");
}

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

    if(req.usuario.tipo !== 1){
        return res.redirect("/");
    }

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

    if(req.usuario.tipo !== 1){
        return res.redirect("/");
    }

    if(req.usuario.tipo !== 1){
        return res.redirect("/");
    }

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
  let resultado = validationResult(req);

  if(req.usuario.tipo !== 1){
    return res.redirect("/");
}

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

    return res.render('admin/editarLaptop',{
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

  const { id } = req.params;

  const laptop = await Laptop.findByPk(id)

  if(!laptop){
     return res.redirect('/admin/admimistrarLaptops')
  }

  try {
 
    const { nombre, precio, procesador, grafica, interfaz, 
        memoriaRam, almacenamiento, oferta, descuento, bateria, sistemaOperativoId,
        marcasLaptopId, tiendaId } = req.body

    laptop.set({
        nombre, 
        precio, 
        procesador, 
        grafica, 
        interfaz, 
        memoriaRam, 
        almacenamiento, 
        oferta: Boolean(Number(oferta)), 
        descuento, 
        bateria,
        sistemaOperativoId,
        marcasLaptopId,
        tiendaId
    })

    await laptop.save()

    res.redirect('/admin/admimistrarLaptops')

  } catch (error) {
    console.log(error);
  }

}

const eliminarLaptop = async (req, res) => {
    const { id } = req.params; 
    
    if(req.usuario.tipo !== 1){
        return res.redirect("/");
    } 

    const laptop = await Laptop.findByPk(id)

    if(!laptop){
       return res.redirect('/admin/admimistrarLaptops')
    }

    await unlink(`public/uploads/${laptop.imagen}`);

    console.log(`se elimino: ${laptop.imagen}`);
    await laptop.destroy();
    res.redirect("/admin/admimistrarLaptops");
}

export {
    adminLaptops,
    crearLaptop,
    guardarlaptop,
    agregarImagenLaptop,
    almacenarImagenLaptop,
    editarLaptop,
    actualizarLaptop,
    eliminarLaptop
}