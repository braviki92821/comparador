(function() {
    //requerimos del token del crosfirerequest(evita injeciones de datos en un formulario o en un JSON)
    const token = document.querySelector('meta[name="csrf-token"]').getAttribute('content')
    //elementos html a manipular
    const favorito = document.querySelectorAll('.favorito')
    const nuevaComparacionLaptop = document.querySelector('.otra-comparacion-laptop')
    const nuevaComparacionTelefono = document.querySelector('.otra-comparacion-telefono')
    const nuevaComparacionTablet = document.querySelector('.otra-comparacion-tablet')

    //se le añade el evento click para poder agregar a un favorito
    favorito.forEach(boton => {
        boton.addEventListener('click', agregarFavoritoComparacion)
    })

    async function agregarFavoritoComparacion(e) {
        //traemos mediante el destructure la variable de producto-id del data-set definido en el elemento html
        const {  productoId } = e.target.dataset
        try {
            //se realiza la peticion al metodo post de la url de la api
            const url = '/agregarFavorito'
            //el cuerpo de la solicitud
            const body = {"productoId": productoId }
            //mediante fetch se realiza la peticion POST de la api
            const respuesta = await fetch(url, {
                method: 'POST',
                headers:{
                    'CSRF-Token': token,
                     Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(body, undefined, 2)
            })

            //se extrae la variable operacion de el objeto respuesta
            const { operacion } = await respuesta.json()
            //console.log(await respuesta.json())
            //dependiendo del resultado se modificaran las clases css de los botones ya sea para añadir o quitar
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

    //esta funcion obtiene los favoritos del usuario solo se mostraran en la comparacion
    async function favoritosComparacion() {
        //se realiza la peticion al metodo post de la url de la api
        try {
            const url = '/favoritos'
            const respuesta = await fetch(url, {
                method: 'POST',
                headers:{
                    'CSRF-Token': token,
                },
            })

            const favoritos  = await respuesta.json()
            //itera los facoritos del resultado de la respuesta y modificara los estilos css y las propiedades del elemento si es que encuentra
            //algun favorito
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

    //los botones para realizar nuevas comparaciones consisten en limpiar el localstorage y las cookies
    //del usuario para poder seleccionar otros productos
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