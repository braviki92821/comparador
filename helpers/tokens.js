import jwt from 'jsonwebtoken'

//funcion para generar tokens del usuario al crear la cuenta
const generarId = () => Date.now() + Math.random().toString(32).substring(2)
//la forma en la que se generada el token de "acceso"
const generarJWT = datos => jwt.sign({
        id: datos.id,
        nombre: datos.nombre,
        tipo: datos.tipo
       },process.env.JWT_SECRET,{
         expiresIn:'1d' //el token expira en un dia
       })


export {
    generarId,
    generarJWT
}