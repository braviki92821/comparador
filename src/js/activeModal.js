(function() {
    const btnActivarModal = document.querySelector('.modal-click')
    const btnDesactivarModal = document.querySelector('.modal-close')
    const procesador = document.querySelector('.procesador')
    const tarjetaGrafica = document.querySelector('.tarjeta-grafica')
    const memoriaRam = document.querySelector('.memoriaRam')

    const modalProcesador = document.querySelectorAll('.modal-procesador')
    const modalTarjetaGrafica = document.querySelectorAll('.modal-tarjeta-grafica')
    const modalMemoriaRam = document.querySelectorAll('.modal-memoriaRam')

    modalProcesador.forEach(boton => {
        boton.addEventListener('click', e =>{
            btnActivarModal.click()
            procesador.classList.remove('hidden')
        })
    })

    modalTarjetaGrafica.forEach(boton => {
        boton.addEventListener('click', e =>{
            btnActivarModal.click()
            tarjetaGrafica.classList.remove('hidden')
        })
    })

    modalMemoriaRam.forEach(boton => {
        boton.addEventListener('click', e => {
            btnActivarModal.click()
            memoriaRam.classList.remove('hidden')
        })
    })

    btnDesactivarModal.addEventListener('click', e => {
        procesador.classList.add('hidden');
        tarjetaGrafica.classList.add('hidden');
        memoriaRam.classList.add('hidden')
    })

})()