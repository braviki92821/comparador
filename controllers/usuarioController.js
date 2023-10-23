import { check, cookie, validationResult } from "express-validator";
import bcrypt from 'bcrypt'

const formularioLogin = (req, res) => {
    res.render("auth/login", {
        pagina: "Iniciar Sesion",
        csrfToken: req.csrfToken()
    });
}

const formularioRegistro = (req, res) => {
    res.render("auth/registro", {
      pagina: "Crear Cuenta",
      csrfToken: req.csrfToken(),
    });
  };

  

export {
    formularioLogin,
    formularioRegistro
}