import { Sequelize } from 'sequelize'
import { Op } from 'sequelize';
import { Laptop, Tablet, Telefono, SO, MarcaL, MarcaTyT, Tienda, Favorito } from '../models/index.js'
import Componente from '../models/Componente.js'

const inicio = async (req, res) => {

    const { _token } = req.cookies

    const [ laptops, tablets, telefonos ] = await Promise.all([
        Laptop.findAll({
            limit: 3,
            include: [
                { model: SO, as:'sistemaOperativo' },
                { model: MarcaL, as:'marcasLaptop' },
                { model: Tienda, as:'tienda'}
            ],
            order: [[ 'createdAt','DESC' ]]
        }),
        Tablet.findAll({
            limit: 3,
            include: [
                { model: SO, as:'sistemaOperativo' },
                { model: MarcaTyT, as:'marcastyt' },
                { model: Tienda, as:'tienda'}
            ],
            order: [[ 'createdAt','DESC' ]]
        }),
        Telefono.findAll({
            limit: 3,
            include: [
                { model: SO, as:'sistemaOperativo' },
                { model: MarcaTyT, as:'marcastyt' },
                { model: Tienda, as:'tienda'}
            ],
            order: [[ 'createdAt','DESC' ]]
        }),
    ])

    res.render('inicio',{
        pagina: 'Inicio',
        laptops,
        tablets,
        telefonos,
        csrfToken: req.csrfToken(),
        token: _token === undefined || _token === ''
    })
}

const promociones = async (req, res) => {
    
    const { _token } = req.cookies

    const [ laptops, tablets, telefonos ] = await Promise.all([
        Laptop.findAll({
            where: { oferta: true },
            limit: 5,
            include: [
                { model: SO, as:'sistemaOperativo' },
                { model: MarcaL, as:'marcasLaptop' },
                { model: Tienda, as:'tienda'}
            ],
            order: [[ 'createdAt','DESC' ]]
        }),
        Tablet.findAll({
            where: { oferta: true },
            limit: 5,
            include: [
                { model: SO, as:'sistemaOperativo' },
                { model: MarcaTyT, as:'marcastyt' },
                { model: Tienda, as:'tienda'}
            ],
            order: [[ 'createdAt','DESC' ]]
        }),
        Telefono.findAll({
            where: { oferta: true },
            limit: 5,
            include: [
                { model: SO, as:'sistemaOperativo' },
                { model: MarcaTyT, as:'marcastyt' },
                { model: Tienda, as:'tienda'}
            ],
            order: [[ 'createdAt','DESC' ]]
        }),        
    ])

    res.render('promociones',{
        pagina: 'Promociones',
        csrfToken: req.csrfToken(),
        promociones: laptops.concat(telefonos).concat(tablets),
        token: _token === undefined || _token === ''
    })
}

const laptops = async (req, res) => {

  const { _token } = req.cookies

  const { pagina: paginaActual, precio:preciop  } = req.query;

  const exp = /^[0-9]+$/;

  if (!exp.test(paginaActual) || !exp.test(preciop)) {
        return res.redirect("/laptops?pagina=1&precio=75000");
  }

  try {
    
    let limite = 6

    const offset = paginaActual * limite - limite

    const [laptops, total] = await Promise.all([
        await Laptop.findAll({
            where: { precio: { [Op.lte]: preciop } }, 
            limit: limite,
            offset,
            include:[
                { model: SO, as:'sistemaOperativo' },
                { model: MarcaL, as:'marcasLaptop' },
                { model: Tienda, as:'tienda'}
            ]
        }),
        Laptop.count({ where: { precio: { [Op.lte]: Number(preciop) } } })
    ])

    res.render('categorias/laptop',{
        pagina: 'Laptops',
        laptops,
        csrfToken: req.csrfToken(),
        paginas: Math.ceil(total / limite),
        paginaActual: Number(paginaActual),
        precio: Number(preciop),
        total,
        offset,
        limite,
        token: _token === undefined || _token === '',
        precioL: true,
    })

  } catch (error) {
    console.log(error);
  }
}

