(function() {

    const token = document.querySelector('meta[name="csrf-token"]').getAttribute('content')
    const favorito = document.querySelectorAll('.favorito')

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

})()