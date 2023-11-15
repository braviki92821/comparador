import { Sequelize } from 'sequelize'
import { Op } from 'sequelize';
import { Laptop, Tablet, Telefono, SO, MarcaL, MarcaTyT, Tienda } from '../models/index.js'
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

  const { pagina: paginaActual } = req.query;

  const exp = /^[0-9]+$/;

  if (!exp.test(paginaActual)) {
    return res.redirect("/laptops?pagina=1");
  }

  try {
    
    let limite = 6

    const offset = paginaActual * limite - limite

    const [laptops, total] = await Promise.all([
        await Laptop.findAll({
            // where: { precio: { [Op.gte]: Number(precio) } }, 
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

    res.render('categorias/laptop',{
        pagina: 'Laptops',
        laptops,
        csrfToken: req.csrfToken(),
        paginas: Math.ceil(total / limite),
        paginaActual: Number(paginaActual),
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
        Laptop.findByPk(Number(laptopsIds[0]),{
            include:[
                { model: SO, as:'sistemaOperativo' },
                { model: MarcaL, as:'marcasLaptop' },
                { model: Tienda, as:'tienda'}
            ]
        }),
        Laptop.findByPk(Number(laptopsIds[1]),{
            include:[
                { model: SO, as:'sistemaOperativo' },
                { model: MarcaL, as:'marcasLaptop' },
                { model: Tienda, as:'tienda'}
            ]
        }),
        Laptop.findByPk(Number(laptopsIds[2]),{
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
    
    const { pagina: paginaActual } = req.query;
  
    const exp = /^[0-9]+$/;
  
    if (!exp.test(paginaActual)) {
      return res.redirect("/telefonos?pagina=1");
    }

    try {
      let limite = 6

      const offset = paginaActual * limite - limite  

      const [telefonos, total] = await Promise.all([
          await Telefono.findAll({
            limit: limite,
            offset,
            include: [
                { model: SO, as:'sistemaOperativo' },
                { model: MarcaTyT, as:'marcastyt' },
                { model: Tienda, as:'tienda'}
            ],                        
          }),
          Telefono.count()
      ])

      res.render('categorias/telefono',{
        pagina: 'Telefonos',
        telefonos,
        csrfToken: req.csrfToken(),
        paginas: Math.ceil(total / limite),
        paginaActual: Number(paginaActual),
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
    Telefono.findByPk(Number(TelefonosIds[0]),{
        include:[
            { model: SO, as:'sistemaOperativo' },
            { model: MarcaTyT, as:'marcastyt' },
            { model: Tienda, as:'tienda'}
        ]
    }),
    Telefono.findByPk(Number(TelefonosIds[1]),{
        include:[
            { model: SO, as:'sistemaOperativo' },
            { model: MarcaTyT, as:'marcastyt' },
            { model: Tienda, as:'tienda'}
        ]
    })
  ])

  const [procesadorT1,procesadorT2] = await Promise.all([
    Componente.findAll({
        raw: true,
        where: { nombre: telefonos[0].procesador}
    }),
    Componente.findAll({
        raw: true,
        where: { nombre: telefonos[1].procesador}
    })
  ])

  const [memoriaRamT1, memoriaRamT2] = await Promise.all([
    Componente.findAll({
        raw: true,
        where: { nombre: telefonos[0].memoriaRam, tipo:'memoria ram'}
    }),
    Componente.findAll({
        raw: true,
        where: { nombre: telefonos[1].memoriaRam, tipo:'memoria ram'}
    })
  ]) 

  const [almacenamientoT1, almacenamientoT2] = await Promise.all([
    Componente.findAll({
        raw: true,
        where: { nombre: telefonos[0].almacenamiento, tipo:'almacenamiento telefono'}
    }),
    Componente.findAll({
        raw: true,
        where: { nombre: telefonos[1].almacenamiento, tipo:'almacenamiento telefono'}
    })
  ])

  const [bateriaT1, bateriaT2] = await Promise.all([
    Componente.findAll({
        raw: true,
        where: { nombre: telefonos[0].bateria.toString()}
    }),
    Componente.findAll({
        raw: true,
        where: { nombre: telefonos[1].bateria.toString()}
    })
  ])

  const [camaraFT1, camaraFT2] = await Promise.all([
    Componente.findAll({
        raw: true,
        where : { nombre: telefonos[0].camaraF, tipo: 'camara frontal'}
    }),
    Componente.findAll({
        raw: true,
        where : { nombre: telefonos[1].camaraF, tipo: 'camara frontal'}
    })    
  ])

  const [camaraTT1, camaraTT2] = await Promise.all([
    Componente.findAll({
        raw: true,
        where : { nombre: telefonos[0].camaraT, tipo: 'camara trasera'}
    }),
    Componente.findAll({
        raw: true,
        where : { nombre: telefonos[1].camaraT, tipo: 'camara trasera'}
    })    
  ])

res.render('comparar/compararTelefono',{
    pagina: 'Comparar Telefonos',
    telefonos,
    procesadores: procesadorT1.concat(procesadorT2),
    memoriasRam: memoriaRamT1.concat(memoriaRamT2),
    almacenamiento: almacenamientoT1.concat(almacenamientoT2),
    baterias: bateriaT1.concat(bateriaT2),
    camarasF: camaraFT1.concat(camaraFT2),
    camarasT: camaraTT1.concat(camaraTT2),
    token: _token === undefined || _token === ''
})
}

const tablets = async (req, res) => {
    
    const { _token } = req.cookies
    
    const { pagina: paginaActual } = req.query;
  
    const exp = /^[0-9]+$/;
  
    if (!exp.test(paginaActual)) {
      return res.redirect("/tablets?pagina=1");
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
            total,
            offset,
            limite,
            token: _token === undefined || _token === '',
            precioT: true
        })
        
    } catch (error) {
       console.log(error) 
    }
  
}

const compararTablets = async (req, res) => {
    
    const { _token } = req.cookies
    
    const TabletsIds = req.cookies?.compararTablet?.split(',')
  
    const [...tablets] = await Promise.all([
      Telefono.findByPk(Number(TabletsIds[0]),{
          include:[
              { model: SO, as:'sistemaOperativo' },
              { model: MarcaTyT, as:'marcastyt' },
              { model: Tienda, as:'tienda'}
          ]
      }),
      Telefono.findByPk(Number(TabletsIds[1]),{
          include:[
              { model: SO, as:'sistemaOperativo' },
              { model: MarcaTyT, as:'marcastyt' },
              { model: Tienda, as:'tienda'}
          ]
      })
    ])
  
    const [procesadorT1,procesadorT2] = await Promise.all([
      Componente.findAll({
          raw: true,
          where: { nombre: tablets[0].procesador}
      }),
      Componente.findAll({
          raw: true,
          where: { nombre: tablets[1].procesador}
      })
    ])
  
    const [memoriaRamT1, memoriaRamT2] = await Promise.all([
      Componente.findAll({
          raw: true,
          where: { nombre: tablets[0].memoriaRam, tipo:'memoria ram'}
      }),
      Componente.findAll({
          raw: true,
          where: { nombre: tablets[1].memoriaRam, tipo:'memoria ram'}
      })
    ]) 
  
    const [almacenamientoT1, almacenamientoT2] = await Promise.all([
      Componente.findAll({
          raw: true,
          where: { nombre: tablets[0].almacenamiento, tipo:'almacenamiento telefono'}
      }),
      Componente.findAll({
          raw: true,
          where: { nombre: tablets[1].almacenamiento, tipo:'almacenamiento telefono'}
      })
    ])
  
    const [bateriaT1, bateriaT2] = await Promise.all([
      Componente.findAll({
          raw: true,
          where: { nombre: tablets[0].bateria.toString()}
      }),
      Componente.findAll({
          raw: true,
          where: { nombre: tablets[1].bateria.toString()}
      })
    ])
  
    const [camaraFT1, camaraFT2] = await Promise.all([
      Componente.findAll({
          raw: true,
          where : { nombre: tablets[0].camaraF, tipo: 'camara frontal'}
      }),
      Componente.findAll({
          raw: true,
          where : { nombre: tablets[1].camaraF, tipo: 'camara frontal'}
      })    
    ])
  
    const [camaraTT1, camaraTT2] = await Promise.all([
      Componente.findAll({
          raw: true,
          where : { nombre: tablets[0].camaraT, tipo: 'camara trasera'}
      }),
      Componente.findAll({
          raw: true,
          where : { nombre: tablets[1].camaraT, tipo: 'camara trasera'}
      })    
    ])
  
    res.render('comparar/compararTablet',{
      pagina: 'Comparar Tablets',
      tablets,
      procesadores: procesadorT1.concat(procesadorT2),
      memoriasRam: memoriaRamT1.concat(memoriaRamT2),
      almacenamiento: almacenamientoT1.concat(almacenamientoT2),
      baterias: bateriaT1.concat(bateriaT2),
      camarasF: camaraFT1.concat(camaraFT2),
      camarasT: camaraTT1.concat(camaraTT2),
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
    buscador
}