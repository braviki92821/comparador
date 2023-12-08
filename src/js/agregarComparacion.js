(function(){
    //elementos html a manipular
    const agregarComparacion = document.querySelectorAll('.agregar-comparacion-laptop')
    const agregarComparacionT = document.querySelectorAll('.agregar-comparacion-telefono')
    const agregarComparacionTb = document.querySelectorAll('.agregar-comparacion-tablet')
    const comparacion = document.querySelectorAll('.comparacion')

    const btnComparar = document.querySelector('#btn-back-to-top')
    //const token = document.querySelector('meta[name="csrf-token"]').getAttribute('content')
    //definimos variables para manejar un arreglo de productos
    let compararLaptop= []
    let compararTelefono= []
    let compararTablet= []

    //definimos los eventos clicks de los botones para agregar compararacion
    comparacion.forEach(boton => {
        boton.addEventListener('click', alerta)
    })

    agregarComparacion.forEach(boton => {
        boton.addEventListener('click', agregarLaptop)
    })

    agregarComparacionT.forEach(boton => {
        boton.addEventListener('click', agregarTelefono)
    })

    agregarComparacionTb.forEach(boton => {
        boton.addEventListener('click', agregarTablet)
    })
    
    paginas()
    telefonos()
    tablets()

    //las funciones de los botones para agregar comparacion (misma explicacion para el resto solo cambia a telefono o tablet)
    function agregarLaptop(e){
        //obtenemos la variable laptop-id definida en el data-set del elemento html
        const {  laptopId } = e.target.dataset
         
        //si el localstorage es igual a 0 entonces el valor del arreglo sera [](vacio) pero sino el valor sera lo que contenga el localstorage
        //pero se separaran los elementos mediante la coma
        //Nota: el metodo .split convierte un texto a arreglo mediante un separador ejemplo: hola,a,todos con split(',') sera [hola,a,todos]
        //en este caso la coma es el separador y el arreglo tendra 3 valores 
        compararLaptop =  localStorage.getItem('compararLaptop').length === 0 ? [] : localStorage.getItem('compararLaptop').split(',')
        
        //en esta condicional se pregunta si el ID de una laptop no esta en el arreglo en caso de ser cierto
        if(!compararLaptop.includes(laptopId)){
          //dentro de la condicion que se cumple que en este caso no esta el ID de la laptop en el arreglo
          //se pregunta si el arreglo es igual a 3 entonces debera retornar el mensaje
        if(compararLaptop.length === 3){
            return alert('Solo puedes agregar 3 laptops para comparar')//return tambien sirve para detener la ejecucion del codigp
            //es decir que ya no hara lo de abajo
        }
        //pero si el arreglo todavia no es igual a 3 entonces agregamos el Id de la laptop al arreglo 
        compararLaptop.push( laptopId )
        //cuando el arreglo sea mayor a dos se mostrara el boton de ir a Comparacion
        if(compararLaptop.length > 2){
            btnComparar.classList.remove('hidden')
        }else{
        //se oculta si no
            btnComparar.classList.add('hidden')
        }
        // en caso de que el boton tenga el color azul se le modificaran las propiedades al boton
            if(e.target.classList.contains('bg-indigo-600')){
                e.target.classList.add('bg-red-600', 'text-black')
                e.target.classList.remove('bg-indigo-600', 'text-white')
                e.target.textContent = 'Quitar de la comparacion'
            }
            //cuando se agrega un Id de la laptop se le da el valor al localstorage y a la cookie
            localStorage.setItem('compararLaptop',compararLaptop.toString())
            document.cookie = 'compararLaptop='+compararLaptop.toString()+';'
            
        }else{
            //en caso de que el Id de la laptop a compara este en el arreglo entonces se modificara el arreglo para
            //quitarlo del arreglo usando un filtro
            //Nota: filter se usa para filtrar contenido de un arreglo y crea uno nuevo en este caso el nuevo arreglo sera
            //un nuevo arreglo pero quitando el ID de la laptop que queremos quitar
            compararLaptop = compararLaptop.filter(x => x != laptopId)
            //actualizamos la cookie con el nuevo arreglo
            document.cookie = 'compararLaptop=; expires=Thu, 01 Jan 1970 00:00:00 UTC;'
            document.cookie = 'compararLaptop='+compararLaptop.toString()+';'
            //actualizamos el localstorage con el nuevo arreglo
            localStorage.removeItem('compararLaptop')
            localStorage.setItem('compararLaptop',compararLaptop.toString())
            //modificamos de nuevo las clases del boton para agregar a la comparacion
            if(compararLaptop.length > 2 ){
                btnComparar.classList.remove('hidden')
            }else{
                btnComparar.classList.add('hidden')
            }
            if(e.target.classList.contains('bg-red-600')){
                e.target.classList.add('bg-indigo-600', 'text-white')
                e.target.classList.remove('bg-red-600', 'text-black')
                e.target.textContent = 'Agregar a la comparacion'
            }
        }

    }

    function agregarTelefono(e){
        const { telefonoId } = e.target.dataset
         
        compararTelefono =  localStorage.getItem('compararTelefono').length === 0 ? [] : localStorage.getItem('compararTelefono').split(',')
        
        if(!compararTelefono.includes(telefonoId)){
          

        if(compararTelefono.length === 3){
            return alert('Solo puedes agregar 3 Telefonos para comparar')
        }

        compararTelefono.push( telefonoId )

        if(compararTelefono.length > 2){
            btnComparar.classList.remove('hidden')
        }else{
            btnComparar.classList.add('hidden')
        }
            if(e.target.classList.contains('bg-indigo-600')){
                e.target.classList.add('bg-red-600', 'text-black')
                e.target.classList.remove('bg-indigo-600', 'text-white')
                e.target.textContent = 'Quitar de la comparacion'
            }
            localStorage.setItem('compararTelefono',compararTelefono.toString())
            document.cookie = 'compararTelefono='+compararTelefono.toString()+';'
            
        }else{
            
            compararTelefono = compararTelefono.filter(x => x != telefonoId)
            document.cookie = 'compararTelefono=; expires=Thu, 01 Jan 1970 00:00:00 UTC;'
            document.cookie = 'compararTelefono='+compararTelefono.toString()+';'
            localStorage.removeItem('compararTelefono')
            localStorage.setItem('compararTelefono',compararTelefono.toString())
            if(compararTelefono.length > 2){
                btnComparar.classList.remove('hidden')
            }else{
                btnComparar.classList.add('hidden')
            }
            if(e.target.classList.contains('bg-red-600')){
                e.target.classList.add('bg-indigo-600', 'text-white')
                e.target.classList.remove('bg-red-600', 'text-black')
                e.target.textContent = 'Agregar a la comparacion'
            }
     }
    }

    function agregarTablet(e){
        const { tabletId } = e.target.dataset
         
        compararTablet =  localStorage.getItem('compararTablet').length === 0 ? [] : localStorage.getItem('compararTablet').split(',')
        
        if(!compararTablet.includes(tabletId)){
          
        if(compararTablet.length === 3){
            return alert('Solo puedes agregar 3 Tablets para comparar')
        }

        compararTablet.push( tabletId )

        if(compararTablet.length > 2){
            btnComparar.classList.remove('hidden')
        }else{
            btnComparar.classList.add('hidden')
        }
            if(e.target.classList.contains('bg-indigo-600')){
                e.target.classList.add('bg-red-600', 'text-black')
                e.target.classList.remove('bg-indigo-600', 'text-white')
                e.target.textContent = 'Quitar de la comparacion'
            }
            localStorage.setItem('compararTablet',compararTablet.toString())
            document.cookie = 'compararTablet='+compararTablet.toString()+';'
            
        }else{
            
            compararTablet = compararTablet.filter(x => x != tabletId)
            document.cookie = 'compararTablet=; expires=Thu, 01 Jan 1970 00:00:00 UTC;'
            document.cookie = 'compararTablet='+compararTablet.toString()+';'
            localStorage.removeItem('compararTablet')
            localStorage.setItem('compararTablet',compararTablet.toString())
            if(compararTablet.length > 2){
                btnComparar.classList.remove('hidden')
            }else{
                btnComparar.classList.add('hidden')
            }
            if(e.target.classList.contains('bg-red-600')){
                e.target.classList.add('bg-indigo-600', 'text-white')
                e.target.classList.remove('bg-red-600', 'text-black')
                e.target.textContent = 'Agregar a la comparacion'
            }
     }
    }

    //estas funciones cargaran los estilos en las paginas en caso de haber o tener Id de laptops o telefonos o tables seleccionados 
    //para comparar no importando que esten en la pagina numero 100
    function paginas(){
        // en caso de no existir el localstorage se crea 
        if(!localStorage.getItem('compararLaptop')){
              localStorage.setItem('compararLaptop',compararLaptop.toString())
        }else{
            //si existe entonces agregar la informacion a partir del localstorge al arreglo
            compararLaptop = localStorage.getItem('compararLaptop').split(',')
            //muestra u oculta el boton para ir a la comparacion
            if(compararLaptop.length > 2){
                btnComparar.classList.remove('hidden')
            }else{
                btnComparar.classList.add('hidden')
            }
            //iteramos los botones de agregar a la comparacion
            agregarComparacion.forEach(boton=>{
                // iteramos el arreglo para encontar los ID
                for(let i = 0; i < compararLaptop.length; i++){
                    //en caso de encontrar el Id en el arreglo se modifican las propiedades css y html del boton de agregar a la comparacion
                    if(boton.getAttribute('data-laptop-id') === compararLaptop[i].toString()){
                       boton.classList.add('bg-red-600', 'text-black')
                       boton.classList.remove('bg-indigo-600', 'text-white')
                       boton.textContent = 'Quitar de la comparacion'
                    }
                }
    
            })
        }
     
    }

    function telefonos(){
        if(!localStorage.getItem('compararTelefono')){
            localStorage.setItem('compararTelefono',compararTelefono.toString())
        }else{
        
            compararTelefono = localStorage.getItem('compararTelefono').split(',')

            if(compararTelefono.length > 2){
                btnComparar.classList.remove('hidden')
            }else{
                btnComparar.classList.add('hidden')
            }

            agregarComparacionT.forEach(boton=>{
  
                for(let i = 0; i < compararTelefono.length; i++){
                    if(boton.getAttribute('data-telefono-id') === compararTelefono[i].toString()){
                       boton.classList.add('bg-red-600', 'text-black')
                       boton.classList.remove('bg-indigo-600', 'text-white')
                       boton.textContent = 'Quitar de la comparacion'
                    }
             }  
  
          })
        }
    }

    function tablets(){
        if(!localStorage.getItem('compararTablet')){
            localStorage.setItem('compararTablet',compararTablet.toString())
        }else{
        
            compararTablet = localStorage.getItem('compararTablet').split(',')

            if(compararTablet.length > 2){
                btnComparar.classList.remove('hidden')
            }else{
                btnComparar.classList.add('hidden')
            }

            agregarComparacionTb.forEach(boton=>{
  
                for(let i = 0; i < compararTablet.length; i++){
                    if(boton.getAttribute('data-telefono-id') === compararTablet[i].toString()){
                       boton.classList.add('bg-red-600', 'text-black')
                       boton.classList.remove('bg-indigo-600', 'text-white')
                       boton.textContent = 'Quitar de la comparacion'
                    }
             }  
  
          })
        }        
    }

    function alerta(){
        alert('Debes iniciar sesion para poder utilizar el comparador')
    }

})()