const compararLaptops = async (req, res) => {

    const { _token } = req.cookies

    const laptopsIds = req.cookies?.compararLaptop?.split(',')
 
    const [...laptops] = await Promise.all([
        Laptop.findByPk(laptopsIds[0],{
            include:[
                { model: SO, as:'sistemaOperativo' },
                { model: MarcaL, as:'marcasLaptop' },
                { model: Tienda, as:'tienda'}
            ]
        }),
        Laptop.findByPk(laptopsIds[1],{
            include:[
                { model: SO, as:'sistemaOperativo' },
                { model: MarcaL, as:'marcasLaptop' },
                { model: Tienda, as:'tienda'}
            ]
        }),
        Laptop.findByPk(laptopsIds[2],{
            include:[
                { model: SO, as:'sistemaOperativo' },
                { model: MarcaL, as:'marcasLaptop' },
                { model: Tienda, as:'tienda'}
            ]
        })
    ])
    
    const [procesadorL1, procesadorL2, procesadorL3] = await Promise.all([
        Componente.findAll({
            raw: true,
            where: { nombre: laptops[0].procesador}
        }),
        Componente.findAll({
            raw: true,
            where: { nombre: laptops[1].procesador}
        }),
        Componente.findAll({
            raw: true,
            where: { nombre: laptops[2].procesador}
        })
    ])

    const [graficaL1, graficaL2, graficaL3] = await Promise.all([
        Componente.findAll({
            raw: true,
            where: { nombre: laptops[0].grafica}
        }),
        Componente.findAll({
            raw: true,
            where: { nombre: laptops[1].grafica}
        }),
        Componente.findAll({
            raw: true,
            where: { nombre: laptops[2].grafica}
        })
    ])

    const [memoriaRamL1, memoriaRamL2, memoriaRamL3] = await Promise.all([
        Componente.findAll({
            raw: true,
            where: { nombre: laptops[0].memoriaRam , tipo:'memoria ram'}
        }),
        Componente.findAll({
            raw: true,
            where: { nombre: laptops[1].memoriaRam, tipo:'memoria ram'}
        }),
        Componente.findAll({
            raw: true,
            where: { nombre: laptops[2].memoriaRam, tipo:'memoria ram'}
        })
    ])

    const [almacenamientoL1, almacenamientoL2, almacenamientoL3] = await Promise.all([
        Componente.findAll({
            raw: true,
            where: { nombre: laptops[0].almacenamiento, tipo:'almacenamiento laptop'}
        }),
        Componente.findAll({
            raw: true,
            where: { nombre: laptops[1].almacenamiento, tipo:'almacenamiento laptop'}
        }),
        Componente.findAll({
            raw: true,
            where: { nombre: laptops[2].almacenamiento, tipo:'almacenamiento laptop'}
        })
    ])

    const [bateriaL1, bateriaL2, bateriaL3] = await Promise.all([
        Componente.findAll({
            raw: true,
            where: { nombre: laptops[0].bateria.toString()}
        }),
        Componente.findAll({
            raw: true,
            where: { nombre: laptops[1].bateria.toString()}
        }),
        Componente.findAll({
            raw: true,
            where: { nombre: laptops[2].bateria.toString()}
        })
    ])

    const [interfazL1, interfazL2, interfazL3] = await Promise.all([
        Componente.findAll({
            raw: true,
            where: { nombre: laptops[0].interfaz}
        }),
        Componente.findAll({
            raw: true,
            where: { nombre: laptops[1].interfaz}
        }),
        Componente.findAll({
            raw: true,
            where: { nombre: laptops[2].interfaz}
        })
    ])

    res.render('comparar/compararLaptop',{
        pagina: 'Comparar Laptops',
        csrfToken: req.csrfToken(),
        laptops,
        procesadores: procesadorL1.concat(procesadorL2).concat(procesadorL3),
        graficas: graficaL1.concat(graficaL2).concat(graficaL3),
        memoriasRam: memoriaRamL1.concat(memoriaRamL2).concat(memoriaRamL3),
        almacenamiento: almacenamientoL1.concat(almacenamientoL2).concat(almacenamientoL3),
        baterias: bateriaL1.concat(bateriaL2).concat(bateriaL3),
        interfaces: interfazL1.concat(interfazL2).concat(interfazL3),
        token: _token === undefined || _token === ''
    })
}

