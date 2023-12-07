(function() {
    const btnActivarModal = document.querySelector('.modal-click')
    const btnDesactivarModal = document.querySelector('.modal-close')
    const procesador = document.querySelector('.procesador')
    const tarjetaGrafica = document.querySelector('.tarjeta-grafica')
    const memoriaRam = document.querySelector('.memoriaRam')
    const almacenamiento = document.querySelector('.almacenamiento')

    const modalProcesador = document.querySelectorAll('.modal-procesador')
    const modalTarjetaGrafica = document.querySelectorAll('.modal-tarjeta-grafica')
    const modalMemoriaRam = document.querySelectorAll('.modal-memoriaRam')
    const modalAlmacenamiento = document.querySelectorAll('.modal-almacenamiento')

    const h3 = document.createElement('h3')
    h3.classList.add('text-lg','leading-6','font-medium','text-gray-900')
    const p = document.createElement('p')
    p.classList.add('text-gray-900')

    modalProcesador.forEach(boton => {
        boton.addEventListener('click', e => {
            const { puntosProcesador } = e.target.dataset
            h3.textContent = `Puntos de este procesador: ${puntosProcesador}`
            btnActivarModal.click()
            procesador.classList.remove('hidden')
            if(puntosProcesador <= 3){
                p.textContent= "El procesador de esta computadora es apto para aplicaciones de trabajo docente como lo son la paqueteria Office"
            } else if(puntosProcesador <= 6){
                p.textContent= "El procesador de esta computadora es apto para aplicaciones de trabajo Docente: Paqueteria Office, Diseñador: Photoshop y Canvas, Programador: IDE Apache netbeans"
            } else if(puntosProcesador <= 10){
                p.textContent= "El procesador de esta computadora es apto para aplicaciones de trabajo Docente: Paqueteria Office, Diseñador: Adobe Pro, Sony Vegas y Photoshop , Programador: IDE Apache netbeans, SQL SERVER, Apache Server, Visual Studio 2023"
            } 
            procesador.append(h3)
            procesador.append(p)
        })
    })

    modalTarjetaGrafica.forEach(boton => {
        boton.addEventListener('click', e =>{
            const { puntosGrafica } = e.target.dataset
            h3.textContent = `Puntos de esta grafica: ${puntosGrafica}`
            btnActivarModal.click()
            tarjetaGrafica.classList.remove('hidden')
            if(puntosGrafica <= 3){
                p.textContent="La grafica de esta computadora es apta para juegos de graficos bajos o 2D"
            } else if(puntosGrafica <= 6){
                p.textContent="La grafica de esta computadora es apta para juegos de graficos medios, Diseño 3D y herramientas de renderizado como Render o Unity"
            } else if(puntosGrafica <= 10){
                p.textContent="La grafica de esta computadora es apta para juegos de graficos Altos y probablemente conpatible con Ray Tracing, Diseño 3D, Diseño de juegos en motores graficos como unreal engine 4 o 5"
            }
            tarjetaGrafica.append(h3)
            tarjetaGrafica.append(p)
        })
    })

    modalMemoriaRam.forEach(boton => {
        boton.addEventListener('click', e => {
            const { puntosMemoria } = e.target.dataset
            h3.textContent = `Puntos de memoria Ram: ${puntosMemoria}`
            btnActivarModal.click()
            memoriaRam.classList.remove('hidden')
            if(puntosMemoria <= 3){
                p.textContent="La memoria Ram de esta computadora debe ser capaz de mantener abierta al menos 2 programas a la vez"
            } else if(puntosMemoria <= 6){
                p.textContent="La memoria Ram de esta computadora debe ser capaz de mantener abierta al menos 4 programas a la vez"
            } else if(puntosMemoria <= 10){
                p.textContent="La memoria Ram de esta computadora debe ser capaz de mantener abierta al menos 8 programas a la vez"
            }
            memoriaRam.append(h3)
            memoriaRam.append(p)
        })
    })
    
    modalAlmacenamiento.forEach(boton => {
        boton.addEventListener('click', e => {
            const { puntosAlmacenamiento } = e.target.dataset
            h3.textContent = `Puntos del almacenamiento: ${puntosAlmacenamiento}`
            btnActivarModal.click()
            almacenamiento.classList.remove('hidden')
            if(puntosAlmacenamiento <= 5){
                p.textContent="El almacenamiento de esta laptop no es muy recomendable debido al poco espacio que posse"
            } else if(puntosAlmacenamiento <= 8){
                p.textContent="El almacenamiento de esta laptop es recomendable, debido a que puede o no tener dos discos duros (HDD y SSD) de considerable tamaño"
            } else if(puntosAlmacenamiento <= 10){
                p.textContent="El almacenamiento de esta laptop es muy recomendable, debido a que posee dos discos duros (HDD y SSD) de considerable tamaño"
            }
            almacenamiento.append(h3)
            almacenamiento.append(p)
        })
    })

    btnDesactivarModal.addEventListener('click', e => {
        procesador.classList.add('hidden');
        tarjetaGrafica.classList.add('hidden');
        memoriaRam.classList.add('hidden')
        if(procesador.contains(h3) && procesador.contains(p)){
            procesador.removeChild(h3)
            procesador.removeChild(p)
        }
        if(tarjetaGrafica.contains(h3) && tarjetaGrafica.contains(p)){
            tarjetaGrafica.removeChild(h3)
            tarjetaGrafica.removeChild(p)
        }
        if(almacenamiento.contains(h3) && almacenamiento.contains(p)){
            almacenamiento.removeChild(h3)
            almacenamiento.removeChild(p)
        }
    })

})()