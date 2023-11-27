import { unlink } from "node:fs/promises";
import { Telefono, SO, MarcaTyT, Tienda } from '../models/index.js'
import { validationResult } from "express-validator";
import Componente from '../models/Componente.js'

const adminTelefonos = async (req, res) => {
    const { pagina: paginaActual } = req.query;

    if(req.usuario.tipo !== 1){
        return res.redirect("/");
    }

    const exp = /^[0-9]+$/;
  
    if (!exp.test(paginaActual)) {
      return res.redirect("/admin/admimistrarTelefonos?pagina=1");
    }

    try {

      let limite = 5;
    
      const offset = paginaActual * limite - limite;

      const [telefonos, total] = await Promise.all([
        await Telefono.findAll({
            limit: limite,
            offset,
            include:[
                { model: SO, as:'sistemaOperativo' },
                { model: MarcaTyT, as:'marcastyt' },
                { model: Tienda, as:'tienda'}
            ]
        }),
        Telefono.count()
      ])
     
      res.render('admin/telefonos',{
          pagina: 'Administrar Telefonos',
          telefonos,
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

const crearTelefono  = async (req, res) => {

    if(req.usuario.tipo !== 1){
        return res.redirect("/");
    }

    const [ sistemas, marcas, tiendas] = await Promise.all([
        SO.findAll({ where: {tipo: 'telefono'} }),
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

    if(req.usuario.tipo !== 1){
        return res.redirect("/");
    }

    if (!resultado.isEmpty()) {
        const [ sistemas, marcas, tiendas] = await Promise.all([
            SO.findAll({ where: {tipo: 'telefono'} }),
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

    if(req.usuario.tipo !== 1){
        return res.redirect("/");
    }

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

    if(req.usuario.tipo !== 1){
        return res.redirect("/");
    }

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

const editarTelefono = async (req, res) => {
    const { id } = req.params;

    if(req.usuario.tipo !== 1){
        return res.redirect("/");
    }

    const telefono = await Telefono.findByPk(id)

    if(!telefono){
        return res.redirect('/admin/admimistrarLaptops')
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

    res.render('admin/editarTelefono',{
        pagina: 'Editar Telefono',
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
        datos: telefono
    })
}

const actualizarTelefono = async (req, res) => {
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

        return res.render('admin/editarTelefono',{
            pagina: 'Editar Telefono',
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

    const telefono = await Telefono.findByPk(id)
  
    if(!telefono){
       return res.redirect('/admin/admimistrarTelefonos')
    }

    try {

       const {nombre, procesador, camaraF, camaraT, memoriaRam, 
        almacenamiento, bateria, precio, oferta, descuento, sistema: sistemaOperativoId,
        marca: marcastytId, tienda: tiendaId} = req.body

        telefono.set({
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

        telefono.save()

        res.redirect('/admin/admimistrarTelefonos')
    
    } catch (error) {
       console.log(error) 
    }
}

const eliminarTelefono = async (req, res) => {
    const { id } = req.params;  

    if(req.usuario.tipo !== 1){
        return res.redirect("/");
    }

    const telefono = await Telefono.findByPk(id)

    if(!telefono){
       return res.redirect('/admin/admimistrarTelefonos')
    }

    await unlink(`public/uploads/${telefono.imagen}`);

    console.log(`se elimino: ${telefono.imagen}`);
    await telefono.destroy();
    res.redirect("/admin/admimistrarTelefonos");
}

export {
    adminTelefonos,
    crearTelefono,
    guardarTelefono,
    agregarImagenTelefono,
    almacenarImagenTelefono,
    editarTelefono,
    actualizarTelefono,
    eliminarTelefono
}