const telefonos = async (req, res) => {
    
    const { _token } = req.cookies
    
    const { pagina: paginaActual, precio:preciop  } = req.query;
  
    const exp = /^[0-9]+$/;
  
    if (!exp.test(paginaActual) || !exp.test(preciop)) {
      return res.redirect("/telefonos?pagina=1&precio=65000");
    }

    try {
      let limite = 6

      const offset = paginaActual * limite - limite  

      const [telefonos, total] = await Promise.all([
          await Telefono.findAll({
            where: { precio: { [Op.lte]: preciop } },
            limit: limite,
            offset,
            include: [
                { model: SO, as:'sistemaOperativo' },
                { model: MarcaTyT, as:'marcastyt' },
                { model: Tienda, as:'tienda'}
            ],                        
          }),
          Telefono.count({ where: { precio: { [Op.lte]: preciop } } })
      ])

      res.render('categorias/telefono',{
        pagina: 'Telefonos',
        telefonos,
        csrfToken: req.csrfToken(),
        paginas: Math.ceil(total / limite),
        paginaActual: Number(paginaActual),
        precio: Number(preciop),
        total,
        offset,
        limite,
        token: _token === undefined || _token === '',
        precioT: true
    })

    } catch (error) {
        console.log(error);
    }
  
}

const compararTelefonos = async (req, res) => {
  
  const { _token } = req.cookies
  
  const TelefonosIds = req.cookies?.compararTelefono?.split(',')
  
  const [...telefonos] = await Promise.all([
    Telefono.findByPk(TelefonosIds[0],{
        include:[
            { model: SO, as:'sistemaOperativo' },
            { model: MarcaTyT, as:'marcastyt' },
            { model: Tienda, as:'tienda'}
        ]
    }),
    Telefono.findByPk(TelefonosIds[1],{
        include:[
            { model: SO, as:'sistemaOperativo' },
            { model: MarcaTyT, as:'marcastyt' },
            { model: Tienda, as:'tienda'}
        ]
    }),
    Telefono.findByPk(TelefonosIds[2],{
        include:[
            { model: SO, as:'sistemaOperativo' },
            { model: MarcaTyT, as:'marcastyt' },
            { model: Tienda, as:'tienda'}
        ]
    })
  ])

  const [procesadorT1, procesadorT2, procesadorT3] = await Promise.all([
    Componente.findAll({
        raw: true,
        where: { nombre: telefonos[0].procesador}
    }),
    Componente.findAll({
        raw: true,
        where: { nombre: telefonos[1].procesador}
    }),
    Componente.findAll({
        raw: true,
        where: { nombre: telefonos[2].procesador}
    })
  ])

  const [memoriaRamT1, memoriaRamT2, memoriaRamT3] = await Promise.all([
    Componente.findAll({
        raw: true,
        where: { nombre: telefonos[0].memoriaRam, tipo:'memoria ram'}
    }),
    Componente.findAll({
        raw: true,
        where: { nombre: telefonos[1].memoriaRam, tipo:'memoria ram'}
    }),
    Componente.findAll({
        raw: true,
        where: { nombre: telefonos[2].memoriaRam, tipo:'memoria ram'}
    })
  ]) 

  const [almacenamientoT1, almacenamientoT2, almacenamientoT3] = await Promise.all([
    Componente.findAll({
        raw: true,
        where: { nombre: telefonos[0].almacenamiento, tipo:'almacenamiento telefono'}
    }),
    Componente.findAll({
        raw: true,
        where: { nombre: telefonos[1].almacenamiento, tipo:'almacenamiento telefono'}
    }),
    Componente.findAll({
        raw: true,
        where: { nombre: telefonos[2].almacenamiento, tipo:'almacenamiento telefono'}
    })
  ])

  const [bateriaT1, bateriaT2, bateriaT3] = await Promise.all([
    Componente.findAll({
        raw: true,
        where: { nombre: telefonos[0].bateria.toString()}
    }),
    Componente.findAll({
        raw: true,
        where: { nombre: telefonos[1].bateria.toString()}
    }),
    Componente.findAll({
        raw: true,
        where: { nombre: telefonos[2].bateria.toString()}
    })
  ])

  const [camaraFT1, camaraFT2, camaraFT3] = await Promise.all([
    Componente.findAll({
        raw: true,
        where : { nombre: telefonos[0].camaraF, tipo: 'camara frontal'}
    }),
    Componente.findAll({
        raw: true,
        where : { nombre: telefonos[1].camaraF, tipo: 'camara frontal'}
    }),
    Componente.findAll({
        raw: true,
        where : { nombre: telefonos[2].camaraF, tipo: 'camara frontal'}
    })        
  ])

  const [camaraTT1, camaraTT2, camaraTT3] = await Promise.all([
    Componente.findAll({
        raw: true,
        where : { nombre: telefonos[0].camaraT, tipo: 'camara trasera'}
    }),
    Componente.findAll({
        raw: true,
        where : { nombre: telefonos[1].camaraT, tipo: 'camara trasera'}
    }),
    Componente.findAll({
        raw: true,
        where : { nombre: telefonos[1].camaraT, tipo: 'camara trasera'}
    })       
  ])

res.render('comparar/compararTelefono',{
    pagina: 'Comparar Telefonos',
    csrfToken: req.csrfToken(),
    telefonos,
    procesadores: procesadorT1.concat(procesadorT2).concat(procesadorT3),
    memoriasRam: memoriaRamT1.concat(memoriaRamT2).concat(memoriaRamT3),
    almacenamiento: almacenamientoT1.concat(almacenamientoT2).concat(almacenamientoT3),
    baterias: bateriaT1.concat(bateriaT2).concat(bateriaT3),
    camarasF: camaraFT1.concat(camaraFT2).concat(camaraFT3),
    camarasT: camaraTT1.concat(camaraTT2).concat(camaraTT3),
    token: _token === undefined || _token === ''
})
}

