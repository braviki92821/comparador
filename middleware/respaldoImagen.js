import multer from 'multer'
import path from 'path'
//multer es una dependencia para subir archivo hacia una ruta en espeficio que se complementa con dropzone
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null,'./public/uploads/')
    },
    filename: function(req, file, cb) {
        cb(null,file.originalname.replace('.jpg','') + path.extname(file.originalname))
    }
})

const subir = multer({ storage })

export default subir