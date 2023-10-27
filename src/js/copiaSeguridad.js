(function() {

const token = document.querySelector('meta[name="csrf-token"]').getAttribute('content')
const copiaSeguridadLaptop = document.querySelectorAll('.copia-laptop')
const cargaMasivaLaptop = document.querySelectorAll('.carga-laptop')
const copiaSeguridadTelefono = document.querySelectorAll('.copia-telefono')
const cargaMasivaTelefono = document.querySelectorAll('.carga-telefono')
const copiaSeguridadTablet = document.querySelectorAll('.copia-tablet')
const cargaMasivaTablet = document.querySelectorAll('.carga-tablet')
const file = new FileReader();

copiaSeguridadLaptop.forEach(boton => {
    boton.addEventListener('click', descargarCopiaLaptop)
})

cargaMasivaLaptop.forEach(boton => {
    boton.addEventListener('click', subirMasivaLaptop)
})

copiaSeguridadTelefono.forEach(boton => {
    boton.addEventListener('click', descargarCopiaTelefono)
})

cargaMasivaTelefono.forEach(boton => {
    boton.addEventListener('click', subirMasivaTelefono)
})

copiaSeguridadTablet.forEach(boton => {
    boton.addEventListener('click', descargarCopiaTablet)
})

cargaMasivaTablet.forEach(boton => {
    boton.addEventListener('click', subirMasivaTablet)
})

async function descargarCopiaLaptop(){
    try {
        const url = '/backup/laptops'

        const respuesta = await fetch(url, {
            method: 'POST',
            headers:{
                'CSRF-Token': token
            }
        })

        const { laptops } = await respuesta.json()

        const a = document.createElement("a");
        const archivo = new Blob([JSON.stringify(laptops, undefined, 2)], { type: 'application/json;charset=utf-8' });
        const urla = URL.createObjectURL(archivo);
        a.href = urla;
        a.download = 'CopiaSeguridadLaptop';
        a.click();
        URL.revokeObjectURL(urla);

        laptops.forEach(element => {
            a.href = `/uploads/${element.imagen}`
            a.download= element.imagen
            a.click();
        });
        
    }catch (error) {
        console.log(error)
    }
}

async function subirMasivaLaptop(){
    const input = document.createElement("input")
    input.type = 'file'
    input.accept = '.json'
    //input.click()
    input.addEventListener('click',
         input.click(),
         input.addEventListener('change', e =>{
         file.onloadend = handleFileReadLaptop
         file.readAsText(e.target.files[0])
         })
    )
}

async function handleFileReadLaptop (e){
    const errorEl = document.querySelector('.errores')
    const success = document.querySelector('.correcto')
    const carga = document.querySelector('.cargando')
    const detalles = document.querySelector('.error-detalles')
    try {
        carga.classList.remove('hidden')
        const content = file.result;

        const url = '/backup/carga-masiva-laptops'

        const respuesta = await fetch(url, {
            method: 'POST',
            headers:{
                'CSRF-Token': token,
                 Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: content,
        
        })
        
        const { result, errores } = await respuesta.json()
        console.log(result)
        if(result != "ok"){
            console.log(errores)
           carga.classList.add('hidden')
           errorEl.classList.remove('hidden')
           success.classList.add('hidden')

           detalles.addEventListener('click', e => {
             const a = document.createElement("a");
             const archivo = new Blob([JSON.stringify(errores, undefined, 2)], { type: 'application/json;charset=utf-8' });
             const urla = URL.createObjectURL(archivo);
             a.href = urla;
             a.download = 'Errores';
             a.click();
           })
           
        }else{
           carga.classList.add('hidden')
           errorEl.classList.add('hidden')
           success.classList.remove('hidden')
           alert('Cargado correctamente')
        }
       
    } catch (error) {
      console.log(error)
      errorEl.classList.remove('hidden')
      carga.classList.add('hidden')
      success.classList.add('hidden')
      detalles.addEventListener('click', e => {
        const a = document.createElement("a");
        const archivo = new Blob([JSON.stringify({error:"El archivo esta dañado o los datos son invalidos"}, undefined, 2)], { type: 'application/json;charset=utf-8' });
        const urla = URL.createObjectURL(archivo);
        a.href = urla;
        a.download = 'Errores';
        a.click();
      })
      alert('Verifique que los datos del archivo no contengan errores')
    }
}

async function descargarCopiaTelefono(){
    try {
        const url = '/backup/telefonos'

        const respuesta = await fetch(url, {
            method: 'POST',
            headers:{
                'CSRF-Token': token
            }
        })

        const { telefonos } = await respuesta.json()

        const a = document.createElement("a");
        const archivo = new Blob([JSON.stringify(telefonos, undefined, 2)], { type: 'application/json;charset=utf-8' });
        const urla = URL.createObjectURL(archivo);
        a.href = urla;
        a.download = 'CopiaSeguridadTelefono';
        a.click();
        URL.revokeObjectURL(urla);

        telefonos.forEach(element => {
            a.href = `/uploads/${element.imagen}`
            a.download= element.imagen
            a.click();
        });
        
    }catch (error) {
        console.log(error)
    }   
}

async function subirMasivaTelefono(){
    const input = document.createElement("input")
    input.type = 'file'
    input.accept = '.json'
    //input.click()
    input.addEventListener('click',
         input.click(),
         input.addEventListener('change', e =>{
         file.onloadend = handleFileReadTelefono
         file.readAsText(e.target.files[0])
         })
    )
}

async function handleFileReadTelefono (e){
    const errorEl = document.querySelector('.errores')
    const success = document.querySelector('.correcto')
    const carga = document.querySelector('.cargando')
    const detalles = document.querySelector('.error-detalles')
    try {
        carga.classList.remove('hidden')
        const content = file.result;

        const url = '/backup/carga-masiva-telefonos'

        const respuesta = await fetch(url, {
            method: 'POST',
            headers:{
                'CSRF-Token': token,
                 Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: content,
        
        })
        
        const { result, errores } = await respuesta.json()
        console.log(result)
        if(result != "ok"){
            console.log(errores)
           carga.classList.add('hidden')
           errorEl.classList.remove('hidden')
           success.classList.add('hidden')

           detalles.addEventListener('click', e => {
             const a = document.createElement("a");
             const archivo = new Blob([JSON.stringify(errores, undefined, 2)], { type: 'application/json;charset=utf-8' });
             const urla = URL.createObjectURL(archivo);
             a.href = urla;
             a.download = 'Errores';
             a.click();
           })
           
        }else{
           carga.classList.add('hidden')
           errorEl.classList.add('hidden')
           success.classList.remove('hidden')
           alert('Cargado correctamente')
        }
       
    } catch (error) {
      console.log(error)
      errorEl.classList.remove('hidden')
      carga.classList.add('hidden')
      success.classList.add('hidden')
      detalles.addEventListener('click', e => {
        const a = document.createElement("a");
        const archivo = new Blob([JSON.stringify({error:"El archivo esta dañado o los datos son invalidos"}, undefined, 2)], { type: 'application/json;charset=utf-8' });
        const urla = URL.createObjectURL(archivo);
        a.href = urla;
        a.download = 'Errores';
        a.click();
      })
      alert('Verifique que los datos del archivo no contengan errores')
    }
}

async function descargarCopiaTablet(){
    try {
        const url = '/backup/tablets'

        const respuesta = await fetch(url, {
            method: 'POST',
            headers:{
                'CSRF-Token': token
            }
        })

        const { tablets } = await respuesta.json()

        const a = document.createElement("a");
        const archivo = new Blob([JSON.stringify(tablets, undefined, 2)], { type: 'application/json;charset=utf-8' });
        const urla = URL.createObjectURL(archivo);
        a.href = urla;
        a.download = 'CopiaSeguridadTablet';
        a.click();
        URL.revokeObjectURL(urla);

        tablets.forEach(element => {
            a.href = `/uploads/${element.imagen}`
            a.download= element.imagen
            a.click();
        });
        
    }catch (error) {
        console.log(error)
    }   
}

async function subirMasivaTablet(){
    const input = document.createElement("input")
    input.type = 'file'
    input.accept = '.json'
    //input.click()
    input.addEventListener('click',
         input.click(),
         input.addEventListener('change', e =>{
         file.onloadend = handleFileReadTablet
         file.readAsText(e.target.files[0])
         })
    )
}

async function handleFileReadTablet (e){
    const errorEl = document.querySelector('.errores')
    const success = document.querySelector('.correcto')
    const carga = document.querySelector('.cargando')
    const detalles = document.querySelector('.error-detalles')
    try {
        carga.classList.remove('hidden')
        const content = file.result;

        const url = '/backup/carga-masiva-tablets'

        const respuesta = await fetch(url, {
            method: 'POST',
            headers:{
                'CSRF-Token': token,
                 Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: content,
        
        })
        
        const { result, errores } = await respuesta.json()
        console.log(result)
        if(result != "ok"){
           console.log(errores)
           carga.classList.add('hidden')
           errorEl.classList.remove('hidden')
           success.classList.add('hidden')

           detalles.addEventListener('click', e => {
             const a = document.createElement("a");
             const archivo = new Blob([JSON.stringify(errores, undefined, 2)], { type: 'application/json;charset=utf-8' });
             const urla = URL.createObjectURL(archivo);
             a.href = urla;
             a.download = 'Errores';
             a.click();
           })
           
        }else{
           carga.classList.add('hidden')
           errorEl.classList.add('hidden')
           success.classList.remove('hidden')
           alert('Cargado correctamente')
        }
       
    } catch (error) {
      console.log(error)
      errorEl.classList.remove('hidden')
      carga.classList.add('hidden')
      success.classList.add('hidden')
      detalles.addEventListener('click', e => {
        const a = document.createElement("a");
        const archivo = new Blob([JSON.stringify({error:"El archivo esta dañado o los datos son invalidos"}, undefined, 2)], { type: 'application/json;charset=utf-8' });
        const urla = URL.createObjectURL(archivo);
        a.href = urla;
        a.download = 'Errores';
        a.click();
      })
      alert('Verifique que los datos del archivo no contengan errores')
    }
}

})()