const tablets = async (req, res) => {
    
    const { _token } = req.cookies
    
    const { pagina: paginaActual, precio:preciop  } = req.query;
  
    const exp = /^[0-9]+$/;
  
    if (!exp.test(paginaActual) || !exp.test(preciop)) {
      return res.redirect("/tablets?pagina=1&precio=65000");
    }

    try {
        let limite = 6

        const offset = paginaActual * limite - limite  
  
        const [tablets, total] = await Promise.all([
            await Tablet.findAll({
              limit: limite,
              offset,
              include: [
                  { model: SO, as:'sistemaOperativo' },
                  { model: MarcaTyT, as:'marcastyt' },
                  { model: Tienda, as:'tienda'}
              ],                        
            }),
            Tablet.count()
        ])

        res.render('categorias/tablet',{
            pagina: 'Tablets',
            tablets,
            csrfToken: req.csrfToken(),
            paginas: Math.ceil(total / limite),
            paginaActual: Number(paginaActual),
            precio: Number(preciop),
            total,
            offset,
            limite,
            token: _token === undefined || _token === '',
            precioTb: true
        })
        
    } catch (error) {
       console.log(error) 
    }
  
}

const compararTablets = async (req, res) => {
    
    const { _token } = req.cookies
    
    const TabletsIds = req.cookies?.compararTablet?.split(',')
  
    const [...tablets] = await Promise.all([
      Tablet.findByPk(TabletsIds[0],{
          include:[
              { model: SO, as:'sistemaOperativo' },
              { model: MarcaTyT, as:'marcastyt' },
              { model: Tienda, as:'tienda'}
          ]
      }),
      Tablet.findByPk(TabletsIds[1],{
          include:[
              { model: SO, as:'sistemaOperativo' },
              { model: MarcaTyT, as:'marcastyt' },
              { model: Tienda, as:'tienda'}
          ]
      }),
      Tablet.findByPk(TabletsIds[2],{
          include:[
              { model: SO, as:'sistemaOperativo' },
              { model: MarcaTyT, as:'marcastyt' },
              { model: Tienda, as:'tienda'}
          ]
      })
    ])
  
    const [procesadorT1, procesadorT2, procesadorT3] = await Promise.all([
      Componente.findAll({
          raw: true,
          where: { nombre: tablets[0].procesador}
      }),
      Componente.findAll({
          raw: true,
          where: { nombre: tablets[1].procesador}
      }),
      Componente.findAll({
          raw: true,
          where: { nombre: tablets[2].procesador}
      })
    ])
  
    const [memoriaRamT1, memoriaRamT2, memoriaRamT3] = await Promise.all([
      Componente.findAll({
          raw: true,
          where: { nombre: tablets[0].memoriaRam, tipo:'memoria ram'}
      }),
      Componente.findAll({
          raw: true,
          where: { nombre: tablets[1].memoriaRam, tipo:'memoria ram'}
      })
      ,
      Componente.findAll({
          raw: true,
          where: { nombre: tablets[2].memoriaRam, tipo:'memoria ram'}
      })
    ]) 
  
    const [almacenamientoT1, almacenamientoT2, almacenamientoT3] = await Promise.all([
      Componente.findAll({
          raw: true,
          where: { nombre: tablets[0].almacenamiento, tipo:'almacenamiento telefono'}
      }),
      Componente.findAll({
          raw: true,
          where: { nombre: tablets[1].almacenamiento, tipo:'almacenamiento telefono'}
      }),
      Componente.findAll({
          raw: true,
          where: { nombre: tablets[2].almacenamiento, tipo:'almacenamiento telefono'}
      })
    ])
  
    const [bateriaT1, bateriaT2, bateriaT3] = await Promise.all([
      Componente.findAll({
          raw: true,
          where: { nombre: tablets[0].bateria.toString()}
      }),
      Componente.findAll({
          raw: true,
          where: { nombre: tablets[1].bateria.toString()}
      }),
      Componente.findAll({
          raw: true,
          where: { nombre: tablets[1].bateria.toString()}
      })
    ])
  
    const [camaraFT1, camaraFT2, camaraFT3] = await Promise.all([
      Componente.findAll({
          raw: true,
          where : { nombre: tablets[0].camaraF, tipo: 'camara frontal'}
      }),
      Componente.findAll({
          raw: true,
          where : { nombre: tablets[1].camaraF, tipo: 'camara frontal'}
      }),
      Componente.findAll({
          raw: true,
          where : { nombre: tablets[1].camaraF, tipo: 'camara frontal'}
      })        
    ])
  
    const [camaraTT1, camaraTT2, camaraTT3] = await Promise.all([
      Componente.findAll({
          raw: true,
          where : { nombre: tablets[0].camaraT, tipo: 'camara trasera'}
      }),
      Componente.findAll({
          raw: true,
          where : { nombre: tablets[1].camaraT, tipo: 'camara trasera'}
      }),
      Componente.findAll({
          raw: true,
          where : { nombre: tablets[1].camaraT, tipo: 'camara trasera'}
      })   
    ])
  
    res.render('comparar/compararTablet',{
      pagina: 'Comparar Tablets',
      csrfToken: req.csrfToken(),
      tablets,
      procesadores: procesadorT1.concat(procesadorT2).concat(procesadorT3),
      memoriasRam: memoriaRamT1.concat(memoriaRamT2).concat(memoriaRamT3),
      almacenamiento: almacenamientoT1.concat(almacenamientoT2).concat(almacenamientoT3),
      baterias: bateriaT1.concat(bateriaT2).concat(bateriaT3),
      camarasF: camaraFT1.concat(camaraFT2).concat(camaraFT2),
      camarasT: camaraTT1.concat(camaraTT2).concat(camaraTT3),
      token: _token === undefined || _token === ''
    })
}

