//jwt es una dependencia que permite crear tokens de "acceso" a los usuarios
import jwt from "jsonwebtoken";
import Usuario from "../models/Usuario.js";

//este "modulo" nos permite verificar que quien accede a las rutas del proyecto sea alguien autenticado
const protegerRuta = async (req, res, next) => {
  //obtenemos el token de jwt
  const { _token } = req.cookies;
  //si no lo tiene entonces lo regresamos al login
  if (!_token) {
    return res.redirect("/auth/login");
  }

  try {
    //leemos el token decodificandolo usando la clave que esta en las variables de entorno
    const decoded = jwt.verify(_token, process.env.JWT_SECRET);
    //buscamos al usuario mediante la propiedad id
    const usuario = await Usuario.scope("eliminarPassword").findByPk(
      decoded.id
    );
    // si existe entonces crear el objeto usuario dentro del request
    if (usuario) {
      req.usuario = usuario;
    } else {
      //mandarlo al login
      return res.redirect("/auth/login");
    }
    //ejecuta el siguiente middleware
    return next();
  } catch (error) {
    console.log(error);
    return res.clearCookie("_token").redirect("/auth/login");
  }
};

export default protegerRuta;
