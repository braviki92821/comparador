(function(){
    const agregarComparacion = document.querySelectorAll('.agregar-comparacion-laptop')
    const agregarComparacionT = document.querySelectorAll('.agregar-comparacion-telefono')
    const agregarComparacionTb = document.querySelectorAll('.agregar-comparacion-tablet')
    const comparacion = document.querySelectorAll('.comparacion')

    const btnComparar = document.querySelector('#btn-back-to-top')
    //const token = document.querySelector('meta[name="csrf-token"]').getAttribute('content')

    let compararLaptop= []
    let compararTelefono= []
    let compararTablet= []

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

    function agregarLaptop(e){
        const {  laptopId } = e.target.dataset
         
        compararLaptop =  localStorage.getItem('compararLaptop').length === 0 ? [] : localStorage.getItem('compararLaptop').split(',')
        
        if(!compararLaptop.includes(laptopId)){
          

        if(compararLaptop.length === 2){
            return alert('Solo puedes agregar 2 laptops para comparar')
        }

        compararLaptop.push( laptopId )

        if(compararLaptop.length > 1){
            btnComparar.classList.remove('hidden')
        }else{
            btnComparar.classList.add('hidden')
        }
            if(e.target.classList.contains('bg-indigo-600')){
                e.target.classList.add('bg-red-600', 'text-black')
                e.target.classList.remove('bg-indigo-600', 'text-white')
                e.target.textContent = 'Quitar de la comparacion'
            }
            localStorage.setItem('compararLaptop',compararLaptop.toString())
            document.cookie = 'compararLaptop='+compararLaptop.toString()+';'
            
        }else{
            
            compararLaptop = compararLaptop.filter(x => x != laptopId)
            document.cookie = 'compararLaptop=; expires=Thu, 01 Jan 1970 00:00:00 UTC;'
            document.cookie = 'compararLaptop='+compararLaptop.toString()+';'
            localStorage.removeItem('compararLaptop')
            localStorage.setItem('compararLaptop',compararLaptop.toString())
            if(compararLaptop.length > 1){
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
          

        if(compararTelefono.length === 2){
            return alert('Solo puedes agregar 2 Telefonos para comparar')
        }

        compararTelefono.push( telefonoId )

        if(compararTelefono.length > 1){
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
            if(compararTelefono.length > 1){
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
          
        if(compararTablet.length === 2){
            return alert('Solo puedes agregar 2 Telefonos para comparar')
        }

        compararTablet.push( tabletId )

        if(compararTablet.length > 1){
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
            if(compararTablet.length > 1){
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

    function paginas(){

        if(!localStorage.getItem('compararLaptop')){
              localStorage.setItem('compararLaptop',compararLaptop.toString())
        }else{
            compararLaptop = localStorage.getItem('compararLaptop').split(',')

            if(compararLaptop.length > 1){
                btnComparar.classList.remove('hidden')
            }else{
                btnComparar.classList.add('hidden')
            }

            agregarComparacion.forEach(boton=>{
    
                for(let i = 0; i < compararLaptop.length; i++){
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

            if(compararTelefono.length > 1){
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

            if(compararTablet.length > 1){
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