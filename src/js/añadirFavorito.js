(function() {

    const token = document.querySelector('meta[name="csrf-token"]').getAttribute('content')
    const favorito = document.querySelectorAll('.favorito')
    const nuevaComparacionLaptop = document.querySelector('.otra-comparacion-laptop')
    const nuevaComparacionTelefono = document.querySelector('.otra-comparacion-telefono')
    const nuevaComparacionTablet = document.querySelector('.otra-comparacion-tablet')

    favorito.forEach(boton => {
        boton.addEventListener('click', agregarFavoritoComparacion)
    })

    async function agregarFavoritoComparacion(e) {
        const {  productoId } = e.target.dataset
        try {
            const url = '/agregarFavorito'
            const body = {"productoId": productoId }
            const respuesta = await fetch(url, {
                method: 'POST',
                headers:{
                    'CSRF-Token': token,
                     Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(body, undefined, 2)
            })

            const { operacion } = await respuesta.json()
            //console.log(await respuesta.json())

            if( operacion === 'añadir'){
                e.target.classList.add('bg-red-600', 'text-black')
                e.target.classList.remove('bg-yellow-600', 'text-white')
                e.target.textContent = 'Quitar de Favoritos'
            } else if( operacion === 'eliminar'){
                e.target.classList.add('bg-yellow-600', 'text-black')
                e.target.classList.remove('bg-red-600', 'text-white')
                e.target.textContent = 'Añadir a favoritos'
            }
            
        } catch (error) {
            console.log(error)
        }
    }

    favoritosComparacion()

    async function favoritosComparacion() {
        try {
            const url = '/favoritos'
            const respuesta = await fetch(url, {
                method: 'POST',
                headers:{
                    'CSRF-Token': token,
                },
            })

            const favoritos  = await respuesta.json()

            favorito.forEach(boton => {
                for(let i = 0; i < favoritos.length; i++) {
                    if(boton.getAttribute('data-producto-id') === favoritos[i].idProducto.toString()){
                        boton.classList.add('bg-red-600', 'text-black')
                        boton.classList.remove('bg-yellow-600', 'text-white')
                        boton.textContent = 'Quitar de Favoritos'
                     }
                }
            })

        } catch (error) {
            console.log(error)
        }
    }

    nuevaComparacionLaptop?.addEventListener('click', e => {
        localStorage.getItem('compararLaptop')
        localStorage.setItem('compararLaptop','')
        document.cookie = 'compararLaptop=; expires=Thu, 01 Jan 1970 00:00:00 UTC;'
        window.location.href = '/laptops?pagina=1&precio=75000'
    })

    nuevaComparacionTelefono?.addEventListener('click', e => {
        localStorage.getItem('compararTelefono')
        localStorage.setItem('compararTelefono','')
        document.cookie = 'compararTelefono=; expires=Thu, 01 Jan 1970 00:00:00 UTC;'
        window.location.href = '/telefonos?pagina=1&precio=65000'
    })

    nuevaComparacionTablet?.addEventListener('click', e => {
        localStorage.getItem('compararTablet')
        localStorage.setItem('compararTablet','')
        document.cookie = 'compararTablet=; expires=Thu, 01 Jan 1970 00:00:00 UTC;'
        window.location.href = '/tablets?pagina=1&precio=65000'
    })

})()