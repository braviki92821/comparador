import path from 'path'

export default{
    mode:'development',
    entry:{
      agregarComparacion:'./src/js/agregarComparacion.js',
      agregarImagen: './src/js/agregarImagen.js',
      copiaSeguridad: './src/js/copiaSeguridad.js',
      cargaMasivaImagen: './src/js/cargaMasivaImagen.js',
      navegacion: './src/js/navegacion.js',
    },
    output:{
        filename:'[name].js',
        path: path.resolve('public/js')
    }
}