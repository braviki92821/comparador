import { Dropzone } from 'dropzone'

//requerimos del token del crosfirerequest(evita injeciones de datos en un formulario)
const token = document.querySelector('meta[name="csrf-token"]').getAttribute('content')
//Dropzone es una dependencia se usa para subir cualquier archivo pero es personalizable
Dropzone.options.imagen = {
    dictDefaultMessage: 'Sube tus imagenes aqui',//por defecto aparece un mensaje en ingles pero aqui se personaliza
    acceptedFiles: '.png, .jpg, .jpeg', //tipos de archivo que quieres que acepte
    maxFilesize: 5, //tamañano maximo en MB que puedes subir (se le puede cambiar)
    maxFiles: 1, //tamaño maximo de archivos que quieres que suba
    parallelUploads: 1,//subida de archivos en paralelo osea que se subiran oo guardaran a la vez en este caso solo es 1
    autoProcessQueue: false, //evita que se realize la accion de subir automaticamente (true es para que se haga automatico)
    addRemoveLinks: true,//añade un link para quitar el archivo
    dictRemoveFile: 'Borrar Archivo',//mensaje personalizado para el link de remover
    dictMaxFilesExceeded: 'Limite es 1 archivo', //mensaje por si excedes el limite de archivos permitiros
    headers:{
        'CSRF-Token': token 
    },
    paramName: 'imagen',//nombre del parametro al enviar la solicitud de tipo POST
    init: function(){
        const dropzone = this
        const btnPublicar = document.querySelector('#publicar')
        //realiza la accion de subir cuando se activa el evento click del boton
        btnPublicar.addEventListener('click',function(){
            dropzone.processQueue()
        })

        dropzone.on('queuecomplete', function(file, mensaje){
                if(dropzone.getActiveFiles().length == 0){
                    window.location.href = '/laptops'
                }
        })
    }
}