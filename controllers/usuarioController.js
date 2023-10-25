import { check, cookie, validationResult } from "express-validator";
import Usuario from "../models/Usuario.js";
import { generarId,generarJWT } from "../helpers/tokens.js";import { emailRegistro, emailOlvidePassword } from "../helpers/emails.js";
import bcrypt from 'bcrypt'

const formularioLogin = (req, res) => {
    res.render("auth/login", {
        pagina: "Iniciar Sesion",
        csrfToken: req.csrfToken()
    });
}

const autenticar = async(req,res) => {
  await check("email")
  .isEmail()
  .notEmpty()
  .withMessage("email es obligatorio")
  .run(req);
await check("password")
  .notEmpty()
  .withMessage("Password es obligatorio")
  .run(req);

  let resultado = validationResult(req)

  if(!resultado.isEmpty()){
    return res.render('auth/login',{
      pagina:'Iniciar Sesion',
      csrfToken: req.csrfToken(),
      errores: resultado.array()
    })
  }

  const { email, password } = req.body

  const usuario = await Usuario.findOne( {where:{ email } } )

  if(!usuario){
    return res.render('auth/login',{
      pagina:'Iniciar Sesion',
      csrfToken: req.csrfToken(),
      errores: [ { msg:'El usuario no existe' } ]
    })
  }

  if(!usuario.confirmado){
    return res.render('auth/login',{
      pagina:'Iniciar Sesion',
      csrfToken: req.csrfToken(),
      errores: [ { msg:'Tu cuenta no ha sido confirmado' } ]
    })
  }
   
  if(!usuario.verificarPassword(password)){
    return res.render('auth/login',{
      pagina:'Iniciar Sesion',
      csrfToken: req.csrfToken(),
      errores: [ { msg:'Tu contraseña no es coincidente' } ]
    })
  }
  
  const token = generarJWT({id: usuario.id, nombre: usuario.nombre, tipo: usuario.tipo})

  if(usuario.tipo === 1){
    return res.cookie('_token',token,{
      httpOnly:true
    }).redirect('/admin/admimistrarLaptops')
  }

  return res.cookie('_token',token,{
    httpOnly:true
  }).redirect('/')

}

const formularioRegistro = (req, res) => {
    res.render("auth/registro", {
      pagina: "Crear Cuenta",
      csrfToken: req.csrfToken(),
    });
};

const registrar = async (req, res) => {
  await check("nombre")
    .notEmpty()
    .withMessage("No se permiten valores vacios")
    .run(req);
  await check("email")
    .isEmail()
    .notEmpty()
    .withMessage("email no invalido")
    .run(req);
  await check("password")
    .isLength({ min: 6 })
    .withMessage("Contraseñas deben ser de minimo 6 caracteres")
    .run(req);
  await check("repetir_password")
    .equals(req.body.password)
    .withMessage("Contraseñas deben ser iguales")
    .run(req);
  let resultado = validationResult(req);

  if (!resultado.isEmpty()) {
    return res.render("auth/registro", {
      pagina: "Crear Cuenta",
      csrfToken: req.csrfToken(),
      errores: resultado.array(),
      usuario: {
        nombre: req.body.nombre,
        email: req.body.email,
      },
    });
  }

  const { nombre, email, password } = req.body;

  const existeUsuario = await Usuario.findOne({ where: { email } });

  if (existeUsuario) {
    return res.render("auth/registro", {
      pagina: "Crear Cuenta",
      csrfToken: req.csrfToken(),
      errores: [{ msg: "Este correo ya esta registrado" }],
      usuario: {
        nombre: req.body.nombre,
        email: req.body.email,
      },
    });
  }

  const usuario = await Usuario.create({
    nombre,
    email,
    password,
    token: generarId(),
    tipo: 0
  });

  emailRegistro({
    nombre: usuario.nombre,
    email: usuario.email,
    token: usuario.token,
  });

  res.render("templates/mensaje", {
    pagina: "Cuenta Creada Correctamente",
    mensaje: "Hemos Enviado un Email de Confirmación, presiona en el enlace",
  });
};

const cerrarSesion = (req, res) => {
  return res.clearCookie('_token').status(200).redirect('/auth/login')
}

const confirmar = async (req, res, next) => {
  const { token } = req.params;

  const usuario = await Usuario.findOne({ where: { token } });
  if (!usuario) {
    return res.render("auth/confirmar-cuenta", {
      pagina: "Error al confirmar la cuenta",
      mensaje: "Error al confirmar la cuenta, intenta de nuevo",
      error: true,
    });
  }

  usuario.token = null;
  usuario.confirmado = true;
  await usuario.save();

  res.render("auth/confirmar-cuenta", {
    pagina: "Cuenta confirmada",
    mensaje: "La cuenta se ha confirmado exitosamente",
    error: false,
  });
};

const formularioOlvidePassword = (req, res) => {
  res.render("auth/olvide-password", {
    pagina: "Recupera tu acceso al Comparador",
    csrfToken: req.csrfToken(),
  });
};

const resetPassword = async (req, res) => {
  await check("email")
    .isEmail()
    .notEmpty()
    .withMessage("email no invalido")
    .run(req);
  let resultado = validationResult(req);

  if (!resultado.isEmpty()) {
    return res.render("auth/olvide-password", {
      pagina: "Recupera tu acceso al Comparador",
      csrfToken: req.csrfToken(),
      errores: resultado.array(),
    });
  }

  const { email } = req.body

  const usuario = await Usuario.findOne({ where: {email}})

  if(!usuario){
    return res.render("auth/olvide-password", {
      pagina: "Recupera tu acceso al Comparador",
      csrfToken: req.csrfToken(),
      errores: [{msg:'El email no pertenece a ningun usuario'}],
    });
  }
  
  usuario.token = generarId()

  await usuario.save()

  emailOlvidePassword({
    email:usuario.email,
    nombre:usuario.nombre,
    token:usuario.token
  })

  res.render('templates/mensaje',{
    pagina:'Reestablece tu contraseña',
    mensaje:'Hemos enviado un email'
  })

};

const comprobarToken = async(req,res,next) => {
  const { token } = req.params

  const usuario = await  Usuario.findOne({where: {token}})
  if(!usuario){
    return res.render("auth/confirmar-cuenta", {
      pagina: "Reestablece tu password",
      mensaje: "Error al validar la cuenta, intenta de nuevo",
      error: true,
    });
  }
  
  res.render('auth/reset-password',{
    pagina: 'Reestablece tu password',
    csrfToken: req.csrfToken()
  })


}

const nuevoPassword = async(req,res) =>{
  await check("password")
  .isLength({ min: 6 })
  .withMessage("Contraseñas deben ser de minimo 6 caracteres")
  .run(req);

  let resultado = validationResult(req);

  if (!resultado.isEmpty()) {
    return res.render("auth/reset-password", {
      pagina: "Reestablece tu password",
      csrfToken: req.csrfToken(),
      errores: resultado.array(),
    });
  }

  const {token} = req.params
  const { password }= req.body

  const usuario = await Usuario.findOne({where:{token}})

  const salt= await bcrypt.genSalt(10)
  usuario.password = await bcrypt.hash(password, salt)
  usuario.token = null;

  await usuario.save()

  res.render('auth/reset-password',{
    pagina: 'Password Reestablecido',
    mensaje: 'El password se guardo correctamente'
  })

}

export {
    formularioLogin,
    autenticar,
    formularioRegistro,
    registrar,
    cerrarSesion,
    confirmar,
    formularioOlvidePassword,
    resetPassword,
    comprobarToken,
    nuevoPassword
}