const noEncontrado = (req, res) => {
    
    const { _token } = req.cookies
    
    res.render('404',{
        pagina:'No Encontrado',
        csrfToken: req.csrfToken(),
        token: _token === undefined || _token === ''
    })
}

const buscador = async (req, res) => {
    
    const { _token } = req.cookies
    
    const { termino } = req.body

    if(!termino.trim()){
      return res.redirect('back')
    }

    const [ laptops, tablets, telefonos ] = await Promise.all([
        Laptop.findAll({
            where: { nombre: { [Sequelize.Op.like] : '%' + termino + '%' } },
            limit: 6,
            include: [
                { model: SO, as:'sistemaOperativo' },
                { model: MarcaL, as:'marcasLaptop' },
                { model: Tienda, as:'tienda'}
            ],
            order: [[ 'createdAt','DESC' ]]
        }),
        Tablet.findAll({
            where: { nombre: { [Sequelize.Op.like] : '%' + termino + '%' } },
            limit: 6,
            include: [
                { model: SO, as:'sistemaOperativo' },
                { model: MarcaTyT, as:'marcastyt' },
                { model: Tienda, as:'tienda'}
            ],
            order: [[ 'createdAt','DESC' ]]
        }),
        Telefono.findAll({
            where: { nombre: { [Sequelize.Op.like] : '%' + termino + '%' } },
            limit: 6,
            include: [
                { model: SO, as:'sistemaOperativo' },
                { model: MarcaTyT, as:'marcastyt' },
                { model: Tienda, as:'tienda'}
            ],
            order: [[ 'createdAt','DESC' ]]
        }),        
    ])

    res.render('buscador',{
        pagina: 'Resultados de la busqueda',
        resultados: laptops.concat(telefonos).concat(tablets),
        csrfToken: req.csrfToken(),
        token: _token === undefined || _token === ''
    })
}

