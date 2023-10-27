import { Dropzone } from 'dropzone'

const token = document.querySelector('meta[name="csrf-token"]').getAttribute('content')

Dropzone.options.imagen = {
    dictDefaultMessage: 'Sube tus imagenes aqui',
    acceptedFiles: '.png, .jpg, .jpeg', 
    maxFilesize: 5,
    maxFiles: 1500,
    parallelUploads: 1500,
    autoProcessQueue: false,
    addRemoveLinks: true,
    dictRemoveFile: 'Borrar Archivo',
    dictMaxFilesExceeded: 'Limite es 1500 archivos',
    headers:{
        'CSRF-Token': token
    },
    paramName: 'imagen',
    init: function(){
        const dropzone = this
        const btnPublicar = document.querySelector('#publicar')

        btnPublicar.addEventListener('click',function(){
            dropzone.processQueue()
        })

        dropzone.on('queuecomplete', function(file, mensaje){
                if(dropzone.getActiveFiles().length == 0){
                    window.location.href = '/admin/admimistrarLaptops'
                }
        })
    }
}