import nodemailer from 'nodemailer'

const emailRegistro = async(datos) =>{
    const transport = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS
        }
      });

      const { email, nombre, token } = datos

      await transport.sendMail({
        from: 'Bienes',
        to: email,
        subject: 'Confirma tu cuenta',
        text:'Confirma tu cuenta',
        html: 
        `<p>Hola ${nombre}, compruebe su cuenta en bienes raices</p>
         <p>Tu cuenta en bienes raices ya esta lista, solo debes confirmarla en
         el siguiente enlace <a href="${process.env.BACKEND_URL}:${process.env.PORT ?? 2500}/auth/confirmar/${token}">Confirmar Cuenta</a></p>
         <p>Si no creaste esta cuenta, puedes ignorar el mensaje</p>`
      })
}

const emailOlvidePassword = async(datos) =>{
  const transport = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    const { email, nombre, token } = datos

    await transport.sendMail({
      from: 'Bienes',
      to: email,
      subject: 'Restablecer tu contraseña',
      text:'Restablecer tu contraseña',
      html: 
      `<p>Hola ${nombre}, has solicitado reestablecer tu password en bienes raices</p>
       <p>Sigue el siguiente enlace <a href="${process.env.BACKEND_URL}:${process.env.PORT ?? 2500}/auth/olvide-password/${token}">Reestablecer password</a></p>
       <p>Si no solicitaste el cambio ignora el mensaje</p>`
    })
}

export {
    emailRegistro,
    emailOlvidePassword
}