const mostrarfavoritos = async (req, res) => {
    const { id } = req.usuario

    // const { pagina: paginaActual } = req.query;

    // const exp = /^[0-9]+$/;

    // if (!exp.test(paginaActual)) {
    //   return res.redirect("/favoritos?pagina=1");
    // }

    const favoritos = await Favorito.findAll({
        where: { usuarioId: id }
    })

    let resultados = []

    for(let i = 0; i< favoritos.length; i++){
        // resultados = laptops.filter((x)=> x.id === favoritos[i].idProducto)
        resultados.push(await Laptop.findByPk(favoritos[i].idProducto,{ include: [{ model: Tienda, as:'tienda'}] }))
        resultados.push(await Telefono.findByPk(favoritos[i].idProducto,{ include: [{ model: Tienda, as:'tienda'}] }))
        resultados.push(await Tablet.findByPk(favoritos[i].idProducto,{ include: [{ model: Tienda, as:'tienda'}] }))
    }

    resultados = resultados.filter((x)=> x !== null)
    // const total = resultados.length
    // const limite = 6
    // const offset = paginaActual * limite - limite

    res.render('favoritos', {
        pagina: 'Tus Productos favoritos',
        csrfToken: req.csrfToken(),
        resultados,
        // paginas: Math.ceil(total / limite),        
        // paginaActual: Number(paginaActual),
        // total,
        // offset,
        // limite,
    })
}

const favoritos = async (req, res) => {
    const { id } = req.usuario

    const favoritos = await Favorito.findAll({
        where: { usuarioId: id }
    })

    res.json( favoritos )

}

const agregarFavorito = async(req, res) => {
    const { productoId } = req.body
    const { id } = req.usuario

    const esfavorito = await Favorito.findAll({
        where: {
            [Op.and]: [
              { idProducto: productoId },
              { usuarioId: id }
            ]
          }
    })
    
    console.log(esfavorito)

    if(esfavorito.length !== 0) {
        await Favorito.destroy({
            where: {
                [Op.and]: [
                  { idProducto: productoId },
                  { usuarioId: id }
                ]
              }
        });
        return res.json({ result : 'ok', operacion: 'eliminar'} )
    }
    
    const nuevofavorito = await Favorito.create({
        idProducto: productoId,
        usuarioId: id
    })


    res.json({ result : 'ok', operacion: 'añadir'} )
}

export {
    inicio,
    laptops,
    promociones,
    compararLaptops,
    telefonos,
    compararTelefonos,
    tablets,
    compararTablets,
    noEncontrado,
    buscador,
    agregarFavorito,
    favoritos,
    mostrarfavoritos
}