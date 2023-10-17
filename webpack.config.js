import path from 'path'

export default{
    mode:'development',
    entry:{
      agregarComparacion:'./src/js/agregarComparacion.js',
      agregarImagen: './src/js/agregarImagen.js',
    },
    output:{
        filename:'[name].js',
        path: path.resolve('public/js')
    }
}