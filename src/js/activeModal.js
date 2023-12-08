(function() {
    // variables de tipo HTMLELEMENT que seran utilizados para manipular el HTML mediante los eventos click
    // En este caso los elementos seleccionados son seleccionados mediante una clase de CSS inexistente en dar estilos "."
    // Nota: . significa clase de css, # significa Id de la etiqueta html
    const btnActivarModal = document.querySelector('.modal-click')
    const btnDesactivarModal = document.querySelector('.modal-close')
    const procesador = document.querySelector('.procesador')
    const tarjetaGrafica = document.querySelector('.tarjeta-grafica')
    const memoriaRam = document.querySelector('.memoriaRam')
    const almacenamiento = document.querySelector('.almacenamiento')

    //variables de tipo HTMLELEMENT que seran utilizados para manipular el HTML mediante los eventos click em este caso querySelectorAll porque
    //3 elementos tendran las clases css de modal-
    const modalProcesador = document.querySelectorAll('.modal-procesador')
    const modalProcesadorM = document.querySelectorAll('.modal-procesadormovil')
    const modalTarjetaGrafica = document.querySelectorAll('.modal-tarjeta-grafica')
    const modalMemoriaRam = document.querySelectorAll('.modal-memoriaRam')
    const modalMemoriaRamM = document.querySelectorAll('.modal-memoriaRamMovil')
    const modalAlmacenamiento = document.querySelectorAll('.modal-almacenamiento')
    const modalAlmacenamientoM = document.querySelectorAll('.modal-almacenamientoMovil')

    //se crea un elemento de tipo h3 y p(parrafo)
    const h3 = document.createElement('h3')
    //se le dan estilos css de tailwind con classlist.add
    h3.classList.add('text-lg','leading-6','font-medium','text-gray-900')
    const p = document.createElement('p')
    p.classList.add('text-gray-900')

    //la explicacion del modal de procesador aplican para el resto
    //en este caso se le aplica un foreach a cada uno de los modales debido a que 3 elementos tienen las clases de modal-
    modalProcesador.forEach(boton => {
        // a cada boton se le añade su evento click
        boton.addEventListener('click', e => {
            //se le aplica el destructure para obtener la variable de puntos-procesador de el dataset definido en el html en este caso de pug
            const { puntosProcesador } = e.target.dataset
            //se le añade el texto al h3
            h3.textContent = `Puntos de este procesador: ${puntosProcesador}`
            //invocamos al modal para que se muestre usando click
            btnActivarModal.click()
            //quitamos la clase hidden de la informacion del procesador para que se muestre y no este oculto
            procesador.classList.remove('hidden')
            //dependiendo de los puntos se mostrara el texto que se le pondra al parrafo
            if(puntosProcesador <= 3){
                p.textContent= "El procesador de esta computadora es apto para aplicaciones de trabajo docente como lo son la paqueteria Office"
            } else if(puntosProcesador <= 6){
                p.textContent= "El procesador de esta computadora es apto para aplicaciones de trabajo Docente: Paqueteria Office, Diseñador: Photoshop y Canvas, Programador: IDE Apache netbeans"
            } else if(puntosProcesador <= 10){
                p.textContent= "El procesador de esta computadora es apto para aplicaciones de trabajo Docente: Paqueteria Office, Diseñador: Adobe Pro, Sony Vegas y Photoshop , Programador: IDE Apache netbeans, SQL SERVER, Apache Server, Visual Studio 2023"
            } 
            //añadimos los elementos de h3 y p dentro de el documento HTML que en este caso irian despues de la clase css procesador
            procesador.append(h3)
            procesador.append(p)
        })
    })

    modalProcesadorM.forEach(boton => {
        boton.addEventListener('click', e => {
            const { puntosProcesador } = e.target.dataset
            h3.textContent = `Puntos de este procesador: ${puntosProcesador}`
            btnActivarModal.click()
            procesador.classList.remove('hidden')
            if(puntosProcesador <= 3){
                p.textContent= "El procesador de este dispositivo movil puede cargar aplicaciones y juegos de bajo consumo 3(maximo)"
            } else if(puntosProcesador <= 6){
                p.textContent= "El procesador de este dispositivo movil puede soportar el uso de IA integrada, procesar datos de forma eficiente y cumple con los requisitos recomendaros para juegos de graficos medios"
            } else if(puntosProcesador <= 10){
                p.textContent= "El procesador de este dispositivo movil puede soportar el uso de IA integrada, multitareas (5 aplicaciones o mas) y cumple con los requisitos recomendaros para juegos de graficos altos"
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

    modalMemoriaRamM.forEach(boton => {
        boton.addEventListener('click', e => {
            const { puntosMemoria } = e.target.dataset
            h3.textContent = `Puntos de memoria Ram: ${puntosMemoria}`
            btnActivarModal.click()
            memoriaRam.classList.remove('hidden')
            if(puntosMemoria <= 3){
                p.textContent="La memoria Ram de este dispositivo movil debe ser capaz de mantener abierta al menos 2 programas en 2 segundo plano a la vez"
            } else if(puntosMemoria <= 6){
                p.textContent="La memoria Ram de este dispositivo movil debe ser capaz de mantener abierta al menos 4 programas en 2 segundo plano a la vez"
            } else if(puntosMemoria <= 10){
                p.textContent="La memoria Ram de este dispositivo movil debe ser capaz de mantener abierta al menos 8 programas en 2 segundo plano a la vez"
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

    modalAlmacenamientoM.forEach(boton => {
        boton.addEventListener('click', e => {
            const { puntosAlmacenamiento } = e.target.dataset
            h3.textContent = `Puntos del almacenamiento: ${puntosAlmacenamiento}`
            btnActivarModal.click()
            almacenamiento.classList.remove('hidden')
            if(puntosAlmacenamiento <= 7){
                p.textContent="El almacenamiento de este dispositivo movil no es muy recomendable debido al poco espacio que posse(actualmente por el consumo de los sistemas operativos actuales)"
            } else if(puntosAlmacenamiento <= 8){
                p.textContent="El almacenamiento de este dispositivo movil es recomendable, debido a que es de considerable tamaño, puede guardar sus archivos personales sin tanta preocupacion pero las aplicaciones pueden consumirla rapido"
            } else if(puntosAlmacenamiento <= 10){
                p.textContent="El almacenamiento de este dispositivo movil es muy recomendable, debido a que es de considerable tamaño, no tendra que preocuparse por el tamaño de las fotos en alta resolucion, el consumo de las aplicacion y es muy bueno para almacenar sus archivos persnonales como musica"
            }
            almacenamiento.append(h3)
            almacenamiento.append(p)
        })
    })

    //este boton se encargada de ocultar el modal
    btnDesactivarModal.addEventListener('click', e => {
        //se le añaden las clases de hidden(oculto) para que no se muestren
        procesador.classList.add('hidden');
        tarjetaGrafica.classList.add('hidden');
        memoriaRam.classList.add('hidden')
        almacenamiento.classList.add('hidden')
        //condicional en este caso para evitar mostrar errores solo en caso de que h3 y p no sean hijos de procesador, tarjetaGrafica, etc
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