import { unlink } from "node:fs/promises";
import { Tablet, SO, MarcaTyT, Tienda } from '../models/index.js'
import { validationResult } from "express-validator";
import Componente from '../models/Componente.js'

const adminTablets = async (req, res) => {
    const { pagina: paginaActual } = req.query;

    if(req.usuario.tipo !== 1){
        return res.redirect("/");
    }

    const exp = /^[0-9]+$/;
  
    if (!exp.test(paginaActual)) {
      return res.redirect("/admin/admimistrarTablets?pagina=1");
    }

    try {

      let limite = 5;
    
      const offset = paginaActual * limite - limite;

      const [tablets, total] = await Promise.all([
        await Tablet.findAll({
            limit: limite,
            offset,
            include:[
                { model: SO, as:'sistemaOperativo' },
                { model: MarcaTyT, as:'marcastyt' },
                { model: Tienda, as:'tienda'}
            ]
        }),
        Tablet.count()
      ])
     
      res.render('admin/tablets',{
          pagina: 'Administrar Tablets',
          tablets,
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

const crearTablet = async (req, res) => {

    if(req.usuario.tipo !== 1){
        return res.redirect("/");
    }

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

    if(req.usuario.tipo !== 1){
        return res.redirect("/");
    }

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
        
        return res.render('admin/crearTablet',{
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
    

    if(req.usuario.tipo !== 1){
        return res.redirect("/");
    }

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

    if(req.usuario.tipo !== 1){
        return res.redirect("/");
    }

    const tablet = await Tablet.findByPk(id)

    if(!tablet){
        return res.redirect('/admin/agregarTablet')
    }

    try{
      tablet.imagen = req.file.filename;
      console.log(req.file.filename)

      await tablet.save()

      res.redirect('/admin/admimistrarTablets')

    }catch(error){
        console.log(error)
    }    
}

const editarTablet = async (req, res) => {
    const { id } = req.params;

    if(req.usuario.tipo !== 1){
        return res.redirect("/");
    }

    const tablet = await Tablet.findByPk(id)

    if(!tablet){
        return res.redirect('/admin/admimistrarTablets')
    }

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

    res.render('admin/editarTablet',{
        pagina: 'Editar Tablet',
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
        datos: tablet
    })
}

const actualizarTablet = async (req, res) => {
    let resultado = validationResult(req);

    if(req.usuario.tipo !== 1){
        return res.redirect("/");
    }

    if(!resultado.isEmpty()){
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

        return res.render('admin/editarTablet',{
            pagina: 'Editar Tablet',
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

    const { id } = req.params;

    const tablet = await Tablet.findByPk(id)
  
    if(!tablet){
       return res.redirect('/admin/admimistrarTablets')
    }

    try {

       const {nombre, procesador, camaraF, camaraT, memoriaRam, 
        almacenamiento, bateria, precio, oferta, descuento, sistema: sistemaOperativoId,
        marca: marcastytId, tienda: tiendaId} = req.body

        tablet.set({
            nombre,
            procesador,
            memoriaRam,
            almacenamiento,
            bateria,
            camaraF,
            camaraT,
            precio,
            oferta: Boolean(Number(oferta)),
            descuento,
            sistemaOperativoId,
            marcastytId,
            tiendaId
        })

        tablet.save()

        res.redirect('/admin/admimistrarTablets')
    
    } catch (error) {
       console.log(error) 
    }
}

const eliminarTablet = async (req, res) => {
    const { id } = req.params;  

    if(req.usuario.tipo !== 1){
        return res.redirect("/");
    }

    const tablet = await Tablet.findByPk(id)

    if(!tablet){
       return res.redirect('/admin/admimistrarTablets')
    }

    await unlink(`public/uploads/${tablet.imagen}`);

    console.log(`se elimino: ${tablet.imagen}`);
    await tablet.destroy();
    res.redirect("/admin/admimistrarTablets");
}

export {
    adminTablets,
    crearTablet,
    guardarTablet,
    agregarImagenTablet,
    almacenarImagenTablet,
    editarTablet,
    actualizarTablet,
    eliminarTablet
}