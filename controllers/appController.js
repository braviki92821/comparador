import { Sequelize } from 'sequelize'
import { Laptop, Tablet, Telefono, SO, MarcaL, MarcaTyT, Tienda } from '../models/index.js'
import Componente from '../models/Componente.js'

const inicio = async (req, res) => {

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
    })
}

const laptops = async (req, res) => {

  const { pagina: paginaActual } = req.query;
  console.log(paginaActual);

  const exp = /^[0-9]$/;

  if (!exp.test(paginaActual)) {
    return res.redirect("/laptops?pagina=1");
  }

  try {
    
    let limite = 6

    const offset = paginaActual * limite - limite

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

    res.render('categorias/laptop',{
        pagina: 'Laptops',
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

const compararLaptops = async (req, res) => {

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
        })
    ])
    
    const [procesadorL1,procesadorL2] = await Promise.all([
        Componente.findAll({
            raw: true,
            where: { nombre: laptops[0].procesador}
        }),
        Componente.findAll({
            raw: true,
            where: { nombre: laptops[1].procesador}
        })
    ])

    const [graficaL1, graficaL2] = await Promise.all([
        Componente.findAll({
            raw: true,
            where: { nombre: laptops[0].grafica}
        }),
        Componente.findAll({
            raw: true,
            where: { nombre: laptops[1].grafica}
        })
    ])

    const [memoriaRamL1, memoriaRamL2] = await Promise.all([
        Componente.findAll({
            raw: true,
            where: { nombre: laptops[0].memoriaRam}
        }),
        Componente.findAll({
            raw: true,
            where: { nombre: laptops[1].memoriaRam}
        })
    ])

    const [almacenamientoL1, almacenamientoL2] = await Promise.all([
        Componente.findAll({
            raw: true,
            where: { nombre: laptops[0].almacenamiento, tipo:'almacenamiento laptop'}
        }),
        Componente.findAll({
            raw: true,
            where: { nombre: laptops[1].almacenamiento, tipo:'almacenamiento laptop'}
        })
    ])

    const [bateriaL1, bateriaL2] = await Promise.all([
        Componente.findAll({
            raw: true,
            where: { nombre: laptops[0].bateria.toString()}
        }),
        Componente.findAll({
            raw: true,
            where: { nombre: laptops[1].bateria.toString()}
        })
    ])

    const [interfazL1, interfazL2] = await Promise.all([
        Componente.findAll({
            raw: true,
            where: { nombre: laptops[0].interfaz}
        }),
        Componente.findAll({
            raw: true,
            where: { nombre: laptops[1].interfaz}
        })
    ])

    res.render('comparar/compararLaptop',{
        pagina: 'Comparar Laptops',
        laptops,
        procesadores: procesadorL1.concat(procesadorL2),
        graficas: graficaL1.concat(graficaL2),
        memoriasRam: memoriaRamL1.concat(memoriaRamL2),
        almacenamiento: almacenamientoL1.concat(almacenamientoL2),
        baterias: bateriaL1.concat(bateriaL2),
        interfaces: interfazL1.concat(interfazL2),
    })
}

const telefonos = async (req, res) => {
    const { pagina: paginaActual } = req.query;
    console.log(paginaActual);
  
    const exp = /^[0-9]$/;
  
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
        limite
    })

    } catch (error) {
        console.log(error);
    }
  
}

const compararTelefonos = async (req, res) => {
  
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
        where: { nombre: telefonos[0].memoriaRam}
    }),
    Componente.findAll({
        raw: true,
        where: { nombre: telefonos[1].memoriaRam}
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
    camarasT: camaraTT1.concat(camaraTT2)
})
}

const tablets = async (req, res) => {
    const { pagina: paginaActual } = req.query;
    console.log(paginaActual);
  
    const exp = /^[0-9]$/;
  
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
            limite
        })
        
    } catch (error) {
       console.log(error) 
    }
  
}

const compararTablets = async (req, res) => {
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
          where: { nombre: tablets[0].memoriaRam}
      }),
      Componente.findAll({
          raw: true,
          where: { nombre: tablets[1].memoriaRam}
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
      camarasT: camaraTT1.concat(camaraTT2)
  })
}

const noEncontrado = (req, res) => {
    res.render('404',{
        pagina:'No Encontrado',
        csrfToken: req.csrfToken()
    })
}

const buscador = async (req, res) => {

}

export {
    inicio,
    laptops,
    compararLaptops,
    telefonos,
    compararTelefonos,
    tablets,
    compararTablets,
    noEncontrado,
    buscador
}