import { unlink } from "node:fs/promises";
import { Tablet, SO, MarcaTyT, Tienda } from '../models/index.js'
import { validationResult } from "express-validator";
import Componente from '../models/Componente.js'

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
    crearTablet,
    guardarTablet,
    agregarImagenTablet,
    almacenarImagenTablet
}